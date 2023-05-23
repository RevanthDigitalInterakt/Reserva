import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import ProductDetailNew from '../../../pages/ProductDetail';
import { ProductDetailOld } from './ProductDetailOld';
import { useAuth } from '../../../context/AuthContext';

type Props = StackScreenProps<RootStackParamList, 'ProductDetail'>;

export const ProductDetail: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();

  const { isTester } = useAuth();

  const showNewPdp = useMemo(() => (
    getBoolean(isTester ? 'show_new_pdp_tester' : 'show_new_pdp')
  ), [getBoolean, isTester]);

  return (
    showNewPdp ? <ProductDetailNew {...props} /> : <ProductDetailOld {...props} />
  );
};
