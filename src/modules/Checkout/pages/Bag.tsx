import React, { useEffect, useState } from 'react';
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
import { CouponBadge } from '../components/CouponBadge';
import {
  CouponsOrders,
  OrderItems,
  OrderRequest,
  PaymentType,
} from '../../../store/ducks/orders/types';
import { ApplicationState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  appendCoupons,
  increaseOrderCount,
  removeOrders,
} from '../../../store/ducks/orders/actions';
import { Product } from '../../../store/ducks/product/types';
import { useCart } from '../../../context/CartContext';

const BoxAnimated = createAnimatableComponent(Box);

export const BagScreen = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { orderForm, addItem, orderform, removeItem } = useCart();
  const [totalBag, setTotalBag] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);
  const [hasBagGift, setHasBagGift] = React.useState(false);
  const [showLikelyProducts, setShowLikelyProducts] = React.useState(true);

  const [coupons, setCoupons] = React.useState<CouponsOrders[]>([]);
  const [coupon, setCoupon] = React.useState<CouponsOrders>(
    {} as CouponsOrders
  );

  useEffect(() => {
    orderform();
  }, []);

  useEffect(() => {
    const totalItensPrice =
      (orderForm?.totalizers.find((x) => x.id === 'Items')?.value || 0) / 100;
    const totalDiscountPrice =
      (orderForm?.totalizers.find((x) => x.id === 'Discounts')?.value || 0) /
      100;

    setTotalBag(totalItensPrice);
    setTotalDiscountPrice(totalDiscountPrice);
  }, [orderForm]);

  const addCoupons = () => {
    dispatch(appendCoupons(coupon));
    setCoupon({ value: '' });
  };

  const onGoToDelivery = () => {
    if (orderForm) {
      const { clientProfileData, shippingData } = orderForm;
      const hasCustomer =
        clientProfileData &&
        clientProfileData.email &&
        clientProfileData.firstName;

      const hasAddress =
        shippingData && shippingData.availableAddresses.length > 0;

      if (!hasCustomer && !hasAddress) {
        navigate('EnterYourEmail');
      } else {
        navigate('DeliveryScreen');
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <TopBarBackButton showShadow loading={false} />
      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'xxs'}>
          <Box bg={'white'} marginTop={'xxs'}>
            <Typography variant="tituloSessoes">
              Sacola ({orderForm?.items.length})
            </Typography>
          </Box>

          {orderForm?.items.map((item, index) => (
            <Box key={index} bg={'white'} marginTop={'xxxs'}>
              <ProductHorizontalListCard
                currency={'R$'}
                discountTag={
                  item.sellingPrice > 0 ? item.sellingPrice / 100 : undefined
                }
                itemColor={item.skuName.split('-')[0] || ''}
                ItemSize={item.skuName.split('-')[1] || ''}
                productTitle={item.name}
                // installmentsNumber={item.installmentNumber}
                // installmentsPrice={item.installmentPrice}
                price={item.price / 100}
                priceWithDiscount={item.sellingPrice / 100}
                count={item.quantity}
                onClickAddCount={async (count) => {
                  await addItem(count, item.id, item.seller);
                }}
                onClickSubCount={async (count) =>
                  await removeItem(
                    item.id,
                    index,
                    item.seller,
                    item.quantity - 1
                  )
                }
                onClickClose={async () => {
                  await removeItem(item.id, index, item.seller, 0);
                }}
                imageSource={item.imageUrl.replace('http', 'https')}
              />
            </Box>
          ))}
        </Box>

        {/* <Box paddingX={'xxxs'}>
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
        </Box> */}

        {/* {showLikelyProducts && (
          <BoxAnimated
            paddingX={'xxxs'}
            bg={'whiteSecondary'}
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
                      bg={'whiteSecondary'}
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
        )} */}

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
          {coupons &&
            coupons.map((coupon) => <CouponBadge value={coupon.value} />)}

          <Box marginTop={'nano'} flexDirection={'row'}>
            <Box flex={1} marginRight={'micro'}>
              <TextField
                value={coupon.value}
                onChangeText={(text) => setCoupon({ value: text })}
                placeholder={'Insira o código'}
              />
            </Box>
            <Box>
              <Button
                width={'100%'}
                title={'APLICAR'}
                onPress={() => addCoupons()}
                variant={'primarioEstreito'}
                disabled={false}
              />
            </Box>
          </Box>
          <Divider variant={'fullWidth'} marginY={'xs'} />
          {totalDiscountPrice != 0 && (
            <>
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
                  num={totalBag}
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
                  num={Math.abs(totalDiscountPrice)}
                />
              </Box>
            </>
          )}
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
              num={totalBag}
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

            <PriceCustom
              fontFamily={'nunitoBold'}
              sizeInterger={15}
              sizeDecimal={11}
              num={totalBag}
            />
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
                10x de{' '}
              </Typography>

              <PriceCustom
                fontFamily={'nunitoBold'}
                color="vermelhoRSV"
                sizeInterger={15}
                sizeDecimal={11}
                num={totalBag / 10}
              />
            </Box>
          </Box>
        </Box>

        <Button
          onPress={onGoToDelivery}
          title="IR PARA ENTREGA"
          variant="primarioEstreito"
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
