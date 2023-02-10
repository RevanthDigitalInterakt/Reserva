import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';

type TWebViewDeepLinkScreenRouteProp = RouteProp<RootStackParamList, 'WebViewDeepLink'>;

type TWebViewDeepLinkScreenNavigationProp = StackNavigationProp<
RootStackParamList,
'EditProfile'
>;
type TWebViewDeepLikProps = {
  route: TWebViewDeepLinkScreenRouteProp;
  navigation: TWebViewDeepLinkScreenNavigationProp;
};

export type {
  TWebViewDeepLikProps,
};
