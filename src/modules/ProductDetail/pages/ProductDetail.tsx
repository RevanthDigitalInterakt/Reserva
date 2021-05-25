import React, { createRef, useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PickerItemProps,
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { ceil } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Box,
  Button,
  Divider,
  Icon,
  Picker,
  PickerItem,
  ProductDetailCard,
  SelectColor,
  Typography,
  OutlineInput,
  RadioButtons,
  ProductVerticalListCard,
  ProductVerticalListCardProps,
  TopBar,
  theme,
  ExpansePanel,
} from 'reserva-ui'
import { Input } from 'reserva-ui/src/components/TextField/TextField.styles'
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton'
import { ModalBag } from '../components/ModalBag'

import Share from 'react-native-share'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import {
  loadProduct,
  loadProductSuccess,
} from '../../../store/ducks/product/actions'
const screenWidth = Dimensions.get('window').width

let recomendedScroll = createRef<ScrollView>()

interface ProductDetailProps {
  recomendedProducts?: ProductVerticalListCardProps[]
}

type Props = StackScreenProps<RootStackParamList, 'ProductDetail'> &
  ProductDetailProps

export const ProductDetail: React.FC<Props> = ({
  navigation,
  route,
  recomendedProducts,
}) => {
  const [isFavorited, setIsFavorited] = useState(false)

  const [isVisible, setIsVisible] = useState(false)
  const [actualRecomendedindex, setActualRecomendedindex] = useState(0)

  recomendedProducts = [
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
  ]
  const onChangeRecomended = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const actualItem = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x /
        scrollEvent.nativeEvent.layoutMeasurement.width
    )
    if (
      actualItem !== actualRecomendedindex &&
      recomendedProducts &&
      actualItem < Math.ceil(recomendedProducts.length / 2)
    ) {
      console.log(actualItem)
      setActualRecomendedindex(actualItem)
    }
  }

  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState<string | number>('')

  const [skuIdx, setSkuIdx] = useState(0)

  let product = useSelector((state: ApplicationState) => state.product)
  const dispatch = useDispatch()

  const productId = route.params.productId
  useEffect(() => {
    dispatch(loadProduct(productId))
    console.log(product)
  }, [])

  useEffect(() => {
    console.log('skuList', product.data.skuList)
    setSelectedColor(
      product.data.skuList ? product.data.skuList[skuIdx]?.color : ''
    )
    setSelectedSize(
      product.data.skuList ? product.data.skuList[skuIdx]?.size : ''
    )
  }, [product])
  const [cep, setCep] = useState('')

  useEffect(() => {
    let sku = product.data.skuList?.findIndex((x) => {
      return x.color == selectedColor && x.size == selectedSize
    })
    console.log('sku', sku)
    if (sku) setSkuIdx(sku)
  }, [selectedColor, selectedSize])

  return (
    <SafeAreaView>
      <Box bg='white'>
        <ModalBag
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false)
          }}
        />
        <TopBarDefaultBackButton loading={product.loading} />
        <ScrollView>
          <ProductDetailCard
            installmentsNumber={product.data.installmentNumber}
            installmentsPrice={product.data.installmentPrice}
            title={
              product.data.skuList
                ? product.data.skuList[0].title
                : product.data.title
            }
            discountTag={product.data.discountTag}
            price={product.data.fullPrice}
            priceWithDiscount={product.data.discountPrice}
            imagesWidth={screenWidth}
            images={
              product.data.skuList ? product.data.skuList[0].imagesUrls : []
            }
            isFavorited={isFavorited}
            onClickFavorite={(favoriteState: any) => {
              setIsFavorited(favoriteState)
            }}
            onClickShare={() => {
              const options = {
                message: 'Aqui está um produto que você pode gostar',
                title: 'Compartilhar',
              }
              Share.open(options)
                .then((res) => {
                  //console.log(res)
                })
                .catch((err) => {
                  //err && console.log(err)
                })
            }}
          />

          <Box mt='xs'>
            <Box px='xxxs' mb='xxxs'>
              <Typography variant={'subtituloSessoes'}>Cores:</Typography>
            </Box>
            <Box>
              <ScrollView horizontal>
                <SelectColor
                  onPress={(color: any) => setSelectedColor(color)}
                  size={40}
                  listColors={product.data.colors || []}
                  selectedColors={selectedColor}
                />
              </ScrollView>
            </Box>
          </Box>
          <Box px='xxxs'>
            <Box mt='xxxs'>
              <Box
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'>
                <Typography variant={'subtituloSessoes'}>Tamanhos:</Typography>
                <Button>
                  <Box flexDirection='row' alignItems='center'>
                    <Icon name='Ruler' size={35} />
                    <Typography fontFamily='nunitoRegular' fontSize={'11px'}>
                      Guia de medidas
                    </Typography>
                  </Box>
                </Button>
              </Box>
              <Box alignItems='center' mt='xxxs'>
                <RadioButtons
                  size={44}
                  fontSize={14}
                  onSelectedChange={(item) => {
                    setSelectedSize(item)
                  }}
                  optionsList={product.data.sizes || []}
                  defaultSelectedItem={selectedSize}
                />
              </Box>
            </Box>

            <Button
              mt='xxs'
              title='ADICIONAR À SACOLA'
              variant='primarioEstreito'
              onPress={() => {
                setIsVisible(true)
              }}
              inline
            />

            <Box mt='nano' flexDirection='row'></Box>
            <Divider variant='fullWidth' my='xs' />
            <Typography fontFamily='reservaSerifRegular' fontSize='16px'>
              Consultar prazo e valor do frete
            </Typography>
            <Box flexDirection='row' mt='xxxs'>
              <OutlineInput
                onChangeText={(text) => {
                  setCep(text)
                }}
                value={cep}
                placeholder='Digite seu CEP'
                iconName='Search'
                keyboardType='number-pad'
                keyboardAppearance='light'
                maskType='zip-code'
              />
            </Box>
            <Divider variant='fullWidth' my='xs' />
            <Box>
              <ExpansePanel
                information={{
                  title: 'Descrição do produto',
                  content: product.data.skuList!
                    ? product.data.skuList[0].description
                    : product.data.description || '',
                }}
              />
            </Box>

            <Divider variant='fullWidth' my='xs' />
            <Typography fontFamily='reservaSerifRegular' fontSize='16px'>
              Receba novidades e promoções
            </Typography>
            <Box flexDirection='column' mt='xxxs'>
              <OutlineInput
                placeholder='Digite seu e-mail'
                iconName='ChevronRight'
                keyboardType='email-address'
              />
            </Box>
            <Box mt='xs' mb='xxl'>
              <Box mb='xxxs'>
                <Typography fontFamily='nunitoBold' fontSize={14}>
                  Seu produto combina com
                </Typography>
              </Box>
              <Box mb='md'>
                <ScrollView
                  horizontal
                  pagingEnabled
                  ref={recomendedScroll}
                  showsHorizontalScrollIndicator={false}
                  onScroll={onChangeRecomended}>
                  {recomendedProducts.map((product, index) => (
                    <Box mx='nano' mr={'micro'} key={index} height={230}>
                      <ProductVerticalListCard
                        imageWidth={137}
                        small
                        {...product}
                      />
                    </Box>
                  ))}
                </ScrollView>
                <Box
                  paddingTop='nano'
                  flexDirection='row'
                  justifyContent='center'>
                  {recomendedProducts.map(
                    (i, k) =>
                      k % 2 == 0 && (
                        <Button
                          paddingX='quarck'
                          variant='icone'
                          onPress={() => {
                            let width = (137 + theme.space.micro) * 2
                            console.log(`k/2: ${k / 2}`)
                            recomendedScroll.current?.scrollTo({
                              x: width * (k / 2),
                            })
                          }}
                          icon={
                            <Icon
                              name='Circle'
                              size={6}
                              color={
                                actualRecomendedindex == Math.ceil((k - 1) / 2)
                                  ? 'preto'
                                  : 'neutroFrio1'
                              }
                            />
                          }
                        />
                      )
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}
