import React, { useEffect, useState, useRef } from 'react';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ImageSourcePropType,
  ImageBackground,
  ScrollView,
  Platform,
  Linking,
  Dimensions,
  BackHandler,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { Box, Image, Typography, Icon } from 'reserva-ui';

import { CorreReservaStackParamList } from '../..';
import { images } from '../../../../assets';
import { useAuth } from '../../../../context/AuthContext';
import { Counter } from '../../components/Counter';
import { HeaderCorreReserva } from '../../components/HeaderCorreReserva';
import { useCorre } from '../../context';
import { useChronometer } from '../../hooks/useChronometer';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export interface RaceFinalizedProps { }

type RaceFinalizedNavigator = StackNavigationProp<
  CorreReservaStackParamList,
  'RaceFinalized'
>;

export const RaceFinalized: React.FC<RaceFinalizedProps> = ({ }) => {
  const navigation = useNavigation<RaceFinalizedNavigator>();
  const { email } = useAuth();
  const { currentValue, start, stop } = useChronometer({ initial: '11:10:00' });
  const viewRef = useRef();
  const viewRefImage = useRef();
  const [showInstagramStory, setShowInstagramStory] = useState(false);
  const [hasWhatsApp, setHasWhatsApp] = useState(false);
  const [hasFacebook, setHasFacebook] = useState(false);
  const [hasTwitter, setHasTwitter] = useState(false);
  const { raceResume } = useCorre();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });
  }, []);

  useEffect(() => {
    const correCollection = firestore().collection('corre');
    correCollection.add({
      ...raceResume,
      email,
      finishDateTime: new Date(),
    });

    if (Platform.OS === 'ios') {
      Linking.canOpenURL('instagram://')
        .then((val) => setShowInstagramStory(val))
        .catch((err) => console.error(err));
    } else {
      Share.isPackageInstalled('com.instagram.android')
        .then(({ isInstalled }) => setShowInstagramStory(isInstalled))
        .catch((err) => console.error(err));
    }

    if (Platform.OS === 'ios') {
      Linking.canOpenURL('whatsapp://')
        .then((val) => setHasWhatsApp(val))
        .catch((err) => console.error(err));
    } else {
      Share.isPackageInstalled('com.whatsapp.android')
        .then(({ isInstalled }) => setHasWhatsApp(isInstalled))
        .catch((err) => console.error(err));
    }

    if (Platform.OS === 'ios') {
      Linking.canOpenURL('facebook://')
        .then((val) => setHasFacebook(val))
        .catch((err) => console.error(err));
    } else {
      Share.isPackageInstalled('com.facebook.android')
        .then(({ isInstalled }) => setHasFacebook(isInstalled))
        .catch((err) => console.error(err));
    }

    if (Platform.OS === 'ios') {
      Linking.canOpenURL('twitter://')
        .then((val) => setHasTwitter(val))
        .catch((err) => console.error(err));
    } else {
      Share.isPackageInstalled('com.twitter.android')
        .then(({ isInstalled }) => setHasTwitter(isInstalled))
        .catch((err) => console.error(err));
    }
  }, []);

  const shareImage = async (social: string) => {
    switch (social) {
      case 'instagram':
        try {
          const uri = await viewRef.current.capture();
          const uriBackgroundImage = await viewRefImage.current.capture();
          console.log('uriuri', uri);
          if (showInstagramStory) {
            await Share.shareSingle({
              title: '',
              backgroundImage: uriBackgroundImage,
              stickerImage: uri,
              social: Share.Social.INSTAGRAM_STORIES,
              backgroundBottomColor: '#000',
              backgroundTopColor: '#000',
            });
          } else {
            await Share.open({ url: uri });
          }
        } catch (err) {
          console.error(err);
        }
        break;
      case 'whatsApp':
        try {
          const uri = await viewRef.current.capture();
          if (hasWhatsApp) {
            await Share.shareSingle({
              url: uri,
              filename: uriBackgroundImage,
              title: '',
              message: '',
              social: Share.Social.WHATSAPP,
            });
          } else {
            await Share.open({ url: uri });
          }
        } catch (err) {
          console.error(err);
        }
        break;
      case 'facebook':
        try {
          const uri = await viewRef.current.capture();
          const uriBackgroundImage = await viewRefImage.current.capture();
          if (hasFacebook) {
            await Share.shareSingle({
              title: '',
              url: uri,
              social: Share.Social.FACEBOOK,
            });
          } else {
            await Share.open({ url: uri });
          }
        } catch (err) {
          console.error(err);
        }
        break;
      case 'twitter':
        try {
          const uri = await viewRef.current.capture();
          if (hasTwitter) {
            await Share.shareSingle({
              title: '',
              url: uri,
              social: Share.Social.TWITTER,
            });
          } else {
            await Share.open({ url: uri });
          }
        } catch (err) {
          console.error(err);
        }
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <ImageBackground
        source={images.raceImageBackground}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      >
        <ScrollView style={{ height: DEVICE_HEIGHT }}>
          <ViewShot ref={viewRef} options={{ format: 'jpg', quality: 0.9 }}>
            <HeaderCorreReserva />
            <Box justifyContent="center" alignItems="center" marginTop={30}>
              <Typography
                color="white"
                fontFamily="reservaSerifBoldItalic"
                fontSize={50}
                letterSpacing={-2.5}
                textAlign="center"
              >
                {' Parabéns! '}
              </Typography>
              <Typography
                fontFamily="reservaSerifLight"
                fontSize={15}
                color="white"
                lineHeight={19}
                textAlign="center"
              >
                Sua corrida contribuiu com
              </Typography>

              <Box alignItems="center">
                <Typography
                  color="white"
                  fontFamily="reservaSerifBold"
                  fontSize={152}
                >
                  {raceResume?.foodPlate}
                </Typography>

                <Box position="absolute" bottom={-15}>
                  <Typography
                    color="white"
                    fontFamily="reservaSerifThin"
                    fontSize={29}
                  >
                    Pratos viabilizados
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              marginY="xxs"
            >
              <Image source={images.dividerReserva} width="45%" />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              width="45%"
              alignSelf="center"
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                alignSelf="flex-start"
              >
                <Icon
                  name="Distance"
                  size={25}
                  color="neutroFrio2"
                  mr="micro"
                />
                <Typography
                  fontFamily="reservaSerifThin"
                  fontSize={17}
                  color="white"
                >
                  {' '}
                  Distância:
                  <Typography fontFamily="reservaSerifBold" fontSize={17}>
                    {' '}
                    {Math.floor(parseFloat(raceResume?.distance))}km
                  </Typography>
                </Typography>
              </Box>

              <Box marginY="nano">
                <Typography
                  fontFamily="reservaSerifBold"
                  fontSize={2}
                  color="neutroFrio2"
                  ellipsizeMode="clip"
                  numberOfLines={1}
                >
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - -
                </Typography>
              </Box>
              <Box
                flexDirection="row"
                alignItems="flex-start"
                justifyContent="center"
                alignSelf="flex-start"
              >
                <Icon name="Pace" size={23} color="neutroFrio2" mr="micro" />
                <Typography
                  fontFamily="reservaSerifThin"
                  fontSize={17}
                  color="white"
                >
                  Ritmo:
                  <Typography fontFamily="reservaSerifBold" fontSize={17}>
                    {' '}
                    {raceResume?.pace}
                  </Typography>
                </Typography>
              </Box>
              <Box marginY="nano">
                <Typography
                  fontFamily="reservaSerifBold"
                  fontSize={2}
                  color="neutroFrio2"
                  ellipsizeMode="clip"
                  numberOfLines={1}
                >
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - -
                </Typography>
              </Box>
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                alignSelf="flex-start"
              >
                <Icon name="Clock" size={23} color="neutroFrio2" mr="micro" />
                <Typography
                  fontFamily="reservaSerifThin"
                  fontSize={17}
                  color="white"
                >
                  Duração:
                  <Typography fontFamily="reservaSerifBold" fontSize={17}>
                    {' '}
                    {raceResume?.duration}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            {/* <Counter
              timer={raceResume?.duration}
              distance={raceResume?.distance}
              rhythm={raceResume?.pace}
              plates={raceResume?.foodPlate}
            /> */}
            {/* <ShareBle /> */}
          </ViewShot>
          <ConfettiCannon
            autoStart
            fadeOut
            count={200}
            origin={{ x: -10, y: 0 }}
          />
          <Box paddingTop={25}>
            <Typography
              color="white"
              fontFamily="reservaSansRegular"
              fontSize={16}
              textAlign="center"
            >
              Compartilhe:
            </Typography>
            <Box
              marginTop={10}
              marginBottom={26}
              flexDirection="row"
              justifyContent="center"
            >
              <SocialButton
                image={images.instagram}
                onPress={() => shareImage('instagram')}
              />
              <SocialButton
                image={images.whatsapp}
                onPress={() => shareImage('whatsApp')}
              />
              <SocialButton
                image={images.facebook}
                onPress={() => shareImage('facebook')}
              />
              <SocialButton
                image={images.twitter}
                onPress={() => shareImage('twitter')}
              />
            </Box>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
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
                color="white"
                fontSize={13}
                fontFamily="nunitoSemiBold"
                letterSpacing={0.16}
                style={{ textTransform: 'uppercase' }}
              >
                IR PARA A HOME
              </Typography>
            </TouchableOpacity>
          </Box>

          <ViewShot
            ref={viewRefImage}
            options={{ format: 'jpg', quality: 0.9 }}
          >
            <Image
              height="100%"
              width="100%"
              source={images.raceImageBackground}
              resizeMode="contain"
            />
          </ViewShot>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

interface ISocialButton {
  image: ImageSourcePropType;
  onPress: () => void;
}
const SocialButton = ({ image, onPress }: ISocialButton) => (
  <Box
    style={{
      marginHorizontal: 7.5,
    }}
  >
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 31,
        overflow: 'hidden',
      }}
    >
      <Image source={image} resizeMode="cover" size={32} />
    </TouchableOpacity>
  </Box>
);
