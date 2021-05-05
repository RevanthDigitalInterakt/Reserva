import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, Button, ProductHorizontalListCard, Typography, Picker } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { images } from "../../../assets";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";
import { WishListCategory } from "./WishListCategory";

export const WishList: React.FC<{}> = () => {
  const [showWishListCategory, setShowWishListCategory] = useState(false);
  const [sorterVisible, setSorterVisible] = React.useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Picker
          onSelect={() => {
            setSorterVisible(false);
          }}
          isVisible={sorterVisible}
          items={[
            {
              text: '38',
            },
            {
              text: '40',
            },
            {
              text: '41',
            },
            {
              text: '42',
            },
            {
              text: '43',
            },
          ]}
          onConfirm={() => {
            setSorterVisible(false);
          }}
          onClose={() => {
            setSorterVisible(false);
          }}
          title="Tamanho"
        />
        <Box paddingX="xxxs" marginTop="md" paddingBottom="xxxs">
          <Box>
            <Typography variant="tituloSessoes">Lista de desejos</Typography>
          </Box>
          <Box marginTop="xxxs" flexDirection="row">
            <Box width={1 / 2}>
              <Button
                onPress={() => { setShowWishListCategory(false) }}
                title="Todos os itens"
                height={32}
                color={showWishListCategory ? "preto" : "white"}
                fontFamily="nunitoRegular"
                borderColor={showWishListCategory ? "preto" : null}
                borderWidth={showWishListCategory ? 1 : null}
                fontSize={12}
                bg={showWishListCategory === false ? "neutroFrio2" : null}
                marginRight="nano"
                inline
              />
            </Box>
            <Box width={1 / 2}>
              <Button
                marginLeft="nano"
                color={showWishListCategory ? "white" : "preto"}
                height={32}
                onPress={() => { setShowWishListCategory(true) }}
                borderColor={showWishListCategory ? null : "preto"}
                borderWidth={showWishListCategory ? null : 1}
                fontSize={12}
                bg={showWishListCategory ? "neutroFrio2" : null}
                fontFamily="nunitoRegular"
                title="Minhas categorias"
                inline
              />
            </Box>
          </Box>
          {showWishListCategory === false ?
            <>
              <Box marginTop="xxxs" height={147}>
                <ProductHorizontalListCard
                  currency={"R$"}
                  discountTag={18}
                  isFavorited
                  itemColor="Branca"
                  ItemSize="41"
                  productTitle="CAMISETA BÁSICA RESERVA "
                  installmentsNumber={3}
                  installmentsPrice={99.9}
                  price={345.0}
                  priceWithDiscount={297.0}
                  onClickFavorite={() => { }}
                  onClickBagButton={() => { }}
                  onClickPiker={() => { setSorterVisible(true); }}
                  imageSource={images.shirt3}
                />
              </Box>
              <Box marginTop="xxxs" height={147}>
                <ProductHorizontalListCard
                  currency={"R$"}
                  itemColor="Cinza"
                  ItemSize="36"
                  productTitle="CAMISETA MAQUINETADA"
                  installmentsNumber={3}
                  installmentsPrice={79.66}
                  price={345.0}
                  onClickFavorite={() => { }}
                  onClickBagButton={() => { }}
                  imageSource={images.shirt4}
                />
              </Box>
              <Box marginTop="xxxs" height={147}>
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
                  onClickFavorite={() => { }}
                  onClickBagButton={() => { }}
                  imageSource={images.shirt1}
                />
              </Box>
            </>
            :
            <WishListCategory />
          }
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
