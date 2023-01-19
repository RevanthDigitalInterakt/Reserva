import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Typography,
  Box,
  ProductHorizontalListCard,
  Divider,
  Button,
  Icon,
} from '@usereservaapp/reserva-ui';
import type { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import type AnimatedLottieView from 'lottie-react-native';
import ReactNativeModal from 'react-native-modal';
import { animations } from '../../../assets';

import { PriceCustom } from '../components/PriceCustom';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import type { RootStackParamList } from '../../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'SummaryScreen'>;

export const SummaryScreen = ({ navigation, route }: Props) => {
  const { paymentType, cashback } = route?.params;
  const lottieRef = useRef<AnimatedLottieView | null>(null);
  const [showLottie, setShowLottie] = React.useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0);

  const [products, setProducts] = React.useState<any>();

  useEffect(() => {
    if (showLottie) {
      lottieRef.current?.play();
    }
  }, [showLottie]);

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
        <Box paddingX="xxxs" paddingY="xxs">
          <Box bg="white" marginTop="xxs">
            <Typography variant="tituloSessoes">Resumo</Typography>
            <Box flexDirection="row" justifyContent="space-between" mt="xs">
              <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                Produtos
              </Typography>
            </Box>
          </Box>
          {products?.map((item, index) => (
            <Box key={index} bg="white" marginTop="xxxs">
              <ProductHorizontalListCard
                currency="R$"
                discountTag={
                  item.discountTag > 0 ? item.discountTag : undefined
                }
                itemColor={item.color || ''}
                ItemSize={item.size || ''}
                productTitle={item.title}
                installmentsNumber={item.installmentNumber}
                installmentsPrice={item.installmentPrice}
                price={item.fullPrice}
                priceWithDiscount={item.discountPrice}
                count={item.quantity}
                // onClickAddCount={(count) =>

                // }
                // onClickSubCount={(count) =>

                // }
                // onClickClose={() => {

                // }}
                imageSource={
                  (item.imagesUrls?.length && item.imagesUrls[0]) || ''
                }
              />
            </Box>
          ))}
          <Divider marginTop="xxxs" variant="fullWidth" />
          <Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              mt="xxs"
              mb="xxxs"
            >
              <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                Entrega
              </Typography>
              <Button
                onPress={() => {
                  navigation.navigate('AddressList');
                }}
                pb="quarck"
              >
                <Typography style={{ textDecorationLine: 'underline' }}>
                  editar
                </Typography>
              </Button>
            </Box>
            <Box>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                R. Tomás Antônio Gonzaga -
                {' '}
              </Typography>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                Cristóvão Colombo, Vila Velha - ES
              </Typography>
            </Box>
          </Box>

          <Divider marginTop="xxxs" variant="fullWidth" />
          <Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              mt="xs"
              mb="xxxs"
            >
              <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                Forma de Pagamento
              </Typography>
              <Button
                onPress={() => {
                  navigation.navigate('PaymentMethodScreen');
                }}
                pb="quarck"
              >
                <Typography style={{ textDecorationLine: 'underline' }}>
                  editar
                </Typography>
              </Button>
            </Box>
            <FormOfPayment
              cashback={cashback}
              paymentType={paymentType}
            />
          </Box>

          <Divider variant="fullWidth" marginY="xxs" />
          {totalPrice - totalDiscountPrice > 0 && (
            <>
              <Box
                marginBottom="micro"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="precoAntigo3">Subtotal</Typography>
                <PriceCustom
                  fontFamily="nunitoSemiBold"
                  sizeInterger={15}
                  sizeDecimal={11}
                  num={totalPrice}
                />
              </Box>
              <Box
                marginBottom="micro"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="precoAntigo3">Descontos</Typography>

                <PriceCustom
                  fontFamily="nunitoSemiBold"
                  negative
                  sizeInterger={15}
                  sizeDecimal={11}
                  num={totalPrice - totalDiscountPrice}
                />
              </Box>
            </>
          )}
          <Box
            marginBottom="micro"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="precoAntigo3">Total</Typography>
            <PriceCustom
              fontFamily="nunitoBold"
              sizeInterger={20}
              sizeDecimal={11}
              num={totalDiscountPrice}
            />
          </Box>

        </Box>
        <Button
          onPress={() => {
            setShowLottie(true);
          }}
          title="FECHAR PEDIDO"
          color="backgroundApp"
          bg="verdeSucesso"
          width="100%"
          height={50}
          fontFamily="nunitoRegular"
          fontSize={13}
        />
      </ScrollView>
      <ReactNativeModal
        isVisible={showLottie}
        backdropOpacity={0.7}
        backdropColor="black"
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeIn"
      >
        <LottieView
          style={{ flex: 1 }}
          onAnimationFinish={() => {
            setShowLottie(false);
            navigation.navigate('PurchaseConfirmationScreen', {
              paymentType: route.params.paymentType,
            });
          }}
          ref={lottieRef}
          loop={false}
          source={animations.confirmation}
        />
      </ReactNativeModal>
    </SafeAreaView>
  );
};

interface IFormOfPayment {
  cashback?: boolean;
  paymentType?: string;
}
const FormOfPayment = ({ cashback, paymentType }: IFormOfPayment) => {
  const [iconName, setIconName] = useState('');
  const [description, setdDescription] = useState('');
  const icon = () => {
    switch (paymentType) {
      case 'PIX':
        return (
          setIconName('Pix'),
          setdDescription('PIX')
        );
      case 'Credit':
        return (
          setIconName('Card'),
          setdDescription('Cartão de crédito   **** 6582')
        );
      case 'Debit':
        return (
          setIconName('Caixa'),
          setdDescription('Cartão de Débito Virtual Caixa  **** 6582')
        );
      case 'Boleto':
        return (
          setIconName('Barcode'),
          setdDescription('Boleto')
        );
      case 'GiftCard':
        return (
          setIconName('Presente'),
          setdDescription('Cartão Presente')
        );
    }
  };
  useEffect(() => {
    icon();
  }, []);
  return (
    <>
      {cashback
        && (
        <Box flexDirection="row" alignItems="center" mb="xxxs">
          <Box mr="nano">
            <Icon name="Cashback" size={18} />
          </Box>
          <Typography fontFamily="nunitoRegular" fontSize={15}>
            Crédito/cashback
          </Typography>
        </Box>
        )}
      <Box flexDirection="row" alignItems="center">
        <Box mr="nano">
          <Icon name={iconName} size={18} />
        </Box>
        <Typography fontFamily="nunitoRegular" fontSize={15}>
          {description}
        </Typography>
      </Box>
    </>
  );
};
