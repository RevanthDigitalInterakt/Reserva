import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Button, Icon, Divider } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";

export const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box marginBottom={"xxs"}>
            <Typography variant="tituloSessoes">
              Selecione a forma de pagamento
            </Typography>
          </Box>

          <SelectPayment
            iconLeft={"Card"}
            title={"Cartão de crédito"}
            onPress={() =>
              navigation.navigate("ListCards", { isCheckout: true })
            }
            divider
          />

          <SelectPayment
            iconLeft={"Barcode"}
            title={"Boleto bancário"}
            onPress={() => Alert.alert("Boleto")}
            divider
          />

          <SelectPayment
            iconLeft={"Presente"}
            title={"Cartão presente"}
            onPress={() => {
              navigation.navigate("GiftVoucherScreen");
            }}
            divider
          />

          <SelectPayment
            iconLeft={"Pix"}
            title={"PIX"}
            onPress={() => navigation.navigate("PixScreen")}
            divider
          />

          <SelectPayment
            iconLeft={"Caixa"}
            title={"Cartão de Débito Virtual Caixa"}
            onPress={() => navigation.navigate("VirtualDebitCardCaixaScreen")}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
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
        <Box flexDirection={"row"}>
          <Icon name={iconLeft} color={"preto"} size={"20"} />
          <Box flex={1} marginLeft={"nano"}>
            <Typography variant={"tituloSessao"}>{title}</Typography>
          </Box>
          <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
        </Box>
      </Button>
      {divider && <Divider variant={"fullWidth"} marginY={"micro"} />}
    </>
  );
};
