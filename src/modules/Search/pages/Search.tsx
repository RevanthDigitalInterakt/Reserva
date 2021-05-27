import { StackScreenProps } from '@react-navigation/stack'
import * as React from 'react'
import { useEffect } from 'react'
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  theme,
  Image,
  ProductVerticalListCard,
  Button,
  Typography,
  Icon,
  Picker,
  SearchBar,
  Pill,
} from 'reserva-ui'
import { images } from '../../../assets'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { ApplicationState } from '../../../store'

import { TopBarDefault } from '../../Menu/components/TopBarDefault'
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton'
import { FilterModal } from '../../ProductCatalog/modals/FilterModal'
import * as Animatable from 'react-native-animatable'
import { loadProducts } from '../../../store/ducks/products/actions'
import { loadProductsSuccess } from '../../../store/ducks/products/actions'
import { ListVerticalProducts } from '../../ProductCatalog/components/ListVerticalProducts/ListVerticalProducts'
import { loadAddressRequest } from '../../../store/ducks/address/sagas'
import { set } from 'date-fns'

const windowWidth = Dimensions.get('window').width

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showResults, setShowResults] = React.useState(true)

  const { searchterm } = route.params
  const dispatch = useDispatch()

  const [filterVisible, setFilterVisible] = React.useState(false)
  const [sorterVisible, setSorterVisible] = React.useState(false)
  const [filterList, setFilterList] = React.useState<string[]>([])

  const products = useSelector((state: ApplicationState) => state.products)

  useEffect(() => {
    setShowResults(false)
    id
    dispatch(loadProductsSuccess([]))
  }, [])

  const loadMoreProducts = (offset: number, searchQuery: string) => {
    console.log('loading more')
    dispatch(
      loadProducts({
        categoryId: '',
        limit: 10,
        offset: offset,
        //searchQuery: searchQuery,
      })
    )
  }

  return (
    <Box backgroundColor='white' flex={1}>
      <TopBarDefault loading={false} />
      <Box paddingX='nano' paddingBottom='micro' paddingTop='micro'>
        <SearchBar
          onValueChange={(text) => {
            if (text == '' || text == undefined) {
              setShowResults(false)
            } else {
              setShowResults(true)
              setSearchTerm(text)
              dispatch(loadProductsSuccess([]))
              loadMoreProducts(0, text)
            }
          }}
          height={36}
          placeholder='Buscar'
        />
      </Box>

      {showResults && (
        <Animatable.View animation='fadeIn' style={{ height: '100%' }}>
          <ListVerticalProducts
            products={products.dataOffer.filter((x) =>
              x.title.toUpperCase().includes(searchTerm.toUpperCase())
            )}
            loadMoreProducts={(offset) => {
              loadMoreProducts(offset, searchTerm)
            }}
          />
        </Animatable.View>
      )}
    </Box>
  )
}
