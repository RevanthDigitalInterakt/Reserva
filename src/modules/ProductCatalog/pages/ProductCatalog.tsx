import { QueryResult, useQuery } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  OrderByEnum,
  productSearch,
} from '../../../graphql/products/productSearch';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { ApplicationState } from '../../../store';
import { cleanProducts } from '../../../store/ducks/products/actions';
import { BffGetProductsRequest } from '../../../store/ducks/products/sagas';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { ListVerticalProducts } from '../components/ListVerticalProducts/ListVerticalProducts';
import { FilterModal } from '../modals/FilterModal';
import { ProductSearchData } from '../../../graphql/products/productSearch';
import { facetsQuery } from '../../../graphql/facets/facetsQuery';
import { ColorsToHexEnum } from '../../../graphql/product/colorsToHexEnum';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

export const ProductCatalog: React.FC<Props> = ({ route }) => {
  const [productsQuery, setProducts] = useState<ProductSearchData>(
    {} as ProductSearchData
  );
  let pageSize = 12;
  const { safeArea, search, facetInput } = route.params;

  let categoryId = 'camisetas';

  const dispatch = useDispatch();
  const [colorsfilters, setColorsFilters] = useState([]);
  const [sizefilters, setSizeFilters] = useState([]);
  const [categoryfilters, setCategoryFilters] = useState([]);
  const [priceRangefilters, setPriceRangeFilters] =
    useState<{ from: number; to: number }>();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>();

  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(
    productSearch,
    {
      variables: {
        hideUnavailableItems: true,
        selectedFacets: facetInput,
        orderBy: selectedOrder,
        to: pageSize - 1,
      },
    }
  );

  const {
    data: facetsData,
    loading: lodingFacets,
    refetch: refetchFacets,
  }: QueryResult = useQuery(facetsQuery, {
    variables: {
      hideUnavailableItems: true,
      selectedFacets: facetInput,
    },
  });

  useEffect(() => {
    if (!lodingFacets) {
      const facets = facetsData.facets.facets;
      let rangeFrom = 0;
      let rangeTo = 0;
      let colorValues = facets
        .map((facet) => {
          if (['DESC_COR_CONSOLIDADA'].includes(facet.name)) {
            return facet.values;
          }
        })
        .filter((a) => a !== undefined)[0]
        .map((b) => ColorsToHexEnum[b.value]);

      let sizeValues = facets
        .map((facet) => {
          if (['TAMANHO'].includes(facet.name)) {
            return facet.values;
          }
        })
        .filter((a) => a !== undefined)[0]
        .map((b) => b.value);

      let categoryValues = facets
        .map((facet) => {
          if (['Categoria'].includes(facet.name)) {
            return facet.values;
          }
        })
        .filter((a) => a !== undefined)[0]
        .map((b) => b.value);

      let priceValues = facets
        .map((facet) => {
          if (['Preço'].includes(facet.name)) {
            return facet.values;
          }
        })
        .filter((a) => a !== undefined)[0]
        .map((b) => b.range)
        .map((range) => {
          console.log('range', range);

          if (rangeFrom === 0 || rangeFrom > range.from) rangeFrom = range.from;
          if (rangeTo < range.to) rangeTo = range.to;
        });
      setPriceRangeFilters({
        from: rangeFrom,
        to: rangeTo,
      });
      setCategoryFilters(categoryValues);
      setSizeFilters(sizeValues);
      setColorsFilters(colorValues);
    }
  }, [facetsData]);

  useEffect(() => {
    refetch();
    refetchFacets();
  }, []);

  const [filterRequestList, setFilterRequestList] =
    useState<BffGetProductsRequest>();

  useEffect(() => {
    if (!loading) {
      console.log(data);
      setProducts(data.productSearch);
    }
    console.log(categoryId);
  }, [data]);

  const loadMoreProducts = async (offset: number) => {
    let { data } = await fetchMore({
      variables: {
        orderBy: selectedOrder,
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? pageSize * 2 - 1 : offset + (pageSize - 1),
      },
    });

    setProducts(data.productSearch);
  };

  const products = useSelector((state: ApplicationState) => state.products);

  useEffect(() => {
    console.log('products', products);
    dispatch(cleanProducts());
    loadMoreProducts(0);
  }, [filterRequestList]);

  useEffect(() => {
    refetch();
  }, [selectedOrder]);

  const onClickWhatsappButton = () => {
    Linking.openURL('https://whts.co/reserva');
  };

  const DynamicComponent = safeArea ? SafeAreaView : Box;
  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton loading={loading} />
      ) : (
        <TopBarDefault loading={loading} />
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
        confirmText={'Ok'}
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

      <ListVerticalProducts
        loadMoreProducts={loadMoreProducts}
        products={productsQuery.products}
        listHeader={
          <>
            <Image
              source={
                safeArea || search ? images.bannerCatalog : images.bannerOffer
              }
              width={1 / 1}
            />
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
              {filterList.length > 0 && (
                <Button onPress={() => setFilterList([])}>
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
