import { useLazyQuery } from '@apollo/client';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Button,
  Icon,
  Image,
  Picker,
  SearchBar,
  theme,
  Typography,
} from '@usereservaapp/reserva-ui';
import { intervalToDuration } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Linking, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConfigContext } from '../../../../context/ConfigContext';
import { countdownClockQuery, ICountDownClock } from '../../../../graphql/countDownClock/countdownClockQuery';
import { facetsQuery } from '../../../../graphql/facets/facetsQuery';
import {
  bannerDefaultQuery,
  bannerQuery,
} from '../../../../graphql/homePage/HomeQuery';
import { ColorsToHexEnum } from '../../../../graphql/product/colorsToHexEnum';
import {
  OrderByEnum,
  productSearch,
  ProductSearchData,
} from '../../../../graphql/products/productSearch';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import { useCheckConnection } from '../../../../shared/hooks/useCheckConnection';
import { referenceIdResolver } from '../../../../shared/utils/referenceIdResolver';
import EventProvider from '../../../../utils/EventProvider';
import { generateFacets } from '../../../../utils/generateFacets';
import { Skeleton } from '../../../Checkout/components/Skeleton';
import { CountDownBanner } from '../../../Home/component/CountDown';
import { CountDownLocal } from '../../../Home/component/countDownLocal/CountDownLocal';
import { TopBarDefault } from '../../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../../Menu/components/TopBarDefaultBackButton';
import { EmptyProductCatalog } from '../../components/EmptyProductCatalog/EmptyProductCatalog';
import { ListVerticalProducts } from '../../components/ListVerticalProducts/ListVerticalProducts';
import { FilterModal, TFilterType } from '../../modals/FilterModal/FilterModal';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

type TOrderProducts = { [key: string]: string };

const DEFAULT_PAGE_SIZE = 12;

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const { offersPage } = useConfigContext();
  const [referenceString, setReferenceString] = useState('');
  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData,
  );

  const orderProducts: TOrderProducts = {
    RELEVANCIA: OrderByEnum.OrderByReviewRateDESC,
    MAIS_VENDIDOS: OrderByEnum.OrderByTopSaleDESC,
    MAIS_RECENTES: OrderByEnum.OrderByReleaseDateDESC,
    DESCONTOS: OrderByEnum.OrderByBestDiscountDESC,
    MAIOR_PRECO: OrderByEnum.OrderByPriceDESC,
    MENOR_PRECO: OrderByEnum.OrderByPriceASC,
    DE_A_Z: OrderByEnum.OrderByNameASC,
    DE_Z_A: OrderByEnum.OrderByNameDESC,
  };

  const {
    safeArea, search, referenceId, orderBy, filters,
  } = route.params;

  const [bannerImage, setBannerImage] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [colorsfilters, setColorsFilters] = useState([]);
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<TFilterType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [loadingHandlerState, setLoadingHandlerState] = useState(false);
  const [filterRequestList, setFilterRequestList] = useState<[] | undefined | null>([]);
  const [countDownClock, setCountDownClock] = React.useState<ICountDownClock | ICountDownClock[]>();
  const [countDownClockLocal, setCountDownClockLocal] = useState<ICountDownClock>();
  const [countDownClockGlobal, setCountDownClockGlobal] = useState<ICountDownClock>();
  const [showClockOffers, setShowClockOffers] = useState<boolean>(false);

  const [showMkt, setShowMkt] = useState(false);
  const [mktHeightImg, setMktHeightImg] = useState();

  const [getcountdownClock] = useLazyQuery(countdownClockQuery, { context: { clientName: 'contentful' } });

  const [getFacets] = useLazyQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets:
        generateFacets({ ...filters, reference: referenceString })
          .concat(filterRequestList || []),
    },
    fetchPolicy: 'no-cache',
  });

  const [getBanner] = useLazyQuery(bannerQuery, {
    context: { clientName: 'contentful' },
    variables: {
      category: referenceIdResolver(referenceString),
    },
  });

  const navigateGoBack = () => {
    navigation.goBack();

    if (route?.params?.comeFrom === 'Menu') {
      navigation.navigate('Menu', {
        indexMenuOpened: route?.params?.indexMenuOpened,
      });
    }
  };

  useEffect(() => {
    if (referenceId === 'offers-page') {
      setReferenceString(offersPage);
      getcountdownClock({
        variables: {
          selectClockScreenHome: 'OFFERS',
          selectClockScreenAll: 'ALL',
        },
      }).then((response) => {
        setCountDownClock(response.data.countdownClockCollection.items);
      });
    } else {
      setReferenceString(referenceId);
      getcountdownClock({
        variables: {
          categoryReference: referenceId,
          selectClockScreenAll: 'ALL',
        },
      }).then((response) => {
        setCountDownClock(response.data.countdownClockCollection.items);
      });
    }
  }, [referenceId, getcountdownClock, offersPage]);

  const [getProductSearch] = useLazyQuery(productSearch, {
    variables: {
      skusFilter: 'ALL_AVAILABLE',
      hideUnavailableItems: true,
      selectedFacets:
        generateFacets({ ...filters, reference: referenceString })
          .concat(filterRequestList),
      salesChannel: '4',
      orderBy: selectedOrder,
      to: DEFAULT_PAGE_SIZE - 1,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [getDefaultBanner] = useLazyQuery(bannerDefaultQuery, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    if (orderBy) {
      setSelectedOrder(orderProducts[orderBy]);
    }
  }, [orderBy, orderProducts]);

  const [
    {
      data,
      loading,
      error,
    },
    setProductSearch,
  ] = useState<{
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

  useEffect(() => {
    if (countDownClock && countDownClock?.length > 0) {
      const clockOffers = countDownClock?.find((countDown: ICountDownClock) => countDown.selectClockScreen === 'OFFERS' || countDown?.selectClockScreen === 'CATEGORY');
      const clockAll = countDownClock?.find((countDown: ICountDownClock) => countDown.selectClockScreen === 'ALL');

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
            formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes
            }:${limitDate.seconds}`,
          });
        }
      }

      if (clockAll && !showClockOffers && clockAll.reference !== referenceId) {
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
            formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes
            }:${limitDate.seconds}`,
          });
        }
      }
    }
  }, [countDownClock]);

  useEffect(() => {
    try {
      EventProvider.logEvent('product_list_view', {
        content_type: 'product_group',
      });
    } catch (err) {
      EventProvider.captureException(err);
    }
  }, []);

  const [{ facetsData, lodingFacets }, setFacets] = useState<{
    facetsData?: { facets: object | undefined } | null;
    lodingFacets: boolean;
  }>({
    facetsData: null,
    lodingFacets: true,
  });

  const [
    {
      bannerData,
    },
    setBannerData,
  ] = useState<{
    bannerData: any | null;
    loadingBanner: boolean;
  }>({
    bannerData: null,
    loadingBanner: false,
  });

  const refetchBanner = async () => {
    const response = await getBanner();
    setBannerData({
      bannerData: response.data,
      loadingBanner: false,
    });
    return response;
  };

  useEffect(() => {
    getFacets().then((response) => setFacets({
      facetsData: response.data,
      lodingFacets: false,
    }));
    getBanner().then((response) => setBannerData({
      bannerData: response.data,
      loadingBanner: false,
    }));

    getProductSearch().then((response) => setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
    }));

    setFilterList(generateFacets({ ...filters, reference: referenceString }));

    const priceRange = filters?.priceFilter;
    if (priceRange) {
      setPriceRangeFilters([{
        key: 'priceRange',
        range: {
          from: priceRange.from,
          to: priceRange.to,
        },
      }]);
    }
  }, []);

  const setBannerDefaultImage = async () => {
    const { data } = await getDefaultBanner();
    if (data) {
      const url = data.bannerCategoryCollection?.items[0]?.item?.image?.url;
      setBannerImage(url);
    }
  };

  const { WithoutInternet } = useCheckConnection({});

  const firstLoad = async () => {
    setSkeletonLoading(true);
    const { data: productData, loading: productLoading } = await refetch();
    setProductSearch({
      data: productData, loading: productLoading, fetchMore, refetch, error,
    });
    setSkeletonLoading(false);
    await refetchBanner({ category: referenceString });

    if (referenceId !== 'offers-page') {
      setSkeletonLoading(true);
      const { data: productData1, loading: productLoading1 } = await refetch();
      setProductSearch({
        data: productData1, loading: productLoading1, fetchMore, refetch, error,
      });
      setSkeletonLoading(false);
    }
  };

  const animationSkeletonLoading = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1200,
          delay: 300,
        }),
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 0.3,
          duration: 600,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  };

  useEffect(() => {
    firstLoad();
    animationSkeletonLoading();
  }, []);

  useEffect(() => {
    if (bannerData) {
      const bannerUrl = bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.url;
      if (bannerUrl) {
        setBannerImage(bannerUrl);
      } else {
        setBannerDefaultImage();
      }
    }

    const showMktData = bannerData?.bannerCategoryCollection?.items[0]?.item?.mkt;
    setShowMkt(showMktData);

    const mktHeightImgData = bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.height;
    setMktHeightImg(mktHeightImgData);
  }, [bannerData]);

  useEffect(() => {
    if (!lodingFacets) {
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

      setPriceRangeFilters(priceFacetValues);
      setCategoryFilters(categoryFacetValues);
      setSizeFilters(sizeFacetValues);
      setColorsFilters(colorFacetValues);
    }
  }, [facetsData]);

  useEffect(() => {
    if (!loading && !!data) {
      setProducts(data.productSearch);
    }
  }, [data]);

  const getOffsetRequest = (isFilteredRequest: boolean, offSet: number) => {
    if (isFilteredRequest) {
      return {
        from: 0,
        to: 11,
      };
    }

    return {
      from: offSet < DEFAULT_PAGE_SIZE ? DEFAULT_PAGE_SIZE : offSet,
      to: offSet < DEFAULT_PAGE_SIZE ? DEFAULT_PAGE_SIZE * 2 - 1 : offSet + (DEFAULT_PAGE_SIZE - 1),
    };
  };

  const loadMoreProducts = async (offset: number, isFilteredRequest: boolean = false) => {
    setLoadingFetchMore(true);

    const offSetRequest = getOffsetRequest(isFilteredRequest, offset);

    const { data: dataFetchMore, loading } = await fetchMore({
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        orderBy: selectedOrder,
        from: offSetRequest.from,
        to: offSetRequest.to,
        selectedFacets:
          generateFacets({ ...filters, reference: referenceString })
            .concat(filterRequestList),
        simulationBehavior: 'default',
        productOriginVtex: false,
      },
    });

    if (data) {
      const newDataProductSearch = {
        productSearch: {
          ...dataFetchMore.productSearch,
          products: [
            ...data.productSearch.products,
            ...dataFetchMore.productSearch.products,
          ],
        },
      };

      if (isFilteredRequest) {
        newDataProductSearch.productSearch.products = [
          ...dataFetchMore.productSearch.products,
        ];
      }

      try {
        EventProvider.logEvent('view_item_list', {
          items: newDataProductSearch?.productSearch.map((item) => ({
            price: item?.priceRange?.sellingPrice?.lowPrice,
            item_id: item?.productId,
            item_name: item?.productName,
            item_category: 'product_group',
          })),
        });
      } catch (err) {
        EventProvider.captureException(err);
      }

      setProductSearch({
        data: newDataProductSearch,
        loading,
        fetchMore,
        refetch,
        error,
      });
      setProducts(newDataProductSearch.productSearch);
      setLoadingFetchMore(loading);
    } else {
      setProductSearch({
        data: dataFetchMore,
        loading,
        fetchMore,
        refetch,
        error,
      });
      setProducts(dataFetchMore.productSearch);
      setLoadingFetchMore(loading);
    }
  };

  useEffect(() => {
    if (filterRequestList) {
      loadMoreProducts(0, true);
    }
  }, [filterRequestList]);

  useEffect(() => {
    const fetch = async () => {
      setLoadingFetchMore(true);
      const { data, loading } = await refetch({
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets:
          generateFacets({ ...filters, reference: referenceString })
            .concat(filterRequestList),
        orderBy: selectedOrder,
        to: DEFAULT_PAGE_SIZE - 1,
        simulationBehavior: 'default',
        productOriginVtex: false,
      });

      if (!loading && !!data) {
        setProductSearch({
          data, loading, fetchMore, refetch, error,
        });
        setProducts(data.productSearch);
      }
      if (!loading) {
        setLoadingFetchMore(loading);
      }
    };
    fetch();
  }, [selectedOrder]);

  const skeletonOpacity = useRef(new Animated.Value(0)).current;

  const onClickWhatsappButton = () => {
    Linking.openURL('https://whts.co/reserva');
  };

  const mktText = React.useMemo(() => {
    const mktBoldText = bannerData?.bannerCategoryCollection?.items?.[0]?.item?.texto?.split('__');

    return mktBoldText?.map((i: any) => {
      if (mktBoldText.indexOf(i) > 0 && mktBoldText.indexOf(i) % 2 !== 0) {
        return (<Text style={{ fontFamily: 'reservaSansBold', fontWeight: 'bold' }}>{i}</Text>);
      } return (i);
    });
  }, []);

  const DynamicComponent = safeArea ? SafeAreaView : Box;

  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton
          loading={
            loading || loadingFetchMore || loadingHandlerState
          }
          navigateGoBack={showMkt}
          backButtonPress={() => navigateGoBack()}
        />
      ) : (
        <TopBarDefault
          loading={loading || loadingFetchMore || loadingHandlerState}
        />
      )}
      {search && (
        <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
          <SearchBar height={36} placeholder="Buscar" />
        </Box>
      )}

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
          setSorterVisible(false);
          setSelectedOrder(item?.value);
        }}
        isVisible={sorterVisible}
        items={[
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

        ]}
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

      {productsQuery.products ? (
        <ListVerticalProducts
          loadMoreProducts={loadMoreProducts}
          products={productsQuery.products}
          loadingHandler={(loadingState) => {
            setLoadingHandlerState(loadingState);
          }}
          totalProducts={productsQuery.recordsFiltered}
          listHeader={(
            <>
              {countDownClockLocal && showClockOffers
                ? <CountDownLocal countDownLocal={countDownClockLocal} />
                : <CountDownBanner countDown={countDownClockGlobal} />}

              {bannerImage && (
                <Box>
                  <Image height={showMkt ? mktHeightImg : 200} source={bannerImage} width={1 / 1} />
                </Box>
              )}

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
              {showMkt && (
                <Box paddingX="xl" paddingY="xxs">
                  <Typography
                    color="preto"
                    textAlign="center"
                    fontFamily="reservaSansRegular"
                    fontSize={14}
                    lineHeight={18}
                  >
                    {mktText}
                  </Typography>
                </Box>
              )}
              <Box paddingY="micro" flexDirection="row" justifyContent="center">
                <Box width={1 / 2}>
                  <Button
                    testID="com.usereserva:id/clear_filter_button_product_catalog"
                    onPress={() => {
                      if (productsQuery.products.length > 0) {
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
                  >
                    <Typography
                      color="preto"
                      fontFamily="nunitoSemiBold"
                      fontSize="14px"
                    >
                      {productsQuery.products?.length === 0
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
                  {productsQuery.recordsFiltered}
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
            onPress={() => navigation.navigate('Home')}
          />
        )
      )}
    </DynamicComponent>
  );
};
