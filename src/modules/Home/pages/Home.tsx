import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Linking,
} from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { Box, Image } from 'reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import { useCountDown } from '../../../context/ChronometerContext';
import {
  Carrousel,
  CarrouselCard,
  CarrouselTypes,
  configCollection,
  homeQuery,
  HomeQuery,
  ICountDownClock,
  ICountDownClockReservaMini,
} from '../../../graphql/homePage/HomeQuery';
import { classicSignInMutation } from '../../../graphql/login/loginMutations';
import { productSearch } from '../../../graphql/products/productSearch';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import { Banner } from '../component/Banner';
import { CardsCarrousel } from '../component/CardsCarroussel';
import { DefaultCarrousel } from '../component/Carrousel';
import { DiscoutCodeModal } from '../component/DiscoutCodeModal';
import { CountDownBanner } from '../component/CountDown';
import { Skeleton } from '../component/Skeleton';
import { intervalToDuration } from 'date-fns';
import { useChronometer } from '../../CorreReserva/hooks/useChronometer';

dayjs.extend(utc);
dayjs.extend(timezone);

export const HomeScreen: React.FC<{
  title: string;
}> = () => {
  const navigation = useNavigation();
  const { setEmail, isCookieEmpty, getCredentials, setCookie } = useAuth();
  const { setTime, time, setTimeRsvMini } = useCountDown();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [getProfile, { data: profileData, loading: profileLoading }] =
    useLazyQuery(profileQuery);
  const [images, setImages] = React.useState<HomeQuery[]>([]);
  const [carrousels, setCarrousels] = React.useState<Carrousel[]>([]);
  const [modalDiscount, setModalDiscount] = React.useState<any>();
  const [countDownClock, setCountDownClock] = React.useState<ICountDownClock>();
  const [countDownClockRsvMini, setCountDownClockRsvMini] =
    React.useState<ICountDownClockReservaMini>();
  const deviceWidth = Dimensions.get('screen').width;

  const { data: teste, refetch: refetchTeste } = useQuery(productSearch, {});
  const { loading, data, refetch } = useQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 }, // quantidade de itens que iram renderizar
  });
  const {
    currentValue,
    start,
    stop,
    reset,
    startRsvMini,
    currentValueRsvMini,
  } = useChronometer({
    countDown: true,
    initial: countDownClock?.formattedValue,
    initialRsvMini: countDownClockRsvMini?.formattedValue,
  });

  const { WithoutInternet } = useCheckConnection({ refetch });
  const [login, { data: loginData, loading: loginLoading }] = useMutation(
    classicSignInMutation
  );

  const { data: collectionData, refetch: refetchConfig } = useQuery(
    configCollection,
    {
      context: { clientName: 'contentful' },
    }
  );

  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    if (countDownClock) {
      if (new Date(countDownClock?.countdown).getTime() > Date.now()) {
        start();
      }
    }
  }, [countDownClock]);

  useEffect(() => {
    if (currentValue) setTime(currentValue);
  }, [currentValue]);

  useFocusEffect(
    React.useCallback(() => {
      if (loadingScreen) {
        setCountDownClockStart();

        refetch();
        refetchConfig();
        refetchTeste();
        setLoadingScreen(false);
      }
    }, [loadingScreen])
  );

  useEffect(() => {
    const carrouselsItems: Carrousel[] =
      data?.homePageCollection.items[0].carrouselHomeCollection.items || [];
    setCarrousels(carrouselsItems);

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
          route: imageDescription.route,
        })
      );

    setImages(arrayImages);
  }, [data]);

  const setCountDownClockStart = () => {
    if (collectionData) {
      const countDownClock =
        collectionData?.configCollection?.items[0].countDownClock;
      let limitDate;
      if (countDownClock?.countdown) {
        limitDate = intervalToDuration({
          start: Date.now(),
          end: new Date(countDownClock?.countdown),
        });
      }
      if (limitDate) {
        setCountDownClock({
          ...countDownClock,
          formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${
            limitDate.minutes
          }:${limitDate.seconds}`,
        });
      }

      let countDownClockMini =
        collectionData?.configCollection?.items[0].countDownClockReservaMini;

      let limitDateRsvMini;
      if (countDownClockMini?.countdown) {
        limitDateRsvMini = intervalToDuration({
          start: Date.now(),
          end: new Date(countDownClockMini?.countdown),
        });
      }
      if (limitDate) {
        setCountDownClockRsvMini({
          ...countDownClockMini,
          formattedValue: `${
            limitDateRsvMini?.days * 24 + limitDateRsvMini?.hours
          }:${limitDateRsvMini?.minutes}:${limitDateRsvMini?.seconds}`,
        });
      }
    }
  };

  useEffect(() => {
    setCountDownClockStart();
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
      {loading && loadingScreen ? (
        <Skeleton />
      ) : (
        <SafeAreaView
          style={{
            marginBottom: modalCodeIsVisible ? 87 : 50,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: deviceWidth * 0.02,
            }}
          >
            <Box
              // paddingTop={50}
              style={{
                overflow: 'hidden',
              }}
            >
              {countDownClock && <CountDownBanner countDown={countDownClock} />}
              {carrousels.map((carrousel) => {
                // if (!!carrousel && carrousel.type === CarrouselTypes.mainCarrousel) return <DefaultCarrousel carrousel={carrousel} />
                switch (carrousel?.type) {
                  case CarrouselTypes.mainCarrousel: {
                    return (
                      <>
                        <DefaultCarrousel carrousel={carrousel} />
                      </>
                    );
                    break;
                  }
                  case CarrouselTypes.cardsCarrousel: {
                    const { items } = carrousel.itemsCollection;
                    return items.length > 1 ? (
                      <CardsCarrousel carrousel={carrousel} />
                    ) : (
                      <Banner
                        height={items[0].image.height}
                        reference={items[0].reference}
                        url={items[0].image.url}
                      />
                    );
                    break;
                  }
                  case CarrouselTypes.banner: {
                    const { image, reference } =
                      carrousel.itemsCollection.items[0];
                    return (
                      <Banner
                        height={image.height}
                        reference={reference}
                        url={image.url}
                      />
                    );
                    break;
                  }
                  default: {
                    return <></>;
                    break;
                  }
                }
              })}
            </Box>

            <FlatList
              data={images}
              renderItem={({ item }) => (
                <Banner
                  height={item.height}
                  reference={item.reference}
                  url={item.url}
                  route={item.route}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </Box>
  );
};
