import { QueryResult, useQuery } from '@apollo/client'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
//import { Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Icon,
  Image,
  Picker,
  Pill,
  SearchBar,
  theme,
  Alert,
  Typography,
  TextField,
} from 'reserva-ui'
import { images } from '../../../assets'
import { OrderByEnum, productSearch, ProductSearchResponse, ProductSearchVars } from '../../../graphql/products/productSearch'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { ApplicationState } from '../../../store'
import { Product } from '../../../store/ducks/product/types'
import {
  cleanProducts,
  loadProducts,
} from '../../../store/ducks/products/actions'
import { BffGetProductsRequest } from '../../../store/ducks/products/sagas'
import { TopBarDefault } from '../../Menu/components/TopBarDefault'
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton'
import { ListVerticalProducts } from '../components/ListVerticalProducts/ListVerticalProducts'
import { FilterModal } from '../modals/FilterModal'
import { ProductSearchData } from '../../../graphql/products/productSearch';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const [productsQuery, setProducts] = useState<ProductSearchData>({} as ProductSearchData)
  let pageSize = 12
  const { 
    safeArea, 
    search, 
    facetInput
  } = route.params
  
  let categoryId = "camisetas";

  const originalOpenedcategoryId = categoryId

  const dispatch = useDispatch()

  const [filterVisible, setFilterVisible] = useState(false)
  const [sorterVisible, setSorterVisible] = useState(false)
  const [filterList, setFilterList] = useState<string[]>([])
  const [selectedOrder, setSelectedOrder] = useState<string>()
  
  const { 
    data, 
    loading, 
    error, 
    fetchMore, 
    refetch 
  }: QueryResult = useQuery(
    productSearch, 
    {
      variables: {
        hideUnavailableItems: true,
        selectedFacets: facetInput,
        orderBy: selectedOrder,
        to: (pageSize - 1)
      }
    }
  )
  
  useEffect(() => {
    refetch()
  }, [])

  const [
    filterRequestList,
    setFilterRequestList,
  ] = useState<BffGetProductsRequest>()

  useEffect(() => { 
    if(!loading){
      console.log(data);
      setProducts(data.productSearch);
    }
    console.log(categoryId);
    
  }, [data])

  const loadMoreProducts = async (offset: number) => {
    let { data } = await fetchMore({
      variables: {
        orderBy: selectedOrder,
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? (pageSize * 2) - 1 : offset + (pageSize - 1),
      }
    })

    setProducts(data.productSearch)
  }

  const products = useSelector((state: ApplicationState) => state.products)

  useEffect(() => {
    console.log('products', products)
    dispatch(cleanProducts())
    loadMoreProducts(0)
  }, [filterRequestList])

  useEffect(() => {
    refetch();
  }, [selectedOrder])

  useEffect(() => {
    if (categoryId != originalOpenedcategoryId) {
      console.log('products', products)
      dispatch(cleanProducts())
      loadMoreProducts(0)
    }
  }, [categoryId])

  const DynamicComponent = safeArea ? SafeAreaView : Box
  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton loading={loading} />
      ) : (
        <TopBarDefault loading={loading} />
      )}
      {search && (
        <Box paddingX='nano' paddingBottom='micro' paddingTop='micro'>
          <SearchBar height={36} placeholder='Buscar' />
        </Box>
      )}
      <FilterModal
        setFilterRequestList={setFilterRequestList}
        categoryId={categoryId}
        dispatch={dispatch}
        filterList={filterList}
        setFilterList={setFilterList}
        isVisible={filterVisible}
        onCancel={() => setFilterVisible(false)}
        onClose={() => setFilterVisible(false)}
        title='Excluir endereço'
        confirmText={'Ok'}
        subtitle='Tem certeza que deseja excluir o endereço salvo?'
      />
      <Picker
        onSelect={(item) => {
          setSorterVisible(false)
          setSelectedOrder(item?.value)
        }}
        isVisible={sorterVisible}
        items={[
          {
            text: 'Menor Preço',
            value: OrderByEnum.OrderByPriceDESC,
          },
          {
            text: 'Maior Preço',
            value: OrderByEnum.OrderByPriceASC,
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
          setSorterVisible(false)
        }}
        onClose={() => {
          setSorterVisible(false)
        }}
        onBackDropPress={() => setSorterVisible(false)}
        title='Ordenar Por'
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
            <Box bg='dropDownBorderColor'>
              <Button p='nano'>
                <Box flexDirection='row'>
                  <Icon name='Whatsapp' size={16} color='preto'></Icon>
                  <Box marginX='nano'>
                    <Typography
                      color='preto'
                      fontFamily='nunitoSemiBold'
                      fontSize={11}>
                      Chama no Whats! Seja atendido sem sair de casa.{' '}
                      <Typography style={{ textDecorationLine: 'underline' }}>
                        Clique aqui!
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Button>
            </Box>
            <Box paddingY='micro' flexDirection='row' justifyContent='center'>
              <Box width={1 / 2}>
                <Button
                  onPress={() => setFilterVisible(true)}
                  marginRight='nano'
                  marginLeft='micro'
                  borderRadius='nano'
                  borderColor='dropDownBorderColor'
                  borderWidth='hairline'
                  flexDirection='row'
                  inline={true}
                  height={40}>
                  <Typography
                    color='preto'
                    fontFamily='nunitoSemiBold'
                    fontSize='14px'>
                    Filtrar
                  </Typography>
                </Button>
              </Box>

              <Box width={1 / 2}>
                <Button
                  marginRight='micro'
                  marginLeft='nano'
                  borderRadius='nano'
                  borderColor='dropDownBorderColor'
                  borderWidth='hairline'
                  flexDirection='row'
                  inline={true}
                  height={40}
                  onPress={() => {
                    setSorterVisible(true)
                  }}>
                  <Typography
                    color='preto'
                    fontFamily='nunitoSemiBold'
                    fontSize='14px'>
                    Ordenar
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box
              paddingX='micro'
              paddingY='quarck'
              flexDirection='row'
              justifyContent='space-between'>
              <Typography fontFamily='nunitoRegular' fontSize='13px'>
                {productsQuery.recordsFiltered} produtos encontrados
              </Typography>
              {filterList.length > 0 && (
                <Button onPress={() => setFilterList([])}>
                  <Typography
                    color='progressTextColor'
                    variant='precoAntigo3'
                    style={{ textDecorationLine: 'underline' }}>
                    Limpar tudo
                  </Typography>
                </Button>
              )}
            </Box>
          </>
        }
      />
    </DynamicComponent>
  )
}
