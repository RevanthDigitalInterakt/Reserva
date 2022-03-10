import React, { useEffect, useRef, useState } from 'react';

import { QueryResult, useQuery } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import { StackScreenProps } from '@react-navigation/stack';
import { Linking, Animated, Text } from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Icon,
  Image,
  Picker,
  SearchBar,
  theme,
  Typography,
} from 'reserva-ui';
import { loadingSpinner } from 'reserva-ui/src/assets/animations';

import { images } from '../../../assets';
import { facetsQuery } from '../../../graphql/facets/facetsQuery';
import {
  bannerDefaultQuery,
  bannerQuery,
} from '../../../graphql/homePage/HomeQuery';
import { ColorsToHexEnum } from '../../../graphql/product/colorsToHexEnum';
import {
  OrderByEnum,
  productSearch,
  ProductSearchData,
} from '../../../graphql/products/productSearch';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { Skeleton } from '../../Checkout/components/Skeleton';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ListVerticalProducts } from '../components/ListVerticalProducts/ListVerticalProducts';
import { FilterModal } from '../modals/FilterModal';
import {
  configCollection,
  ICountDownClock
} from '../../../graphql/homePage/HomeQuery';
import { CountDownBanner } from '../../Home/component/CountDown';
import { intervalToDuration } from 'date-fns';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

export const ProductCatalog: React.FC<Props> = ({ route }) => {
  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData
  );
  const pageSize = 12;
  const { safeArea, search, referenceId } = route.params;

  const categoryId = 'camisetas';

  const [bannerImage, setBannerImage] = useState();
  // const [bannerDefault, setBannerDefault] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(true);
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
  const { data: collectionData } = useQuery(configCollection, {
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

  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      skip,
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: [].concat(
          generateFacets(referenceId),
          filterRequestList
        ),
        orderBy: selectedOrder,
        to: pageSize - 1,
        simulationBehavior: 'default',
        productOriginVtex: false,
      },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
    }
  );

  const [loadingModal, setLoadingModal] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    if (collectionData) {
      const countDownClock = collectionData?.configCollection?.items[0].countDownClock

      const limitDate = intervalToDuration({ start: Date.now(), end: new Date(countDownClock?.countdown) });
      setCountDownClock({
        ...countDownClock,
        formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes}:${limitDate.seconds}`
      })
    }
  }, [collectionData]);

  useEffect(() => {
    appsFlyer.logEvent('af_list_view', {
      af_content_type: referenceId,
    });
    analytics().logEvent('product_list_view', {
      content_type: referenceId,
    });
  }, []);

  const {
    data: facetsData,
    loading: lodingFacets,
    refetch: refetchFacets,
  }: QueryResult = useQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: [].concat(generateFacets(referenceId), filterRequestList),
    },
    fetchPolicy: 'no-cache',
  });

  const {
    data: bannerData,
    loading: loadingBanner,
    refetch: refetchBanner,
  } = useQuery(bannerQuery, {
    context: { clientName: 'contentful' },
    variables: {
      category: referenceId,
    },
  });

  const {
    data: defaultBanner,
    refetch: refetchDefaultBanner,
    loading: loadingDefaultBanner,
  } = useQuery(bannerDefaultQuery, { context: { clientName: 'contentful' } });
  const setBannerDefaultImage = async () => {
    await refetchDefaultBanner();
    const url =
      defaultBanner.bannerCategoryCollection?.items[0]?.item?.image?.url;
    setBannerImage(url);
  };
  const { WithoutInternet } = useCheckConnection({});

  const firstLoad = async () => {
    setSkeletonLoading(true);
    setSkip(true);
    await refetch();
    setSkeletonLoading(false);
    await refetchBanner({ category: referenceId });
  };

  useEffect(() => {
    firstLoad();
    animationSkeletonLoading();
  }, []);

  useEffect(() => {
    const bannerUrl =
      bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.url;
    if (bannerUrl) {
      setBannerImage(bannerUrl);
    } else {
      setBannerDefaultImage();
    }
  }, [bannerData]);

  // useEffect(()=>{},[bannerImage])

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
    console.log('offSet', offset);
    setLoadingFetchMore(true);

    const { data, loading } = await fetchMore({
      variables: {
        orderBy: selectedOrder,
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
        selectedFacets: [].concat(
          generateFacets(referenceId),
          filterRequestList
        ),
      },
    });
    // setLoadingFetchMore(false);
    setLoadingFetchMore(loading);

    setProducts(data.productSearch);
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
          generateFacets(referenceId),
          filterRequestList
        ),
        orderBy: selectedOrder,
        to: pageSize - 1,
        simulationBehavior: 'default',
        productOriginVtex: false,
      });
      if (!loading && !!data) {
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

  const onClickWhatsappButton = () => {
    Linking.openURL('https://whts.co/reserva');
  };

  const DynamicComponent = safeArea ? SafeAreaView : Box;
  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton
          loading={loading || loadingFetchMore || loadingHandlerState}
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

      {error && productsQuery.products.length <= 0 && (
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
      )}

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
      <ListVerticalProducts
        loadMoreProducts={loadMoreProducts}
        products={productsQuery.products}
        loadingHandler={(loadingState) => {
          setLoadingHandlerState(loadingState);
        }}
        totalProducts={productsQuery.recordsFiltered}
        listHeader={
          <>
            {countDownClock && countDownClock.reference === referenceId &&
              <Box marginBottom={4}>
                <CountDownBanner countDown={countDownClock} />
              </Box>
            }
            <Image height={200} source={bannerImage} width={1 / 1} />
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
                      setFilterRequestList([])
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
                    {
                      productsQuery.products?.length == 0 && filterRequestList.length > 0 ?
                        'Limpar Filtros'
                        :
                        'Filtrar'
                    }
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
    </DynamicComponent>
  );
};
