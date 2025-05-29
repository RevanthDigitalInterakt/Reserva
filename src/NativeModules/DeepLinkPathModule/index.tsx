import { Linking, NativeModules, Platform } from 'react-native';
import { platformType } from '../../utils/platformType';

const { DeepLinkPathModule: NativeAndroidDeepLinkPathModule } = NativeModules;

interface IDeepLinkPathModuleParams {
  url: string, closeCurrentAppInstance: boolean
}
interface IDeepLinkPathModule {
  openUrlInBrowser({ url, closeCurrentAppInstance }: IDeepLinkPathModuleParams): Promise<void>;
}

const DeepLinkPathModule: IDeepLinkPathModule = {
  async openUrlInBrowser({ url, closeCurrentAppInstance }: IDeepLinkPathModuleParams) {
    if (Platform.OS !== platformType.ANDROID) {
      await Linking.openURL(url);
      return;
    }

    NativeAndroidDeepLinkPathModule.openUrlInBrowser(url, closeCurrentAppInstance);
  },
};

export default DeepLinkPathModule;
