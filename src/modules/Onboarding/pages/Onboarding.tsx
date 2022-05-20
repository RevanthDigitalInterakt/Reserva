import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { Box, Button, Icon, Typography } from '@danilomsou/reserva-ui';

import { StackActions, useNavigation } from '@react-navigation/native';
import {
  checkPermissionLocation,
  requestPermissionLocation,
} from '../components/Permissions';
import { contentfulMock } from '../data/dataMock';

const { width, height } = Dimensions.get('window');

const Slide = ({ item, goNextSlide, currentSlideShow, lengthArray }) => {
  const navigation = useNavigation();
  const ButtonNext = () => {
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
        return console.log('TESTE');
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
        return console.log('TESTE 2');
      case 3:
        return navigation.dispatch(StackActions.replace('Home'));
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
          {contentfulMock.map((_, index) => (
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
    <View>
      <ImageBackground
        source={item?.image}
        resizeMode={'cover'}
        style={{
          height: height,
          width: width,
        }}
      >
        <Box position={'absolute'}>
          <Box
            flex={1}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 1)',
              opacity: item.opacity === 1 ? 0.1 : 0.6,
              width: width,
              height: height,
              position: 'absolute',
            }}
          ></Box>

          <Box
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              position: 'absolute',
              flex: 1,
              width: width,
            }}
          >
            <Indicators />
          </Box>

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

          {item.title ? (
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
              {item?.title}
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
            {item?.subTitle}
          </Typography>

          <Typography
            fontFamily={'reservaSansRegular'}
            fontSize={14}
            color={'white'}
            style={{
              marginLeft: width * 0.1,
              marginRight: width * 0.05,
              paddingTop: '50%',
            }}
          >
            {item.description}
          </Typography>

          {/* Button */}
          <Box
            width="100%"
            style={{
              marginTop: height * 0.85,
              position: 'absolute',
            }}
            flex={1}
          >
            <Button
              title={item?.buttonTitle}
              onPress={() => handleButtonSlide(currentSlideShow)}
              marginX="md"
              inline
              backgroundColor={'white'}
              style={{ alignItems: 'flex-start', paddingLeft: 10 }}
              fontFamily={'nunitoRegular'}
              fontSize={13}
              height={50}
              borderRadius={'xxxs'}
            >
              <Box flexDirection={'row'}>
                <Box flex={1} marginLeft={'xxxs'}>
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
    </View>
  );
};

const ButtonClose = () => {
  const navigation = useNavigation();
  return (
    <Box
      position={'absolute'}
      top={height * 0.03}
      right={width * 0.1}
      zIndex={4}
      style={{ marginTop: height * 0.03 }}
    >
      <Button
        hitSlop={{
          top: 30,
          bottom: 30,
          right: 30,
          left: 30,
        }}
        onPress={() => navigation.dispatch(StackActions.replace('Home'))}
        variant="icone"
        icon={<Icon size={13} name="Close" color="white" />}
      />
    </Box>
  );
};

export const Onboarding = ({}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOfsetx = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOfsetx / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != contentfulMock.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <>
      <StatusBar hidden={false} backgroundColor={'rgba(0,0,0,1)'} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={contentfulMock}
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
              lengthArray={contentfulMock.length}
            />
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    marginHorizontal: 6,
    borderWidth: 1,
  },
});
