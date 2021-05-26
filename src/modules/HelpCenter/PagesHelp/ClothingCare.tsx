import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon, Image } from "reserva-ui";
import { images } from "../../../assets";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
export const ClothingCare: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => { }, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView >
        <Box variant="container" pt={"xs"} paddingX={"xxxs"} >
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant={"tituloSessoes"}>
              Cuidados com a roupa
            </Typography>
          </Box>

          <Box mb={"xxxs"} >
            <Typography fontFamily={"nunitoRegular"} fontSize={13}>
              Joga na máquina e tá tudo certo!" Na, na, ni, na, não! Saiba aqui
              o que fazer para manter a qualidade da sua peça reserva e
              prolongar ao máximo a vida útil das roupas. O pica-pau merece seu
              carinho!
            </Typography>
          </Box>
          <Box >
            <Image
              source={images.clothingCareWash}
              // resizeMode={"contain"}
              height={windowWidth - 20}
              width={windowWidth - 20}
            />
          </Box>

          <Box marginTop="quarck">
            <Image
              source={images.clothingCareDrying}
              // resizeMode={"contain"}
              height={windowWidth - 20}
              width={windowWidth - 20}
            />
          </Box>
          <Box marginTop="quarck">
            <Image
              source={images.clothingCarePass}
              // resizeMode={"contain"}
              resizeMode={"contain"}
              height={windowWidth - 150}
              width={windowWidth - 20}
            />
          </Box>
          <Box marginTop="quarck">
            <Image
              source={images.clothingCareBleach}
              resizeMode={"contain"}
              height={windowWidth - 250}
              width={windowWidth - 20}
            />
          </Box>
          <Box marginTop="quarck" marginBottom="quarck">
            <Image
              source={images.clothingCareProfessionalWashing}
              // resizeMode={"contain"}
              height={windowWidth - 20}
              width={windowWidth - 20}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
