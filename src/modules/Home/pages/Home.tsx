import { useLazyQuery, useMutation } from '@apollo/client';
import { Box } from '@danilomsou/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { intervalToDuration } from 'date-fns';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PrimeProductList } from '../../../shared/components/PrimeProductList';
import { useAuth } from '../../../context/AuthContext';
import { useCountDown } from '../../../context/ChronometerContext';
import { useContentfull } from '../../../context/ContentfullContext';
import { useRegionalSearch } from '../../../context/RegionalSearchContext';
import {
  Carrousel,
  CarrouselTypes,
  configCollection,
  homeQuery,
  HomeQuery,
  ICountDownClock,
  ICountDownClockReservaMini,
} from '../../../graphql/homePage/HomeQuery';
import { classicSignInMutation } from '../../../graphql/login/loginMutations';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { useChronometer } from '../../CorreReserva/hooks/useChronometer';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import Banner from '../component/Banner';
import { CardsCarrousel } from '../component/CardsCarroussel';
import { DefaultCarrousel } from '../component/Carrousel';
import { CountDownBanner } from '../component/CountDown';
import DiscoutCodeModal from '../component/DiscoutCodeModal';
import { Skeleton } from '../component/Skeleton';
import { useConfigContext } from '../../../context/ConfigContext';

dayjs.extend(utc);
dayjs.extend(timezone);

export const HomeScreen: FC<{
  title: string;
}> = () => {
  const { setOffersPage } = useConfigContext();
  const navigation = useNavigation();
  const { isTesting } = useContentfull();
  const { setEmail, isCookieEmpty, getCredentials, setCookie } = useAuth();
  const { cep, setRegionId } = useRegionalSearch();
  const { setTime, time } = useCountDown();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [getProfile, { data: profileData, loading: profileLoading }] =
    useLazyQuery(profileQuery);
  const [images, setImages] = useState<HomeQuery[]>([]);
  const [carrousels, setCarrousels] = useState<Carrousel[]>([]);
  const [modalDiscount, setModalDiscount] = useState<any>();
  const [countDownClock, setCountDownClock] = useState<ICountDownClock>();
  const [{ data, loading }, setDataHome] = useState({
    data: null,
    loading: true,
  });
  const [{ collectionData }, setDataConfig] = useState({
    collectionData: null,
  });
  const [countDownClockRsvMini, setCountDownClockRsvMini] =
    useState<ICountDownClockReservaMini>();
  const deviceWidth = Dimensions.get('screen').width;

  const [getHome, { refetch }] = useLazyQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 }, // quantidade de itens que iram renderizar
  });
  const { currentValue, start, stop, reset } = useChronometer({
    countDown: true,
    initial: countDownClock?.formattedValue,
  });

  const { WithoutInternet } = useCheckConnection({ refetch });
  const [login, { data: loginData, loading: loginLoading }] = useMutation(
    classicSignInMutation
  );

  const [getConfig] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    getHome().then((response) => {
      setDataHome({
        data: response.data,
        loading: false,
      });
    });
    getConfig().then((response) => {
      setDataConfig({
        collectionData: response.data,
      });
    });
  }, []);

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
          isLandingPage: imageDescription.isLandingPage,
          landingPageId: imageDescription.landingPageId,
          reservaMini: imageDescription.reservaMini,
          orderBy: imageDescription.orderBy,
        })
      );

    setImages(arrayImages);
  }, [data]);

  useEffect(() => {
    if (collectionData) {
      setOffersPage(collectionData?.configCollection.items[0].offersPage);

      let countDownClockMini =
        collectionData?.configCollection?.items[0].countDownClockReservaMini;

      let limitDate;
      if (countDownClockMini?.countdown) {
        limitDate = intervalToDuration({
          start: Date.now(),
          end: new Date(countDownClockMini?.countdown),
        });
      }
      if (limitDate) {
        setCountDownClockRsvMini({
          ...countDownClockMini,
          formattedValue: `${limitDate?.days * 24 + limitDate?.hours}:${limitDate?.minutes
            }:${limitDate?.seconds}`,
        });
      }
    }
  }, [collectionData]);

  useEffect(() => {
    if (collectionData) {
      setModalDiscount(
        collectionData?.configCollection?.items[0].discountCodeBar
      );

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
            formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes
              }:${limitDate.seconds}`,
          });
        }
      }
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
    getStorage();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const renderCarouselBanners = useMemo(() => {

    return carrousels.map((carrousel) => {
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
              orderBy={items[0].orderBy}
              height={items[0].image.height}
              reference={items[0].reference}
              url={items[0].image.url}
              reservaMini={items[0].reservaMini}
            />
          );
          break;
        }
        case CarrouselTypes.banner: {
          const { image, reference, reservaMini, orderBy } =
            carrousel.itemsCollection.items[0];
          return (
            <Banner
              orderBy={orderBy}
              height={image.height}
              reference={reference}
              url={image.url}
              reservaMini={reservaMini}
            />
          );
          break;
        }
        default: {
          return <></>;
          break;
        }
      }
    });
  }, [carrousels]);

  const handleModalCodeIsVisible = useCallback(() => {
    setModalCodeIsVisible(false);
  }, []);

  return (
    <Box flex={1} bg="white">
      <TopBarDefault loading={loading} />
      <StoreUpdate />
      {modalDiscount && (
        <DiscoutCodeModal
          data={modalDiscount}
          isVisible={modalCodeIsVisible}
          onClose={handleModalCodeIsVisible}
        />
      )}
      <WithoutInternet />
      {loading ? (
        <Skeleton />
      ) : (
        <SafeAreaView
          style={{
            marginBottom: modalDiscount && modalCodeIsVisible ? 87 : 50,
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
              {renderCarouselBanners}
            </Box>

            <FlatList
              data={images}
              renderItem={({ item }) => {
                return (
                  <Banner
                    orderBy={item.orderBy}
                    height={item.height}
                    reference={item.reference}
                    url={item.url}
                    route={item.isLandingPage ? 'LandingPage' : item.route}
                    landingPageId={item.landingPageId}
                    reservaMini={item.reservaMini}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </Box>
  );
};
