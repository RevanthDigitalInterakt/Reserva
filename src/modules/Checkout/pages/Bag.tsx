import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import {
  Typography,
  Box,
  ProgressBar,
  ProductHorizontalListCard,
  ProductDetailCard,
  Divider,
  Button,
  Icon,
  Toggle,
  TextField,
  ProductVerticalListCard,
} from 'reserva-ui';
import { PriceCustom } from '../components/PriceCustom';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import { createAnimatableComponent } from 'react-native-animatable';

const BoxAnimated = createAnimatableComponent(Box);

export const BagScreen = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [hasBagGift, setHasBagGift] = React.useState(false);
  const [showLikelyProducts, setShowLikelyProducts] = React.useState(true);

  const [lisProduct, setLisProduct] = useState([
    {
      discountTag: '30%',
      itemColor: 'Branca',
      ItemSize: '41',
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      itemColor: 'Branca',
      ItemSize: '41',
      productTitle: 'Camiseta Básica Reserva',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
  ]);
  const AddProduct = (count: number) => {
    setQuantity(quantity + 1);
  };

  const RemoveProduct = (count: number) => {
    setQuantity(quantity - 1);

    if (quantity <= 1) {
      setQuantity(1);
    }
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'xxs'}>
          <Box bg={'white'} marginTop={'xxs'}>
            <Typography variant="tituloSessoes">Sacola (2)</Typography>
          </Box>
          <Box my="micro">
            <Box flexDirection="row">
              <Typography fontFamily={'nunitoSemiBold'} fontSize={13}>
                Faltam apenas R$29,90 para ganhar
              </Typography>
              <Typography> </Typography>
              <Typography
                variant={'precoPromocional2'}
                color={'vermelhoFechadoRSV'}
              >
                frete grátis
              </Typography>
            </Box>

            <Box width="100%">
              <ProgressBar
                colorLabel={'fullBlack'}
                colorBar={'neutroFrio1'}
                colorProgress={'neutroFrio2'}
                value={90}
                max={100}
                showPercent={false}
                barHeight={5}
                borderRadius="xxxs"
              />
            </Box>
          </Box>

          {lisProduct.map((item, index) => (
            <Box key={index} bg={'white'} marginTop={'xxxs'}>
              <ProductHorizontalListCard
                currency={'R$'}
                discountTag={item.discountTag}
                itemColor={item.itemColor}
                ItemSize={item.ItemSize}
                productTitle={item.productTitle}
                installmentsNumber={item.installmentsNumber}
                installmentsPrice={item.installmentsPrice}
                price={item.price}
                priceWithDiscount={item.priceWithDiscount}
                count={quantity}
                onClickAddCount={(count) => AddProduct(count)}
                onClickSubCount={(count) => RemoveProduct(count)}
                onClickClose={() => {}}
                imageSource={item.imageSource}
              />
            </Box>
          ))}
        </Box>

        <Box paddingX={'xxxs'}>
          <Divider variant={'fullWidth'} />
          <Button onPress={() => setShowLikelyProducts(!showLikelyProducts)}>
            <Box flexDirection={'row'} marginY={'xxs'} alignItems={'center'}>
              <Box marginRight="micro">
                <Icon name={'Handbag'} size={20} />
              </Box>
              <Box flex={1}>
                <Typography variant={'subtituloSessoes'}>
                  Você vai gostar destas aqui
                </Typography>
              </Box>
              <Box marginRight="micro">
                <Icon
                  style={
                    showLikelyProducts
                      ? {
                          transform: [{ rotate: '-180deg' }, { translateY: 8 }],
                        }
                      : { transform: [{ translateY: 4 }] }
                  }
                  name={'ArrowDown'}
                  size={20}
                />
              </Box>
            </Box>
          </Button>
          <Divider variant={'fullWidth'} />
        </Box>

        {showLikelyProducts && (
          <BoxAnimated
            paddingX={'xxxs'}
            bg="#FAFAFA"
            animation={showLikelyProducts ? 'fadeIn' : ''}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
              }}
            >
              {lisProduct.map((product, index) => (
                <Box mt="xxs" mr="xxs" key={`${index}-${product.productTitle}`}>
                  <Box flex={1} mb="micro">
                    <ProductVerticalListCard
                      bg="#FAFAFA"
                      small
                      {...product}
                      productTitle={product.productTitle.toUpperCase()}
                    />
                  </Box>
                  <Button
                    width="100%"
                    title="ADICIONAR"
                    variant="primarioEstreitoSmall"
                  />
                </Box>
              ))}
            </ScrollView>
          </BoxAnimated>
        )}

        <Box paddingX={'xxxs'}>
          {showLikelyProducts && (
            <Divider marginTop={'xs'} variant={'fullWidth'} />
          )}

          <Box flexDirection={'row'} marginY={'xxs'} alignItems={'center'}>
            <Box marginRight="micro">
              <Icon name={'Presente'} size={20} />
            </Box>
            <Box flex={1}>
              <Typography variant={'subtituloSessoes'}>
                Embalagem para presente
              </Typography>
            </Box>
            <Box marginLeft={'micro'}>
              <Toggle
                onValueChange={setHasBagGift}
                thumbColor={'vermelhoAlerta'}
                color={'preto'}
                value={hasBagGift}
              />
            </Box>
          </Box>

          <Divider variant={'fullWidth'} />

          <Box
            flexDirection={'row'}
            marginTop={'xxs'}
            marginBottom={'xxxs'}
            alignItems={'center'}
          >
            <Box marginRight="micro">
              <Icon name={'Tag'} size={20} color="preto" />
            </Box>
            <Box flex={1}>
              <Typography variant={'subtituloSessoes'}>
                Código promocional{' '}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant={'tituloSessao'}>
              Insira aqui o código do vendedor(a) e/ou cupom de desconto.
            </Typography>
          </Box>

          <Box
            borderColor="divider"
            borderWidth="hairline"
            bg={'backgoundInput'}
            flexDirection={'row'}
            alignItems="center"
            px={'micro'}
            height={34}
            alignSelf={'flex-start'}
            borderRadius={'pico'}
            marginTop="nano"
          >
            <Typography fontFamily={'nunitoRegular'} fontSize={13}>
              RSV1234
            </Typography>
            <Button
              onPress={() => {}}
              marginLeft={'micro'}
              variant={'icone'}
              icon={<Icon name="Close" size={10} />}
            />
          </Box>

          <Box marginTop={'nano'} flexDirection={'row'}>
            <Box flex={1} marginRight={'micro'}>
              <TextField placeholder={'Insira o código'} />
            </Box>
            <Box>
              <Button
                width={'100%'}
                title={'APLICAR'}
                variant={'primarioEstreito'}
                disabled={false}
              />
            </Box>
          </Box>
          <Divider variant={'fullWidth'} marginY={'xs'} />
          <Box
            marginBottom={'micro'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant={'precoAntigo3'}>Subtotal</Typography>
            <PriceCustom
              fontFamily={'nunitoSemiBold'}
              sizeInterger={15}
              sizeDecimal={11}
              num={1254.0}
            />
          </Box>
          <Box
            marginBottom={'micro'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant={'precoAntigo3'}>Descontos</Typography>

            <PriceCustom
              fontFamily={'nunitoSemiBold'}
              negative={true}
              sizeInterger={15}
              sizeDecimal={11}
              num={254.0}
            />
          </Box>
          <Box
            marginBottom={'micro'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant={'precoAntigo3'}>Total</Typography>
            <PriceCustom
              fontFamily={'nunitoBold'}
              sizeInterger={20}
              sizeDecimal={11}
              num={1000.0}
            />
          </Box>
        </Box>
      </ScrollView>

      <Box
        width={'100%'}
        height={145}
        px="xxs"
        bg="white"
        style={{ elevation: Platform.OS == 'android' ? 10 : 0 }}
        boxShadow={Platform.OS == 'android' ? null : 'bottomBarShadow'}
      >
        <Box flexDirection="row" justifyContent="space-between" py="xxs">
          <Box>
            <Typography fontFamily="nunitoRegular" fontSize={13}>
              Total:
            </Typography>
            <Typography fontFamily="nunitoBold" fontSize={15}>
              R$ 1000,00
            </Typography>
          </Box>
          <Box alignItems="flex-end">
            <Typography fontFamily="nunitoRegular" fontSize={13}>
              em até
            </Typography>
            <Box flexDirection="row">
              <Typography
                fontFamily="nunitoBold"
                fontSize={15}
                color="vermelhoRSV"
              >
                10x de R$ 100,
              </Typography>
              <Typography
                fontFamily="nunitoBold"
                fontSize={1}
                color="vermelhoRSV"
              >
                00
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          onPress={() => {
            navigation.navigate('LoginAlternative', { comeFrom: 'Checkout' });
          }}
          title="FINALIZAR COMPRA"
          variant="primarioEstreito"
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
