import React, { useEffect } from 'react';

import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Box, Icon, Typography } from '@usereservaapp/reserva-ui';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;
const SIZE_ICONS_CARDS = 20;

export const ClothingCare: React.FC<{}> = () => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box>
          <Box variant="container" pt="xs" paddingX="xxxs">
            <Box alignSelf="flex-start">
              <Typography variant="tituloSessoes">
                Cuidados com a roupa
              </Typography>
            </Box>

            <Box mb="xs" mt="xs" alignSelf="flex-start">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                "Joga na máquina e tá tudo certo!" Na, na, ni, na, não!
              </Typography>
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Saiba aqui o que fazer para manter a qualidade da sua peça
                reserva e prolongar ao máximo a vida útil das roupas. O pica-pau
                merece seu carinho!
              </Typography>
            </Box>

            <Box mb="nano">
              <Box
                backgroundColor="#000000"
                alignItems="center"
                justifyContent="center"
                width={windowWidth - 20}
                height={28}
              >
                <Typography
                  fontFamily="nunitoBold"
                  fontSize={3}
                  textAlign="center"
                  color="offWhite"
                >
                  LAVAR:
                </Typography>
              </Box>

              <Box mt="quarck" borderWidth="hairline" borderColor="neutroFrio1">
                <Box ml="nano" mt="nano" mb="nano">
                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mt="nano"
                    mb="micro"
                  >
                    <Icon
                      name="NotWash"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      NÃO DEVEM SER LAVADOS
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="Temp40"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA MÁXIMA DE 40°C
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="Temp60"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA MÁXIMA DE 60°C
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="Temp90"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA MÁXIMA DE 90°C
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="NormalCycleWash"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LAVAGEM EM CICLO NORMAL
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="ShortCycleWashing"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LAVAGEM EM CICLO CURTO
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="ManualWash"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LAVAGEM MANUAL
                    </Typography>
                  </Box>

                  <Box marginLeft="micro" mb="nano">
                    <Typography fontFamily="reservaSansBlack">
                      ROUPAS COLORIDAS DEVEM SER LAVADAS SEPARADAMENTE, JAMAIS
                      JUNTO COM ROUPAS BRANCAS!
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* {} */}

            <Box mb="nano">
              <Box
                backgroundColor="#000000"
                alignItems="center"
                justifyContent="center"
                width={windowWidth - 20}
                height={28}
              >
                <Typography
                  fontFamily="nunitoBold"
                  fontSize={3}
                  textAlign="center"
                  color="offWhite"
                >
                  SECAGEM:
                </Typography>
              </Box>

              <Box mt="quarck" borderWidth="hairline" borderColor="neutroFrio1">
                <Box ml="nano" mt="nano" mb="nano">
                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mt="nano"
                    mb="micro"
                  >
                    <Icon
                      name="MachineDry"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      SECAR EM MÁQUINA
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="AverageTemp"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA MÉDIA
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ModerateTemp"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA MODERADA
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="NotMachineDry"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      NÃO SECAR NA MÁQUINA
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="DryngOnTheShadowLinen"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      SECAGEM NO VARAL À SOMBRA
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="DryOnTheLine"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      SECAGEM NO VARAL
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="DryVerticallyDoNotTwist"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      SECAR NA VERTICAL, NÃO TORCER
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Icon
                      name="DryVerticallyDoNotTwistShadow"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      SECAR NA VERTICAL, NÃO TORCER À SOMBRA
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="DryHorizontallyToTheShadow"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      SECAR NA HORIZONTAL À SOMBRA
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* {} */}

            <Box mb="nano">
              <Box
                backgroundColor="#000000"
                alignItems="center"
                justifyContent="center"
                width={windowWidth - 20}
                height={28}
              >
                <Typography
                  fontFamily="nunitoBold"
                  fontSize={3}
                  textAlign="center"
                  color="offWhite"
                >
                  PASSAR:
                </Typography>
              </Box>

              <Box mt="quarck" borderWidth="hairline" borderColor="neutroFrio1">
                <Box ml="nano" mt="nano" mb="nano">
                  <Box
                    mt="nano"
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="Iron"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      PASSAR A FERRO
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="HighTemperature200"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA ALTA: 200°C
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="HighTemperature150"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA ALTA: 150°C
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="HighTemperature110"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TEMPERATURA ALTA: 110°C
                    </Typography>
                  </Box>

                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mb="micro"
                  >
                    <Icon
                      name="DoNotIron"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      NÃO PASSAR A FERRO
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* {} */}

            <Box mb="nano">
              <Box
                backgroundColor="#000000"
                alignItems="center"
                justifyContent="center"
                width={windowWidth - 20}
                height={28}
              >
                <Typography
                  fontFamily="nunitoBold"
                  fontSize={3}
                  textAlign="center"
                  color="offWhite"
                >
                  ALVEJAR:
                </Typography>
              </Box>

              <Box mt="quarck" borderWidth="hairline" borderColor="neutroFrio1">
                <Box ml="nano" mt="nano" mb="nano">
                  <Box
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    mt="nano"
                    mb="micro"
                  >
                    <Icon
                      name="Bleach"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">ALVEJAR</Typography>
                  </Box>
                  <Box
                    marginLeft="micro"
                    mb="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ShouldNotBetargeted"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      NÃO DEVE SER ALVEJADO
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* {} */}

            <Box mb="md">
              <Box
                backgroundColor="#000000"
                alignItems="center"
                justifyContent="center"
                width={windowWidth - 20}
                height={28}
              >
                <Typography
                  fontFamily="nunitoBold"
                  fontSize={3}
                  textAlign="center"
                  color="offWhite"
                >
                  LAVAGEM PROFISSIONAL:
                </Typography>
              </Box>

              <Box mt="quarck" borderWidth="hairline" borderColor="neutroFrio1">
                <Box ml="nano" mt="nano">
                  <Box
                    mt="nano"
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="DryClean"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPAR A SECO
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="DoNotDryClean"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      NÃO LIMPAR A SECO
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="AllSolvents"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      TODOS OS SOLVENTES
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ProfessionalCleaningPNormal"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA PROFISSIONAL P, NORMAL
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ProfessionalCleaningPGentle"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA PROFISSIONAL P, SUAVE
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ProfessionalCleaningFNormal"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA PROFISSIONAL F, NORMAL
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ProfessionalCleaningFGentle"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA PROFISSIONAL F, SUAVE
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ProfessionalCNormalWetCleaning"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA A ÚMIDO PROFISSIONAL, NORMAL
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Icon
                      name="ProfessionalWetCleaningSoft"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />
                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA A ÚMIDO PROFISSIONAL, SUAVE
                    </Typography>
                  </Box>

                  <Box
                    mb="micro"
                    marginLeft="micro"
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Icon
                      name="ProfessionalWetCleaningVerySoft"
                      size={SIZE_ICONS_CARDS}
                      marginRight="micro"
                      color="preto"
                    />

                    <Typography fontFamily="nunitoRegular">
                      LIMPEZA A ÚMIDO PROFISSIONAL, MUITO SUAVE
                    </Typography>
                  </Box>

                  <Box mt="micro" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
