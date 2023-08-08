import { useLazyQuery } from '@apollo/client';
import type { StackScreenProps } from '@react-navigation/stack';
import
{
  Box,
  Button,
  Icon,
  Picker,
  SearchBar,
  theme,
  Typography,
} from '@usereservaapp/reserva-ui';
import { intervalToDuration } from 'date-fns';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { useConfigContext } from '../../../../context/ConfigContext';
import { countdownClockQuery, ICountDownClock } from '../../../../graphql/countDownClock/countdownClockQuery';
import { facetsQuery } from '../../../../graphql/facets/facetsQuery';
import
{
  bannerQuery,
} from '../../../../graphql/homePage/HomeQuery';
import { ColorsToHexEnum } from '../../../../graphql/product/colorsToHexEnum';
import
{
  OrderByEnum,
  productSearch,
} from '../../../../graphql/products/productSearch';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import { useCheckConnection } from '../../../../hooks/useCheckConnection';
import { referenceIdResolver } from '../../../../utils/referenceIdResolver';
import allSettled from '../../../../utils/allSettled';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import EventProvider from '../../../../utils/EventProvider';
import { generateFacets, IFacet } from '../../../../utils/generateFacets';
import { getBrandByUrl } from '../../../../utils/getBrandByURL';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import type { IFacetInput } from '../../../../zustand/useAsyncDeepLinkStore/types/asyncDeepLinkStore';
import { Skeleton } from '../../../Checkout/components/Skeleton';
import { CountDownBanner } from '../../../Home/component/CountDown';
import { CountDownLocal } from '../../../Home/component/countDownLocal/CountDownLocal';
import { TopBarDefault } from '../../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../../Menu/components/TopBarDefaultBackButton';
import { EmptyProductCatalog } from '../../components/EmptyProductCatalog/EmptyProductCatalog';
import { ListVerticalProducts } from '../../components/ListVerticalProducts/ListVerticalProducts';
import { FilterModal, TFilterType } from '../../modals/FilterModal/FilterModal';
import testProps from '../../../../utils/testProps';
import useAsyncStorageProvider from '../../../../hooks/useAsyncStorageProvider';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { getCollectionFacetsValue } from '../../../../utils/getCollectionFacetsValue';
import { durationToTimeString } from '../../../../utils/durationToTimeString';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

const pickerItem = [
  {
    text: 'Relevância',
    value: OrderByEnum.OrderByScoreDESC,
  },
  {
    text: 'Mais Vendidos',
    value: OrderByEnum.OrderByTopSaleDESC,
  },
  {
    text: 'Mais Recentes',
    value: OrderByEnum.OrderByReleaseDateDESC,
  },
  {
    text: 'Descontos',
    value: OrderByEnum.OrderByBestDiscountDESC,
  },
  {
    text: 'Maior Preço',
    value: OrderByEnum.OrderByPriceDESC,
  },
  {
    text: 'Menor Preço',
    value: OrderByEnum.OrderByPriceASC,
  },
  {
    text: 'De A a Z',
    value: OrderByEnum.OrderByNameASC,
  },
  {
    text: 'De Z a A',
    value: OrderByEnum.OrderByNameDESC,
  },
];

const DEFAULT_PAGE_SIZE = 11;
const DEFAULT_NEXT_PAGINATION = {
  from: 12,
  to: 23,
};

// TODO refactor create default collection on bff
const defaultCategory = 'collection:2407';

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const { offersPage: collectionIdByContentful } = useConfigContext();

  const {
    safeArea, search, referenceId, filters, comeFrom, indexMenuOpened,
  } = route.params;

  const collectionIdByCategories = referenceId;

  const [loading, setLoading] = useState(false);

  const [bannerImage, setBannerImage] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [colorsfilters, setColorsFilters] = useState([]);
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<TFilterType[]>([]);
  const [loadingHandlerState, setLoadingHandlerState] = useState(false);
  const [filterRequestList, setFilterRequestList] = useState([]);
  const [countDownClockLocal, setCountDownClockLocal] = useState<ICountDownClock>();
  const [countDownClockGlobal, setCountDownClockGlobal] = useState<ICountDownClock>();
  const [showClockOffers, setShowClockOffers] = useState<boolean>(false);
  const [productData, setProductData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(DEFAULT_NEXT_PAGINATION);
  const [orderByParamsForPaginationPersist, setOrderByParamsForPaginationPersist] = useState('');
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { getItem } = useAsyncStorageProvider();
  const { profile } = useAuthStore(['profile']);

  const { WithoutInternet } = useCheckConnection({});

  const trackEventAccessedCategoryDito = useCallback(async (selectedCollection: string) => {
    const id = profile?.email
      ? await getItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    if (!selectedCollection) return;

    EventProvider.sendTrackEvent('acessou-categoria', {
      id,
      action: 'acessou-categoria',
      data: {
        nome_categoria: selectedCollection,
        origem: 'app',
      },
    });
  }, [getItem, profile?.email]);

  const [getcountdownClock] = useLazyQuery(countdownClockQuery, {
    context: { clientName: 'contentful' },
  });

  const [getFacets] = useLazyQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: [],
    },
  });

  const [getBanner] = useLazyQuery(bannerQuery, {
    context: { clientName: 'contentful' },
    variables: { category: '' },
  });

  const [getProductSearch] = useLazyQuery(productSearch, {
    variables: {
      skusFilter: 'ALL_AVAILABLE',
      hideUnavailableItems: true,
      selectedFacets: [{ key: '', value: '' }],
      salesChannel: '4',
      orderBy: '',
      to: DEFAULT_PAGE_SIZE,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
  });

  const wrapperGetCountdownClock = useCallback(async (value: string) => {
    const { data: countdownClockData } = await getcountdownClock({
      variables: {
        categoryReference: value,
        selectClockScreenAll: 'ALL',
      },
      fetchPolicy: getFetchPolicyPerKey('countdownClock'),
    });

    const { items } = countdownClockData.countdownClockCollection;

    if (items.length) {
      if (items && items?.length > 0) {
        const clockOffers = items?.find((countDown: ICountDownClock) => countDown.selectClockScreen === 'OFFERS' || countDown?.selectClockScreen === 'CATEGORY');
        const clockAll = items?.find((countDown: ICountDownClock) => countDown.selectClockScreen === 'ALL');

        if (clockOffers) {
          if (new Date(clockOffers?.countdown).getTime() > Date.now()
            && Date.now() > new Date(clockOffers?.countdownStart).getTime()) {
            setShowClockOffers(true);
          } else {
            setShowClockOffers(false);
          }

          let limitDate;

          if (clockOffers?.countdown) {
            limitDate = intervalToDuration({
              start: Date.now(),
              end: new Date(clockOffers?.countdown),
            });
          }
          if (limitDate) {
            setCountDownClockLocal({
              ...clockOffers,
              countdownStart: clockOffers?.countdownStart,
              formattedValue: durationToTimeString(limitDate),
            });
          }
        }

        if (clockAll && !showClockOffers && clockAll.reference !== collectionIdByCategories) {
          let limitDate;
          if (clockAll?.countdown) {
            limitDate = intervalToDuration({
              start: Date.now(),
              end: new Date(clockAll?.countdown),
            });
          }
          if (limitDate) {
            setCountDownClockGlobal({
              ...clockAll,
              countdownStart: clockAll?.countdownStart,
              formattedValue: durationToTimeString(limitDate),
            });
          }
        }
      }
    }
  }, [getcountdownClock, collectionIdByCategories, showClockOffers]);

  const wrapperGetProductSearch = useCallback(async (facetParams: IFacet[], orderByParams: string = '') => {
    const { data } = await getProductSearch({
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: facetParams,
        salesChannel: '4',
        orderBy: orderByParams,
        to: DEFAULT_PAGE_SIZE,
        simulationBehavior: 'default',
        productOriginVtex: false,
      },
      fetchPolicy: getFetchPolicyPerKey('productSearch'),
      nextFetchPolicy: 'cache-and-network',
    });

    const { products, recordsFiltered } = data.productSearch;

    setProductData(products);
    setTotalProducts(recordsFiltered);
    setSkeletonLoading(false);
  }, [getProductSearch, getFetchPolicyPerKey]);

  const wrapperGetBanner = useCallback(async (value: string) => {
    const { data: bannerData } = await getBanner({
      context: { clientName: 'contentful' },
      variables: {
        category: referenceIdResolver(value),
      },
      fetchPolicy: getFetchPolicyPerKey('banner'),
    });

    const hasBanner = !!bannerData?.bannerCategoryCollection?.items?.length;

    if (hasBanner) {
      const bannerUrl = bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.url;
      if (bannerUrl) {
        setBannerImage(bannerUrl);
      }
    }
  }, [getBanner]);

  const navigateGoBack = useCallback(() => {
    navigation.goBack();

    if (comeFrom === 'Menu') {
      navigation.navigate('Menu', {
        indexMenuOpened,
      });
    }
  }, [navigation, comeFrom, indexMenuOpened]);

  const wrapperGetFacets = useCallback(async (facetParams: IFacetInput[]) => {
    const { data: facetsData } = await getFacets({
      variables: {
        hideUnavailableItems: true,
        selectedFacets: facetParams,
      },
      fetchPolicy: getFetchPolicyPerKey('facets'),
    });

    const facets = facetsData?.facets?.facets;

    if (!facets?.length) {
      return;
    }

    // COLOR
    const colorFacets = facets.filter(
      ({ name }: any) => name.toUpperCase() === 'COR'
        || name.toUpperCase() === 'DESC_COR_CONSOLIDADA',
    );
    const colorFacetValues = !!colorFacets && colorFacets.length > 0
      ? colorFacets[0].values.map(({ key, value }: any) => ({
        key,
        value: ColorsToHexEnum[value],
      }))
      : [];

    // SIZE
    const sizeFacets = facets.filter(
      ({ name }: any) => name.toUpperCase() === 'TAMANHO' || name === 'Tamanho',
    );

    const sizeFacetValues = !!sizeFacets && sizeFacets.length > 0
      ? sizeFacets[0].values.map(({ key, value }: any) => ({
        key,
        value,
      }))
      : [];

    // CATEGORY
    const categoryFacets = facets.filter(
      ({ name }: any) => name === 'Categoria',
    );

    const categoryFacetValues = !!categoryFacets && categoryFacets.length > 0
      ? categoryFacets[0].values.map(({ key, value }: any) => ({
        key,
        value,
      }))
      : [];

    // PRICE
    const priceFacets = facets.filter(({ name }: any) => name === 'Preço');
    const priceFacetValues = !!priceFacets && priceFacets.length > 0
      ? priceFacets[0].values.map(({ key, range }: any) => ({
        key,
        range,
      }))
      : [];

    const collectionFacetsValues = getCollectionFacetsValue(facets);

    trackEventAccessedCategoryDito(collectionFacetsValues);

    setPriceRangeFilters(priceFacetValues);
    setCategoryFilters(categoryFacetValues);
    setSizeFilters(sizeFacetValues);
    setColorsFilters(colorFacetValues);
  }, [getFacets, getFetchPolicyPerKey, trackEventAccessedCategoryDito]);

  const loadApplyFilter = useCallback(async (item: any) => {
    const reference = collectionIdByCategories || collectionIdByContentful || '';

    const createdFacets = generateFacets({ ...filters, reference })
      .concat(filterRequestList);

    setSorterVisible(false);

    wrapperGetProductSearch(createdFacets, item.value);
  }, [collectionIdByCategories,
    collectionIdByContentful,
    filterRequestList,
    filters,
    wrapperGetProductSearch]);

  const loadCollectionDefault = useCallback(async () => {
    const createdFacets = generateFacets({ ...filters, reference: defaultCategory })
      .concat(filterRequestList);

    await allSettled([
      wrapperGetCountdownClock(defaultCategory),
      wrapperGetProductSearch(createdFacets),
      wrapperGetFacets(createdFacets),
      wrapperGetBanner(defaultCategory),
    ]);
  }, [filterRequestList,
    filters,
    wrapperGetCountdownClock,
    wrapperGetBanner,
    wrapperGetFacets,
    wrapperGetProductSearch]);

  const loadCollection = useCallback(async (reference: string) => {
    const createdFacets = generateFacets({ ...filters, reference })
      .concat(filterRequestList);

    await allSettled([
      wrapperGetCountdownClock(reference),
      wrapperGetProductSearch(createdFacets),
      wrapperGetFacets(createdFacets),
      wrapperGetBanner(reference),
    ]);
  }, [filterRequestList,
    filters,
    wrapperGetCountdownClock,
    wrapperGetBanner,
    wrapperGetFacets,
    wrapperGetProductSearch]);

  useEffect(() => {
    setLoading(true);

    // flow load collection by categories
    if (collectionIdByCategories) {
      loadCollection(collectionIdByCategories);
      setLoading(false);
      return;
    }

    // flow load collection by contentful
    if (collectionIdByContentful) {
      loadCollection(collectionIdByContentful);
      setLoading(false);
      return;
    }

    // flow fallback default collection
    loadCollectionDefault();
    setLoading(false);
  }, [collectionIdByCategories,
    collectionIdByContentful,
    loadCollection,
    loadCollectionDefault]);

  useEffect(() => {
    if (!loading && !!productData[0]) {
      EventProvider.logEvent('product_list_view', {
        content_type: 'product_group',
        wbrand: getBrandByUrl(productData[0]),
      });
    }
  }, [productData, loading]);

  const wrapperPagination = useCallback(async () => {
    const reference = collectionIdByCategories || collectionIdByContentful || '';

    const createdFacets = generateFacets({ ...filters, reference })
      .concat(filterRequestList);

    const response = await getProductSearch({
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: createdFacets,
        salesChannel: '4',
        orderBy: orderByParamsForPaginationPersist,
        from: currentPage.from,
        to: currentPage.to,
        simulationBehavior: 'default',
        productOriginVtex: false,
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    });

    setTotalProducts(response.data.productSearch.recordsFiltered);

    // TODO mapping type
    // @ts-ignore
    setProductData([...productData, ...response.data.productSearch.products]);

    setSkeletonLoading(false);
    setLoading(false);
    setLoadingHandlerState(false);

    setCurrentPage({
      from: currentPage.from + 12,
      to: currentPage.to + 12,
    });

    try {
      EventProvider.logEvent('page_view', {
        wbrand: defaultBrand.picapau,
      });
      EventProvider.logEvent('view_item_list', {
        items: response.data.productSearch.map((item) => ({
          price: item?.priceRange?.sellingPrice?.lowPrice,
          item_id: item?.productId,
          item_name: item?.productName,
          item_category: 'product_group',
        })),
        wbrand: getBrandByUrl(response.data.productSearch),
      });
    } catch (err) {
      EventProvider.captureException(err);
    }
  }, [collectionIdByCategories,
    collectionIdByContentful,
    currentPage.from,
    currentPage.to,
    filterRequestList,
    filters,
    getProductSearch,
    orderByParamsForPaginationPersist,
    productData]);

  const onClickWhatsappButton = useCallback(async () => {
    await Linking.openURL('https://whts.co/reserva');
  }, []);

  const DynamicComponent = safeArea ? SafeAreaView : Box;

  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton
          loading={
            loading || loadingHandlerState
          }
          backButtonPress={() => navigateGoBack()}
        />
      ) : (
        <TopBarDefault
          loading={loading || loadingHandlerState}
        />
      )}
      {search && (
        <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
          <SearchBar height={36} placeholder="Buscar" />
        </Box>
      )}

      <WithoutInternet />
      <FilterModal
        setFilterRequestList={setFilterRequestList}
        filterList={filterList}
        setFilterList={setFilterList}
        isVisible={filterVisible}
        colors={colorsfilters}
        sizes={sizefilters}
        categories={categoryfilters}
        priceRange={priceRangefilters}
        onCancel={() => setFilterVisible(false)}
        onClose={() => setFilterVisible(false)}
        title=""
      />
      <Picker
        onSelect={(item) => {
          loadApplyFilter(item);
          setOrderByParamsForPaginationPersist(item.value);
        }}
        isVisible={sorterVisible}
        items={pickerItem}
        onConfirm={() => {
          setSorterVisible(false);
        }}
        onClose={() => {
          setSorterVisible(false);
        }}
        onBackDropPress={() => setSorterVisible(false)}
        title="Ordenar Por"
      />
      {skeletonLoading || loadingHandlerState ? (
        <Skeleton>
          <Box bg="neutroFrio1" width="100%" height={200} />

          <Box flexDirection="row" justifyContent="center" marginTop={34}>
            <Box width="50%">
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={40}
                marginRight={8}
                marginLeft={12}
              />
            </Box>

            <Box width="50%">
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={40}
                marginRight={12}
                marginLeft={8}
              />
            </Box>
          </Box>

          <Box flexDirection="row" justifyContent="center" marginTop={45}>
            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={24}
                marginTop={8}
              />
              <Box />
            </Box>

            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={24}
                marginTop={8}
              />
            </Box>
          </Box>
          <Box flexDirection="row" justifyContent="center">
            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
            </Box>

            <Box
              width="50%"
              paddingRight={12}
              paddingLeft={8}
              marginBottom={33}
            >
              <Box
                bg="neutroFrio1"
                flexGrow={1}
                borderRadius={8}
                height={250}
              />
            </Box>
          </Box>
        </Skeleton>
      ) : null}

      {productData?.length ? (
        <ListVerticalProducts
          cleanFilter={() => setFilterRequestList([])}
          loadMoreProducts={wrapperPagination}
          products={productData}
          loadingHandler={(loadingState) => {
            setLoadingHandlerState(loadingState);
          }}
          totalProducts={totalProducts}
          listHeader={(
            <>
              {countDownClockLocal && showClockOffers
                ? <CountDownLocal countDownLocal={countDownClockLocal} />
                : <CountDownBanner countDown={countDownClockGlobal} />}

              {bannerImage && <ImageComponent source={{ uri: bannerImage }} />}

              <Box bg="dropDownBorderColor">
                <Button
                  p="nano"
                  testID="com.usereserva:id/whatssapp_button_product_catalog"
                  onPress={onClickWhatsappButton}
                >
                  <Box flexDirection="row">
                    <Icon name="Whatsapp" size={16} color="preto" />
                    <Box marginX="nano">
                      <Typography
                        color="preto"
                        fontFamily="nunitoSemiBold"
                        fontSize={11}
                      >
                        Chama no Whats! Seja atendido sem sair de casa.
                        {' '}
                        <Typography style={{ textDecorationLine: 'underline' }}>
                          Clique aqui!
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Button>
              </Box>
              <Box paddingY="micro" flexDirection="row" justifyContent="center">
                <Box width={1 / 2}>
                  <Button
                    testID="com.usereserva:id/clear_filter_button_product_catalog"
                    onPress={() => {
                      if (productData?.length > 0) {
                        setFilterVisible(true);
                      } else {
                        setFilterRequestList([]);
                      }
                    }}
                    marginRight="nano"
                    marginLeft="micro"
                    borderRadius="nano"
                    borderColor="dropDownBorderColor"
                    borderWidth="hairline"
                    flexDirection="row"
                    inline
                    height={40}
                    {...testProps('com.usereserva:id/clear_filter_button_product_catalog')}
                  >
                    <Typography
                      color="preto"
                      fontFamily="nunitoSemiBold"
                      fontSize="14px"
                    >
                      {productData?.length === 0
                        && filterRequestList.length > 0
                        ? 'Limpar Filtros'
                        : 'Filtrar'}
                    </Typography>
                  </Button>
                </Box>

                <Box width={1 / 2}>
                  <Button
                    testID="com.usereserva:id/button_order_product_catalog"
                    marginRight="micro"
                    marginLeft="nano"
                    borderRadius="nano"
                    borderColor="dropDownBorderColor"
                    borderWidth="hairline"
                    flexDirection="row"
                    inline
                    height={40}
                    onPress={() => {
                      setSorterVisible(true);
                    }}
                  >
                    <Typography
                      color="preto"
                      fontFamily="nunitoSemiBold"
                      fontSize="14px"
                    >
                      Ordenar
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <Box
                paddingX="micro"
                paddingTop="quarck"
                paddingBottom="xxxs"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography fontFamily="nunitoRegular" fontSize="13px">
                  {totalProducts}
                  {' '}
                  produtos encontrados
                </Typography>
                {!!filterRequestList && filterRequestList.length > 0 && (
                  <Button
                    testID="com.usereserva:id/button_clear_product_catalog"
                    onPress={() => setFilterRequestList([])}
                  >
                    <Typography
                      color="progressTextColor"
                      variant="precoAntigo3"
                      style={{ textDecorationLine: 'underline' }}
                    >
                      Limpar tudo
                    </Typography>
                  </Button>
                )}
              </Box>
            </>
          )}
        />
      ) : (
        !loading && (
          <EmptyProductCatalog
            onPress={() => {
              setFilterRequestList([]);
              navigation.navigate('Home');
            }}
          />
        )
      )}
    </DynamicComponent>
  );
};
