import React, { useEffect } from "react";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { Box, Icon, Typography } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

const windowWidth = Dimensions.get("window").width;
const windowheight = Dimensions.get("window").height;
export const ClothingCare: React.FC<{}> = () => {
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
          <Box mb={"nano"}>
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
              <Box marginLeft="micro" flexDirection="row" alignItems="center">
                <Icon
                  name="NotWash"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVEM SER LAVADOS
                </Typography>
              </Box>

              <Box marginLeft="micro" flexDirection="row" alignItems="center">
                <Icon
                  name="Temp40"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 40°C
                </Typography>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="Temp60"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 60°C
                </Typography>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="Temp90"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÁXIMA DE 90°C
                </Typography>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="NormalCycleWash"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO NORMAL
                </Typography>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="ShortCycleWashing"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LAVAGEM EM CICLO CURTO
                </Typography>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="ManualWash"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
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

          <Box mb={"nano"}>
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
            <Box mt="micro" mb="nano">
              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="MachineDry"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  SECAR EM MÁQUINA
                </Typography>
              </Box>
              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="AverageTemp"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MÉDIA
                </Typography>
              </Box>
              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ModerateTemp"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA MODERADA
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="NotMachineDry"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  NÃO SECAR NA MÁQUINA
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="DryngOnTheShadowLinen"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  SECAGEM NO VARAL À SOMBRA
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="DryOnTheLine"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  SECAGEM NO VARAL
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="DryVerticallyDoNotTwist"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  SECAR NA VERTICAL, NÃO TORCER
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
              >
                <Icon
                  name="DryVerticallyDoNotTwistShadow"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  SECAR NA VERTICAL, NÃO TORCER
                </Typography>
                <Box marginLeft={"xs"}>
                  <Typography fontFamily="nunitoRegular">À SOMBRA</Typography>
                </Box>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="DryHorizontallyToTheShadow"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  SECAR NA HORIZONTAL À SOMBRA
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* {} */}

          <Box mb={"nano"}>
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
              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon name="Iron" size={20} marginRight="micro" color="preto" />
                <Typography fontFamily="nunitoRegular">
                  PASSAR A FERRO
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="HighTemperature200"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA ALTA: 200°C
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="HighTemperature150"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA ALTA: 150°C
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="HighTemperature110"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TEMPERATURA ALTA: 110°C
                </Typography>
              </Box>

              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="DoNotIron"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  NÃO PASSAR A FERRO
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* {} */}

          <Box mb={"nano"}>
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
              <Box marginLeft={"micro"} flexDirection="row" alignItems="center">
                <Icon
                  name="Bleach"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">ALVEJAR</Typography>
              </Box>
              <Box
                marginLeft={"micro"}
                mt={"quarck"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ShouldNotBetargeted"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  NÃO DEVE SER ALVEJADO
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
                LAVAGEM PROFISSIONAL:
              </Typography>
            </Box>
            <Box mt="micro">
              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="DryClean"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPAR A SECO
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="DoNotDryClean"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  NÃO LIMPAR A SECO
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="AllSolvents"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  TODOS OS SOLVENTES
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ProfessionalCleaningPNormal"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPEZA PROFISSIONAL P, NORMAL
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ProfessionalCleaningPGentle"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPEZA PROFISSIONAL P, SUAVE
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ProfessionalCleaningFNormal"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPEZA PROFISSIONAL F, NORMAL
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ProfessionalCleaningFGentle"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPEZA PROFISSIONAL F, SUAVE
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ProfessionalCNormalWetCleaning"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPEZA A ÚMIDO PROFISSIONAL, NORMAL
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
              >
                <Icon
                  name="ProfessionalWetCleaningSoft"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />
                <Typography fontFamily="nunitoRegular">
                  LIMPEZA A ÚMIDO PROFISSIONAL, SUAVE
                </Typography>
              </Box>

              <Box
                mb="quarck"
                marginLeft={"micro"}
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
              >
                <Icon
                  name="ProfessionalWetCleaningVerySoft"
                  size={20}
                  marginRight="micro"
                  color="preto"
                />

                <Typography fontFamily="nunitoRegular">
                  LIMPEZA A ÚMIDO PROFISSIONAL,
                </Typography>
                <Box marginLeft={"xs"}>
                  <Typography fontFamily="nunitoRegular">
                    MUITO SUAVE
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
