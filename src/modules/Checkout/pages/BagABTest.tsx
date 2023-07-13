import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import NewBag from '../../../pages/Bag';
import { BagScreen } from './Bag';
import { useIsTester } from '../../../hooks/useIsTester';
import { usePrimeInfo } from '../../../hooks/usePrimeInfo';

type Props = StackScreenProps<RootStackParamList, 'BagScreen'>;

export const BagABTest: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();
  const { isPrime } = usePrimeInfo();
  const isTester = useIsTester();

  const showNewBag = useMemo(() => {
    if (isPrime) return true;

    return getBoolean(isTester ? 'show_new_bag_tester' : 'show_new_bag');
  }, [getBoolean, isTester]);

  return (
    showNewBag ? <NewBag {...props} /> : <BagScreen {...props} />
  );
};
