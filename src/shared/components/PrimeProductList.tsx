import { useLazyQuery } from '@apollo/client';
import { Box } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  productSearch,
  ProductSearchData,
} from '../../graphql/products/productSearch';
import { ListVerticalProducts } from '../../modules/ProductCatalog/components/ListVerticalProducts/ListVerticalProducts';

interface PrimeProductListProps {
  referenceId: string;
}

export const PrimeProductList: React.FC<PrimeProductListProps> = ({
  referenceId,
}) => {
  const pageSize = 12;

  const navigation = useNavigation();
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [loadingHandlerState, setLoadingHandlerState] = useState(false);

  const generateFacets = (reference: string) => {
    const facetInput: any[] = [];
    const [subType, subcategories] = reference.split(':');

    if (subType === 'category') {
      subcategories.split('|').forEach((sub) => {
        if (sub !== '') {
          facetInput.push({
            key: 'c',
            value: sub,
          });
        }
      });
    } else {
      facetInput.push({
        key: 'productClusterIds',
        value: subcategories,
      });
    }
    return facetInput;
  };

  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData,
  );

  const loadMoreProducts = async (offset: number) => {
    setLoadingFetchMore(true);

    const { data, loading } = await fetchMore({
      variables: {
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
        selectedFacets: generateFacets(referenceId),
      },
    });
    setProductSearch({
      data, loading, fetchMore, refetch, error,
    });
    // setLoadingFetchMore(false);
    setLoadingFetchMore(loading);

    setProducts(data.productSearch);
  };

  const [{ data, loading, error }, setProductSearch] = useState<{
    data: any | null;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const refetch = async () => {
    const response = await getProductSearch();

    setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
    });
    return response;
  };

  const fetchMore = async (props: any) => {
    const response = await getProductSearch(props);
    setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
    });
    return response;
  };

  const [getProductSearch] = useLazyQuery(productSearch, {
    // skip,
    variables: {
      skusFilter: 'ALL_AVAILABLE',
      hideUnavailableItems: true,
      selectedFacets: generateFacets(referenceId),
      // orderBy: selectedOrder,
      to: pageSize - 1,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const fetch = async () => {
      const { data, loading } = await refetch();

      if (!loading && !!data) {
        setProductSearch({
          data, loading, fetchMore, refetch, error,
        });
        setProducts(data.productSearch);
      }
    };
    fetch();
  }, [data]);

  return (
    <Box>
      {productsQuery.products && productsQuery.products.length > 0 && (
        <ListVerticalProducts
          loadMoreProducts={loadMoreProducts}
          products={data.productSearch.products} // productsQuery.products}
          loadingHandler={(loadingState) => {
            setLoadingHandlerState(loadingState);
          }}
          totalProducts={productsQuery.recordsFiltered}
        />
      )}
    </Box>
  );
};
