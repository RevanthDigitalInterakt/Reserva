import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
  Typography,
  Box,
  ProductHorizontalListCard,
  Divider,
  Button,
  Icon,
  Toggle,
  TextField,
  ProductVerticalListCard,
} from "reserva-ui";
import { animations } from "../../../assets";

import { PriceCustom } from "../components/PriceCustom";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";
import LottieView from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";
import ReactNativeModal from "react-native-modal";

type Props = StackScreenProps<RootStackParamList, "SummaryScreen">;

export const SummaryScreen = ({ navigation, route }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const lottieRef = useRef<AnimatedLottieView | null>(null);
  const [showLottie, setShowLottie] = React.useState(false);

  useEffect(() => {
    if (showLottie) {
      lottieRef.current?.play();
    }
  }, [showLottie]);

  const [lisProduct, setLisProduct] = useState([
    {
      discountTag: 18,
      itemColor: "Branca",
      ItemSize: "41",
      productTitle: "Camiseta Básica Reserva",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      itemColor: "Branca",
      ItemSize: "41",
      productTitle: "Camiseta Básica Reserva",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
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

  const paymentType = () => {
    const { paymentType } = route?.params;
    switch (paymentType) {
      case "Boleto":
        return (
          <Box flexDirection="row" alignItems="center">
            <Box mr="nano">
              <Icon name="Barcode" size={18} />
            </Box>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Boleto
            </Typography>
          </Box>
        );
      case "Credit":
        return (
          <Box flexDirection="row" alignItems="center">
            <Box mr="nano">
              <Icon name="Card" size={18} />
            </Box>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Cartão de crédito{"     "} **** 6582
            </Typography>
          </Box>
        );
      case "Debit":
        return (
          <Box flexDirection="row" alignItems="center">
            <Box mr="nano">
              <Icon name="Caixa" size={18} />
            </Box>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Cartão de Débito Virtual Caixa{"     "} **** 6582
            </Typography>
          </Box>
        );

      case "GiftCard":
        return (
          <Box flexDirection="row" alignItems="center">
            <Box mr="nano">
              <Icon name="Presente" size={18} />
            </Box>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Cartão Presente
            </Typography>
          </Box>
        );
      case "PIX":
        return (
          <Box flexDirection="row" alignItems="center">
            <Box mr="nano">
              <Icon name="Pix" size={18} />
            </Box>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              PIX
            </Typography>
          </Box>
        );
    }
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"xxs"}>
          <Box bg={"white"} marginTop={"xxs"}>
            <Typography variant="tituloSessoes">Resumo</Typography>
            <Box flexDirection="row" justifyContent="space-between" mt="xs">
              <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                Produtos
              </Typography>
              <Button onPress={() => {}} pb={"quarck"}>
                <Typography style={{ textDecorationLine: "underline" }}>
                  editar
                </Typography>
              </Button>
            </Box>
          </Box>

          {lisProduct.map((item, index) => (
            <Box key={index} bg={"white"} marginTop={"xxxs"}>
              <ProductHorizontalListCard
                currency={"R$"}
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

          <Divider marginTop={"xxxs"} variant={"fullWidth"} />
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
              <Button onPress={() => {}} pb={"quarck"}>
                <Typography style={{ textDecorationLine: "underline" }}>
                  editar
                </Typography>
              </Button>
            </Box>
            <Box>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                R. Tomás Antônio Gonzaga -{" "}
              </Typography>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                Cristóvão Colombo, Vila Velha - ES
              </Typography>
            </Box>
          </Box>

          <Divider marginTop={"xxxs"} variant={"fullWidth"} />
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
              <Button onPress={() => {}} pb={"quarck"}>
                <Typography style={{ textDecorationLine: "underline" }}>
                  editar
                </Typography>
              </Button>
            </Box>
            {paymentType()}
          </Box>

          <Divider marginTop={"xxxs"} variant={"fullWidth"} />

          <Box mt="xxs">
            <Box
              marginBottom={"micro"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant={"precoAntigo3"}>Subtotal</Typography>
              <PriceCustom
                fontFamily={"nunitoSemiBold"}
                sizeInterger={15}
                sizeDecimal={11}
                num={1254.0}
              />
            </Box>
            <Box
              marginBottom={"micro"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant={"precoAntigo3"}>Descontos</Typography>

              <PriceCustom
                fontFamily={"nunitoSemiBold"}
                negative={true}
                sizeInterger={15}
                sizeDecimal={11}
                num={254.0}
              />
            </Box>
            <Box
              marginBottom={"micro"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant={"precoAntigo3"}>Total</Typography>
              <PriceCustom
                fontFamily={"nunitoBold"}
                sizeInterger={20}
                sizeDecimal={11}
                num={1000.0}
              />
            </Box>
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
        backdropColor={"black"}
        animationInTiming={300}
        animationIn="fadeIn"
        animationOut="fadeIn"
      >
        <LottieView
          style={{ flex: 1 }}
          onAnimationFinish={() => {
            setShowLottie(false);
            navigation.navigate("PurchaseConfirmationScreen", {
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
