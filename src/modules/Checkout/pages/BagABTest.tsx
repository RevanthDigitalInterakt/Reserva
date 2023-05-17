import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import NewBag from '../../../pages/Bag';
import { BagScreen } from './Bag';

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;
export const BagABTest: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();

  const showNewBag = useMemo(() => getBoolean('show_new_bag'), [getBoolean]);

  return (
    showNewBag ? <NewBag {...props} /> : <BagScreen {...props} />
  );
};
