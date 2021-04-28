import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <Box flex={1}>
      <TopBarDefault />
      <ScrollView>
        <Box
          variant="container"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Box pb="nano" width={1 / 1}>
            <Image source={images.topBannerMock1} width={1 / 1} />
          </Box>
          <Box pb="nano" width={1 / 1}>
            <Image source={images.homeMock2} width={1 / 1} />
          </Box>
          <Box pb="nano" width={1 / 1}>
            <Image source={images.homeMock3} width={1 / 1} />
          </Box>
          <Box pb="nano" width={1 / 1}>
            <Image source={images.homeMock1} width={1 / 1} />
          </Box>
          <Box width={1 / 1}>
            <Image source={images.homeMock4} width={1 / 1} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
