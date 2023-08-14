import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import NewProductCatalog from '../../../../pages/ProductCatalog/NewProductCatalog';
import { useIsTester } from '../../../../hooks/useIsTester';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import { ProductCatalog } from './ProductCatalog';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

export const ProductCatalogABTest: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();
  const isTester = useIsTester();
  const showNewProductCatalog = useMemo(() => (
    getBoolean(isTester
      ? 'show_new_product_catalog_tester'
      : 'show_new_product_catalog')
  ), [getBoolean, isTester]);
  return (
    showNewProductCatalog ? (
      <NewProductCatalog
        {...props}
      />
    ) : <ProductCatalog {...props} />
  );
};
