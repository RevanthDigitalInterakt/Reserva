import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Animated, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Box, Image } from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import {
  Carrousel,
  CarrouselCard,
  configCollection,
  homeQuery,
  HomeQuery,
} from '../../../graphql/homePage/HomeQuery';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import { DiscoutCodeModal } from '../component/DiscoutCodeModal';

export const HomeScreen: React.FC<{
  title: string;
}> = () => {
  const navigation = useNavigation();
  const { cleanEmailAndCookie, isCookieEmpty } = useAuth();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [getProfile, { data: profileData, loading: profileLoading }] =
    useLazyQuery(profileQuery);
  const [images, setImages] = React.useState<HomeQuery[]>([]);
  const [carrousels, setCarrousels] = React.useState<any[]>([]);
  const [modalDiscount, setModalDiscount] = React.useState<any>();
  const deviceWidth = Dimensions.get('screen').width;
  const { loading, data, refetch } = useQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 }, // quantidade de itens que iram renderizar
  });
  const { data: collectionData } = useQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

  const { WithoutInternet } = useCheckConnection({ refetch });

  const { width } = Dimensions.get('screen');
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const DEVICE_WIDTH = width;
  const DOT_SIZE = 8;

  useEffect(() => {
    const carrousels: any[] = data?.homePageCollection.items[0].carrouselHomeCollection.items.map(
      (carrousel: Carrousel) => {
        const parsedCarrousel = carrousel.itemsCollection.items.map(x => {
          return {
            fileName: x.image.fileName,
            title: x.image.title,
            width: x.image.width,
            height: x.image.height,
            size: x.image.size,
            url: x.image.url,
            reference: x.reference
          }
        })

        return parsedCarrousel
      }
    ) || []
    console.log('carrousels', carrousels)
    setCarrousels(carrousels)

    const arrayImages =
      data?.homePageCollection.items[0].mediasCollection.items.map(
        (imageDescription: any) => ({
          fileName: imageDescription.image.fileName,
          title: imageDescription.image.title,
          width: imageDescription.image.width,
          height: imageDescription.image.height,
          size: imageDescription.image.size,
          url: imageDescription.image.url,
          reference: imageDescription.reference,
        })
      );
    setImages(arrayImages);
  }, [data]);

  useEffect(() => {
    if (collectionData) {
      setModalDiscount(
        collectionData?.configCollection?.items[0].discoutCodeBar
      );
    }
  }, [collectionData]);

  useLayoutEffect(() => {
    if (!isCookieEmpty()) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (profileData) {
      AsyncStorage.setItem('@RNAuth:email', profileData?.profile?.email);
    } else if (!profileLoading) {
      cleanEmailAndCookie();
    }
  }, [profileData]);

  useEffect(() => {
    async function getStorage() {
      const wishListData = await AsyncStorage.getItem('@WishList');
    }
    getStorage();
  }, []);
  return (
    <Box flex={1} bg="white">
      <TopBarDefault loading={loading} />
      {/* <Box
        minHeight={40}
        bg="verdeSucesso"
        paddingLeft="xxxs"
        py="micro"
        flexDirection="row"
        alignItems="center"
        paddingRight="xxxs"
        boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
        style={{ elevation: 10 }}
      >
        <Box flex={1}>
          <Typography
            fontFamily="reservaSansRegular"
            fontSize={13}
            color="white"
          >
            Aproveite o desconto de R$ 50 em sua primeira compra no app.
          </Typography>
        </Box>
        <Button
          flex={1}
        // onPress={() => ('')}
        >
          <Icon name='Close' size={15} color='white' ml="xxxs" />
        </Button>
      </Box> */}
      <StoreUpdate />
      {modalDiscount && (
        <DiscoutCodeModal
          data={modalDiscount}
          isVisible={modalCodeIsVisible}
          onClose={() => {
            setModalCodeIsVisible(false);
          }}
        />
      )}
      <WithoutInternet />
      {loading ? (
        <></>
      ) : (
        // <Box flex={1}>
        //   <SkeletonPlaceholder>
        //     <SkeletonPlaceholder.Item width={screenWidth} height={screenHeight}>
        //     </SkeletonPlaceholder.Item>
        //   </SkeletonPlaceholder>
        // </Box>
        <SafeAreaView>
          <ScrollView>
            <Box
              style={{
                overflow: 'hidden',
              }}
            >
              {carrousels.map((carrousel: any) =>
                <>
                  <Animated.FlatList
                    data={carrousel}
                    style={{ position: 'relative' }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    snapToInterval={DEVICE_WIDTH}
                    bounces={false}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      { useNativeDriver: true }
                    )}
                    renderItem={({ item }) => (
                      <Box alignItems="flex-start">
                        <Box mb="quarck" width={1 / 1}>
                          <TouchableHighlight
                            onPress={() => {
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
                            }}
                          >
                            <Image
                              resizeMode="cover"
                              height={item.height}
                              autoHeight
                              width={DEVICE_WIDTH}
                              source={{ uri: item.url }}
                            />
                          </TouchableHighlight>
                        </Box>
                      </Box>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                  />
                  {carrousel && (
                    <Box
                      style={{
                        paddingTop: 20,
                        flexDirection: 'row',
                        position: 'relative',
                        alignSelf: 'center',
                        bottom: 15,
                      }}
                    >
                      {carrousel.map((_, index) => (
                        <Box
                          key={index}
                          style={{
                            height: DOT_SIZE,
                            width: DOT_SIZE,
                            borderRadius: DOT_SIZE,
                            backgroundColor: '#D8D9DA',
                            marginRight: DOT_SIZE,
                          }}
                        />
                      ))}
                      <Animated.View
                        style={[
                          {
                            height: DOT_SIZE,
                            width: DOT_SIZE,
                            borderRadius: DOT_SIZE,

                            backgroundColor: '#333333',
                            position: 'absolute',
                            bottom: -DOT_SIZE / 20,
                            left: -DOT_SIZE / 20,
                          },
                          {
                            transform: [
                              {
                                translateX: Animated.divide(
                                  scrollX,
                                  DEVICE_WIDTH
                                ).interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, DOT_SIZE + DOT_SIZE],
                                }),
                              },
                            ],
                          },
                        ]}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <Box alignItems="flex-start">
                  <Box mb="quarck" width={1 / 1}>
                    <TouchableHighlight
                      onPress={() => {
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
                      }}
                    >
                      <Image
                        height={item.height}
                        autoHeight
                        width={deviceWidth}
                        source={{ uri: item.url }}
                      />
                    </TouchableHighlight>
                  </Box>
                </Box>
              )}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </Box>
  );
};
