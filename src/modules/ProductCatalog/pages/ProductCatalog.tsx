import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Component, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  theme,
  Image,
  ProductListCard,
} from "reserva-ui";
import { backgroundColor } from "styled-system";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";

type Props = StackScreenProps<RootStackParamList, "ProductCatalog">;

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const { safeArea } = route.params;

  const dispatch = useDispatch();

  const { repositories } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const DynamicComponent = safeArea ? SafeAreaView : Box;

  return (
    <DynamicComponent
      style={{ backgroundColor: safeArea ? theme.colors.white : null }}
      flex={1}
    >
      {safeArea ? <TopBarDefaultBackButton /> : <TopBarDefault />}
      <ScrollView>
        <Box
          bg="white"
          variant="container"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Box width={1 / 1}>
            <Image
              source={safeArea ? images.bannerCatalog : images.bannerOffer}
              width={1 / 1}
            />
            <Box
              p="micro"
              flexDirection="row"
              flex={1}
              justifyContent="space-between"
            >
              <ProductListCard
                currency="R$"
                discountTag={18}
                imageSource="https://via.placeholder.com/163x248"
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                priceWithDiscount={297.0}
                isFavorited={true}
              />
              <ProductListCard
                currency="R$"
                imageSource="https://via.placeholder.com/163x248"
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                isFavorited={false}
              />
            </Box>
            <Box
              p="micro"
              flexDirection="row"
              flex={1}
              justifyContent="space-between"
            >
              <ProductListCard
                currency="R$"
                discountTag={18}
                imageSource="https://via.placeholder.com/163x248"
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                priceWithDiscount={297.0}
                isFavorited={true}
              />
              <ProductListCard
                currency="R$"
                imageSource="https://via.placeholder.com/163x248"
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                isFavorited={false}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </DynamicComponent>
  );
};
