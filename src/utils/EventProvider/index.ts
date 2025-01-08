import { Platform } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import { initialize as initializeClarity } from 'react-native-clarity';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { env } from '../../config/env';
import {
  eventsName,
  eventsValue,
  type EventValueOptions,
  onlyGaEvents,
} from './misc';
import type { EventOptionsFn, EventsOptions } from './Event';
import type { EventOptionsOneSignalFn } from './EventOnesignal';
import type { TEventsDitoValues, TEventOptionsDitoFn } from './EventDito';
import sendDitoTrackEvent from '../Dito/src/utils/sendDitoTrackEvent';
import { platformType } from '../platformType';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

class EventProvider {
  public static appsFlyer: typeof appsFlyer = appsFlyer;

  public static analytics = analytics();

  public static OneSignal = OneSignal;

  private static initializePushNotification() {
    /* O N E S I G N A L   S E T U P */
    if (__DEV__) {
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    }

    OneSignal.initialize(env.ONE_SIGINAL_APP_KEY_IOS);

    OneSignal.Notifications.addEventListener('click', (event) => {
    });

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      event.getNotification();
    });

    OneSignal.Notifications.requestPermission(true);

    // OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
    //   notificationReceivedEvent.getNotification();
    // });
  }

  private static async putCustomData() {
    const deviceState = await this.OneSignal.User.getOnesignalId();

    if (deviceState && deviceState) {
      this.appsFlyer.setAdditionalData(
        {
          onesignalCustomerId: deviceState,
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

      ExceptionProvider.captureException(
        error,
        { success, token },
      );
    });
  }

  private static initializeClarity() {
    if (!Config.CLARITY_PROJECT_ID || Platform.OS !== platformType.ANDROID || __DEV__) return;

    initializeClarity(Config.CLARITY_PROJECT_ID);
  }

  public static initializeModules() {
    this.initializeClarity();

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
      (_) => { },
      (error) => {
        ExceptionProvider.captureException(error as any);
      },
    );
    this.analytics
      .logAppOpen()
      .catch((error) => ExceptionProvider.captureException(error));

    this.uninstallMeasurement()
      .catch((error) => ExceptionProvider.captureException(error));
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
    try {
      const eventName = args[0];
      const eventValues = args[1] as EventValueOptions;

      this.analytics.logEvent(eventName, eventValues);

      if (onlyGaEvents.includes(eventName)) return;

      const afEventName = eventsName[eventName];
      const afEventsValues = this.parseValues(eventValues);

      this.appsFlyer.logEvent(afEventName, afEventsValues, (_) => { }, (error) => {
        ExceptionProvider.captureException(new Error('Error AppsFlyer Log Event'), {
          eventName,
          eventValues,
          afEventName,
          afEventsValues,
          error,
        });
      });
    } catch (err) {
      ExceptionProvider.captureException(new Error('Error Log Event'), {
        args,
        err,
      });
    }
  }

  public static async logScreenViewEvent(eventName: string) {
    try {
      await this.analytics.logScreenView({
        screen_name: eventName,
        screen_class: eventName,
      });
    } catch (err) {
      ExceptionProvider.captureException(new Error('Error Log Screen View Event'), {
        eventName,
        err,
      });
    }
  }

  public static logPurchase(args: EventsOptions.Purchase) {
    this.analytics.logPurchase({
      ...args,
    });
  }

  public static sendPushTags<Type extends EventOptionsOneSignalFn['type']>(
    ...args: Extract<EventOptionsOneSignalFn, { type: Type }> extends {
      payload: infer TPayload;
    }
      ? [Type, TPayload]
      : [Type]
  ) {
    const eventValues = args[1] as Record<string, string>;
    // this.OneSignal.sendTags(eventValues);
  }

  public static sendTrackEvent<Type extends TEventOptionsDitoFn['type']>(
    ...args: Extract<TEventOptionsDitoFn, { type: Type }> extends {
      payload: infer TPayload;
    }
      ? [Type, TPayload]
      : [Type]
  ) {
    const { action, id, data } = args[1] as TEventsDitoValues;

    sendDitoTrackEvent(id, { action, data });
  }

  // public static setPushExternalUserId(email: string) {
  //   setCustomUserId(email);
  //   this.OneSignal.User.
  //   this.OneSignal.setExternalUserId(email);
  // }

  public static getPushTags(callback: (handle: {
    [key: string]: string;
  } | null) => void) {
    this.OneSignal.User.getTags(callback);
  }

  // public static getPushDeviceState() {
  //   return OneSignal.getDeviceState();
  // }

  // public static removePushExternalUserId() {
  //   this.OneSignal.removeExternalUserId();
  // }
}
export default EventProvider;
