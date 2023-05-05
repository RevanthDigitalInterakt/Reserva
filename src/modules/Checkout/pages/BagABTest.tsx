import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { BagScreen } from './Bag';
import { BagOldScreen } from './BagOld';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;
export const BagABTest: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();

  const showNewBag = useMemo(() => getBoolean('show_new_bag'), [getBoolean]);

  return (
    showNewBag ? <BagScreen {...props} /> : <BagOldScreen {...props} />
  );
};
