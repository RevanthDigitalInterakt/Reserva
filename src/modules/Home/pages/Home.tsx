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
  CarrouselTypes,
  configCollection,
  homeQuery,
  HomeQuery,
} from '../../../graphql/homePage/HomeQuery';
import { productSearch } from '../../../graphql/products/productSearch';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import { DefaultCarrousel } from '../component/Carrousel';
import { DiscoutCodeModal } from '../component/DiscoutCodeModal';
import { CardsCarrousel } from '../component/CardsCarroussel';

export const HomeScreen: React.FC<{
  title: string;
}> = () => {
  const navigation = useNavigation();
  const { cleanEmailAndCookie, isCookieEmpty } = useAuth();
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
    console.log('images', images)
  }, [images])

  useEffect(() => {
    let carrousels: Carrousel[] =
      data?.homePageCollection.items[0].carrouselHomeCollection.items || [];

    // carrousels = [{
    //   title: 'É Tendência',
    //   type: CarrouselTypes.cardsCarrousel,
    //   itemsCollection: {
    //     items: [
    //       {
    //         image: {
    //           url: 'https://images.ctfassets.net/6jsfqc13oxv4/5nfwryIUnC9SIE7JgDR4ir/000fae8650281bd44814db7f73051225/calc__as__1_.jpeg',
    //           size: 1,
    //           width: 1114,
    //           height: 914,
    //           title: 'aaaaa',
    //           fileName: 'aaaa'
    //         },
    //         name: 'Camiseta Estampada de Bob I',
    //         description: 'um otima camiseta asdoansfjnoasjndfoasjndfoasn as aisdnb aisjn dais jndai sjnd iasjn ias jnai sjndai sjdn iasjn iasj niasj ndai jsnd iasjn diajs ndi jsndi ajsnd isqjn diaj sndia jsad isjnd aisjn aisjdndjfnaso djnao jnaso djfna osjdn aojs nao jn ojansd ofjn ojn oasnd foan jns oasjnd oajns ',
    //         reference: '',
    //         referenceLabel: 'Confira o porduto!',
    //       },
    //       {
    //         image: {
    //           url: 'https://images.ctfassets.net/6jsfqc13oxv4/4I8z9FewuPHocvQAjpnnWo/3974c92cdef628b4f9bd9afcb1af1906/polos__1_.jpeg',
    //           size: 1,
    //           width: 1114,
    //           height: 914,
    //           title: 'aaaaa',
    //           fileName: 'aaaa'
    //         },
    //         name: 'Camiseta Estampada de Bob II',
    //         description: 'um otima camiseta',
    //         reference: '',
    //         referenceLabel: 'Confira o porduto!',
    //       },
    //       {
    //         image: {
    //           url: 'https://images.ctfassets.net/6jsfqc13oxv4/6VELhA65LjYAucPGWbZkkI/40ce72a85630e9bd7963c26dc007fb5c/camisas.jpg',
    //           size: 1,
    //           width: 1114,
    //           height: 914,
    //           title: 'aaaaa',
    //           fileName: 'aaaa'
    //         },
    //         name: 'Camiseta Estampada de Bob III',
    //         description: 'um otima camiseta',
    //         reference: '',
    //         referenceLabel: 'Confira o porduto!',
    //       },
    //       {
    //         image: {
    //           url: 'https://images.ctfassets.net/6jsfqc13oxv4/1oDURfQOjMbcdEh8tnZkqR/93d70a17683a536fb37cfcc866c0d5d6/calc__ados__1_.jpeg',
    //           size: 1,
    //           width: 1114,
    //           height: 914,
    //           title: 'aaaaa',
    //           fileName: 'aaaa'
    //         },
    //         name: 'Camiseta Estampada de Bob III',
    //         description: 'um otima camiseta',
    //         reference: '',
    //         referenceLabel: 'Confira o porduto!',
    //       },
    //     ]
    //   }
    // }]

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
              // paddingTop={50}
              style={{
                overflow: 'hidden',
              }}
            >
              {carrousels.map((carrousel) => {

                switch (carrousel.type) {
                  case CarrouselTypes.mainCarrousel: {
                    return (<DefaultCarrousel carrousel={carrousel} />)
                    break;
                  }
                  case CarrouselTypes.cardsCarrousel: {
                    return (<CardsCarrousel carrousel={carrousel} />)
                    break;
                  }
                  default: {
                    break;
                  }
                }
              })}
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
