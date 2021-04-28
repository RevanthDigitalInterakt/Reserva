import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
  Typography,
  Box,
  ProgressBar,
  ProductHorizontalListCard,
  Divider,
  Button,
  Icon,
  Toggle,
  TextField,
} from "reserva-ui";
import { PriceCustom } from "../components/PriceCustom";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";

export const BagScreen = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [lisProduct, setLisProduct] = useState([
    {
      discountTag: 18,
      itemColor: "Branca",
      ItemSize: "41",
      productTitle: "CAMISETA BÁSICA RESERVA",
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
      productTitle: "CAMISETA BÁSICA RESERVA",
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
          <Box variant={"container"}>
            <Box flexDirection="row">
              <Typography fontFamily={"nunitoSemiBold"} fontSize={13}>
                Faltam apenas R$29,90 para ganhar
              </Typography>
              <Typography> </Typography>
              <Typography
                variant={"precoPromocional2"}
                color={"vermelhoFechadoRSV"}
              >
                frete grátis
              </Typography>
            </Box>

            <Box width="100%" paddingX={"xxxs"}>
              <ProgressBar
                colorLabel={"fullBlack"}
                colorBar={"neutroFrio1"}
                colorProgress={"neutroFrio2"}
                value={90}
                max={100}
                showPercent={false}
                barHeight={5}
              />
            </Box>
          </Box>

          <Box bg={"white"} marginTop={"xxs"}>
            <Typography variant={"tituloSessoes"}>Sacola (2)</Typography>
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
          <Divider marginTop={"xs"} variant={"fullWidth"} />

          <Box flexDirection={"row"} marginY={"xxs"} alignItems={"center"}>
            <Box marginRight="micro">
              <Icon name={"Presente"} size={20} />
            </Box>
            <Box flex={1}>
              <Typography variant={"subtituloSessoes"}>
                Embalagem para presente
              </Typography>
            </Box>
            <Box marginLeft={"micro"}>
              <Toggle
                thumbColor={"vermelhoAlerta"}
                color={"preto"}
                value={false}
              />
            </Box>
          </Box>

          <Divider variant={"fullWidth"} />

          <Box
            flexDirection={"row"}
            marginTop={"xxs"}
            marginBottom={"xxxs"}
            alignItems={"center"}
          >
            <Box marginRight="micro">
              <Icon name={"Tag"} size={20} color="preto" />
            </Box>
            <Box flex={1}>
              <Typography variant={"subtituloSessoes"}>
                Código promocional{" "}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant={"tituloSessao"}>
              Insira aqui o código do vendedor(a) e/ou cupom de desconto.
            </Typography>
          </Box>
          <Box marginTop={"nano"} flexDirection={"row"}>
            <Box flex={1} marginRight={"micro"}>
              <TextField placeholder={"Insira o código"} />
            </Box>
            <Box>
              <Button
                width={"100%"}
                title={"APLICAR"}
                variant={"primarioEstreito"}
                disabled={false}
              />
            </Box>
          </Box>
          <Divider variant={"fullWidth"} marginY={"xs"} />
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
            <Typography variant={"precoAntigo3"}>Tortal</Typography>
            <PriceCustom
              fontFamily={"nunitoBold"}
              sizeInterger={20}
              sizeDecimal={11}
              num={1000.0}
            />
          </Box>
        </Box>
      </ScrollView>

      <Button
        onPress={() => navigation.navigate("DeliveryScreen")}
        title="IR PARA ENTREGA"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};
