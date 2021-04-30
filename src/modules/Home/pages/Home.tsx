import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Image, theme } from "reserva-ui";
import { images } from "../../../assets";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";

export const HomeScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { repositories } = useSelector((state: ApplicationState) => state);

  const deviceWidth = Dimensions.get("screen").width;

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <Box flex={1}>
      <TopBarDefault />
      <ScrollView>
        <Box alignItems="flex-start">
          <Box mb="quarck" width={1 / 1}>
            <Image
              autoHeight={true}
              width={deviceWidth}
              source={images.topBannerMock1}
            />
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <Image
              autoHeight={true}
              width={deviceWidth}
              source={images.homeMock2}
            />
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <Image
              autoHeight={true}
              width={deviceWidth}
              source={images.homeMock3}
            />
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <Image
              autoHeight={true}
              width={deviceWidth}
              source={images.homeMock1}
            />
          </Box>
          <Box width={1 / 1}>
            <Image
              autoHeight={true}
              width={deviceWidth}
              source={images.homeMock4}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
