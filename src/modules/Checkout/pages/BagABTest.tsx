import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import NewBag from '../../../pages/Bag';
import { BagScreen } from './Bag';
import { useAuth } from '../../../context/AuthContext';

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;
export const BagABTest: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();

  const { isTester } = useAuth();

  const showNewBag = useMemo(() => (
    getBoolean(isTester ? 'show_new_bag_tester' : 'show_new_bag')
  ), [getBoolean]);

  return (
    showNewBag ? <NewBag {...props} /> : <BagScreen {...props} />
  );
};
