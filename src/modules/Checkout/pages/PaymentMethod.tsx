import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, Button, Icon, Divider, Checkbox, theme } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import { PriceCustom } from '../components/PriceCustom';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
export const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const [cashBack, setCashBack] = useState(1000)
  const [totalPrice, setTotalPrice] = useState(1254)
  const [paymentDifference, setPaymentDifference] = useState(0)
  const [mixedpayment, setMixedpayment] = useState(false)

  const [isCheckedCashback, setIsCheckedCashback] = useState(true)

  const {
    orders,
    profile,
    address,
    shippingMethod,

    authentication,
  } = useSelector((state: ApplicationState) => state)

  useEffect(() => {
    setPaymentDifference(cashBack - totalPrice)
    if (paymentDifference < 0) {
      setMixedpayment(true) // se o valor ficar negativo
    } else {
      setMixedpayment(false)
    }
  }, [paymentDifference])

  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'sm'}>
          <Box>
            <Typography variant="tituloSessoes">
              Selecione a forma de pagamento
            </Typography>
          </Box>

          {cashBack > 0 &&
            <>
              <Box marginY={'micro'}>
                <Typography variant="tituloSessao">
                  Você possui crédito/cashback na sua conta. Caso não queira usá-lo, desmarque abaixo.
                </Typography>
              </Box>

              <Box
                marginBottom={'xxxs'}
                height={42}
                borderWidth={'hairline'}
                borderRadius={'nano'}
                bg='offWhite15'
                borderColor={'offWhite'}
                flexDirection={'row'}
                paddingX={'micro'}
              >
                <Checkbox
                  flex={1}
                  optionName={'Aplicar crédito/cashback disponível'}
                  checked={isCheckedCashback}
                  color={'preto'}
                  onCheck={() => { setIsCheckedCashback(!isCheckedCashback); setMixedpayment(!mixedpayment) }}
                />
                <Box alignSelf={"center"}>
                  <PriceCustom
                    fontFamily={'nunitoSemiBold'}
                    sizeInterger={14}
                    sizeDecimal={11}
                    num={cashBack}
                  />
                </Box>
              </Box>


              {paymentDifference >= 0 && isCheckedCashback ?
                <CashbackPayment
                  totalPrice={totalPrice}
                  paymentDifference={paymentDifference}
                  description={"Crédito/cashback restante"}
                  color={"verdeSucesso"}
                />
                :
                paymentDifference < 0 && isCheckedCashback &&
                <CashbackPayment
                  totalPrice={totalPrice}
                  paymentDifference={Math.abs(paymentDifference)}
                  description={"Diferença no pagamento"}
                  color={"vermelhoAlerta"}
                />
              }
            </>
          }
          <Box mb={'xs'} />
          {mixedpayment || paymentDifference < 0 ?
            <>
              <SelectPayment
                iconLeft={'Card'}
                title={'Cartão de crédito'}
                onPress={() =>
                  navigation.navigate('ListCards', { isCheckout: true, cashback: isCheckedCashback })
                }
                divider
              />
              <SelectPayment
                iconLeft={'Pix'}
                title={'PIX'}
                onPress={() => navigation.navigate('PixScreen', { cashback: isCheckedCashback })}
                divider
              />
              <SelectPayment
                iconLeft={'Barcode'}
                title={'Boleto bancário'}
                onPress={() => {
                  navigation.navigate('BarCodePayment', { cashback: isCheckedCashback });
                }}
                divider
              />

              <SelectPayment
                iconLeft={'Presente'}
                title={'Cartão presente'}
                onPress={() => {
                  navigation.navigate('GiftVoucherScreen', { cashback: isCheckedCashback });
                }}
                divider
              />

              <SelectPayment
                iconLeft={'Caixa'}
                title={'Cartão de Débito Virtual Caixa'}
                onPress={() => navigation.navigate('VirtualDebitCardCaixaScreen', { cashback: isCheckedCashback })}
              />
            </> : null
          }
        </Box>
      </ScrollView>
      {paymentDifference >= 0 && isCheckedCashback &&
        <Button
          onPress={() =>
            navigation.navigate("SummaryScreen", { paymentType: "Cashback" })
          }
          title="RESUMO"
          variant="primarioEstreito"
          inline
        />
      }
    </SafeAreaView>
  );
};
interface ICashbackPayment {
  totalPrice: number;
  paymentDifference: number;
  description: string;
  color: keyof typeof theme.colors;
}
const CashbackPayment = ({
  totalPrice,
  paymentDifference,
  description,
  color,
}: ICashbackPayment) => {
  return (
    <>
      <Divider variant={'fullWidth'} mb={'micro'} />
      <Box
        flexDirection="row"
        mb={"xxs"}
      >
        <Box flex={1}>
          <Typography fontSize={12} fontFamily={'nunitoSemiBold'}>Valor total da compra</Typography>
        </Box>
        <PriceCustom
          fontFamily={'nunitoSemiBold'}
          sizeInterger={14}
          sizeDecimal={11}
          num={totalPrice}
        />
      </Box>

      <Box
        flexDirection="row"
      >
        <Box flex={1}>
          <Typography fontSize={12} fontFamily={'nunitoSemiBold'}>{description}</Typography>
        </Box>
        <PriceCustom
          fontFamily={'nunitoSemiBold'}
          sizeInterger={14}
          sizeDecimal={11}
          color={color}
          num={paymentDifference}
        />
      </Box>
      <Divider variant={'fullWidth'} mt={'micro'} />
    </>
  );
};
interface ISelectPayment {
  iconLeft: string;
  title: string;
  divider?: boolean;
  onPress?: () => void;
}
const SelectPayment = ({
  iconLeft,
  title,
  divider,
  onPress,
}: ISelectPayment) => {
  return (
    <>
      <Button height={38} onPress={onPress}>
        <Box flexDirection={'row'}>
          <Icon name={iconLeft} color={'preto'} size={'20'} />
          <Box flex={1} marginLeft={'nano'}>
            <Typography variant={'tituloSessao'}>{title}</Typography>
          </Box>
          <Icon name={'ArrowProcced'} color={'preto'} size={'20'} />
        </Box>
      </Button>
      {divider && <Divider variant={'fullWidth'} marginY={'micro'} />}
    </>
  );
};


