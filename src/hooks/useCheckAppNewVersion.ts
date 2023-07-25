import { useCallback, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import Config from 'react-native-config';
import checkVersion from 'react-native-store-version';
import semver from 'semver';
import deviceInfoModule from 'react-native-device-info';
import EventProvider from '../utils/EventProvider';
import { useApolloFetchPolicyStore } from '../zustand/useApolloFetchPolicyStore';
import { platformType } from '../utils/platformType';
import { useUpdateInAppLazyQuery } from '../base/graphql/generated';

export default function useCheckAppNewVersion() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const [getUpdateInApp] = useUpdateInAppLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('updateInApp'),
  });

  const goToStore = useCallback(async () => {
    const url = (Platform.OS === platformType.ANDROID
      ? Config.ANDROID_STORE_URL
      : Config.IOS_STORE_URL) as string;

    await Linking.openURL(url);
  }, []);

  const onGetUpdateInApp = useCallback(async () => {
    const { data } = await getUpdateInApp();

    const platform = Platform.OS;

    const targetVersion = data?.updateInApp?.targetVersion ?? '1.0.0';
    const updateType = data?.updateInApp?.updateType;
    const updateTitle = data?.updateInApp?.updateTitle;
    const updateDescription = data?.updateInApp?.updateDescription;
    const onlyPlatform = data?.updateInApp?.onlyPlatform;
    const updateAllVersions = data?.updateInApp?.updateAllVersions;

    const buttons = [
      updateType === 'FLEXIBLE' ? {
        text: 'Atualizar depois',
        onPress: () => { },
      } : {},
      {
        text: 'Atualizar',
        onPress: goToStore,
      },
    ];

    try {
      const { remote, local } = await checkVersion({
        version: deviceInfoModule.getVersion(),
        iosStoreURL: Config.IOS_STORE_URL,
        androidStoreURL: Config.ANDROID_STORE_URL,
        country: 'BR',
      });

      const isMajor = semver.gt(remote, local);
      const isTarget = semver.eq(targetVersion, local);

      if (isMajor
        && (updateAllVersions || isTarget)
        && (onlyPlatform === platform || onlyPlatform === 'all')) {
        Alert.alert(
          updateTitle ?? '',
          updateDescription ?? '',
          buttons,
        );
      }
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, [getUpdateInApp, goToStore]);

  useEffect(() => {
    onGetUpdateInApp();
  }, [onGetUpdateInApp]);
}
