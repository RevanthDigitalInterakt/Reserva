import { Platform } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import OneSignal from 'react-native-onesignal';
import type { Route } from '@react-navigation/native';
import { env } from '../../config/env';
import {
  eventsName,
  eventsValue,
  EventValueOptions,
  onlyGaEvents,
} from './misc';
import type { EventOptionsFn, EventsOptions } from './Event';
import type { EventOptionsOneSignalFn } from './EventOnesignal';
import { StoreUpdatePush } from '../../modules/Update/pages/StoreUpdatePush';
import type { EventsDitoValues, EventOptionsDitoFn } from './EventDito';
import sendDitoTrackEvent from '../Dito/src/utils/sendDitoTrackEvent';
import { platformType } from '../platformType';

class EventProvider {
  public static appsFlyer: typeof appsFlyer = appsFlyer;

  public static analytics = analytics();

  public static OneSignal = OneSignal;

  public static sentry: typeof Sentry = Sentry;

  private static initializePushNotification() {
    /* O N E S I G N A L   S E T U P */
    if (__DEV__) {
      OneSignal.setLogLevel(6, 0);
    }

    OneSignal.setAppId(env.ONE_SIGINAL_APP_KEY_IOS);

    OneSignal.promptForPushNotificationsWithUserResponse((_) => { });

    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      notificationReceivedEvent.getNotification();
    });

    OneSignal.setNotificationOpenedHandler((notification) => {
      if (notification.notification.launchURL === 'usereserva://storeUpdate') {
        StoreUpdatePush();
      }
    });
  }

  private static async putCustomData() {
    const deviceState = await this.OneSignal.getDeviceState();

    if (deviceState && deviceState.userId) {
      this.appsFlyer.setAdditionalData(
        {
          onesignalCustomerId: deviceState?.userId,
        },
        (res) => { },
      );
    }
  }

  private static getOSDeviceToken() {
    if (Platform.OS === platformType.IOS) {
      return messaging().getAPNSToken();
    }
    return messaging().getToken();
  }

  private static async uninstallMeasurement() {
    const token = await this.getOSDeviceToken();

    if (!token) return;

    this.appsFlyer.updateServerUninstallToken(token, (success) => {
      if (success) return;

      const error = new Error('Error AppsFlyer Uninstall Token');
      Sentry.withScope((scope) => {
        scope.setExtra('success', success);
        scope.setExtra('token', token);
        Sentry.captureException(error);
      });
    });
  }

  public static initializeModules() {
    this.initializePushNotification();

    this.putCustomData();

    this.appsFlyer.initSdk(
      {
        devKey: env.APPSFLYER.DEV_KEY,
        isDebug: false,
        appId: env.APPSFLYER.APP_ID,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10,
      },
      (_) => {},
      (error) => {
        this.captureException(error);
      },
    );
    this.analytics
      .logAppOpen()
      .catch((error) => this.sentry.captureException(error));

    this.uninstallMeasurement()
      .catch((error) => this.sentry.captureException(error));
  }

  public static parseValues(values: EventValueOptions) {
    return Object.keys(values).reduce((acc, curr) => ({
      ...acc,
      [eventsValue[curr as keyof EventValueOptions]]:
        values[curr as keyof EventValueOptions],
    }), {} as EventValueOptions);
  }

  public static logEvent<Type extends EventOptionsFn['type']>(
    ...args: Extract<EventOptionsFn, { type: Type }> extends {
      payload: infer TPayload;
    }
      ? [Type, TPayload]
      : [Type]
  ) {
    const eventName = args[0];
    const eventValues = args[1] as EventValueOptions;

    this.analytics.logEvent(eventName, eventValues);

    if (onlyGaEvents.includes(eventName)) return;

    const afEventName = eventsName[args[0]];
    const afEventsValues = this.parseValues(eventValues);

    this.appsFlyer.logEvent(afEventName, afEventsValues, (_) => { }, (error) => {
      this.captureException(error);
    });
  }

  public static logPurchase(args: EventsOptions.Purchase) {
    this.analytics.logPurchase({
      ...args,
    });
  }

  public static captureException(error: any) {
    this.sentry.captureException(error);
  }

  private static oldRouteName: string = '';

  public static trackScreen(screen?: Route<string> | undefined) {
    try {
      if (!screen) return;

      const { name: screenName, params } = screen;
      if (screenName === this.oldRouteName) return;

      this.oldRouteName = screenName;

      Sentry.addBreadcrumb({
        message: screenName,
        category: 'navigation',
        data: params,
      });
    } catch (e) {
      this.captureException(e);
    }
  }

  public static sendPushTags<Type extends EventOptionsOneSignalFn['type']>(
    ...args: Extract<EventOptionsOneSignalFn, { type: Type }> extends {
      payload: infer TPayload;
    }
      ? [Type, TPayload]
      : [Type]
  ) {
    const eventValues = args[1] as Record<string, string>;
    this.OneSignal.sendTags(eventValues);
  }

  public static sendTrackEvent<Type extends EventOptionsDitoFn['type']>(
    ...args: Extract<EventOptionsDitoFn, { type: Type }> extends {
      payload: infer TPayload;
    }
      ? [Type, TPayload]
      : [Type]
  ) {
    const { action, id, data } = args[1] as EventsDitoValues;

    sendDitoTrackEvent(id, { action, data });
  }

  public static setPushExternalUserId(externalId: string) {
    this.OneSignal.setExternalUserId(externalId);
  }

  public static getPushTags(callback: (handle: {
    [key: string]: string;
  } | null) => void) {
    this.OneSignal.getTags(callback);
  }

  public static getPushDeviceState() {
    return OneSignal.getDeviceState();
  }

  public static removePushExternalUserId() {
    this.OneSignal.removeExternalUserId();
  }
}
export default EventProvider;
