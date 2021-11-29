import React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Image } from "reserva-ui";
import { images } from "../../../assets";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const SizeGuide: React.FC<{}> = () => {

  useEffect(() => { }, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box variant="container" flex={1} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant={"tituloSessoes"}>Guia de tamanhos</Typography>
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide1}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide2}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide2}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide3}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide4}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide5}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide6}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide7}
              height={291}
              resizeMode={"contain"}
            />
          </Box>

          <Box>
            <Image
              source={images.helpSizeGuide8}
              height={291}
              resizeMode={"contain"}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
