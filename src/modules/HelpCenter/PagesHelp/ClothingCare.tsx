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

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box variant="container" pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant={"tituloSessoes"}>
              Cuidados com a roupa
            </Typography>
          </Box>

          <Box mb={"xxxs"}>
            <Typography fontFamily={"nunitoRegular"} fontSize={13}>
              Joga na máquina e tá tudo certo!" Na, na, ni, na, não! Saiba aqui
              o que fazer para manter a qualidade da sua peça reserva e
              prolongar ao máximo a vida útil das roupas. O pica-pau merece seu
              carinho!
            </Typography>
          </Box>
          <Box mb={"md"}>
            <Box
              backgroundColor="#000000"
              alignItems="center"
              justifyContent="center"
              width={windowWidth - 20}
              height={28}
            >
              <Typography
                fontFamily={"nunitoBold"}
                fontSize={4}
                textAlign="center"
                color="offWhite"
              >
                Lavar:
              </Typography>
            </Box>
            <Box mt="micro">
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVEM SER LAVADOS
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 40°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 60°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 90°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO NORMAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO CURTO
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM MANUAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"} marginTop={"micro"}>
                <Typography fontFamily="reservaSansBlack">
                  ROUPAS COLORIDAS DEVEM SER LAVADAS SEPARADAMENTE, JAMAIS JUNTO
                  COM ROUPAS BRANCAS!
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* {} */}

          <Box mb={"md"}>
            <Box
              backgroundColor="#000000"
              alignItems="center"
              justifyContent="center"
              width={windowWidth - 20}
              height={28}
            >
              <Typography
                fontFamily={"nunitoBold"}
                fontSize={4}
                textAlign="center"
                color="offWhite"
              >
                SECAGEM:
              </Typography>
            </Box>
            <Box mt="micro">
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVEM SER LAVADOS
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 40°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 60°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 90°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO NORMAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO CURTO
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM MANUAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}></Box>
            </Box>
          </Box>

          {/* {} */}

          <Box mb={"md"}>
            <Box
              backgroundColor="#000000"
              alignItems="center"
              justifyContent="center"
              width={windowWidth - 20}
              height={28}
            >
              <Typography
                fontFamily={"nunitoBold"}
                fontSize={4}
                textAlign="center"
                color="offWhite"
              >
                PASSAR:
              </Typography>
            </Box>
            <Box mt="micro">
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVEM SER LAVADOS
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 40°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 60°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 90°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO NORMAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO CURTO
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM MANUAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}></Box>
            </Box>
          </Box>

          {/* {} */}

          <Box mb={"md"}>
            <Box
              backgroundColor="#000000"
              alignItems="center"
              justifyContent="center"
              width={windowWidth - 20}
              height={28}
            >
              <Typography
                fontFamily={"nunitoBold"}
                fontSize={4}
                textAlign="center"
                color="offWhite"
              >
                ALVEJAR:
              </Typography>
            </Box>
            <Box mt="micro">
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVEM SER LAVADOS
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 40°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 60°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 90°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO NORMAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO CURTO
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM MANUAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}></Box>
            </Box>
          </Box>

          {/* {} */}

          <Box mb={"md"}>
            <Box
              backgroundColor="#000000"
              alignItems="center"
              justifyContent="center"
              width={windowWidth - 20}
              height={28}
            >
              <Typography
                fontFamily={"nunitoBold"}
                fontSize={4}
                textAlign="center"
                color="offWhite"
              >
                LAVAGEM PROFISSIONAL:
              </Typography>
            </Box>
            <Box mt="micro">
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVEM SER LAVADOS
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 40°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 60°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 90°C
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO NORMAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO CURTO
                </Typography>
              </Box>
              <Box marginLeft={"sm"}>
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM MANUAL
                </Typography>
              </Box>
              <Box marginLeft={"sm"}></Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
