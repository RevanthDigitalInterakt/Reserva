import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import * as Sentry from '@sentry/react-native';
import OneSignal from 'react-native-onesignal';
import { env } from '../../config/env';
import { oneSignalConfig } from '../../config/pushNotification';
import {
  eventsName, eventsValue, EventValueOptions,
} from './misc';
import { EventOptionsFn, EventsOptions } from './Event';

class EventProvider {
  public static appsFlyer: typeof appsFlyer = appsFlyer;

  public static analytics = analytics();

  public static OneSignal = OneSignal;

  public static sentry: typeof Sentry = Sentry;

  public static initializeModules() {
    oneSignalConfig();
    this.appsFlyer.initSdk(
      {
        devKey: env.APPSFLYER.DEV_KEY,
        isDebug: false,
        appId: env.APPSFLYER.APP_ID,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10,
      },
      (result) => {},
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

    this.appsFlyer.logEvent(afEventName, afEventsValues, (_) => {}, (error) => {
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
}

export default EventProvider;
