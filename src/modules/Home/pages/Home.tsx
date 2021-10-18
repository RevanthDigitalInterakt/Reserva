import React, { useState, useLayoutEffect, useEffect } from 'react';

import { useLazyQuery, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Platform, Animated, View } from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Box, Image, Typography, Button, Icon } from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import wishList from '../../../graphql/wishlist/wishList';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { homeQuery, HomeQuery } from '../../../store/ducks/HomePage/types';
import { load } from '../../../store/ducks/nearbyStores/actions';
import { profileQuery } from '../../../store/ducks/profile/types';
import ItemList from '../../HelpCenter/Components/ItemListHelp';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import { DiscoutCodeModal } from '../component/DiscoutCodeModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const HomeScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const { cookie, setEmail } = useAuth();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [isVisibleUpdateStore, setIsVisibleUpdateStore] = useState(false);
  const [getProfile, { data: profileData, loading: profileLoading }] =
    useLazyQuery(profileQuery);
  const dispatch = useDispatch();
  const [images, setImages] = React.useState<HomeQuery[]>([]);
  const [hasInternet, setHasInternet] = React.useState<boolean>(false);
  const deviceWidth = Dimensions.get('screen').width;
  const { loading, error, data, refetch } = useQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 }, // quantidade de itens que iram renderizar
  });
  const { WithoutInternet } = useCheckConnection({ refetch });

  const { width, height } = Dimensions.get('screen');
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const DEVICE_WIDTH = width;
  const DEVICE_HEIGHT = height;
  const DOT_SIZE = 8;

  useEffect(() => {
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

  useLayoutEffect(() => {
    if (cookie !== null) {
      getProfile();
    }
  }, []);

  useEffect(() => {
    if (profileData) {
      AsyncStorage.setItem('@RNAuth:email', profileData?.profile?.email);
    }
  }, [profileData]);

  useEffect(() => {
    dispatch(load({ UF: 'RJ' }));
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
      <DiscoutCodeModal
        isVisible={modalCodeIsVisible}
        code="RSVAPP50"
        onClose={() => {
          setModalCodeIsVisible(false);
        }}
      />
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
              <Animated.FlatList
                data={images}
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
              {images && (
                <Box
                  style={{
                    paddingTop: 20,
                    flexDirection: 'row',
                    position: 'relative',
                    alignSelf: 'center',
                    bottom: 15,
                  }}
                >
                  {images.map((_, index) => (
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
