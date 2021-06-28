import { QueryResult, useQuery } from '@apollo/client'
import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useSelector } from 'react-redux'
import {
  Box, SearchBar
} from 'reserva-ui'
import { ProductQL, productSearch, ProductSearchResponse, ProductSearchVars } from '../../../graphql/products/productSearch'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { ApplicationState } from '../../../store'
import { Product } from '../../../store/ducks/product/types'
import { TopBarDefault } from '../../Menu/components/TopBarDefault'
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts'


const windowWidth = Dimensions.get('window').width

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showResults, setShowResults] = React.useState(true)

  const { searchterm } = route.params

  const [filterVisible, setFilterVisible] = React.useState(false)
  const [sorterVisible, setSorterVisible] = React.useState(false)
  const [filterList, setFilterList] = React.useState<string[]>([])

  const [products, setProducts] = useState<Product[]>()
  const filters = useSelector((state: ApplicationState) => state.filter.data)

  let pageSize = 12
  let { data: productData, loading, error, fetchMore, refetch }: QueryResult<ProductSearchResponse, ProductSearchVars> = useQuery(productSearch, {
    variables: {
      to: (pageSize - 1)
    }
  })

  console.log('data', productData, 'error', error, 'loading', loading)

  useEffect(() => {
    setShowResults(false)
  }, [])

  useEffect(() => {
    productData?.productSearch.products && updateProductsArray(productData.productSearch.products)
  }, [productData])

  const handleSearch = async (text: string) => {
    const { data } = await refetch({
      fullText: text,

    })

    resetProductsArray()
    updateProductsArray(data?.productSearch?.products || [])
    setShowResults(true)
  }

  const updateProductsArray = (newArray: ProductQL[]) => {
    let newProducts: Product[] | undefined = newArray.map(prod => {
      return {
        title: prod.productName,
        currency: 'R$',
        installmentPrice: prod.items && prod.items[0].sellers ? prod.items[0]?.sellers[0].commertialOffer?.Installments[0].Value : undefined,
        installmentNumber: prod.items && prod.items[0].sellers ? prod.items[0]?.sellers[0].commertialOffer?.Installments[0].NumberOfInstallments : undefined,
        fullPrice: prod.items && prod.items[0].sellers ? prod.items[0]?.sellers[0].commertialOffer?.Installments[0].TotalValuePlusInterestRate : undefined,
        imageUrl: prod.items[0].images[0].imageUrl || ''
      } as Product
    })
    setProducts(newProducts)
  }

  const resetProductsArray = () => {
    setProducts([])
  }

  const loadMoreProducts = async (offset: number, searchQuery?: string) => {
    console.log('loading more', offset, searchTerm)
    let { data: {
      productSearch: { products: newProducts }
    } } = await fetchMore({
      variables: {
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? (pageSize * 2) - 1 : offset + (pageSize - 1),
      }
    })

    updateProductsArray([...newProducts])
  }

  return (
    <Box backgroundColor='white' flex={1}>
      <TopBarDefault loading={loading} />
      <Box paddingX='nano' paddingBottom='micro' paddingTop='micro'>
        <SearchBar
          onValueChange={(text) => {
            setSearchTerm(text)
          }}
          onClickIcon={() => {
            handleSearch(searchTerm)
          }}
          height={36}
          placeholder='Buscar'
        />
      </Box>

      {showResults && (
        <Animatable.View animation='fadeIn' style={{ height: '100%' }}>
          <ListVerticalProducts
            products={products ? products : []}
            loadMoreProducts={(offset) => {
              loadMoreProducts(offset, searchTerm)
            }}
          />
        </Animatable.View>
      )}
    </Box>
  )
}
