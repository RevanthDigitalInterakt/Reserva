import { QueryResult, useQuery } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Linking, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
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
import { images } from '../../../assets';
import { facetsQuery } from '../../../graphql/facets/facetsQuery';
import { ColorsToHexEnum } from '../../../graphql/product/colorsToHexEnum';
import {
  OrderByEnum,
  productSearch,
  ProductSearchData,
} from '../../../graphql/products/productSearch';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { bannerDefaultQuery, bannerQuery } from '../../../store/ducks/HomePage/types';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ListVerticalProducts } from '../components/ListVerticalProducts/ListVerticalProducts';
import { FilterModal } from '../modals/FilterModal';
import { Skeleton } from '../../Checkout/components/Skeleton';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

export const ProductCatalog: React.FC<Props> = ({ route }) => {
  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData
  );
  let pageSize = 12;
  const { safeArea, search, facetInput, referenceId } = route.params;

  let categoryId = 'camisetas';

  const dispatch = useDispatch();
  const [bannerImage, setBannerImage] = useState(images.bannerOffer);
  // const [bannerDefault, setBannerDefault] = useState();
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [colorsfilters, setColorsFilters] = useState([]);
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [loadingFetchMore, setLoadingFetchMore] = useState(false);
  const [loadingHandlerState, setLoadingHandlerState] = useState(false)
  const [filterRequestList, setFilterRequestList] = useState<any[]>([]);
  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        skusFilter: 'ALL_AVAILABLE',
        hideUnavailableItems: true,
        selectedFacets: [facetInput, filterRequestList].flat(),
        orderBy: selectedOrder,
        to: pageSize - 1,
        simulationBehavior: "default",
        productOriginVtex: false
      },
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache'
    }
  );

  const {
    data: facetsData,
    loading: lodingFacets,
    refetch: refetchFacets,
  }: QueryResult = useQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: [facetInput, filterRequestList].flat(),
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

  const { data: defaultBanner, refetch: refetchDefaultBanner } = useQuery(bannerDefaultQuery, { context: { clientName: 'contentful' } })
  const setBannerDefaultImage = async () => {
    await refetchDefaultBanner()
    const url = defaultBanner.bannerCategoryCollection?.items[0]?.item?.image?.url
    setBannerImage(url);
  }

  const firstLoad = async () => {
    setSkeletonLoading(true)
    await refetch();
    await refetchFacets();
    await refetchBanner({ category: referenceId });
    setSkeletonLoading(false)
  }

  useEffect(() => {
    firstLoad()
    animationSkeletonLoading()
  }, []);

  useEffect(() => {
    const bannerUrl =
      bannerData?.bannerCategoryCollection?.items[0]?.item?.image?.url;
    if (!!bannerUrl) {
      setBannerImage(bannerUrl);
    } else {
      setBannerDefaultImage()
    }
  }, [bannerData]);

  // useEffect(()=>{},[bannerImage])

  useEffect(() => {
    if (!lodingFacets) {
      const facets = facetsData.facets.facets;

      // COLOR
      const colorFacets = facets.filter(
        ({ name }: any) => name === 'DESC_COR_CONSOLIDADA'
      );
      const colorFacetValues =
        colorFacets.length > 0
          ? colorFacets[0].values.map(({ key, value }: any) => ({
            key,
            value: ColorsToHexEnum[value],
          }))
          : [];

      // SIZE
      const sizeFacets = facets.filter(({ name }: any) => name === 'TAMANHO');
      const sizeFacetValues =
        sizeFacets.length > 0
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
        categoryFacets.length > 0
          ? categoryFacets[0].values.map(({ key, value }: any) => ({
            key,
            value,
          }))
          : [];

      // PRICE
      const priceFacets = facets.filter(({ name }: any) => name === 'Preço');
      const priceFacetValues =
        priceFacets.length > 0
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
    if (!loading) {
      setProducts(data.productSearch);
    }
  }, [data]);

  const loadMoreProducts = async (offset: number) => {
    setLoadingFetchMore(true);
    let { data, loading } = await fetchMore({
      variables: {
        orderBy: selectedOrder,
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
        selectedFacets: [facetInput, filterRequestList].flat(),
      },
    });
    refetchFacets();
    // setLoadingFetchMore(false);
    setLoadingFetchMore(loading);

    setProducts(data.productSearch);
  };

  useEffect(() => {
    if (filterRequestList) {
      setProducts([]);
      loadMoreProducts(0);
    }
  }, [filterRequestList]);

  useEffect(() => {
    refetch();
  }, [selectedOrder]);

  const skeletonOpacity = useRef(new Animated.Value(0)).current
  const animationSkeletonLoading = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1200,
          delay: 300
        }),
        Animated.timing(skeletonOpacity, {
          useNativeDriver: true,
          toValue: 0.3,
          duration: 600,
        })
      ]),
      {
        iterations: -1
      }
    ).start()
  }


  const onClickWhatsappButton = () => {
    Linking.openURL('https://whts.co/reserva');
  };

  const DynamicComponent = safeArea ? SafeAreaView : Box;
  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton loading={loading || loadingFetchMore || loadingHandlerState} />
      ) : (
        <TopBarDefault loading={loading || loadingFetchMore || loadingHandlerState} />
      )}
      {search && (
        <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
          <SearchBar height={36} placeholder="Buscar" />
        </Box>
      )}
      <FilterModal
        setFilterRequestList={setFilterRequestList}
        categoryId={categoryId}
        dispatch={dispatch}
        filterList={filterList}
        setFilterList={setFilterList}
        isVisible={filterVisible}
        colors={colorsfilters}
        sizes={sizefilters}
        categories={categoryfilters}
        priceRange={priceRangefilters}
        onCancel={() => setFilterVisible(false)}
        onClose={() => setFilterVisible(false)}
        title="Excluir endereço"
        // confirmText={"Ok"}
        subtitle="Tem certeza que deseja excluir o endereço salvo?"
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
      {(skeletonLoading || loadingBanner || loadingBanner || loadingHandlerState) ?
        <Skeleton>
          <Box bg='neutroFrio1' width='100%' height={200} />

          <Box flexDirection='row' justifyContent='center' marginTop={34} >
            <Box width='50%'>
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={40} marginRight={8} marginLeft={12} />
            </Box>

            <Box width='50%'>
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={40} marginRight={12} marginLeft={8} />
            </Box>
          </Box >

          <Box flexDirection='row' justifyContent='center' marginTop={45}>

            <Box width='50%' paddingRight={12} paddingLeft={8} marginBottom={33}>
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={250} />
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={24} marginTop={8} />
              <Box />
            </Box>

            <Box width='50%' paddingRight={12} paddingLeft={8} marginBottom={33}>
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={250} />
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={24} marginTop={8} />
            </Box>

          </Box>
          <Box flexDirection='row' justifyContent='center'>

            <Box width='50%' paddingRight={12} paddingLeft={8} marginBottom={33}>
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={250} />
            </Box>

            <Box width='50%' paddingRight={12} paddingLeft={8} marginBottom={33}>
              <Box bg='neutroFrio1' flexGrow={1} borderRadius={8} height={250} />
            </Box>

          </Box>
        </Skeleton>
        :
        <ListVerticalProducts
          loadMoreProducts={loadMoreProducts}
          products={productsQuery.products}
          loadingHandler={(loadingState) => { setLoadingHandlerState(loadingState) }}
          listHeader={
            <>
              <Image height={200} source={bannerImage} width={1 / 1} />
              <Box bg="dropDownBorderColor">
                <Button p="nano" onPress={onClickWhatsappButton}>
                  <Box flexDirection="row">
                    <Icon name="Whatsapp" size={16} color="preto"></Icon>
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
                    onPress={() => setFilterVisible(true)}
                    marginRight="nano"
                    marginLeft="micro"
                    borderRadius="nano"
                    borderColor="dropDownBorderColor"
                    borderWidth="hairline"
                    flexDirection="row"
                    inline={true}
                    height={40}
                  >
                    <Typography
                      color="preto"
                      fontFamily="nunitoSemiBold"
                      fontSize="14px"
                    >
                      Filtrar
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
                    inline={true}
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

                <Button onPress={() => setFilterRequestList([])}>
                  <Typography
                    color="progressTextColor"
                    variant="precoAntigo3"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    Limpar tudo
                  </Typography>
                </Button>
              </Box>
            </>
          }
        />
      }
    </DynamicComponent>
  );
};
