import React, { useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, Easing, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Box, Image, theme } from 'reserva-ui';

import { CarrouselCard } from '../../../graphql/homePage/HomeQuery';

interface DefaultCarrouselProps {
  carrousel: CarrouselCard[];
  showtimeCard: number;
}

const { width } = Dimensions.get('screen');

export const DefaultCarrousel: React.FC<DefaultCarrouselProps> = ({
  carrousel,
  showtimeCard,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [flatListRef, setFlatListRef] = useState<FlatList<any> | null>(null);
  const [actualPosition, setActualPosition] = useState<number>(0);
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [onEndDrag, setOnEndDrag] = useState(false);
  const [onBeginDrag, setOnBeginDrag] = useState(false);
  const [pressCarousel, setPressCarousel] = useState(false);

  const DEVICE_WIDTH = width;

  const navigation = useNavigation();

  const onPressImage = (item: CarrouselCard) => {
    const facetInput = [];
    const [categoryType, categoryData] = item.reference.split(':');

    if (categoryType === 'category') {
      categoryData.split('|').forEach((cat: string) => {
        facetInput.push({
          key: 'c',
          value: cat,
        });
      });
    } else {
      facetInput.push({
        key: 'productClusterIds',
        value: categoryData,
      });
    }
    navigation.navigate('ProductCatalog', {
      facetInput,
      referenceId: item.reference,
    });
  };

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    !!viewableItems &&
      !!viewableItems[0] &&
      setActualPosition(viewableItems[0].index);
  });

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onBeginDragTouch = () => {
    if (actualPosition === 0) {
      setOnBeginDrag(true);
    } else {
      setOnBeginDrag(false);
    }
  };

  const onEndDragTouch = () => {
    if (actualPosition === itemIndex) {
      setOnEndDrag(true);
    } else {
      setOnEndDrag(false);
    }
  };

  /*   const LongPressButton = () => (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          Alert.alert("I'm being pressed for so long");
        }
      }}
      minDurationMs={800}
    />
  ); */

  useEffect(() => {
    setActualPosition(0);
  }, []);

  useEffect(() => {
    console.log('PRESS AQUI', pressCarousel);
  }, [pressCarousel]);

  return (
    <>
      <FlatList
        ref={(reference) => setFlatListRef(reference)}
        data={carrousel}
        style={{ position: 'relative' }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={DEVICE_WIDTH}
        snapToAlignment="center"
        disableIntervalMomentum
        bounces={false}
        pagingEnabled
        onScrollBeginDrag={() => {
          onBeginDragTouch();
        }}
        onScrollEndDrag={() => {
          onEndDragTouch();
        }}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item, index }) => {
          setItemIndex(index);
          return (
            <Box alignItems="flex-start">
              <Box mb="quarck" width={1 / 1}>
                <TouchableHighlight
                  onPress={() => onPressImage(item)}
                  onLongPress={() => setPressCarousel(true)}
                  onPressOut={() => setPressCarousel(false)}
                  delayLongPress={100}
                  delayPressOut={50}
                >
                  <Image
                    resizeMode="cover"
                    height={item.image.height}
                    autoHeight
                    width={DEVICE_WIDTH}
                    source={{ uri: item.image.url }}
                    isSkeletonLoading
                  />
                </TouchableHighlight>
              </Box>
            </Box>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <CarouselScrollIndicator
        carouselRef={flatListRef}
        actualPosition={actualPosition}
        showtime={showtimeCard}
        onEndDragTouch={onEndDrag}
        onBeginDragTouch={onBeginDrag}
        onPressCarousel={pressCarousel}
      />
    </>
  );
};

interface CarouselScrollIndicatorProps {
  actualPosition: number;
  carouselRef: FlatList<any> | null;
  showtime: number;
  onEndDragTouch: boolean;
  onBeginDragTouch: boolean;
  onPressCarousel: boolean;
}

const CarouselScrollIndicator: React.FC<CarouselScrollIndicatorProps> = ({
  actualPosition,
  carouselRef,
  showtime,
  onBeginDragTouch,
  onEndDragTouch,
  onPressCarousel,
}) => {
  const [width, setWidth] = useState<number>(0);

  const [finishedAnimation, setFinishedAnimation] = useState<boolean>(false);

  const carouselLength = carouselRef?.props.data?.length || 1;
  const animatedValue =
    useSharedValue(-10000); /* useRef(new Animated.Value(-10000)).current; */
  const [lastAnimatedValue, setLastAnimatedValue] = useState();

  const animation = withTiming(animatedValue.value, {
    toValue: 0,
    duration: (showtime * 1000 * (animatedValue.value + width)) / width,
    useNativeDriver: true,
    easing: Easing.linear,
  });

  const progressAnimation = () => {
    setFinishedAnimation(false);

    animatedValue.value = 5 - width;

    console.log('SHOWTIME', showtime);

    console.log('DURATION', animatedValue);

    animation.start(({ finished }) => {
      setFinishedAnimation(finished);
    });
  };

  useEffect(() => {
    if (finishedAnimation) {
      carouselRef?.scrollToIndex({
        index: (actualPosition + 1) % carouselLength,
      });
    }
  }, [finishedAnimation]);

  useEffect(() => {
    progressAnimation();
  }, [actualPosition]);

  useEffect(() => {
    if (!onPressCarousel) {
      animation.start(({ finished }) => {
        setFinishedAnimation(finished);
      });
    } else {
      console.log('CURRENT', animatedValue);
      // setLastAnimatedValue(animatedValue)
      animation.stop();
    }
  }, [onPressCarousel]);

  useEffect(() => {
    const lengthCarrousel =
      [...Array(carouselLength)].map((X, i) => i).pop() || 1;
    if (onBeginDragTouch) {
      if (actualPosition === 0) {
        carouselRef?.scrollToIndex({
          index: lengthCarrousel,
        });
      }
    }
  }, [onBeginDragTouch]);

  useEffect(() => {
    const lengthCarrousel = [...Array(carouselLength)].map((X, i) => i).pop();
    if (onEndDragTouch) {
      if (actualPosition === lengthCarrousel) {
        carouselRef?.scrollToIndex({
          index: 0,
        });
      }
    }
  }, [onEndDragTouch]);

  return (
    <Box position="absolute" zIndex={3} bottom={10} flexDirection="row">
      {[...Array(carouselLength)].map((item, index) => (
        <>
          <Box
            style={{
              overflow: 'hidden',
            }}
            onLayout={(e) => {
              const newWidth = e.nativeEvent.layout.width;
              setWidth(newWidth);
              progressAnimation();
            }}
            flex={1}
            backgroundColor="neutroFrio2"
            height={2}
            marginRight="quarck"
            marginLeft={index === 0 ? 'quarck' : null}
          >
            {index === actualPosition && (
              <Animated.View
                style={{
                  backgroundColor: theme.colors.neutroFrio1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  transform: [
                    {
                      translateX: animatedValue || -1000,
                    },
                  ],
                }}
              />
            )}
          </Box>
        </>
      ))}
    </Box>
  );
};
