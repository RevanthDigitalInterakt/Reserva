import { images } from "../../../assets/index";
import React from "react";
import { Box, Button, Image, Typography } from "reserva-ui";
import { Dimensions } from "react-native";

const {
  height: SCREEN_HEIGHT,
  width: SCREEN_WIDTH,
} = Dimensions.get("window")

export const Maintenance = () => {
  const screen_MAINTENANCE = true
  return (
    screen_MAINTENANCE && (
      <Box
        position="absolute"
        zIndex={10}
        flex={1}
        height={SCREEN_HEIGHT}
        width={SCREEN_WIDTH}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <Box
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            source={images.foraDoAr}
            // width={250}
            // height={160}
            // resizeMode="contain"
            autoHeight
          />
          <Typography
            style={{
              marginTop: 42,
              paddingHorizontal: 60,
              lineHeight: 32
            }}
            textAlign="center"
            fontFamily='reservaSerifMedium'
            fontSize={20}
          >
            Estamos preparando algo especial para você
          </Typography>
          <Typography
            style={{
              marginTop: 37,
              paddingHorizontal: 40,
              lineHeight: 20
            }}
            textAlign="center"
            fontFamily='nunitoRegular'
            fontSize={13}

          >
            O app entrou em manutenção e voltará em breve. Mas caso precise de ajuda, é só chamar.
          </Typography>
        </Box>

        <Box
          width="100%"
          px={22}
        >
          <Button
            title="FALE CONOSCO"
            width="100%"
            onPress={() => { }}
            variant="primarioEstreitoOutline"
            mt={49}
            inline
          />
        </Box>
      </Box>)
  );
}
