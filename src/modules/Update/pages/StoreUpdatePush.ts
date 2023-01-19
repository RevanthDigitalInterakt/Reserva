import { Linking, Platform } from 'react-native';
import { platformType } from '../../../utils/platformType';

const StoreUpdatePush = () => {
  Linking.openURL(
    Platform.OS === platformType.IOS
      ? 'itms-apps://itunes.apple.com/app/apple-store/id1566861458'
      : 'market://details?id=com.usereserva',
  );
};
export { StoreUpdatePush };
