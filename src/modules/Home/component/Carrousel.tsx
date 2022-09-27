import React, { useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { Animated, Easing, TouchableHighlight, useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Box, Image, theme } from '@danilomsou/reserva-ui';

import { CarrouselCard } from '../../../graphql/homePage/HomeQuery';

interface DefaultCarrouselProps {
  carrousel: Carrousel;
  // CarrouselCard[],
  // showtimeCard: number
}

export const DefaultCarrousel: React.FC<DefaultCarrouselProps> = ({
  carrousel,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [flatListRef, setFlatListRef] = useState<FlatList<any> | null>(null);
  const [actualPosition, setActualPosition] = useState<number>(0);
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [onEndDrag, setOnEndDrag] = useState(false);
  const [onBeginDrag, setOnBeginDrag] = useState(false);
  const [pressCarousel, setPressCarousel] = useState(false);
  const { width } = useWindowDimensions();
  const DEVICE_WIDTH = width;

  const navigation = useNavigation();

  // const carrouselCards = carrousel.itemsCollection.items;
  const [carrouselCards, setCarrouselCards] = useState<any[]>(carrousel.itemsCollection.items)

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
      reservaMini: item.reservaMini,
      orderBy: item.orderBy,
    });
  };

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    !!viewableItems &&
      !!viewableItems[0] &&
      setActualPosition(viewableItems[0].index);
  });

  const viewabilityConfig = {
    minimumViewTime: 200,
    viewAreaCoveragePercentThreshold: 50,
  };

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

  const touchLongPress = () => {
    setPressCarousel(true);
  };

  const filterCarousel = () =>{
    let cc: any[] = []
    carrousel.itemsCollection.items.map((c:any) => {
      if(!c.mkt){
        cc.push(c)
      }
    });
    setCarrouselCards(cc)
  }

  useEffect(() => {
    filterCarousel()
    setActualPosition(0);
    console.log(
      'Carousel',
      carrouselCards?.map((item: CarrouselCard) => item.reservaMini == true)
    );
  }, []);

  return (carrouselCards?.length > 0 ? 
  <Box>
    <FlatList
      ref={(reference) => setFlatListRef(reference)}
      data={carrouselCards}
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
                onLongPress={touchLongPress}
                onPressOut={() => setPressCarousel(false)}
                delayLongPress={100}
                delayPressOut={10}
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

    <CarrouselScrollIndicator
      carouselRef={flatListRef}
      actualPosition={actualPosition}
      showtime={carrousel.showtime || 10}
      onEndDragTouch={onEndDrag}
      onBeginDragTouch={onBeginDrag}
      onPressCarousel={pressCarousel}
    />
  </Box> : <></>);
};

interface CarrouselScrollIndicatorProps {
  actualPosition: number;
  carouselRef: FlatList<any> | null;
  showtime: number;
  onEndDragTouch: boolean;
  onBeginDragTouch: boolean;
  onPressCarousel: boolean;
}

const CarrouselScrollIndicator: React.FC<CarrouselScrollIndicatorProps> = ({
  actualPosition,
  carouselRef,
  showtime,
  onBeginDragTouch,
  onEndDragTouch,
  onPressCarousel,
}) => {
  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const [finishedAnimation, setFinishedAnimation] = useState<boolean>(false);
  const carouselLength = carouselRef?.props.data?.length || 1;
  const animatedValue = useRef(new Animated.Value(-10000)).current;
  const duration = showtime * 1000;

  const animation = Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    useNativeDriver: true,
    easing: Easing.linear,
  });

  const progressAnimation = () => {
    setFinishedAnimation(false);

    animatedValue.setValue(5 - layoutWidth);

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

  return carouselRef?.props.data?.length ? (
    <Box position="absolute" zIndex={3} bottom={10} flexDirection="row">
      {[...Array(carouselLength)].map((item, index) => (
        <>
          <Box
            style={{
              overflow: 'hidden',
            }}
            onLayout={(e) => {
              const newLayoutWidth = e.nativeEvent.layout.width;
              setLayoutWidth(newLayoutWidth);
              progressAnimation();
            }}
            flex={1}
            backgroundColor="neutroFrio2"
            height={2}
            marginRight="quarck"
            marginLeft={index == 0 ? 'quarck' : null}
          >
            {index == actualPosition && (
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
                      translateX: animatedValue || -10000,
                    },
                  ],
                }}
              />
            )}
          </Box>
        </>
      ))}
    </Box>
  ) : null;
};
