/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import { profileQuery, ProfileVars } from '../graphql/profile/profileQuery';
import createMobileToken from '../utils/Dito/src/utils/sendTokenMobile';
import EventProvider from '../utils/EventProvider';
import sendUserDataToDito from '../utils/Dito/src/utils/sendUserDataToDito';
import sendUpdateUserDataToDito from '../utils/Dito/src/utils/sendUpdateUserDataToDito';
import convertSha1 from '../utils/Dito/src/sha1';
import useDitoStore from '../zustand/useDitoStore';

interface IHandleRegisterUser {
  userProfileData: ProfileVars;
  deviceToken: string;
}
interface IHandleRegisterToken {
  id: string;
  deviceToken: string;
}
export default function useInitialDito() {
  const { isLogged, hasHydrated } = useDitoStore((state) => state);
  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache', nextFetchPolicy: 'no-cache' });
  const requestProfile = useCallback(async () => {
    try {
      const { data } = await getProfile() as unknown as {
        data: { profile: ProfileVars }
      };
      const { profile } = data;
      return profile;
    } catch (e) {
      EventProvider.captureException(e);
      throw new Error(e);
    }
  }, [getProfile]);
  const trackEventHomeDito = async ({ id }: Pick<IHandleRegisterToken, 'id'>) => {
    EventProvider.sendTrackEvent(
      'acessou-home', {
        id,
        action: 'acessou-home',
        data: {
          origem: 'app',
          dispositivo: Platform.OS,
        },
      },
    );
  };
  const handleRegisterTokenDito = useCallback(async ({ id, deviceToken }: IHandleRegisterToken) => {
    await createMobileToken({
      id,
      token: deviceToken,
      platform: 'Android',
    });
  }, []);
  const handleRegisterUser = useCallback(
    async ({ userProfileData, deviceToken }: IHandleRegisterUser) => {
      const syncAnonymousToUser = await AsyncStorage.getItem('@Dito:anonymousID');
      const {
        document, firstName, email, gender, birthDate,
      } = userProfileData;
      if (syncAnonymousToUser) {
        await sendUpdateUserDataToDito({
          id: syncAnonymousToUser,
          user: {
            email: userProfileData.email,
            gender,
            birthday: birthDate,
            cpf: document,
            data: {
              dispositivo: Platform.OS,
            },
          },
        });
        await handleRegisterTokenDito({ id: syncAnonymousToUser, deviceToken });
      }
      await sendUserDataToDito({
        id: document,
        user: {
          name: firstName,
          email,
          gender,
          birthday: birthDate,
          cpf: document,
          data: {
            dispositivo: Platform.OS,
          },
        },
      });
      await handleRegisterTokenDito({ id: document, deviceToken });
      await trackEventHomeDito({ id: document });
    }, [handleRegisterTokenDito],
  );
  const handleRegisterAnonymous = useCallback(async ({ deviceToken }: Pick<IHandleRegisterToken, 'deviceToken'>) => {
    let id = await AsyncStorage.getItem('@Dito:anonymousID');
    if (!id) {
      const uniqueIdDito = uuid.v4();
      const uniqueIdDitoFormatted = `${uniqueIdDito}@usereserva.com`;
      id = convertSha1(uniqueIdDitoFormatted);
      await sendUserDataToDito({
        id,
        user: {
          email: uniqueIdDitoFormatted,
          data: {
            dispositivo: Platform.OS,
          },
        },
      });
      await handleRegisterTokenDito({ id, deviceToken });
    }
    await trackEventHomeDito({ id });
  }, [handleRegisterTokenDito]);
  const handleRegister = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
      }
      const deviceToken = await messaging().getToken();
      const authEmail = await AsyncStorage.getItem('@RNAuth:email');
      if (authEmail && deviceToken && isLogged) {
        const userProfileData = await requestProfile();
        await handleRegisterUser({
          userProfileData,
          deviceToken,
        });
      } else {
        handleRegisterAnonymous({ deviceToken });
      }
    } catch (e) {
      // TODO verificar possibilidade de tratar futuramente
      EventProvider.captureException(e);
    }
  }, [handleRegisterAnonymous, handleRegisterUser, requestProfile, isLogged]);
  useEffect(() => {
    if (hasHydrated) {
      handleRegister();
    }
  }, [handleRegister, hasHydrated]);
}
