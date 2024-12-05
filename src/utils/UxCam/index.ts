import Config from 'react-native-config';
import RNUxcam from 'react-native-ux-cam';
import type { ProfileQuery } from '../../base/graphql/generated';

class UxCam {
  public static uxCam = RNUxcam;

  public static initializeModule() {
    this.uxCam.optIntoSchematicRecordings();

    const configuration = {
      userAppKey: `${Config.UX_CAM_APP_KEY}`,
      enableAutomaticScreenNameTagging: false,
      enableImprovedScreenCapture: true,
      enableAdvancedGestureRecognition: true,
    };

    this.uxCam.startWithConfiguration(configuration);
  }

  public static tagScreen(screenName: string) {
    this.uxCam.tagScreenName(screenName);
  }

  public static logEvent(eventName: string, properties?: any) {
    this.uxCam.logEvent(eventName, { properties });
  }

  private static setUserIdentity(userIdentity: string) {
    this.uxCam.setUserIdentity(userIdentity);
  }

  private static setUserProperty(propertyName: string, value: string | number) {
    this.uxCam.setUserProperty(propertyName, value);
  }

  public static trackingUser(profile: ProfileQuery['profile']) {
    this.setUserIdentity(`${profile?.firstName} ${profile?.lastName}`);
    this.setUserProperty('name', `${profile?.firstName} ${profile?.lastName}`);
    this.setUserProperty('email', `${profile?.email}`);
    this.setUserProperty('isPrime', `${profile?.isPrime}`);
    this.setUserProperty('birthDate', `${profile?.birthDate}`);
    this.setUserProperty('gender', `${profile?.gender}`);
  }
}

export default UxCam;
