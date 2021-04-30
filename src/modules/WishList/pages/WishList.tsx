import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, Button, ProductHorizontalListCard, Typography } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { images } from "../../../assets";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";

export const WishList: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <TopBarDefaultBackButton showShadow />
        <Box paddingX="xxxs" marginTop="xs">
          <Box marginTop="xxxs">
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Lista de desejos
            </Typography>
          </Box>
          <Box marginTop="xxxs" flexDirection="row">
            <Box width={1 / 2}>
              <Button
                title="Todos os items"
                height={32}
                color="white"
                fontSize={12}
                bg="neutroFrio2"
                marginRight="nano"
                inline
              />
            </Box>
            <Box width={1 / 2}>
              <Button
                marginLeft="nano"
                color="preto"
                height={32}
                onPress={() => navigation.navigate("WishListCategory")}
                borderColor="preto"
                borderWidth={1}
                title="Minhas categorias"
                inline
              />
            </Box>
          </Box>
          <Box marginTop="xxxs">
            <ProductHorizontalListCard
              currency={"R$"}
              discountTag={18}
              isFavorited
              itemColor="Branca"
              ItemSize="41"
              productTitle="CAMISETA BÁSICA RESERVA"
              installmentsNumber={3}
              installmentsPrice={99.9}
              price={345.0}
              priceWithDiscount={297.0}
              onClickFavorite={() => {}}
              onClickBagButton={() => {}}
              imageSource={images.shirt3}
            />
          </Box>
          <Box marginTop="xxxs">
            <ProductHorizontalListCard
              currency={"R$"}
              itemColor="Cinza"
              ItemSize="36"
              productTitle="CAMISETA MAQUINETADA"
              installmentsNumber={3}
              installmentsPrice={79.66}
              price={345.0}
              onClickFavorite={() => {}}
              onClickBagButton={() => {}}
              imageSource={images.shirt4}
            />
          </Box>
          <Box marginTop="xxxs">
            <ProductHorizontalListCard
              currency={"R$"}
              discountTag={18}
              itemColor="Branca"
              ItemSize="41"
              productTitle="CAMISETA BÁSICA RESERVA"
              installmentsNumber={3}
              installmentsPrice={99.9}
              price={345.0}
              priceWithDiscount={297.0}
              onClickFavorite={() => {}}
              onClickBagButton={() => {}}
              imageSource={images.shirt1}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
