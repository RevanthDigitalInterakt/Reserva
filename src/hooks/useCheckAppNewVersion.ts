import { useLazyQuery } from '@apollo/client';
import { useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import deviceInfoModule from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import semver from 'semver';
import SpInAppUpdates, {
  AndroidStatusEventListener,
  IAUUpdateKind,
  StartUpdateOptions,
  StatusUpdateEvent,
} from 'sp-react-native-in-app-updates';
import { UPDATE_IN_APP_QUERY } from '../graphql/updates/updateInApp.query';
import EventProvider from '../utils/EventProvider';
import { useApolloFetchPolicyStore } from '../zustand/useApolloFetchPolicyStore';

type UpdateInAppType = {
  updateInApp: {
    onlyPlatform: string;
    targetVersion: string;
    updateAllVersions: string;
    updateDescription: string;
    updateTitle: string;
    updateType: string;
  };
};

export default function useCheckAppNewVersion() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const [getUpdateInApp] = useLazyQuery<UpdateInAppType>(UPDATE_IN_APP_QUERY, {
    context: { clientName: 'contentful' },
    fetchPolicy: 'no-cache',
  });

  const onStatusUpdate: AndroidStatusEventListener = (
    _status: StatusUpdateEvent,
  ) => { };

  const startUpdateInApp = useCallback(async ({
    updateTitle,
    updateDescription,
    versionLocalTarget,
    updateInAppType,
    onlyPlatform,
    updateAllVersions,
  }: {
    updateTitle?: string;
    updateDescription?: string;
    versionLocalTarget?: string;
    updateInAppType?: string;
    onlyPlatform?: string;
    updateAllVersions?: boolean;
  }) => {
    const platform = Platform.OS;
    try {
      const { remote, local } = await checkVersion({
        version: deviceInfoModule.getVersion(),
        iosStoreURL: Config.IOS_STORE_URL,
        androidStoreURL: Config.ANDROID_STORE_URL,
        country: 'BR',
      });

      const inAppUpdates = new SpInAppUpdates(false);

      const response = await inAppUpdates.checkNeedsUpdate({
        curVersion: local,
        customVersionComparator: () => {
          const isMajor = semver.gt(remote, local);

          let isMajorLocalTarget: boolean = false;
          if (versionLocalTarget) {
            isMajorLocalTarget = semver.eq(versionLocalTarget, local);
          }

          if (isMajor) {
            if (isMajorLocalTarget || updateAllVersions) {
              return 1;
            }
          }
          return -1;
        },
      });

      if (response.shouldUpdate) {
        inAppUpdates.addStatusUpdateListener(onStatusUpdate);

        const updateType: StartUpdateOptions = Platform.select<StartUpdateOptions>({
          ios: {
            title: updateTitle,
            message: updateDescription,
            buttonUpgradeText: 'Atualizar',
            buttonCancelText: 'Cancelar',
            country: 'br',
            forceUpgrade: updateInAppType !== 'FLEXIBLE',
            bundleId: deviceInfoModule.getBundleId(),
          },
          android: {
            updateType:
              updateInAppType === 'FLEXIBLE'
                ? IAUUpdateKind.FLEXIBLE
                : IAUUpdateKind.IMMEDIATE,
          },
        }) as StartUpdateOptions;
        if (onlyPlatform === platform || onlyPlatform === 'all') {
          inAppUpdates.startUpdate(updateType);
        }
      }
      return response.shouldUpdate;
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, []);

  useEffect(() => {
    getUpdateInApp().then(async ({ data: { updateInApp } }) => {
      startUpdateInApp({
        versionLocalTarget: updateInApp?.targetVersion,
        updateInAppType: updateInApp?.updateType,
        updateTitle: updateInApp?.updateTitle,
        updateDescription: updateInApp?.updateDescription,
        onlyPlatform: updateInApp?.onlyPlatform,
        updateAllVersions: updateInApp?.updateAllVersions,
      });
    });
  }, [getUpdateInApp, startUpdateInApp]);
}
