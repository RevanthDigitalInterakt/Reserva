import { Box, Button, Icon, Typography } from '@danilomsou/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { openSettings, requestNotifications } from 'react-native-permissions';
import { styles } from '../assets/Styles';
import { ButtonClose } from '../components/ButtonClose';
import {
  checkPermissionLocation,
  requestATT,
  requestPermissionLocation,
} from '../components/Permissions';
import { staticsData } from '../components/StaticsData';
import { onboarding } from '../../../graphql/onboarding/onboarding';
import { useLazyQuery, useQuery } from '@apollo/client';

import ModalDataCollect from '../components/ModalDataCollect';

const { width, height } = Dimensions.get('window');

const Slide = ({
  item,
  goNextSlide,
  currentSlideShow,
  lengthArray,
  itemContentful,
}) => {
  const [showModalDataCollect, setShowModalDataCollect] = useState(false);

  const navigation = useNavigation();

  const verifyPlatform = async () => {
    if (Platform.OS === 'android') {
      return setShowModalDataCollect(true);
    }
    if (Platform.OS === 'ios') {
      return await requestATT().then((value) => {
        if (value === true) {
          goNextSlide();
        } else {
          openSettings().catch(() => console.warn('cannot open settings'));
        }
      });
    }
  };

  const handleButtonSlide = async (idCurrent: number) => {
    switch (idCurrent) {
      case 0:
        return await requestNotifications(['alert', 'sound']).then(
          ({ status, settings }) => {
            if (status === 'granted') {
              openSettings()
                .then(goNextSlide())
                .catch(() => console.warn('cannot open settings'));
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
        return await verifyPlatform();
      case 3:
        return navigation.dispatch(StackActions.replace('Main'));
    }
  };

  const Indicators = () => {
    return (
      <View style={[styles.boxIndicatorMain]}>
        <View style={[styles.boxIndicatorChild]}>
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
      style={[styles.imageBackground]}
    >
      <Box flex={1}>
        <ModalDataCollect
          isVisible={showModalDataCollect}
          setIsVisible={() => {
            setShowModalDataCollect(false);
            goNextSlide();
          }}
        />
        <Indicators />

        {item.imageHeader ? (
          <Box style={[styles.boxImageHeader]}>
            <Image source={item?.imageHeader} />
          </Box>
        ) : null}

        {itemContentful[currentSlideShow]?.title ? (
          <Typography style={[styles.typographyTitle]}>
            {itemContentful[currentSlideShow]?.title}
          </Typography>
        ) : null}

        <Typography style={[styles.typographySubtitle]}>
          {itemContentful[currentSlideShow]?.subtitle}
        </Typography>

        {/* Button */}

        <Box
          style={{
            marginTop: itemContentful[currentSlideShow]?.description
              ? height * 0.7
              : height * 0.81,
            position: 'absolute',
          }}
          flex={1}
        >
          {itemContentful[currentSlideShow]?.description ? (
            <Typography style={[styles.typographyDescription]}>
              {itemContentful[currentSlideShow]?.description}
            </Typography>
          ) : null}

          <Box>
            <Button
              title={item?.buttonTitle}
              onPress={() => handleButtonSlide(currentSlideShow)}
              inline
              style={[styles.buttonTitle]}
            >
              <Box flexDirection={'row'}>
                <Box
                  flex={1}
                  marginLeft={'xxxs'}
                  alignContent={'center'}
                  alignSelf={'center'}
                >
                  <Typography style={[styles.buttonTypographyTitle]}>
                    {item?.buttonTitle}
                  </Typography>
                </Box>

                <Icon
                  name={'MenuArrowBack'}
                  size={'25'}
                  style={{
                    transform: [{ rotate: '180deg' }],
                    color: 'rgba(18,18,18,1)',
                  }}
                  marginRight={'xxxs'}
                />
              </Box>
            </Button>
          </Box>
          <Box>
            {currentSlideShow < lengthArray - 1 ? (
              <TouchableOpacity
                onPress={goNextSlide}
                style={[styles.buttonNext]}
              >
                <Typography style={[styles.buttonTypographyNext]}>
                  PULAR
                </Typography>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={goNextSlide}
                style={[styles.buttonNext]}
              />
            )}
          </Box>
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
      const items =
        res.data?.onboardingCollection?.items[0]?.itemsOnboardingCollection
          ?.items;

      setItemContentful(items);
    });
  }, []);

  return (
    <>
      <StatusBar
        animated
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor={'rgba(0,0,0,0.9)'}
        translucent={true}
      />

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
    </>
  );
};
