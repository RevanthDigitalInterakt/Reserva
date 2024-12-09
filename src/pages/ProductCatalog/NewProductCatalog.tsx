import React, {
  useEffect, useMemo, useState,
} from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
import NewListVerticalProducts from '../../components/NewListVerticalProducts/NewListVerticalProducts';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { generateFacets } from '../../utils/generateFacets';
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
import EventProvider from '../../utils/EventProvider';
import ProductCatalogHeader from './components/ProductCatalogHeader/ProductCatalogHeader';
import { scale } from '../../utils/scale';
import UxCam from '../../utils/UxCam';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'> & {
  showTabBar?: boolean;
  showWhatsappButton?: boolean;
};

const defaultReference = 'collection:2407';

function NewProductCatalog({
  navigation, route, showTabBar = true, showWhatsappButton = true,
}: Props) {
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
  const { referenceId, filters } = route.params || {};
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
    EventProvider.logEvent('view_item_list', {
      item_brand: '',
      items: result.map((item) => ({
        price: item?.currentPrice,
        item_id: item?.productId,
        item_name: item?.productName,
      })),
    });

    EventProvider.logScreenViewEvent(`/pdc/${parameters.facets.find((facet) => facet.key === 'productClusterIds')?.value}`);
    UxCam.tagScreen('Product Catalog Screen');
    UxCam.logEvent('product catalog view', {
      reference,
    });
  }, []);

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
      <SafeAreaView>
        <ProductCatalogHeader
          defaultFacets={defaultFacets}
          showWhatsappButton={showWhatsappButton}
        />
        <NewListVerticalProducts
          data={result}
          loading={loading}
          cacheGoingBackRequest={() => setIsGoingBack(true)}
          headerComponent={(
            <>
              <View style={{
                marginTop: scale(120),
              }}
              />
              {countdownType === 'CATEGORY' ? (
                <NewCountdown reference={reference} selectClockScreen={countdownType} />
              ) : (
                <NewCountdown selectClockScreen={countdownType} />
              )}
              <Banner
                setLoading={setLoadingMedias}
                reference={reference}
              />
            </>
        )}
          marginBottom={90}
          onFetchMore={doFetchMore}
          total={resultCount}
        />
      </SafeAreaView>
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
      {showTabBar && (
        <TopBarDefaultBackButton
          loading={loading}
          cacheGoingBackRequest={() => setIsGoingBack(true)}
        />
      )}

      {renderList}
    </Box>
  );
}

export default NewProductCatalog;
