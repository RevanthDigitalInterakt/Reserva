import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import * as Sentry from '@sentry/react-native';
import OneSignal from 'react-native-onesignal';
import { env } from '../../config/env';
import {
  eventsName, eventsValue, EventValueOptions,
} from './misc';
import { EventOptionsFn, EventsOptions } from './Event';
import type { EventOptionsOneSignalFn } from './EventOnesignal';
import { StoreUpdatePush } from '../../modules/Update/pages/StoreUpdatePush';

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

  public static initializeModules() {
    this.initializePushNotification();
    this.appsFlyer.initSdk(
      {
        devKey: env.APPSFLYER.DEV_KEY,
        isDebug: false,
        appId: env.APPSFLYER.APP_ID,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10,
      },
      (result) => { },
      (error) => {
        this.captureException(error);
      },
    );
    this.analytics
      .logAppOpen()
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
    const afEventName = eventsName[args[0]];
    const eventValues = args[1] as EventValueOptions;
    const afEventsValues = this.parseValues(eventValues);

    this.appsFlyer.logEvent(afEventName, afEventsValues, (_) => { }, (error) => {
      this.captureException(error);
    });
    this.analytics.logEvent(eventName, eventValues);
  }

  public static logPurchase(args: EventsOptions.Purchase) {
    this.analytics.logPurchase({
      ...args,
    });
  }

  public static captureException(error: any) {
    this.sentry.captureException(error);
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
