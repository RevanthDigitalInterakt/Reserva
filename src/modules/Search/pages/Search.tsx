import { QueryResult, useQuery } from '@apollo/client'
import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import {
  Box, SearchBar
} from 'reserva-ui'
import { productSearch } from '../../../graphql/products/productSearch'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { Product } from '../../../store/ducks/product/types'
import { TopBarDefault } from '../../Menu/components/TopBarDefault'
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts'

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showResults, setShowResults] = React.useState(true)

  const [products, setProducts] = useState<Product[]>()

  let pageSize = 12
  const { data, loading, error, fetchMore, refetch }: QueryResult = useQuery(productSearch, {
    variables: {
      to: (pageSize - 1)
    }
  })

  
  useEffect(() => { 
    if(!loading){
      setProducts(data.productSearch.products);
    }
    
  }, [data])


  useEffect(() => {
    setShowResults(false)
  }, [])

  const handleSearch = async (text: string) => {
    const { data, loading } = await refetch({
      fullText: text,
    })

    resetProductsArray()
    if(!loading){
      setProducts(data.productSearch.products);
    }
    setShowResults(true)
  }

  const resetProductsArray = () => {
    setProducts([])
  }

  const loadMoreProducts = async (offset: number, searchQuery?: string) => {
    console.log('loading more', offset, searchTerm)
    let { data: {
      productSearch: { products: newProducts }
    }, loading } = await fetchMore({
      variables: {
        form: offset < pageSize ? pageSize : offset,
        to: offset < pageSize ? (pageSize * 2) - 1 : offset + (pageSize - 1),
      }
    })

    if(!loading){
      setProducts(data.productSearch.products);
    }
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
        <Animatable.View animation='fadeIn' style={{ marginBottom: 120 }}>
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
