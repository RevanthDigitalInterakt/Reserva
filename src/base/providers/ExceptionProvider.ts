import { DdRum, DdSdkReactNative, ErrorSource } from '@datadog/mobile-react-native';
import { navigationRef } from '../../utils/navigationRef';
import crashlytics from '@react-native-firebase/crashlytics';

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
    jsName: string,
    params?: { [key: string]: string },
  ) {
    if (params) crashlytics().setAttributes(params);

    crashlytics().recordError(error, jsName)
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

      DdRum.startView(
        screenName,
        screenName,
        params,
        Date.now(),
      );
    } catch (e) {
      console.log(e);
    }
  }

  static setUser(user: IUser) {
    DdSdkReactNative.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  static unsetUser() {
    DdSdkReactNative.setUser({});
  }
}
