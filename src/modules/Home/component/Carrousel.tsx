import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, TouchableHighlight } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Box, Image, theme } from 'reserva-ui';
import { CarrouselCard } from '../../../graphql/homePage/HomeQuery';


interface DefaultCarrouselProps {
  carrousel: Carrousel
  // CarrouselCard[],
  // showtimeCard: number
}

const { width } = Dimensions.get('screen');


export const DefaultCarrousel: React.FC<DefaultCarrouselProps> = ({ carrousel }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [flatListRef, setFlatListRef] = useState<FlatList<any> | null>(null)
  const [actualPosition, setActualPosition] = useState<number>(0)

  const DEVICE_WIDTH = width;

  const navigation = useNavigation();

  const carrouselCards = carrousel.itemsCollection.items

  const onPressImage = (item: CarrouselCard) => {
    const facetInput = [];
    const [categoryType, categoryData] =
      item.reference.split(':');

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
  }

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    !!viewableItems && !!viewableItems[0] &&
      setActualPosition(viewableItems[0].index)
  })

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

  useEffect(() => {
    setActualPosition(0)
  }, [])

  return <Box>
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
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item }) => (
        <Box alignItems="flex-start">
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => onPressImage(item)}
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
      )}
      keyExtractor={(_, index) => index.toString()}
    />

    <CarrouselScrollIndicator
      carrouselRef={flatListRef}
      actualPosition={actualPosition}
      showtime={carrousel.showtime || 10}
    />

  </Box>
}

interface CarrouselScrollIndicatorProps {
  actualPosition: number
  carrouselRef: FlatList<any> | null
  showtime: number
}

const CarrouselScrollIndicator: React.FC<CarrouselScrollIndicatorProps> = ({
  actualPosition,
  carrouselRef,
  showtime
}) => {
  const [width, setWidth] = useState<number>(0)

  const [finishedAnimation, setFinishedAnimation] = useState<boolean>(false)
  const carrouselLength = carrouselRef?.props.data?.length || 1
  const animatedValue = useRef(new Animated.Value(-10000)).current

  const progressAnimation = () => {
    setFinishedAnimation(false)
    if (carrouselLength > 1 && !!showtime) {
      animatedValue.setValue(5 - width)
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: showtime * 1000,
        useNativeDriver: true,
        easing: Easing.linear
      }).start(
        ({ finished }) => {
          setFinishedAnimation(finished)
        }
      )
    }
  }

  useEffect(() => {
    if (finishedAnimation && carrouselLength > 1) {
      carrouselRef?.scrollToIndex({ index: (actualPosition + 1) % carrouselLength })
    }
  }, [finishedAnimation])

  useEffect(() => {
    progressAnimation()
  }, [actualPosition])

  return carrouselRef?.props.data?.length ? <Box
    position='absolute'
    zIndex={3}
    bottom={10}
    flexDirection='row'
  >
    {
      [...Array(carrouselLength)].map((item, index) =>
        <>
          <Box
            style={{
              overflow: 'hidden'
            }}
            onLayout={(e) => {
              const newWidth = e.nativeEvent.layout.width
              setWidth(newWidth)
              progressAnimation()
            }}
            flex={1}
            backgroundColor='neutroFrio2'
            height={2}
            marginRight='quarck'
            marginLeft={index == 0 ? 'quarck' : null}
          >
            {
              index == actualPosition &&
              <Animated.View
                style={{
                  backgroundColor: theme.colors.neutroFrio1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  transform: [{
                    translateX: animatedValue || -1000
                  }]
                }}
              />}

          </Box>
        </>
      )
    }
  </Box>
}
