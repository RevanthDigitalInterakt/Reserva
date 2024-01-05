import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { Animated } from 'react-native';
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
import SearchResultHeader from '../Search/components/SearchResultHeader';
import { styles } from './styles';
import EventProvider from '../../utils/EventProvider';

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

  const [shouldShowFilters, setShouldShowFilters] = useState(false);
  const [isGoingBack, setIsGoingBack] = useState(false);
  const [loadingMedias, setLoadingMedias] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const handleShowFilters = (screenVerticalPosition: number) => {
    if (screenVerticalPosition > 70) {
      setShouldShowFilters(true);
    }

    if (screenVerticalPosition <= 70) {
      setShouldShowFilters(false);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: shouldShowFilters ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [shouldShowFilters]);

  useEffect(() => {
    EventProvider.logEvent('view_item_list', {
      items: result.map((item) => ({
        price: item?.currentPrice,
        item_id: item?.productId,
        item_name: item?.productName,
      })),
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
      <>
        <Animated.View style={styles(fadeAnim).filtersWrapper}>
          <SearchResultHeader defaultFacets={defaultFacets} />
        </Animated.View>
        <NewListVerticalProducts
          data={result}
          loading={loading}
          cacheGoingBackRequest={() => setIsGoingBack(true)}
          onScroll={(scrollEvent) => {
            handleShowFilters(scrollEvent.nativeEvent.contentOffset.y);
          }}
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
            </>
        )}
          marginBottom={0}
          onFetchMore={doFetchMore}
          total={resultCount}
        />
      </>
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
    shouldShowFilters,
  ]);

  return (
    <Box flex={1} backgroundColor="white" height={800}>
      <TopBarDefaultBackButton
        loading={loading}
        cacheGoingBackRequest={() => setIsGoingBack(true)}
      />

      {renderList}
    </Box>
  );
}

export default NewProductCatalog;
