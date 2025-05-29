import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';

type TEditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

type TEditProfileScreenNavigationProp = StackNavigationProp<
RootStackParamList,
'EditProfile'
>;

type TEditProfileProps = {
  route: TEditProfileScreenRouteProp;
  navigation: TEditProfileScreenNavigationProp;
};

type TModalStateKeys = 'testingModal' | 'changeFileModal';

interface TModalStateSchemaValues {
  show: boolean;
  parans: object;
}

type IModalStateSchema = Record<TModalStateKeys, TModalStateSchemaValues>;

export type { TEditProfileProps, IModalStateSchema, TModalStateKeys };
