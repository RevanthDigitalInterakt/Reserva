import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Box, Image } from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import {
  Carrousel,
  configCollection,
  homeQuery,
  HomeQuery,
} from '../../../graphql/homePage/HomeQuery';
import { classicSignInMutation } from '../../../graphql/login/loginMutations';
import { productSearch } from '../../../graphql/products/productSearch';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import { DefaultCarrousel } from '../component/Carroussel';
import { DiscoutCodeModal } from '../component/DiscoutCodeModal';

dayjs.extend(utc);
dayjs.extend(timezone);

export const HomeScreen: React.FC<{
  title: string;
}> = () => {
  const navigation = useNavigation();
  const { setEmail, isCookieEmpty, getCredentials, setCookie } = useAuth();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [getProfile, { data: profileData, loading: profileLoading }] =
    useLazyQuery(profileQuery);
  const [images, setImages] = React.useState<HomeQuery[]>([]);
  const [carrousels, setCarrousels] = React.useState<Carrousel[]>([]);
  const [modalDiscount, setModalDiscount] = React.useState<any>();
  const deviceWidth = Dimensions.get('screen').width;
  const { loading, data, refetch } = useQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 }, // quantidade de itens que iram renderizar
  });

  const [login, { data: loginData, loading: loginLoading }] = useMutation(
    classicSignInMutation
  );

  const { data: collectionData } = useQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

  const { WithoutInternet } = useCheckConnection({ refetch });

  const { width } = Dimensions.get('screen');

  const { data: teste, refetch: refetchTeste } = useQuery(productSearch, {});

  useEffect(() => {
    console.log('images', images);
  }, [images]);

  useEffect(() => {
    const carrousels: Carrousel[] =
      data?.homePageCollection.items[0].carrouselHomeCollection.items || [];

    setCarrousels(carrousels);

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
        collectionData?.configCollection?.items[0].discountCodeBar
      );
    }
  }, [collectionData]);

  useLayoutEffect(() => {
    if (!isCookieEmpty()) {
      getProfile();
    }
  }, []);

  const loginWithSavedCredentials = async () => {
    const LastLoginAsyncStorageKey = '@RNAuth:lastLogin';

    const lastLogin = await AsyncStorage.getItem(LastLoginAsyncStorageKey);
    const typeLogin = await AsyncStorage.getItem('@RNAuth:typeLogin');
    const nowDate = Date.now();
    const hourToNextLogin = 10;

    if (typeLogin === 'classic') {
      if (nowDate >= Number(lastLogin) + hourToNextLogin * 60 * 60 * 1000) {
        const { email, password } = await getCredentials();
        const { data: loginData, errors } = await login({
          variables: {
            email,
            password,
          },
        });
        if (!loginLoading && loginData?.cookie) {
          await AsyncStorage.setItem('@RNAuth:email', email);
          await AsyncStorage.setItem(
            LastLoginAsyncStorageKey,
            `${moment.now()}`
          );
          await AsyncStorage.setItem('@RNAuth:typeLogin', 'classic');
          await AsyncStorage.setItem('@RNAuth:cookie', loginData.cookie);

          setCookie(loginData.cookie);
          setEmail(email);
        }
      }
    } else if (typeLogin === 'code') {
      if (nowDate >= Number(lastLogin) + 20 * 60 * 60 * 1000) {
        AsyncStorage.removeItem('@RNAuth:cookie');
        AsyncStorage.removeItem('@RNAuth:email');
        AsyncStorage.removeItem('@RNAuth:typeLogin');
        AsyncStorage.removeItem(LastLoginAsyncStorageKey);
        setCookie(null);
        setEmail(null);
      }
    }
  };

  useEffect(() => {
    if (profileData) {
      AsyncStorage.setItem('@RNAuth:email', profileData?.profile?.email);
    } else if (!profileLoading) {
      loginWithSavedCredentials();
    }
  }, [profileData]);

  useEffect(() => {
    // setCookie('asdasdasdasd')
    loginWithSavedCredentials();
    async function getStorage() {
      const wishListData = await AsyncStorage.getItem('@WishList');
    }
    refetchTeste();
    getStorage();
  }, []);
  return (
    <Box flex={1} bg="white">
      <TopBarDefault loading={loading} />
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
        <SafeAreaView>
          <ScrollView>
            <Box
              style={{
                overflow: 'hidden',
              }}
            >
              {carrousels.map((carrousel) => (
                <DefaultCarrousel
                  carrousel={carrousel.itemsCollection.items}
                  showtimeCard={carrousel.showtime}
                />
              ))}
            </Box>
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <Box alignItems="flex-start">
                  <Box mb="quarck" width={1 / 1}>
                    <TouchableHighlight
                      onPress={() => {
                        if (item.route) {
                          navigation.navigate(item.route);
                        } else {
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
