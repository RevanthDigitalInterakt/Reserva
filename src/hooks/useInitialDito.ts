/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import type { ProfileVars } from '../graphql/profile/profileQuery';
import createMobileToken from '../utils/Dito/src/utils/sendTokenMobile';
import EventProvider from '../utils/EventProvider';
import sendUserDataToDito from '../utils/Dito/src/utils/sendUserDataToDito';
import sendUpdateUserDataToDito from '../utils/Dito/src/utils/sendUpdateUserDataToDito';
import convertSha1 from '../utils/Dito/src/sha1';
import useAsyncStorageProvider from './useAsyncStorageProvider';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';

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
    EventProvider.sendTrackEvent(
      'acessou-home', {
        id,
        action: 'acessou-home',
        data: { origem: 'app', dispositivo: Platform.OS },
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
            data: { dispositivo: Platform.OS },
          },
        });
        await handleRegisterTokenDito({ id: syncAnonymousToUser, deviceToken });
      }

      await setItem('@Dito:userRef', document);
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
            },
          },
        });
        await handleRegisterTokenDito({ id, deviceToken });
      }

      await trackEventHomeDito({ id });
    } catch (e) {
      EventProvider.captureException(e);
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

      if (profile?.email && deviceToken) {
        await handleRegisterUser({
          userProfileData: {
            userId: profile.id,
            lastName: profile?.lastName || '',
            email: profile.email,
            gender: profile?.gender || '',
            birthDate: profile?.birthDate || '',
            homePhone: profile?.homePhone || '',
            firstName: profile?.firstName || '',
            document: profile?.document || '',
          },
          deviceToken,
        });
      } else {
        handleRegisterAnonymous({ deviceToken });
      }
    } catch (e) {
      // TODO verificar possibilidade de tratar futuramente
      EventProvider.captureException(e);
    }
  }, [handleRegisterAnonymous, handleRegisterUser, profile]);

  return { handleDitoRegister: handleRegister };
}
