import React, { useEffect } from 'react';
import {
  Dimensions, SafeAreaView, ScrollView,
} from 'react-native';

import { Box } from '../../../components/Box/Box';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import useOpenLink from '../../../hooks/useOpenLink';

const windowWidth = Dimensions.get('window').width;
const SIZE_ICONS_CARDS = 20;

export function ClothingCare() {
  useEffect(() => {}, []);
  const openLink = useOpenLink();

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
              <Box mb="nano">
                <Typography fontFamily="nunitoBold" fontSize={18}>
                  Como lavar a peça de roupa
                </Typography>
              </Box>
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                O processo de lavagem e conservação do produto pode variar de
                peça para peça, de acordo com o material utilizado na confecção.
                Você encontra as especificações de cada uma nas etiquetas
                internas. Basta verificar a imagem na etiqueta e verificar no
                quadro no link abaixo o significado de cada uma delas.
              </Typography>
            </Box>

            <Box mb="nano">
              <Box
                backgroundColor="fullBlack"
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                backgroundColor="fullBlack"
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                backgroundColor="fullBlack"
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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

            <Box mb="nano">
              <Box
                backgroundColor="fullBlack"
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
                    <IconLegacy
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
                    <IconLegacy
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

            <Box mb="nano">
              <Box
                backgroundColor="fullBlack"
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
                    <IconLegacy
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
            <Box mb="xs" mt="xs" alignSelf="flex-start">
              <Box mb="nano">
                <Typography fontFamily="nunitoBold" fontSize={18}>
                  Ficou com alguma dúvida? 😉
                </Typography>
              </Box>
              <Box mb="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  Um de nossos encantadores pode te ajudar, basta acessar um dos
                  links abaixo:
                </Typography>
              </Box>
              <Box mb="nano">
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={16}
                  onPress={() => openLink('urlWhatsapp')}
                  style={{
                    textDecorationLine: 'underline',
                    paddingVertical: 4,
                  }}
                >
                  Whatsapp
                </Typography>
              </Box>
              <Typography
                fontFamily="nunitoRegular"
                fontSize={16}
                onPress={() => openLink('urlContact')}
                style={{ textDecorationLine: 'underline', paddingVertical: 4 }}
              >
                Fale conosco
              </Typography>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
