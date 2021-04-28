import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon, Image } from "reserva-ui";
import { images } from "../../../assets";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const ClothingCare: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box bg="red" variant="container" flex={1} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"micro"} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Cuidados com a roupa
            </Typography>
          </Box>

          <Box>
            <Typography fontFamily={"nunitoRegular"} fontSize={13}>
              Joga na máquina e tá tudo certo!" Na, na, ni, na, não! 
              Saiba aqui o que fazer para manter a qualidade da sua peça reserva e prolongar ao 
              máximo a vida útil das roupas. O pica-pau merece seu carinho!
            </Typography>
          </Box>

          <Image
            source={images.clothingCare1}
            resizeMode={"contain"}
          />

          <Image
            source={images.clothingCare2}
            height={450}
            resizeMode={"contain"}
          />


        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
