import React from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import remoteConfig from '@react-native-firebase/remote-config';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { BagScreen } from './Bag';
import { BagOldScreen } from './BagOld';

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;
export const BagABTest: React.FC<Props> = (props) => {
  const showNewBag = remoteConfig().getBoolean('show_new_bag');
  return (
    showNewBag ? <BagScreen {...props} /> : <BagOldScreen {...props} />
  );
};
