import React, { useEffect, useMemo, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import NewListVerticalProducts from '../../components/NewListVerticalProducts/NewListVerticalProducts';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { generateFacets } from '../../utils/generateFacets';
import ProductCatalogHeader from './components/ProductCatalogHeader/ProductCatalogHeader';
import useSearchStore, { SearchType } from '../../zustand/useSearchStore';
import { TopBarDefaultBackButton } from '../../modules/Menu/components/TopBarDefaultBackButton';
import NewCountdown from './components/NewCountdown/NewCountdown';
import Banner from './components/Banner/Banner';
import { ClockScreenEnum } from '../../base/graphql/generated';
import ProductNotFound from '../Search/components/ProductNotFound/ProductNotFound';
import { CatalogSkeleton } from './components/CatalogSkeleton/CatalogSkeleton';
import { Box } from '../../components/Box/Box';
import { usePageLoadingStore } from '../../zustand/usePageLoadingStore/usePageLoadingStore';
import { useHomeStore } from '../../zustand/useHomeStore';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

const defaultReference = 'collection:2407';

function NewProductCatalog({ navigation, route }: Props) {
  const {
    doFetchMore,
    loading,
    result,
    resultCount,
    parameters,
    onSearch,
    onInit,
  } = useSearchStore([
    'doFetchMore',
    'loading',
    'result',
    'resultCount',
    'onSearch',
    'parameters',
    'onInit',
  ]);

  const [isGoingBack, setIsGoingBack] = useState(false);
  const [loadingMedias, setLoadingMedias] = useState(false);
  const { referenceId, filters } = route.params;
  const { offersPage } = useHomeStore(['offersPage']);

  const reference = useMemo(
    () => referenceId || offersPage || defaultReference,
    [referenceId, offersPage],
  );

  const countdownType = reference === offersPage
    ? ClockScreenEnum.Offers : ClockScreenEnum.Category;

  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);
  const defaultFacets = useMemo(() => generateFacets({
    ...filters,
    reference,
  }), [filters, reference]);

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loading, startLoadingTime, onFinishLoad]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (isGoingBack) {
        setIsGoingBack(false);
        return;
      }

      onInit(SearchType.CATALOG);
      onSearch({
        facets: defaultFacets,
      });
    });
    return unsubscribe;
  }, [defaultFacets, navigation, onSearch, onInit, isGoingBack]);

  const hasFilters = useMemo(() => !!parameters.facets.length, [parameters.facets]);

  const renderList = useMemo(() => {
    if (loadingMedias && loading && !result.length) {
      return (
        <CatalogSkeleton loading={loading} />
      );
    }

    if (!result.length && !hasFilters && !loading) {
      return <ProductNotFound />;
    }

    return (
      <NewListVerticalProducts
        data={result}
        loading={loading}
        cacheGoingBackRequest={() => setIsGoingBack(true)}
        headerComponent={(
          <>
            {countdownType === 'CATEGORY' ? (
              <NewCountdown reference={reference} selectClockScreen={countdownType} />
            ) : (
              <NewCountdown selectClockScreen={countdownType} />
            )}
            <Banner
              setLoading={setLoadingMedias}
              reference={reference}
            />
            <ProductCatalogHeader
              defaultFacets={defaultFacets}
            />
          </>
        )}
        marginBottom={0}
        onFetchMore={doFetchMore}
        total={resultCount}
      />
    );
  }, [
    loadingMedias,
    loading,
    result,
    hasFilters,
    reference,
    defaultFacets,
    doFetchMore,
    resultCount,
  ]);

  return (
    <Box flex={1} backgroundColor="white" height={800}>
      <TopBarDefaultBackButton loading={loading} />

      {renderList}
    </Box>
  );
}

export default NewProductCatalog;
