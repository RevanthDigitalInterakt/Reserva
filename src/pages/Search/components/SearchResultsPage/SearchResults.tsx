import React from 'react';
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
  } = useSearchStore(['loading', 'result', 'resultCount', 'doFetchMore']);

  if (loading && !result.length) {
    return (
      <Box bg="white" marginY="nano" justifyContent="center">
        <ActivityIndicator size="small" color={COLORS.BLACK} />
      </Box>
    );
  }

  if (!result.length) {
    return <ProductNotFound />;
  }

  return (
    <View>
      <SearchResultHeader />

      <NewListVerticalProducts
        data={result}
        total={resultCount}
        loading={loading}
        onFetchMore={doFetchMore}
      />
    </View>
  );
}

export default SearchResults;
