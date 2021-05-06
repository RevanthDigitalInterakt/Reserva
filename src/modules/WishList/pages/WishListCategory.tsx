import React from "react";
import { Dimensions, Platform, } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import {
  Box,
  Icon,
  Typography,
  Image,
  Button,
} from "reserva-ui";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets";

const screenWidth = Dimensions.get("window").width;

export const WishListCategory: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>

      <ScrollView>

        <Box
          paddingX="xxxs"
          paddingY="xxs"
          bg="backgroundMenuOpened"
          width="100%"
          height="100%"
          flexDirection="column"
          marginTop="xxxs"
        >
          <Button
            onPress={() => { navigation.navigate("ShowListByCategory") }}
            boxShadow={Platform.OS == "android" ? null : "topBarShadow"}
            style={{ elevation: Platform.OS == "android" ? 5 : null }}
            paddingX="xxxs"
            paddingY="xxxs"
            bg="white"
            flexDirection="row"
          >
            <Box flex={1}>
              <Box flexDirection="row" justifyContent="space-between">
                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  Camisas
              </Typography>
                <Icon color="preto" name="ArrowProcced" size={16} />
              </Box>
              <Box flexDirection="row">
                <Typography fontFamily="nunitoRegular" fontSize={12}>
                  itens(5)
              </Typography>
              </Box>
              <Box flexDirection="row" marginTop="xxxs">
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
              </Box>
            </Box>
          </Button>

          <Button
            onPress={() => { navigation.navigate("ShowListByCategory") }}
            boxShadow={Platform.OS == "android" ? null : "topBarShadow"}
            style={{ elevation: Platform.OS == "android" ? 5 : null }}
            paddingX="xxxs"
            paddingY="xxxs"
            bg="white"
            marginTop="xxs"
            flexDirection="row"
          >
            <Box flex={1}>
              <Box flexDirection="row" justifyContent="space-between">
                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  Sapatos
              </Typography>
                <Icon color="preto" name="ArrowProcced" size={16} />
              </Box>
              <Box flexDirection="row">
                <Typography fontFamily="nunitoRegular" fontSize={12}>
                  itens(2)
              </Typography>
              </Box>
              <Box flexDirection="row" marginTop="xxxs">
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt2}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
              </Box>
            </Box>
          </Button>

          <Button
            onPress={() => { navigation.navigate("ShowListByCategory") }}
            boxShadow={Platform.OS == "android" ? null : "topBarShadow"}
            style={{ elevation: Platform.OS == "android" ? 5 : null }}
            paddingX="xxxs"
            paddingY="xxxs"
            bg="white"
            marginTop="xxs"
            flexDirection="row"
          >
            <Box flex={1}>
              <Box flexDirection="row" justifyContent="space-between">
                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  Camisas
              </Typography>
                <Icon color="preto" name="ArrowProcced" size={16} />
              </Box>
              <Box flexDirection="row">
                <Typography fontFamily="nunitoRegular" fontSize={12}>
                  itens(5)
              </Typography>
              </Box>
              <Box flexDirection="row" marginTop="xxxs">
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
                <Box marginRight="micro">
                  <Image
                    source={images.shirt1}
                    height={97}
                    width={(screenWidth - 116) / 4}
                  />
                </Box>
              </Box>
            </Box>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView >
  );
};
