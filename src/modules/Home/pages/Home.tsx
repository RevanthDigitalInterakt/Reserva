import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Box, Image } from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import {
  Carrousel,
  CarrouselCard,
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

export const HomeScreen: React.FC<{
  title: string;
}> = () => {
  const navigation = useNavigation();
  const {
    cleanEmailAndCookie,
    isCookieEmpty,
    getCredentials,
    setCookie,
    cookie,
  } = useAuth();
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
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { data: teste, refetch: refetchTeste } = useQuery(productSearch, {});

  const DEVICE_WIDTH = width;
  const DOT_SIZE = 8;

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
    const { email, password } = await getCredentials();
    const { data: loginData, errors } = await login({
      variables: {
        email,
        password,
      },
    });
    console.log('loginData', loginData);
    if (!loginLoading && loginData?.cookie) {
      setCookie(data.cookie);
    }
  };

  useEffect(() => {
    console.log('new cookie', cookie);
  }, [cookie]);

  useEffect(() => {
    if (profileData) {
      AsyncStorage.setItem('@RNAuth:email', profileData?.profile?.email);
    } else if (!profileLoading) {
      loginWithSavedCredentials();
      // cleanEmailAndCookie();
    }
  }, [profileData]);

  useEffect(() => {
    async function getStorage() {
      const wishListData = await AsyncStorage.getItem('@WishList');
    }
    refetchTeste();
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
