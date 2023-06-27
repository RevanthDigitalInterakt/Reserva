import { useEffect, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import checkVersion from 'react-native-store-version';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import EventProvider from '../utils/EventProvider';
import { platformType } from '../utils/platformType';

export default function useCheckAppNewVersion() {
  const goToStore = useCallback(async () => {
    const url = (platformType.ANDROID === 'android' ? Config.ANDROID_STORE_URL : Config.IOS_STORE_URL) as string;
    await Linking.openURL(url);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const check = await checkVersion({
          version: DeviceInfo.getVersion(),
          iosStoreURL: Config.IOS_STORE_URL,
          androidStoreURL: Config.ANDROID_STORE_URL,
          country: 'br',
        });

        if (check.result === 'new') {
          Alert.alert(
            `Nova versão ${check.remote}`,
            'Está disponível a nova versão do aplicativo Reserva, clique no botão abaixo para realizar a atualização.',
            [{
              text: 'Atualizar',
              onPress: goToStore,
            }],
          );
        }
      } catch (e) {
        EventProvider.captureException(e);
      }
    };

    init();
  }, [goToStore]);
}
