import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
    Box,
    Button,
    ProductHorizontalListCard,
    Typography,
    Picker,
} from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { images } from "../../../assets";
import { WishListCategory } from "./WishListCategory";

export const ShowListByCategory: React.FC<{}> = () => {
    const [showWishListCategory, setShowWishListCategory] = useState(false);
    const [sorterVisible, setSorterVisible] = React.useState(false);
    return (
        <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
            <TopBarBackButton showShadow />
            <ScrollView>
                <Box marginTop="md" paddingBottom="xxxs">
                    <Box paddingX="xxxs">
                        <Typography variant="tituloSessoes">Camisas</Typography>
                    </Box>
                    <Box paddingX="xxxs">
                        <Box marginTop="xxxs" height={147}>
                            <ProductHorizontalListCard
                                currency={"R$"}
                                discountTag={18}
                                isFavorited
                                itemColor="Branca"
                                ItemSize="41"
                                productTitle="Camiseta Básica Reserva "
                                installmentsNumber={3}
                                installmentsPrice={99.9}
                                price={345.0}
                                priceWithDiscount={297.0}
                                onClickFavorite={() => { }}
                                onClickBagButton={() => { }}
                                onClickPiker={() => {
                                    setSorterVisible(true);
                                }}
                                imageSource={images.shirt3}
                            />
                        </Box>
                        <Box marginTop="xxxs" height={147}>
                            <ProductHorizontalListCard
                                isFavorited
                                currency={"R$"}
                                itemColor="Cinza"
                                ItemSize="36"
                                productTitle="Camiseta Maquinetada"
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
                                isFavorited
                                currency={"R$"}
                                discountTag={18}
                                itemColor="Branca"
                                ItemSize="41"
                                productTitle="Camiseta Básica Reserva"
                                installmentsNumber={3}
                                installmentsPrice={99.9}
                                price={345.0}
                                priceWithDiscount={297.0}
                                onClickFavorite={() => { }}
                                onClickBagButton={() => { }}
                                imageSource={images.shirt1}
                            />
                        </Box>
                        <Box marginTop="xxxs" height={147}>
                            <ProductHorizontalListCard
                                isFavorited
                                currency={"R$"}
                                discountTag={18}
                                itemColor="Branca"
                                ItemSize="41"
                                productTitle="Camiseta Básica Reserva"
                                installmentsNumber={3}
                                installmentsPrice={99.9}
                                price={345.0}
                                priceWithDiscount={297.0}
                                onClickFavorite={() => { }}
                                onClickBagButton={() => { }}
                                imageSource={images.shirt1}
                            />
                        </Box>

                    </Box>
                </Box>
            </ScrollView>
            <Picker
                onSelect={() => {
                    setSorterVisible(false);
                }}
                isVisible={sorterVisible}
                items={[
                    {
                        text: "38",
                    },
                    {
                        text: "40",
                    },
                    {
                        text: "41",
                    },
                    {
                        text: "42",
                    },
                    {
                        text: "43",
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
        </SafeAreaView>
    );
};
