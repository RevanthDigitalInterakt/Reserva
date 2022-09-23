import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Icon,
  Image,
  Picker,
  SearchBar,
  theme,
  Typography,
} from '@danilomsou/reserva-ui';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { useConfigContext } from '../../../context/ConfigContext';
import { intervalToDuration } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Linking } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { facetsQuery } from '../../../graphql/facets/facetsQuery';
import {
  bannerDefaultQuery,
  bannerQuery,
  configCollection,
  ICountDownClock,
  ICountDownClockReservaMini,
} from '../../../graphql/homePage/HomeQuery';
import { ColorsToHexEnum } from '../../../graphql/product/colorsToHexEnum';
import {
  OrderByEnum,
  productSearch,
  ProductSearchData,
} from '../../../graphql/products/productSearch';
import { CountDownRsvMini } from '../../../modules/Home/component/reservaMini/CountDownRsvMini';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { Skeleton } from '../../Checkout/components/Skeleton';
import { CountDownBanner } from '../../Home/component/CountDown';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { EmptyProductCatalog } from '../components/EmptyProductCatalog/EmptyProductCatalog';
import { ListVerticalProducts } from '../components/ListVerticalProducts/ListVerticalProducts';
import { FilterModal } from '../modals/FilterModal';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

export const ProductCatalog: React.FC<Props> = ({ route }) => {
  const { offersPage } = useConfigContext();
  const [referenceString, setReferenceString] = useState('');
  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData
  );
  const pageSize = 12;
  const { safeArea, search, referenceId, title, reservaMini } = route.params;

  useEffect(() => {
    if (referenceId === 'offers-page') {
      setReferenceString(offersPage);
    } else {
      setReferenceString(referenceId);
    }
  }, [referenceId]);

  const categoryId = 'camisetas';
  const navigation = useNavigation();

  const [bannerImage, setBannerImage] = useState();
  // const [bannerDefault, setBannerDefault] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [watchLoading, setWatchLoading] = useState(false);
  const [showWatch, setShowWatch] = useState(false);
  const [showWatchMini, setShowWatchMini] = useState(false);
  const [colorsfilters, setColorsFilters] = useState([]);
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [loadingHandlerState, setLoadingHandlerState] = useState(false);
  const [filterRequestList, setFilterRequestList] = useState<any[]>([]);
  const [skip, setSkip] = useState(false);
  const [countDownClock, setCountDownClock] = React.useState<ICountDownClock>();
  const [countDownClockRsvMini, setCountDownClockRsvMini] =
    React.useState<ICountDownClockReservaMini>();
  const [{ collectionData }, setConfigCollection] = useState<{
    collectionData: any;
  }>({ collectionData: null });
  const [getCollection] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

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

  const [
    {
      data,
      loading,
      error,
      // fetchMore,
      // refetch,
    },
    setProductSearch,
  ] = useState<{
    data: any | null;
    loading: boolean;
    error: any;
    // fetchMore: (...props: any) => any,
    // refetch: (...props: any | undefined) => any,
  }>({
    data: null,
    loading: false,
    error: null,
    // fetchMore: () => { },
    // refetch: () => { }
  });

  const refetch = async () => {
    const response = await getProductSearch();

    setProductSearch({
      data: response.data,
      loading: false,
      error: response.error,
      // fetchMore: fetchMore,
      // refetch: refetch
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
      selectedFacets: [].concat(
        generateFacets(referenceString),
        filterRequestList
      ),
      salesChannel: 4,
      orderBy: selectedOrder,
      to: pageSize - 1,
      simulationBehavior: 'default',
      productOriginVtex: false,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });

  const [isReservaMini, setIsReservaMini] = useState(false);
  useEffect(() => {
    if (title) {
      if (title === 'Reserva Mini') {
        setIsReservaMini(true);
      }
    }
  }, [title]);

  useEffect(() => {
    if (collectionData) {
      let countDownClockMini =
        collectionData?.configCollection?.items[0].countDownClockReservaMini;

      let limitDate;
      if (countDownClockMini?.countdown) {
        limitDate = intervalToDuration({
          start: Date.now(),
          end: new Date(countDownClockMini?.countdown),
        });
      }
      if (limitDate) {
        setCountDownClockRsvMini({
          ...countDownClockMini,
          formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${
            limitDate.minutes
          }:${limitDate.seconds}`,
        });
      }
    }
  }, [collectionData]);

  useEffect(() => {
    if (collectionData) {
      let countDownClock =
        collectionData?.configCollection?.items[0].countDownClock;

      let limitDate;
      if (countDownClock?.countdown) {
        limitDate = intervalToDuration({
          start: Date.now(),
          end: new Date(countDownClock?.countdown),
        });
      }
      if (limitDate) {
        setCountDownClock({
          ...countDownClock,
        });
      }
    }
  }, [collectionData]);

  useEffect(() => {
    appsFlyer.logEvent('af_list_view', {
      af_content_type: referenceString,
    });
    analytics().logEvent('product_list_view', {
      content_type: referenceString,
    });
  }, []);

  const [{ facetsData, lodingFacets }, setFacets] = useState<{
    facetsData: any;
    lodingFacets: boolean;
  }>({
    facetsData: null,
    lodingFacets: true,
  });

  const [getFacets] = useLazyQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: [].concat(
        generateFacets(referenceString),
        filterRequestList
      ),
    },
    fetchPolicy: 'no-cache',
  });

  const [
    {
      bannerData,
      loadingBanner,
      // refetchBanner
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

  const [getBanner] = useLazyQuery(bannerQuery, {
    context: { clientName: 'contentful' },
    variables: {
      category: referenceString,
    },
  });

  const [{ defaultBanner, loadingDefaultBanner }, setDefaultBanner] = useState<{
    defaultBanner: any;
    loadingDefaultBanner: boolean;
  }>({
    defaultBanner: null,
    loadingDefaultBanner: false,
    // refetchDefaultBanner: () => { return {}},
  });

  const refetchDefaultBanner = async () => {
    const response = await getDefaultBanner();
    setDefaultBanner({
      defaultBanner: response.data,
      // refetchDefaultBanner,
      loadingDefaultBanner: false,
    });
    return response;
  };

  const [getDefaultBanner] = useLazyQuery(bannerDefaultQuery, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    getFacets().then((response) =>
      setFacets({
        facetsData: response.data,
        lodingFacets: false,
        // refetchFacets: facetsData.refetch
      })
    );
    getBanner().then((response) =>
      setBannerData({
        bannerData: response.data,
        loadingBanner: false,
        // refetchBanner
      })
    );
    getDefaultBanner().then((response) =>
      setDefaultBanner({
        defaultBanner: response.data,
        // refetchDefaultBanner: defaultBanner.refetch,
        loadingDefaultBanner: false,
      })
    );
    getCollection().then((response) =>
      setConfigCollection({
        collectionData: response.data,
      })
    );
    getProductSearch().then((response) =>
      setProductSearch({
        data: response.data,
        loading: false,
        error: response.error,
        // fetchMore: response.fetchMore,
        // refetch
      })
    );
  }, []);

  const setBannerDefaultImage = async () => {
    const { data } = await refetchDefaultBanner();
    if (data) {
      const url = data.bannerCategoryCollection?.items[0]?.item?.image?.url;
      setBannerImage(url);
    }
  };
  const { WithoutInternet } = useCheckConnection({});

  const firstLoad = async () => {
    setSkeletonLoading(true);
    setSkip(true);
    const { data, loading } = await refetch();
    setProductSearch({ data, loading, fetchMore, refetch, error });
    setSkeletonLoading(false);
    await refetchBanner({ category: referenceString });
  };

  useEffect(() => {
    firstLoad();
    animationSkeletonLoading();
  }, []);

  useEffect(() => {
    if (bannerData) {
      const bannerUrl =
        bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.url;
      if (bannerUrl) {
        setBannerImage(bannerUrl);
      } else {
        setBannerDefaultImage();
      }
    }
  }, [bannerData]);

  useEffect(() => {
    if (!lodingFacets) {
      const { facets } = facetsData.facets;

      // COLOR
      const colorFacets = facets.filter(
        ({ name }: any) =>
          name.toUpperCase() === 'COR' ||
          name.toUpperCase() === 'DESC_COR_CONSOLIDADA'
      );
      const colorFacetValues =
        !!colorFacets && colorFacets.length > 0
          ? colorFacets[0].values.map(({ key, value }: any) => ({
              key,
              value: ColorsToHexEnum[value],
            }))
          : [];
      // SIZE
      const sizeFacets = facets.filter(
        ({ name }: any) =>
          name.toUpperCase() === 'TAMANHO' || name === 'Tamanho'
      );
      const sizeFacetValues =
        !!sizeFacets && sizeFacets.length > 0
          ? sizeFacets[0].values.map(({ key, value }: any) => ({
              key,
              value,
            }))
          : [];

      // CATEGORY
      const categoryFacets = facets.filter(
        ({ name }: any) => name === 'Categoria'
      );
      const categoryFacetValues =
        !!categoryFacets && categoryFacets.length > 0
          ? categoryFacets[0].values.map(({ key, value }: any) => ({
              key,
              value,
            }))
          : [];

      // PRICE
      const priceFacets = facets.filter(({ name }: any) => name === 'Preço');
      const priceFacetValues =
        !!priceFacets && priceFacets.length > 0
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

  const loadMoreProducts = async (offset: number) => {
    setLoadingFetchMore(true);
    const { data: dataFetchMore, loading } = await fetchMore({
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        orderBy: selectedOrder,
        from: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
        selectedFacets: [].concat(
          generateFacets(referenceString),
          filterRequestList
        ),
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
      setProducts({
        products: [],
      });
      loadMoreProducts(0);
    }
  }, [filterRequestList]);

  useEffect(() => {
    const fetch = async () => {
      const { data, loading } = await refetch({
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: [].concat(
          generateFacets(referenceString),
          filterRequestList
        ),
        orderBy: selectedOrder,
        to: pageSize - 1,
        simulationBehavior: 'default',
        productOriginVtex: false,
      });

      if (!loading && !!data) {
        setProductSearch({ data, loading, fetchMore, refetch, error });
        setProducts(data.productSearch);
      }
    };
    fetch();
  }, [selectedOrder]);

  const skeletonOpacity = useRef(new Animated.Value(0)).current;
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
      }
    ).start();
  };

  // recarrega a página de promoção do relógio
  const loadWatchPromotionPage = async () => {
    if (countDownClock) {
      if (countDownClock?.reference === referenceString) {
        setWatchLoading(true);
        setSkeletonLoading(true);
        setSkip(true);
        setShowWatch(false);
        const fetch = async () => {
          const { data, loading } = await refetch({
            skusFilter: 'ALL_AVAILABLE',
            hideUnavailableItems: true,
            selectedFacets: [].concat(
              generateFacets(referenceString),
              filterRequestList
            ),
            orderBy: selectedOrder,
            to: pageSize - 1,
            simulationBehavior: 'default',
            productOriginVtex: false,
          });
          if (!loading && !!data) {
            setProductSearch({ data, loading, fetchMore, refetch, error });
            setWatchLoading(loading);
            setProducts(data.productSearch);
          }
          setSkeletonLoading(false);
          await refetchBanner({ category: referenceString });
        };
        fetch();
      } else {
        if (isReservaMini || reservaMini) {
          setShowWatch(false);
        } else {
          setShowWatch(true);
        }
      }
    }
  };

  // recarrega a página de promoção do relógio Reserva Mini
  const loadWatchPromotionPageMini = async () => {
    if (countDownClockRsvMini) {
      console.log(
        'countDownClockRsvMini?.reference',
        countDownClockRsvMini?.reference
      );
      console.log('referenceString', referenceString);
      if (countDownClockRsvMini?.reference === referenceString) {
        console.log('entrou');
        setWatchLoading(true);
        setSkeletonLoading(true);
        setSkip(true);
        setShowWatchMini(false);
        const fetch = async () => {
          const { data, loading } = await refetch({
            skusFilter: 'ALL_AVAILABLE',
            hideUnavailableItems: true,
            selectedFacets: [].concat(
              generateFacets(referenceString),
              filterRequestList
            ),
            orderBy: selectedOrder,
            to: pageSize - 1,
            simulationBehavior: 'default',
            productOriginVtex: false,
          });
          if (!loading && !!data) {
            setProductSearch({ data, loading, fetchMore, refetch, error });
            setWatchLoading(loading);
            setProducts(data.productSearch);
          }
          setSkeletonLoading(false);
          await refetchBanner({ category: referenceString });
        };
        fetch();
      } else {
        if (isReservaMini || reservaMini) {
          setShowWatchMini(true);
        } else {
          setShowWatchMini(false);
        }
      }
    }
  };

  useEffect(() => {
    loadWatchPromotionPage();
  }, [countDownClock, referenceString]);

  useEffect(() => {
    loadWatchPromotionPageMini();
  }, [countDownClockRsvMini, referenceString]);

  useEffect(() => {
    console.log('loading::>', loading);
  }, [loading]);

  const onClickWhatsappButton = () => {
    Linking.openURL('https://whts.co/reserva');
  };

  const DynamicComponent = safeArea ? SafeAreaView : Box;
  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton
          loading={
            loading || loadingFetchMore || loadingHandlerState || watchLoading
          }
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

      {/* {productsQuery.products.length <= 0 && (
        <Box
          position="absolute"
          flex={1}
          height="100%"
          width="100%"
          zIndex={5}
          justifyContent="center"
          bg="white"
          alignContent="center"
          pt={163}
        >
          <Typography
            textAlign="center"
            fontFamily="reservaSerifMedium"
            fontSize={20}
          >
            Ops...desculpe
          </Typography>
          <Box mx={39} mt="nano">
            <Typography
              textAlign="center"
              fontFamily="nunitoSemiBold"
              fontSize={13}
            >
              A página que você procura está temporariamente indisponível ou foi
              removida
            </Typography>
          </Box>
          <Button
            title="VOLTAR"
            onPress={() => {
              navigation.navigate('Home');
            }}
            variant="primarioEstreitoOutline"
            mx={22}
            mt={49}
            inline
          />
        </Box>
      )} */}

      <FilterModal
        setFilterRequestList={setFilterRequestList}
        categoryId={categoryId}
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
        // confirmText={"Ok"}
        subtitle=""
      />
      <Picker
        onSelect={(item) => {
          setSorterVisible(false);
          setSelectedOrder(item?.value);
        }}
        isVisible={sorterVisible}
        items={[
          {
            text: 'Menor Preço',
            value: OrderByEnum.OrderByPriceASC,
          },
          {
            text: 'Maior Preço',
            value: OrderByEnum.OrderByPriceDESC,
          },
          {
            text: 'Mais Recentes',
            value: OrderByEnum.OrderByReleaseDateDESC,
          },
          {
            text: 'Relevante',
            value: OrderByEnum.OrderByReviewRateDESC,
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
      {skeletonLoading || loadingHandlerState || watchLoading ? (
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

      {/* <Modal isVisible={loadingModal}>
        <Box
          zIndex={5}
          height="100%"
          width="100%"
          opacity={0.65}
          position="absolute"
          justifyContent="center"
          alignItems="center"
        >
          <LottieView
            source={loadingSpinner}
            style={{
              width: 60,
            }}
            autoPlay
            loop
          />
          <Text>Carregando...</Text>
        </Box>
      </Modal> */}
      {data?.productSearch?.products ? (
        <ListVerticalProducts
          loadMoreProducts={loadMoreProducts}
          products={data?.productSearch?.products} //productsQuery.products}
          loadingHandler={(loadingState) => {
            setLoadingHandlerState(loadingState);
          }}
          totalProducts={productsQuery.recordsFiltered}
          listHeader={
            <>
              {countDownClockRsvMini && showWatchMini && (
                <CountDownRsvMini countDownMini={countDownClockRsvMini} />
              )}
              {countDownClock && showWatch && (
                <Box>
                  <CountDownBanner countDown={countDownClock} />
                </Box>
              )}
              <Box>
                <Image height={200} source={bannerImage} width={1 / 1} />
              </Box>

              <Box bg="dropDownBorderColor">
                <Button p="nano" onPress={onClickWhatsappButton}>
                  <Box flexDirection="row">
                    <Icon name="Whatsapp" size={16} color="preto" />
                    <Box marginX="nano">
                      <Typography
                        color="preto"
                        fontFamily="nunitoSemiBold"
                        fontSize={11}
                      >
                        Chama no Whats! Seja atendido sem sair de casa.{' '}
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
                      {productsQuery.products?.length == 0 &&
                      filterRequestList.length > 0
                        ? 'Limpar Filtros'
                        : 'Filtrar'}
                    </Typography>
                  </Button>
                </Box>

                <Box width={1 / 2}>
                  <Button
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
                paddingY="quarck"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography fontFamily="nunitoRegular" fontSize="13px">
                  {productsQuery.recordsFiltered} produtos encontrados
                </Typography>
                {!!filterRequestList && filterRequestList.length > 0 && (
                  <Button onPress={() => setFilterRequestList([])}>
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
          }
        />
      ) : (
        !loading && (
          <EmptyProductCatalog onPress={() => navigation.navigate('Home')} />
        )
      )}
    </DynamicComponent>
  );
};
