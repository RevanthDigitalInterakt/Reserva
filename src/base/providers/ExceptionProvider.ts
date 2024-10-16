import { DdRum, DdSdkReactNative } from '@datadog/mobile-react-native';
import { navigationRef } from '../../utils/navigationRef';
import Sentry from '../../config/sentryConfig';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export class ExceptionProvider {
  private static oldRouteName: string = '';

  private static oldRouteParams: Readonly<object | undefined>;

  static captureException(
    error: Error,
    params?: { [key: string]: unknown },
    tags?: { [key: string]: unknown },
    breadcrumbs?: { [key: string]: unknown },
  ) {
    if (!params) {
      Sentry.captureException(error);
      return;
    }

    Sentry.withScope((scope) => {
      Object.keys(params).forEach((key) => {
        scope.setExtra(key, params[key]);
      });

      if (tags && Object.keys(tags).length) {
        Object.keys(tags).forEach((key) => {
          // @ts-ignore
          scope.setTag(key, tags[key]);
        });
      }

      if (breadcrumbs && Object.keys(breadcrumbs).length) {
        Object.keys(breadcrumbs).forEach((key) => {
          // @ts-ignore
          scope.addBreadcrumb(key, breadcrumbs[key]);
        });
      }

      Sentry.captureException(error);
    });
  }

  static trackScreen() {
    try {
      const screen = navigationRef?.current?.getCurrentRoute();

      if (!screen) return;

      // get current screen information
      const { name: screenName, params } = screen;
      if (screenName === this.oldRouteName) return;

      // Stop tracking old screen
      DdRum.stopView(screenName, this.oldRouteParams, Date.now());

      this.oldRouteName = screenName;
      this.oldRouteParams = params;

      Sentry.addBreadcrumb({ message: screenName, category: 'navigation', data: params });

      DdRum.startView(
        screenName,
        screenName,
        params,
        Date.now(),
      );
    } catch (e) {
      this.captureException(e);
    }
  }

  static setUser(user: IUser) {
    DdSdkReactNative.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    Sentry.configureScope((scope) => {
      scope.setUser({ email: user.email });
    });
  }

  static unsetUser() {
    DdSdkReactNative.setUser({});
    Sentry.setUser(null);
  }
}
