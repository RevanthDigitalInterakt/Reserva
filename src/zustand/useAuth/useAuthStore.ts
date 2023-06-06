import { create } from 'zustand';
import * as Sentry from '@sentry/react-native';
import type { FetchPolicy } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';
import type {
  ProfileQuery,
  ProfileQueryVariables, RefreshTokenMutation, RefreshTokenMutationVariables,
  SignInMutation,
  SignInMutationVariables,
} from '../../base/graphql/generated';
import { createTokenExpireDate } from '../../utils/createTokenExpireDate';
import { getAsyncStorageItem, removeAsyncStorageItem, setAsyncStorageItem } from '../../hooks/useAsyncStorageProvider';
import { getApolloClient } from '../../utils/getApolloClient';
import { ProfileDocument, RefreshTokenDocument, SignInDocument } from '../../base/graphql/generated';
import EventProvider from '../../utils/EventProvider';
import { identifyCustomer } from './methods/identifyCustomer';
import { checkIfNeedRefreshToken } from '../../utils/checkIfNeedRefreshToken';
import { RefreshTokenError } from './types/refreshTokenError';

type TProfileData = ProfileQuery['profile'];

interface IAuthStore {
  initialized: boolean;
  onInit: () => Promise<boolean>;
  onRefreshToken: () => Promise<boolean>;
  //
  onGetProfile: (fetchPolicy?: FetchPolicy) => Promise<TProfileData>;
  profile?: TProfileData;
  //
  onSignIn: (email: string, password: string, isNewUser?: boolean) => Promise<void>;
  onUpdateAuthData: (token: string, cookie: string) => Promise<void>;
  //
  onSignOut: () => Promise<void>;
}

const authStore = create<IAuthStore>((set, getState) => ({
  initialized: false,
  profile: undefined,
  onInit: async () => {
    try {
      const state = getState();
      const token = await getAsyncStorageItem('Auth:Token');

      // If toke do not exists, user's not logged in. No need to request a profile
      if (!token) {
        set({ ...state, initialized: true });

        return true;
      }

      const profile = await state.onGetProfile();

      set({ ...state, profile, initialized: true });

      return true;
    } catch (err) {
      EventProvider.captureException(err);

      set({ ...getState(), initialized: true });

      return false;
    }
  },
  onRefreshToken: async () => {
    try {
      const needRefreshToken = await checkIfNeedRefreshToken();

      if (!needRefreshToken) return false;

      const client = getApolloClient();

      const { data } = await client.mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
        context: { clientName: 'gateway' },
        mutation: RefreshTokenDocument,
        fetchPolicy: 'no-cache',
      });

      if (!data?.refreshToken?.token || !data?.refreshToken?.authCookie) {
        throw new Error('Unauthorized');
      }

      await setAsyncStorageItem('Auth:Token', data.refreshToken.token);
      await setAsyncStorageItem('Auth:Cookie', data.refreshToken.authCookie);
      await setAsyncStorageItem('Auth:TokenRefreshTime', createTokenExpireDate());

      return true;
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.addBreadcrumb({ message: 'Error on refresh token' });
        scope.setExtra('profile', getState().profile);
        Sentry.captureException(err);
      });

      throw new RefreshTokenError();
    }
  },
  onGetProfile: async (fetchPolicy: FetchPolicy = 'network-only') => {
    try {
      const client = getApolloClient();

      const { data } = await client.query<ProfileQuery, ProfileQueryVariables>({
        query: ProfileDocument,
        context: { clientName: 'gateway' },
        fetchPolicy,
      });

      if (!data?.profile) {
        throw new Error('Unauthorized [onGetProfile]');
      }

      set({ ...getState(), profile: data.profile });

      return data.profile;
    } catch (err) {
      EventProvider.captureException(err);

      throw new Error(err);
    }
  },
  onSignIn: async (email: string, password: string, isNewUser = false) => {
    try {
      const client = getApolloClient();

      const input = { email, password, isNewUser };
      const { data } = await client.mutate<SignInMutation, SignInMutationVariables>({
        context: { clientName: 'gateway' },
        mutation: SignInDocument,
        fetchPolicy: 'no-cache',
        variables: { input },
      });

      if (!data?.signIn?.token || !data?.signIn?.authCookie) {
        throw new Error('Unauthorized [onSignIn]');
      }

      await setAsyncStorageItem('Auth:Token', data.signIn.token);

      const profile = await getState().onGetProfile('network-only');

      if (!profile.authCookie || !profile.email) {
        throw new Error('Invalid Profile [onSignIn]');
      }

      getState().onUpdateAuthData(data.signIn.token, profile.authCookie);
      await identifyCustomer(profile.email);

      set({ ...getState(), initialized: true, profile });
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('email', email);
        scope.setExtra('password', password);
        Sentry.captureException(err);
      });

      throw new Error(err);
    }
  },
  onUpdateAuthData: async (token: string, cookie: string) => {
    await setAsyncStorageItem('Auth:Token', token);
    await setAsyncStorageItem('Auth:TokenRefreshTime', createTokenExpireDate());
    await setAsyncStorageItem('Auth:Cookie', cookie);

    getState().onGetProfile();
  },
  onSignOut: async () => {
    await removeAsyncStorageItem('Auth:Token');
    await removeAsyncStorageItem('Auth:TokenRefreshTime');
    await removeAsyncStorageItem('Auth:Cookie');

    await AsyncStorage.removeItem('@RNAuth:cookie');
    await AsyncStorage.removeItem('@RNAuth:email');
    await AsyncStorage.removeItem('@RNAuth:typeLogin');
    await AsyncStorage.removeItem('@RNAuth:lastLogin');
    await AsyncStorage.removeItem('@Dito:anonymousID');
    await AsyncStorage.setItem('@RNAuth:Token', '');

    EventProvider.removePushExternalUserId();

    Sentry.setUser(null);

    set({ ...getState(), profile: undefined });
  },
}));

export const useAuthStore = createZustandStoreWithSelectors(authStore);
