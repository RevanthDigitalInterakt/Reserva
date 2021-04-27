import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  theme,
  Image,
  ProductVerticalListCard,
  Button,
  Typography,
  Icon,
} from "reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";
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
            <Box bg="dropDownBorderColor">
              <Button p="nano">
                <Box flexDirection="row">
                  <Icon name="Message" size={16} color="preto"></Icon>
                  <Box marginX="nano">
                    <Typography
                      color="preto"
                      fontFamily="nunitoSemiBold"
                      fontSize={11}
                    >
                      Chama no Whats! Seja atendido sem sair de casa. Clique
                      aqui!
                    </Typography>
                  </Box>
                </Box>
              </Button>
            </Box>
            <Box
              p="micro"
              flexDirection="row"
              flex={1}
              justifyContent="space-between"
            >
              <ProductVerticalListCard
                currency="R$"
                discountTag={18}
                imageSource={images.shirt3}
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                priceWithDiscount={297.0}
                isFavorited={true}
                onClickImage={() => {
                  navigation.navigate("ProductDetail");
                }}
              />
              <ProductVerticalListCard
                currency="R$"
                imageSource={images.shirt1}
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
              <ProductVerticalListCard
                currency="R$"
                discountTag={18}
                imageSource={images.shirt4}
                productTitle="CAMISETA BÁSICA RESERVA"
                installmentsNumber={3}
                installmentsPrice={99.9}
                price={345.0}
                priceWithDiscount={297.0}
                isFavorited={true}
              />
              <ProductVerticalListCard
                currency="R$"
                imageSource={images.shirt2}
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
