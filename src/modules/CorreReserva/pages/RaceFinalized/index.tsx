import React, { useEffect, useState, useRef } from "react"
import { ImageSourcePropType, ImageBackground, ScrollView, Platform, Linking } from "react-native"
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Image, Typography } from "reserva-ui"
import { images } from "../../../../assets";
import { HeaderCorreReserva } from "../../components/HeaderCorreReserva"
import { Counter } from "../../components/Counter"
export interface RaceFinalizedProps {

}

export const RaceFinalized: React.FC<RaceFinalizedProps> = ({ }) => {

  const viewRef = useRef();
  const [showInstagramStory, setShowInstagramStory] = useState(false);
  const [hasWhatsApp, setHasWhatsApp] = useState(false);
  const [hasFacebook, setHasFacebook] = useState(false);
  const [hasTwitter, setHasTwitter] = useState(false);
  useEffect(() => {
    // if (Platform.OS === 'ios') {
    //   Linking.canOpenURL('instagram://')
    //     .then((val) => setShowInstagramStory(val))
    //     .catch((err) => console.error(err));
    // } else {
    //   Share.isPackageInstalled('com.instagram.android')
    //     .then(({ isInstalled }) => setShowInstagramStory(isInstalled))
    //     .catch((err) => console.error(err));
    // }

    // if (Platform.OS === 'ios') {
    //   Linking.canOpenURL('facebook://')
    //     .then((val) => setHasWhatsApp(val))
    //     .catch((err) => console.error(err));
    // } else {
    //   Share.isPackageInstalled('com.instagram.android')
    //     .then(({ isInstalled }) => setShowInstagramStory(isInstalled))
    //     .catch((err) => console.error(err));
    // }

  }, []);

  const shareImage = async (social: string) => {
    // switch (social) {
    //   case "instagram":
    //     try {
    //       const uri = await viewRef.current.capture();
    //       console.log('uriuri', uri)
    //       if (showInstagramStory) {
    //         await Share.shareSingle({
    //           title: '',
    //           stickerImage: uri,
    //           social: Share.Social.INSTAGRAM_STORIES,
    //           backgroundBottomColor: '#000',
    //           backgroundTopColor: '#000',
    //         });
    //       } else {
    //         await Share.open({ url: uri });
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     break;
    //   case "whatsApp":
    //     try {
    //       const uri = await viewRef.current.capture();
    //       if (showInstagramStory) {
    //         await Share.shareSingle({
    //           url: uri,
    //           title: '',
    //           message: '',
    //           social: Share.Social.WHATSAPP,
    //         });
    //       } else {
    //         await Share.open({ url: uri });
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     break;
    //   case "facebook":
    //     try {
    //       const uri = await viewRef.current.capture();
    //       if (showInstagramStory) {
    //         await Share.shareSingle({
    //           title: '',
    //           url: uri,
    //           social: Share.Social.FACEBOOK,
    //         });
    //       } else {
    //         await Share.open({ url: uri });
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     break;
    //   case "twitter":
    //     try {
    //       const uri = await viewRef.current.capture();
    //       if (showInstagramStory) {
    //         await Share.shareSingle({
    //           title: '',
    //           url: uri,
    //           social: Share.Social.TWITTER,
    //         });
    //       } else {
    //         await Share.open({ url: uri });
    //       }
    //     } catch (err) {
    //       console.error(err);
    //     }
    //     break;
    // }

  }

  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <ViewShot
        ref={viewRef}
        options={{ format: 'jpg', quality: 0.9 }}
      >
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
            {/* <ShareBle /> */}
          </ScrollView>
        </ImageBackground>
      </ViewShot>

      <Box
        paddingTop={25}
        position="absolute"
        // top="0"
        bottom="80"
        left="0"
        right="0"
      >
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
            onPress={() => shareImage("instagram")}
          />
          <SocialButton
            image={images.whatsapp}
            onPress={() => shareImage("whatsApp")}
          />
          <SocialButton
            image={images.facebook}
            onPress={() => shareImage("facebook")}
          />
          <SocialButton
            image={images.twitter}
            onPress={() => shareImage("twitter")}
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
    </SafeAreaView >
  )
}

interface ISocialButton {
  image: ImageSourcePropType;
  onPress: () => void;
}
const SocialButton = ({ image, onPress }: ISocialButton) => {
  return (
    <Box
      style={{
        marginHorizontal: 7.5,

      }}
    >
      <TouchableOpacity
        onPress={onPress}
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