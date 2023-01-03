import { useLinkTo } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import {
  Box, Button, Image, Typography,
} from '@usereservaapp/reserva-ui';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
// import { getAppstoreAppMetadata } from 'react-native-appstore-version-checker'
import AsyncStorage from '@react-native-community/async-storage';
import { images } from '../../../assets';

const { getAppstoreAppMetadata } = require('react-native-appstore-version-checker');

interface StoreUpdateProps {
}

export const StoreUpdate: React.FC<StoreUpdateProps> = ({ }) => {
  const linkTo = useLinkTo();

  const [isVisible, setIsVisible] = useState(false);

  const [ignore, setIgnore] = useState(false);

  const DateToUpdate = () => {
    const dateNow = new Date();
    return new Date(dateNow.getTime() + 12 * 60 * 60 * 1000); // actual date plus 12 hours
  };

  const hasNewVersion = async () => {
    if (!ignore) {
      const id = Platform.OS == 'ios' ? '1566861458' : 'com.usereserva';

      const { version: storeVersion } = await getAppstoreAppMetadata(id);

      const storeUpdateAsyncStorageKey = 'store-update-date-time';

      const storeUpdateDateTime = await AsyncStorage.getItem(storeUpdateAsyncStorageKey);

      await AsyncStorage.setItem(storeUpdateAsyncStorageKey, '');

      if (needUpdate(DeviceInfo.getVersion(), storeVersion)) {
        if (!storeUpdateDateTime) {
          await AsyncStorage.setItem(storeUpdateAsyncStorageKey, `${DateToUpdate()}`);
        } else if (Date.now() >= new Date(storeUpdateDateTime).getTime()) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
        await AsyncStorage.setItem(storeUpdateAsyncStorageKey, '');
      }
    }
  };

  const needUpdate = (appVersion: string, storeVersion: string) => {
    const appVersionParsed = appVersion.split('-')[0].split('.');
    const storeVersionParsed = storeVersion.split('-')[0].split('.');

    const isAppVersionLower = appVersionParsed.find((value, index) => {
      // if find app version is lower then store version (in any dot)

      const intValue = parseInt(value);
      const intStoreValue = parseInt(storeVersionParsed[index]);

      const previousCheck = index > 0 ? parseInt(appVersionParsed[index - 1]) == parseInt(storeVersionParsed[index - 1]) : true;

      return intValue < intStoreValue && previousCheck;
    });

    if (isAppVersionLower) return true;

    return false;
  };

  const update = () => {
    Linking.openURL(
      Platform.OS === 'ios'
        ? 'itms-apps://itunes.apple.com/app/apple-store/id1566861458'
        : 'market://details?id=com.usereserva',
    );
    // Linking.openURL('itms-apps://itunes.apple.com/app/apple-store/id1566861458')
  };

  useEffect(() => {
    hasNewVersion();
  }, []);

  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
    >
      <Box
        bg="white"
        height="100%"
        alignItems="center"
      >
        <Box
          mt="40%"
          px="micro"
          marginRight="micro"
        >
          <Image
            source={images.update}
            resizeMode="contain"
          />
        </Box>

        <Box mt={38}>
          <Typography
            fontFamily="reservaSerifMedium"
            fontSize={20}
          >
            Hora de atualizar!
          </Typography>
        </Box>
        <Box mt={15} mx={27}>
          <Typography
            fontFamily="nunitoSemiBold"
            fontSize={13}
            textAlign="center"
          >
            Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.
          </Typography>
        </Box>

        <Box mt={19} width="100%" px={20} alignItems="center">
          <Box width="100%">
            <Button
              onPress={update}
              inline
              title="ATUALIZAR"
              variant="primarioEstreito"
            />
          </Box>

          <Box
            justifyContent="center"
            my={29}
          >
            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
            >
              OU
            </Typography>
          </Box>
          <Box width="100%">
            <Button
              onPress={() => {
                setIgnore(true);
                setIsVisible(false);
              }}
              inline
              title="CONTINUAR"
              variant="primarioEstreitoOutline"
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
