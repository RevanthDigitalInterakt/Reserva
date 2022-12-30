import { useLazyQuery } from '@apollo/client';
import { Box, Button, Icon, Typography } from '@usereservaapp/reserva-ui';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  StatusBarStyle,
  useStatusBar,
} from '../../../context/StatusBarContext';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { openSettings, requestNotifications } from 'react-native-permissions';
import { onboarding } from '../../../graphql/onboarding/onboarding';
import { styles } from '../assets/Styles';
import { ButtonClose } from '../components/ButtonClose';
import {
  checkPermissionLocation,
  requestATT,
  requestPermissionLocation,
} from '../components/Permissions';
import { staticsDataAndroid, staticsDataIos } from '../components/StaticsData';
import EventProvider from '../../../utils/EventProvider';

const { width, height } = Dimensions.get('window');

const Slide = ({
  item,
  goNextSlide,
  currentSlideShow,
  lengthArray,
  itemContentful,
  staticsData,
}) => {
  const navigation = useNavigation();

  const verifyPlatform = async () => {
    if (Platform.OS === 'android') {
      return navigation.dispatch(StackActions.replace('Main'));
    }
    if (Platform.OS === 'ios') {
      return await requestATT().then((value) => {
        if (value === true) {
          goNextSlide();
        } else {
          goNextSlide();
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
                .then(() => goNextSlide())
                .catch(EventProvider.captureException);
            } else {
              openSettings()
                .then(() => goNextSlide())
                .catch(EventProvider.captureException);
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
          {staticsData.map((_: any, index: any) => (
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
    <>
      <ImageBackground
        source={{ uri: itemContentful[currentSlideShow]?.imageBackground?.url }}
        resizeMode={'cover'}
        style={[styles.imageBackground]}
      >
        <Box flex={1}>
          <Box flex={1}>
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

            <Box flex={1}>
              {itemContentful[currentSlideShow]?.description ? (
                <Box flex={1}>
                  <Typography style={[styles.typographyDescription]}>
                    {itemContentful[currentSlideShow]?.description}
                  </Typography>
                </Box>
              ) : (
                <Box flex={1} />
              )}
            </Box>
          </Box>
        </Box>

        <Box>
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
            {currentSlideShow < lengthArray - 1 &&
            itemContentful[currentSlideShow]?.visibleAndroid ? (
              <Box>
                <TouchableOpacity
                  onPress={goNextSlide}
                  style={[styles.buttonNext]}
                >
                  <Typography style={[styles.buttonTypographyNext]}>
                    PULAR
                  </Typography>
                </TouchableOpacity>
              </Box>
            ) : (
              <TouchableOpacity
                onPress={goNextSlide}
                style={[styles.buttonNext]}
              >
                <Box></Box>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      </ImageBackground>
    </>
  );
};

export const Onboarding: React.FC<{}> = ({}) => {
  const { changeBarStyle } = useStatusBar();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [itemContentful, setItemContentful] = useState([]);
  const [staticsData, setStaticsData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const ref = React.useRef();

  useEffect(() => {
    changeBarStyle(StatusBarStyle.LIGHT_CONTENT);
  }, []);

  const [onboardingData] = useLazyQuery(onboarding, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStaticsData(staticsDataAndroid);
    }
    if (Platform.OS === 'ios') {
      setStaticsData(staticsDataIos);
    }
  }, []);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
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

  useEffect(() => {
    setLoading(true);
    onboardingData().then((res) => {
      const items =
        Platform.OS === 'android'
          ? res.data?.onboardingCollection?.items[0]?.itemsOnboardingCollection?.items.filter(
              (item: any) => item.visibleAndroid !== false
            )
          : res.data?.onboardingCollection?.items[0]?.itemsOnboardingCollection
              ?.items;

      setItemContentful(items);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={Platform.OS === 'ios' ? undefined : 'rgba(0,0,0,1)'}
        translucent={true}
      /> */}
      {!loading ? (
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          data={staticsData}
          // contentContainerStyle={{ height: height }}
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces={false}
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
                staticsData={staticsData}
              />
            </>
          )}
        />
      ) : (
        <></>
      )}
    </>
  );
};
