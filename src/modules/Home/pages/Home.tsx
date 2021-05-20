import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Image, theme } from "reserva-ui";
import { images } from "../../../assets";
import { ApplicationState } from "../../../store";

import { TopBarDefault } from "../../Menu/components/TopBarDefault";

export const HomeScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const deviceWidth = Dimensions.get("screen").width;

  useEffect(() => {}, []);

  return (
    <Box flex={1}>
      <TopBarDefault />
      <ScrollView>
        <Box alignItems="flex-start">
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("ProductCatalog");
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.topBannerMock1}
              />
            </TouchableHighlight>
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("ProductCatalog");
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock2}
              />
            </TouchableHighlight>
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("ProductCatalog");
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock3}
              />
            </TouchableHighlight>
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("ProductCatalog");
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock1}
              />
            </TouchableHighlight>
          </Box>
          <Box width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate("ProductCatalog");
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock4}
              />
            </TouchableHighlight>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
