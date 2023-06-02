import React, {
  useCallback, useEffect, useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Platform, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import SpInAppUpdates, {
  AndroidStatusEventListener,
  IAUUpdateKind,
  StartUpdateOptions,
  StatusUpdateEvent,
} from 'sp-react-native-in-app-updates';

import { useLazyQuery } from '@apollo/client';
import deviceInfoModule from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import semver from 'semver';
import { useStatusBar } from './context/StatusBarContext';
import { UPDATE_IN_APP_QUERY } from './graphql/updates/updateInApp.query';
import { ModalPush } from './modules/Update/components/ModalPush';
import { StoreUpdatePush } from './modules/Update/pages/StoreUpdatePush';
import { StorageService } from './shared/services/StorageService';
import EventProvider from './utils/EventProvider';
import useInitialMarketPlaceIn from './hooks/useInitialMarketPlaceIn';
import OnForegroundEventPush from './utils/Notifee/ForegroundEvents';
import useInitialDito from './hooks/useInitialDito';
import CodePushModal from './shared/components/CodePushModal';
import { useAuthStore } from './zustand/useAuth/useAuthStore';
import { useApolloFetchPolicyStore } from './zustand/useApolloFetchPolicyStore';

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

const IOS_STORE_URL = 'https://apps.apple.com/br/app/reserva/id1566861458';
const ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.usereserva';

function InitialScreen({ children }: { children: JSX.Element }) {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { onInit, initialized } = useAuthStore(['onInit', 'initialized']);
  const { barStyle } = useStatusBar();
  const [pushNotification, setPushNotification] = useState<any>();
  const [showNotification, setShowNotification] = useState(false);
  const [onboardingView, setOnboardingView] = useState(false);
  const [getUpdateInApp] = useLazyQuery<UpdateInAppType>(UPDATE_IN_APP_QUERY, {
    context: { clientName: 'contentful' },
    fetchPolicy: getFetchPolicyPerKey('updateInApp'),
  });

  useInitialMarketPlaceIn();
  const { handleDitoRegister } = useInitialDito();

  useEffect(() => {
    onInit();
  }, [onInit]);

  useEffect(() => {
    if (initialized) {
      handleDitoRegister();
    }
  }, [initialized]);

  const onStatusUpdate: AndroidStatusEventListener = (
    status: StatusUpdateEvent,
  ) => { };

  const startUpdateInApp = async ({
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
        iosStoreURL: IOS_STORE_URL,
        androidStoreURL: ANDROID_STORE_URL,
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
  };

  const getOnboardingData = useCallback(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');

    setOnboardingView(appData === 'true');
  }, []);

  useEffect(() => {
    StorageService.setInstallationToken();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.link === 'usereserva://storeUpdate') {
        setPushNotification(remoteMessage);
        setShowNotification(true);
      }
    });

    return unsubscribe;
  }, []);

  // TODO refactor OnForegroundEventPush to useSubscriberForeground()
  useEffect(() => {
    // TODO check func OnForegroundEventPush for add subscriber
    // useSubscriberForeground()
    OnForegroundEventPush();
  }, []);

  useEffect(() => {
    getOnboardingData();
  }, [getOnboardingData]);

  useEffect(() => {
    getUpdateInApp().then(({ data: { updateInApp } }) => {
      startUpdateInApp({
        versionLocalTarget: updateInApp?.targetVersion,
        updateInAppType: updateInApp?.updateType,
        updateTitle: updateInApp?.updateTitle,
        updateDescription: updateInApp?.updateDescription,
        onlyPlatform: updateInApp?.onlyPlatform,
        updateAllVersions: updateInApp?.updateAllVersions,
      });
    });
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: onboardingView ? '#000' : undefined,
        }}
      >
        <StatusBar animated barStyle={barStyle} />

        <CodePushModal />

        {showNotification && (
          <ModalPush
            closeModal={() => setShowNotification(false)}
            data={pushNotification}
            handleNavigation={() => {
              StoreUpdatePush();
              setShowNotification(false);
            }}
          />
        )}

        <Animatable.View animation="fadeIn" style={{ height: '100%' }}>
          {children}
        </Animatable.View>
      </SafeAreaView>
    </>
  );
}

export default InitialScreen;
