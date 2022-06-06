import { Box, Button, Icon, Typography } from '@danilomsou/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { openSettings, requestNotifications } from 'react-native-permissions';
import { styles } from '../assets/Styles';
import { ButtonClose } from '../components/Buttons';
import {
  checkPermissionLocation,
  requestPermissionLocation,
} from '../components/Permissions';
import { staticsData } from '../data/staticsData';
import { onboarding } from '../../../graphql/onboarding/onboarding';
import { useLazyQuery, useQuery } from '@apollo/client';

const { width, height } = Dimensions.get('window');

const Slide = ({
  item,
  goNextSlide,
  currentSlideShow,
  lengthArray,
  itemContentful,
}) => {
  useEffect(() => {
    console.log('itemContentful', itemContentful);
  }, [itemContentful]);

  const navigation = useNavigation();
  const ButtonNext = () => {
    // if (currentSlideShow === 2) {
    //   console.log('teste');
    //   await AsyncStorage.setItem('@user:accepted', 'false');
    // }
    return (
      <TouchableOpacity
        onPress={goNextSlide}
        style={{
          alignContent: 'center',
          width: width,
          flex: 1,
          marginTop: 20,
          alignItems: 'center',
        }}
      >
        <Typography color={'white'} fontFamily="nunitoBold">
          PULAR
        </Typography>
      </TouchableOpacity>
    );
  };

  const handleButtonSlide = async (idCurrent: number) => {
    switch (idCurrent) {
      case 0:
        return await requestNotifications(['alert', 'sound']).then(
          ({ status, settings }) => {
            if (status === 'granted') {
              goNextSlide();
            } else {
              openSettings().catch(() => console.warn('cannot open settings'));
            }
          }
        );
      case 1:
        return await requestPermissionLocation().then(() => {
          checkPermissionLocation().then((value) => {
            if (value === true) {
              goNextSlide();
            } else {
              goNextSlide();
            }
          });
        });
      case 2:
        return await AsyncStorage.setItem('@user:accepted', 'true').then(() => {
          goNextSlide();
        });
      case 3:
        return navigation.dispatch(StackActions.replace('Main'));
    }
  };

  const Indicators = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          position: 'absolute',
          marginLeft: width * 0.05,
          marginTop: height * 0.03,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {staticsData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideShow === index && {
                  backgroundColor: '#FFFFFF',
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{ uri: itemContentful[currentSlideShow]?.imageBackground?.url }}
      resizeMode={'cover'}
      style={{
        height: height,
        width: width,
      }}
    >
      <Box position={'absolute'}>
        <Indicators />

        {item.imageHeader ? (
          <Box
            style={{
              marginTop: height * 0.09,
              marginLeft: width * 0.1,
              marginRight: width * 0.1,
            }}
          >
            <Image source={item?.imageHeader} />
          </Box>
        ) : null}

        {itemContentful[currentSlideShow]?.title ? (
          <Typography
            fontFamily={'reservaSerifBold'}
            fontSize={46}
            color={'white'}
            style={{
              marginTop: height * 0.09,
              marginLeft: width * 0.1,
              marginRight: width * 0.1,
            }}
          >
            {itemContentful[currentSlideShow]?.title}
          </Typography>
        ) : null}

        <Typography
          fontFamily={'reservaSansRegular'}
          fontSize={16}
          color={'white'}
          style={{
            marginLeft: width * 0.1,
            marginRight: width * 0.05,
            marginTop: height * 0.01,
          }}
        >
          {itemContentful[currentSlideShow]?.subtitle}
        </Typography>

        {/* Button */}
        <Box
          width="100%"
          style={{
            marginTop: itemContentful[currentSlideShow]?.description
              ? height * 0.75
              : height * 0.85,
            position: 'absolute',
            // backgroundColor: 'red',
          }}
          flex={1}
        >
          {itemContentful[currentSlideShow]?.description ? (
            <Typography
              fontFamily={'reservaSansRegular'}
              fontSize={14}
              color={'white'}
              style={{
                marginLeft: width * 0.1,
                marginRight: width * 0.05,
                marginBottom: height * 0.02,
                // backgroundColor: 'yellow',
              }}
            >
              {itemContentful[currentSlideShow]?.description}
            </Typography>
          ) : null}

          <Button
            title={item?.buttonTitle}
            onPress={() => handleButtonSlide(currentSlideShow)}
            marginX={width * 0.09}
            inline
            backgroundColor={'white'}
            style={{
              alignItems: 'flex-start',
              paddingLeft: 10,
              alignContent: 'center',
            }}
            fontFamily={'nunitoRegular'}
            fontSize={13}
            height={50}
            borderRadius={'xxxs'}
          >
            <Box flexDirection={'row'}>
              <Box
                flex={1}
                marginLeft={'xxxs'}
                alignContent={'center'}
                alignSelf={'center'}
              >
                <Typography variant={'tituloSessao'}>
                  {item.buttonTitle}
                </Typography>
              </Box>

              <Icon
                name={'MenuArrowBack'}
                color={'preto'}
                size={'25'}
                style={{ transform: [{ rotate: '180deg' }] }}
                marginRight={'xxxs'}
              />
            </Box>
          </Button>

          {currentSlideShow < lengthArray - 1 ? <ButtonNext /> : null}
        </Box>
      </Box>
    </ImageBackground>
  );
};

export const Onboarding: React.FC<{}> = ({}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [itemContentful, setItemContentful] = useState([]);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOfsetx = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOfsetx / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != staticsData.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const [onboardingData] = useLazyQuery(onboarding, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    onboardingData().then((res) => {
      console.log('res ::::::::::::>>>>>>>>>>>>>>>>>>', res.data);

      const items =
        res.data?.onboardingCollection?.items[0]?.itemsOnboardingCollection
          ?.items;

      console.log('ITEMSSSSSSSSSSSS:::: >>>>', items[0].imageBackground?.url);
      setItemContentful(items);
    });
  }, []);

  return (
    <FlatList
      ref={ref}
      onMomentumScrollEnd={updateCurrentSlideIndex}
      data={staticsData}
      contentContainerStyle={{ height: height }}
      showsHorizontalScrollIndicator={false}
      horizontal
      scrollEnabled={false}
      pagingEnabled
      renderItem={({ item }) => (
        <>
          <ButtonClose />
          <Slide
            item={item}
            goNextSlide={goNextSlide}
            currentSlideShow={currentSlideIndex}
            lengthArray={staticsData.length}
            itemContentful={itemContentful}
          />
        </>
      )}
    />
  );
};
