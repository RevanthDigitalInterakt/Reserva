import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon,  } from "reserva-ui";
import { images } from "../../../assets";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const SizeGuide: React.FC<{}> = () => {
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
        <Box variant="container" flex={1} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={'micro'} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>Guia de tamanhos</Typography>
          </Box>

          <Box mt={"xxxs"}>
            <Box width={1 / 1}>
              <Image source={images.helpSizeGuide1} width={1 / 1} resizeMode={'contain'} />
            </Box>

            <Box width={1 / 1}>
              <Image source={images.helpSizeGuide2} width={1 / 1} />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
