import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';
import useSearchStore from '../../../../zustand/useSearchStore';
import ProductNotFound from '../ProductNotFound';
import NewListVerticalProducts from '../../../../components/NewListVerticalProducts';
import SearchResultHeader from '../SearchResultHeader';
import { Box } from '../../../../components/Box/Box';

function SearchResults() {
  const {
    result,
    resultCount,
    loading,
    doFetchMore,
    parameters,
  } = useSearchStore(['loading', 'result', 'resultCount', 'doFetchMore', 'parameters']);

  const hasFilters = useMemo(() => !!parameters.facets.length, [parameters.facets]);

  if (loading && !result.length) {
    return (
      <Box bg="white" marginY="nano" justifyContent="center">
        <ActivityIndicator size="small" color={COLORS.BLACK} />
      </Box>
    );
  }

  if (!result.length && !hasFilters) {
    return <ProductNotFound />;
  }

  return (
    <View>
      <SearchResultHeader />

      <NewListVerticalProducts
        data={result}
        total={resultCount}
        loading={loading}
        marginBottom={180}
        onFetchMore={doFetchMore}
      />
    </View>
  );
}

export default SearchResults;
