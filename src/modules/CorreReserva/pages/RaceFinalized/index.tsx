import React from "react"
import { ImageSourcePropType, ImageBackground, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Image, theme, Typography } from "reserva-ui"
import { images } from "../../../../assets";
import { backgroundColor, margin, marginRight } from "styled-system"
import { HeaderCorreReserva } from "../../components/HeaderCorreReserva"
import { Counter } from "../../components/Counter"
export interface RaceFinalizedProps {

}

export const RaceFinalized: React.FC<RaceFinalizedProps> = ({

}) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <ImageBackground
        source={images.raceImageBackground}
        style={{ width: "100%", height: "100%", }}
        resizeMode="contain"
      >
        <ScrollView>
          <HeaderCorreReserva />
          <Box justifyContent='center' alignItems='center' marginTop={30}>
            <Typography
              color='white'
              fontFamily='reservaSerifBoldItalic'
              fontSize={50}
              letterSpacing={-2.5}
              textAlign='center'
            >
              {` Parabéns! `}
            </Typography>
            <Typography
              fontFamily='reservaSerifLight'
              fontSize={15}
              color='white'
              lineHeight={19}
              textAlign='center'
            >
              Sua corrida contribuiu com
            </Typography>

            <Box
              alignItems='center'
            >
              <Typography
                color='white'
                fontFamily='reservaSerifBold'
                fontSize={152}
              >
                {`25`}
              </Typography>

              <Box
                position='absolute'
                bottom={-15}
              >
                <Typography
                  color='white'
                  fontFamily='reservaSerifThin'
                  fontSize={29}
                >
                  Pratos viabilizados
                </Typography>
              </Box>
            </Box>
          </Box>
          <Counter
            hours="0"
            minutes="00"
            seconds="00"
            distance="00.0"
            rhythm="0.0"
            plates="00"
          />
          <Box paddingTop={25}>
            <Typography
              color='white'
              fontFamily='reservaSansRegular'
              fontSize={16}
              textAlign='center'

            >
              Compartilhe nas suas redes:
            </Typography>
            <Box
              marginTop={10}
              marginBottom={26}
              flexDirection='row'
              justifyContent='center'
            >
              <SocialButton
                image={images.instagram}

              />
              <SocialButton
                image={images.whatsapp}
              />
              <SocialButton
                image={images.facebook}
              />
              <SocialButton
                image={images.twitter}
              />
            </Box>
            <TouchableOpacity
              style={{
                marginHorizontal: 49,
                flexGrow: 1,
                height: 50,
                backgroundColor: '#11AB6B',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                color='white'
                fontSize={13}
                fontFamily='nunitoSemiBold'
                letterSpacing={0.16}
                style={{ textTransform: 'uppercase' }}
              >
                IR PARA A HOME
              </Typography>
            </TouchableOpacity>

          </Box>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView >
  )
}

interface ISocialButton {
  image: ImageSourcePropType;
}
const SocialButton = ({ image }: ISocialButton) => {
  return (
    <Box
      style={{
        marginHorizontal: 7.5,

      }}
    >
      <TouchableOpacity
        style={{
          borderRadius: 31,
          overflow: "hidden",
        }}
      >
        <Image source={image} resizeMode='cover' size={32} />
      </TouchableOpacity>
    </Box>
  )
}