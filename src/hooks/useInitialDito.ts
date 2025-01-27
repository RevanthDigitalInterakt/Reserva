/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import type { ProfileVars } from '../graphql/profile/profileQuery';
import createMobileToken from '../utils/Dito/src/utils/sendTokenMobile';
import EventProvider from '../utils/EventProvider';
import sendUserDataToDito from '../utils/Dito/src/utils/sendUserDataToDito';
import sendUpdateUserDataToDito from '../utils/Dito/src/utils/sendUpdateUserDataToDito';
import convertSha1 from '../utils/Dito/src/sha1';
import useAsyncStorageProvider from './useAsyncStorageProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

interface IHandleRegisterUser {
  userProfileData: ProfileVars;
  deviceToken: string;
}

interface IHandleRegisterToken {
  id: string;
  deviceToken: string;
}

export default function useInitialDito() {
  const { setItem } = useAsyncStorageProvider();
  const { profile } = useAuthStore(['profile']);

  const trackEventHomeDito = async ({ id }: Pick<IHandleRegisterToken, 'id'>) => {
    EventProvider.sendTrackEvent('acessou-home', {
      id,
      action: 'acessou-home',
      data: { origem: 'app', dispositivo: Platform.OS, client_provider: Platform.OS },
    });
  };

  const handleRegisterTokenDito = useCallback(async ({ id, deviceToken }: IHandleRegisterToken) => {
    await createMobileToken({
      id,
      token: deviceToken,
      platform: Platform.OS === 'ios' ? 'Apple iPhone' : 'Android',
    });
  }, []);

  const handleRegisterUser = useCallback(async ({ deviceToken }: IHandleRegisterUser) => {
    const syncAnonymousToUser = await AsyncStorage.getItem('@Dito:anonymousID');

    if (syncAnonymousToUser) {
      await sendUpdateUserDataToDito({
        id: syncAnonymousToUser,
        user: {
          email: profile?.email,
          gender: profile?.gender || '',
          birthday: profile?.birthDate,
          cpf: profile?.document || '',
          data: { dispositivo: Platform.OS, client_provider: Platform.OS },
        },
      });
      await handleRegisterTokenDito({ id: syncAnonymousToUser, deviceToken });
    }

    await setItem('@Dito:userRef', profile?.document || '');
    await sendUserDataToDito({
      id: profile?.document || '',
      user: {
        name: profile?.firstName || '',
        email: profile?.email,
        gender: profile?.gender || '',
        birthday: profile?.birthDate,
        cpf: profile?.document || '',
        data: {
          dispositivo: Platform.OS,
          client_provider: Platform.OS,
        },
      },
    });
    await handleRegisterTokenDito({ id: profile?.document || '', deviceToken });
    await trackEventHomeDito({ id: profile?.document || '' });
  }, [
    handleRegisterTokenDito,
    profile?.birthDate,
    profile?.document,
    profile?.email,
    profile?.firstName,
    profile?.gender,
    setItem,
  ]);

  const handleRegisterAnonymous = useCallback(async ({ deviceToken }: Pick<IHandleRegisterToken, 'deviceToken'>) => {
    try {
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
              client_provider: Platform.OS,
            },
          },
        });
        await handleRegisterTokenDito({ id, deviceToken });
      }

      await trackEventHomeDito({ id: id || '' });
    } catch (e) {
      ExceptionProvider.captureException(e, "handleRegisterAnonymous - useInitialDito.ts");
    }
  }, [handleRegisterTokenDito]);

  const handleRegister = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
      }
      const deviceToken = await messaging().getToken();

      await handleRegisterUser({
        userProfileData: {
          userId: profile?.id || '',
          lastName: profile?.lastName || '',
          email: profile?.email || '',
          gender: profile?.gender || '',
          birthDate: profile?.birthDate || '',
          homePhone: profile?.homePhone || '',
          firstName: profile?.firstName || '',
          document: profile?.document || '',
        },
        deviceToken,
      });
    } catch (e) {
      ExceptionProvider.captureException(e, "handleRegister - useInitialDito.ts");
    }
  }, [
    handleRegisterUser,
    profile?.birthDate,
    profile?.document,
    profile?.email,
    profile?.firstName,
    profile?.gender,
    profile?.homePhone,
    profile?.id,
    profile?.lastName,
  ]);

  return { handleDitoRegister: handleRegister, handleDitoRegisterAnony: handleRegisterAnonymous };
}
