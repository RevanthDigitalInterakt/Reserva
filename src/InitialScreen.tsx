import React, { FC, useEffect, useState } from 'react';

import messaging from '@react-native-firebase/messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import { Linking, Platform, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-lottie-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import SpInAppUpdates, {
  SemverVersion,
  NeedsUpdateResponse,
  AndroidStatusEventListener,
  StatusUpdateEvent,
  StartUpdateOptions,
  IAUUpdateKind,
} from 'sp-react-native-in-app-updates';

import { StorageService } from './shared/services/StorageService';
import { ModalPush } from './modules/Update/components/ModalPush';
import { StoreUpdatePush } from './modules/Update/pages/StoreUpdatePush';
import { useStatusBar } from './context/StatusBarContext';
import { haveVersionUpdates } from './updates/InAppUpdates/InAppUpdates';
import deviceInfoModule from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import semver from 'semver'
import { useLazyQuery } from '@apollo/client';
import { UPDATE_IN_APP_QUERY } from './graphql/updates/updateInApp.query';
import CodePushModal from './shared/components/CodePushModal';
import { useNavigation } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

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
const ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.usereserva';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  await messaging()
    .getToken()
    .then((token) => {});
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

const InitialScreen: React.FC<{ children: FC }> = ({ children }) => {
  const { barStyle } = useStatusBar();
  const [needUpdates, setNeedUpdates] = useState(false);
  const [needUpdatesResponse, setNeedUpdatesResponse] =
    useState<NeedsUpdateResponse>();
  const [pushNotification, setPushNotification] = useState<any>();
  const [showNotification, setShowNotification] = useState(false);
  const [onboardingView, setOnboardingView] = useState(false);

  const [getUpdateInApp, { refetch }] = useLazyQuery<UpdateInAppType>(
    UPDATE_IN_APP_QUERY,
    {
      context: { clientName: 'contentful' },
    }
  );

  const setFetchInterval = async () => {
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 30000,
      fetchTimeMillis: 30000,
    });
  };

  useEffect(() => {
    requestUserPermission();
    remoteConfig().setDefaults({
      appName: 'My App',
      appVersion: '1.0.0',
    });
    remoteConfig()
      .fetchAndActivate()
      .then(() => {});
    setFetchInterval();
    StorageService.setInstallationToken();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.link === 'usereserva://storeUpdate') {
        setPushNotification(remoteMessage);
        setShowNotification(true);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    getOnboardingData();
  }, []);

  const onStatusUpdate: AndroidStatusEventListener = (
    status: StatusUpdateEvent
  ) => {
  };

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
          const isMajor = semver.gt(remote, local)

          let isMajorLocalTarget: boolean = false;
          if (versionLocalTarget) {
            isMajorLocalTarget = semver.eq(versionLocalTarget, local)
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

        const updateType: StartUpdateOptions =
          Platform.select<StartUpdateOptions>({
            ios: {
              title: updateTitle,
              message: updateDescription,
              buttonUpgradeText: 'Atualizar',
              buttonCancelText: 'Cancelar',
              country: 'br',
              forceUpgrade: updateInAppType === 'FLEXIBLE' ? false : true,
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
      Sentry.captureException(error);
    }
  };

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

  const getOnboardingData = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData === 'true') {
      setOnboardingView(true);
    } else {
      setOnboardingView(false);
    }
  };

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
};

export default InitialScreen;
