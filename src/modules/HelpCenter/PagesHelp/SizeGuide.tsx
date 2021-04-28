import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon, Image } from "reserva-ui";
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
          <Box mb={"micro"} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Guia de tamanhos
            </Typography>
          </Box>

          <Box mt={"xxxs"}>
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide1}
                height={291}
                resizeMode={"contain"}
                width={Dimensions.get("screen").width}
              />
            </Box>
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide2}
                height={291}
                resizeMode={"contain"}
                width={Dimensions.get("screen").width}
              />
            </Box>
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide3}
                height={291}
                resizeMode={"contain"}
              />
            </Box>
            
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide4}
                height={291}
                resizeMode={"contain"}
              />
            </Box>

            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide5}
                height={291}
                resizeMode={"contain"}
              />
            </Box>
            
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide6}
                height={291}
                resizeMode={"contain"}
              />
            </Box>
            
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide7}
                height={291}
                resizeMode={"contain"}
              />
            </Box>
            
            <Box width={1 / 1}>
              <Image
                source={images.helpSizeGuide8}
                height={291}
                resizeMode={"contain"}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
