import React, { createRef, useState } from 'react'
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
} from 'reserva-ui'
import { Input } from 'reserva-ui/src/components/TextField/TextField.styles'
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton'
import { ModalBag } from '../components/ModalBag'

import Share from 'react-native-share'
import { Product } from '../../../store/ducks/products/types'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../../routes/StackNavigator'
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
  const colors = [
    '#F9F9ED',
    '#7494A5',
    '#2D4452',
    '#484C51',
    '#070707',
    '#484C50',
    '#BE6ED5',
    '#4A56A7',
    '#1ECB58',
  ]
  const { product } = route.params
  console.log(product)
  const [selectedColor, setSelectedColor] = useState('#F9F9ED')
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
  const [isVisible, setIsVisible] = useState(false)
  const [actualRecomendedindex, setActualRecomendedindex] = useState(0)

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

  const [cep, setCep] = useState('')

  return (
    <SafeAreaView>
      <Box bg='white'>
        <ModalBag
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false)
          }}
        />
        <TopBarDefaultBackButton />
        <ScrollView>
          <ProductDetailCard
            installmentsNumber={1}
            installmentsPrice={product.price}
            title={product.title}
            //discountTag={18}
            price={product.price}
            priceWithDiscount={product.price}
            imagesWidth={screenWidth}
            images={product.images}
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
                  console.log(res)
                })
                .catch((err) => {
                  err && console.log(err)
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
                  listColors={colors}
                  selectedColor={selectedColor}
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
                  onSelectedChange={() => {}}
                  optionsList={['PP', 'P', 'M', 'G', 'GG', '3G']}
                  defaultSelectedItem={'G'}
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
              <Typography>
                <Button>
                  <Box flexDirection='row' alignItems='center'>
                    <Icon name='Add' size={26} color='preto' />
                    <Box ml='nano'>
                      <Typography
                        fontFamily='reservaSerifRegular'
                        fontSize='20px'>
                        Sobre este produto
                      </Typography>
                    </Box>
                  </Box>
                </Button>
              </Typography>
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
