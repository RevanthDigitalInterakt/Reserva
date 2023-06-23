import { useLazyQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Box } from '@usereservaapp/reserva-ui';
import { intervalToDuration } from 'date-fns';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  FC, useCallback, useEffect, useLayoutEffect, useMemo, useState,
} from 'react';
import {
  Dimensions, SafeAreaView, ScrollView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useCountDown } from '../../../context/ChronometerContext';
import { useConfigContext } from '../../../context/ConfigContext';
import { countdownClockQuery, ICountDownClock } from '../../../graphql/countDownClock/countdownClockQuery';
import {
  Carousel, CarrouselTypes, configCollection, homeQuery, HomeQuery,
} from '../../../graphql/homePage/HomeQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { useChronometer } from '../../CorreReserva/hooks/useChronometer';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { StoreUpdate } from '../../Update/pages/StoreUpdate';
import Banner from '../component/Banner';
import { CardsCarrousel } from '../component/CardsCarousel';
import { CountDownBanner } from '../component/CountDown';
import DiscoutCodeModal from '../component/DiscoutCodeModal';
import { Skeleton } from '../component/Skeleton';
import { CountDownLocal } from '../component/countDownLocal/CountDownLocal';
import ModalChristmasCoupon from '../../LandingPage/ModalChristmasCoupon';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import DefaultCarrousel from '../component/Carousel';
import Brands from '../component/Brands';
import testProps from '../../../utils/testProps';
import EventProvider from '../../../utils/EventProvider';
import { defaultBrand } from '../../../utils/defaultWBrand';
import HeaderAccessibility from '../component/HeaderAccessibility';
import DeepLinkPathModule from '../../../NativeModules/DeepLinkPathModule';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import useAuthModalStore from '../../../zustand/useAuthModalStore';
import ModalSignUpComplete from '../component/ModalSignUpComplete';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { RefreshTokenError } from '../../../zustand/useAuth/types/refreshTokenError';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';

dayjs.extend(utc);
dayjs.extend(timezone);

const brandsComponentObject: Carousel = {
  type: CarrouselTypes.brands,
  title: 'Brands',
  itemsCollection: {
    items: [],
  },
} as const;

export const HomeScreen: FC<{
  title: string;
}> = () => {
  const { showModalSignUpComplete } = useAuthModalStore(['showModalSignUpComplete']);
  const navigation = useNavigation();
  const { getItem } = useAsyncStorageProvider();
  const { setOffersPage } = useConfigContext();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { setTime } = useCountDown();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [images, setImages] = useState<HomeQuery[]>([]);
  const [carrousels, setCarrousels] = useState<Carousel[]>([]);
  const [modalDiscount, setModalDiscount] = useState<any>();
  const { profile, onRefreshToken } = useAuthStore(['profile', 'onRefreshToken']);
  const [countDownClock, setCountDownClock] = useState<
  ICountDownClock[] | undefined
  >();
  const [{ data, loading }, setDataHome] = useState({
    data: null,
    loading: true,
  });
  const [{ collectionData }, setDataConfig] = useState({
    collectionData: null,
  });

  const [christmasModal, setChristmasModal] = useState({
    orderId: '',
    showModal: false,
  });

  const [countDownClockLocal, setCountDownClockLocal] = useState<ICountDownClock>();

  const [showClockHome, setShowClockHome] = useState<boolean>(false);

  const [countDownClockGlobal, setCountDownClockGlobal] = useState<ICountDownClock>();
  const deviceWidth = Dimensions.get('screen').width;

  const [getHome, { refetch }] = useLazyQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 }, // quantidade de itens que iram renderizar
  });

  const [getcountdownClock] = useLazyQuery(countdownClockQuery, {
    context: { clientName: 'contentful' },
    variables: {
      selectClockScreenHome: 'HOME',
      selectClockScreenAll: 'ALL',
    },
  });

  const { getBoolean, initialized } = useRemoteConfig();

  const { currentValue, start } = useChronometer({
    countDown: true,
    initial: countDownClockGlobal?.formattedValue,
  });

  useEffect(() => {
    onRefreshToken()
      .catch((err) => {
        if (err instanceof RefreshTokenError) {
          navigation.navigate('Login', { comeFrom: 'Profile', invalidSession: true });
        }
      });
  }, [onRefreshToken, navigation]);

  const { WithoutInternet } = useCheckConnection({ refetch });

  const [getConfig] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    getHome({
      fetchPolicy: getFetchPolicyPerKey('home'),
    }).then((response) => {
      setDataHome({
        data: response.data,
        loading: false,
      });
    });
    getConfig({
      fetchPolicy: getFetchPolicyPerKey('config'),
    }).then((response) => {
      setDataConfig({
        collectionData: response.data,
      });
    });

    getcountdownClock({
      fetchPolicy: getFetchPolicyPerKey('countdownClock'),
    }).then((response) => {
      setCountDownClock(response.data.countdownClockCollection.items);
    });
  }, [getConfig, getFetchPolicyPerKey, getHome, getcountdownClock]);

  useEffect(() => {
    if (countDownClock && countDownClock?.length > 0) {
      const clockHome = countDownClock?.find(
        (x) => x?.selectClockScreen === 'HOME',
      );
      const clockALL = countDownClock?.find(
        (x) => x?.selectClockScreen === 'ALL',
      );

      if (clockHome) {
        if (
          new Date(clockHome?.countdown).getTime() > Date.now()
          && Date.now() > new Date(clockHome?.countdownStart).getTime()
        ) {
          setShowClockHome(true);
        } else {
          setShowClockHome(false);
        }

        let limitDate;

        if (clockHome?.countdown) {
          limitDate = intervalToDuration({
            start: Date.now(),
            end: new Date(clockHome?.countdown),
          });
        }
        if (limitDate) {
          setCountDownClockLocal({
            ...clockHome,
            countdownStart: clockHome?.countdownStart,
            formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes
            }:${limitDate.seconds}`,
          });
        }
      }

      if (clockALL && !showClockHome) {
        let limitDate;
        if (clockALL?.countdown) {
          limitDate = intervalToDuration({
            start: Date.now(),
            end: new Date(clockALL?.countdown),
          });
        }
        if (limitDate) {
          setCountDownClockGlobal({
            ...clockALL,
            countdownStart: clockALL?.countdownStart,
            formattedValue: `${limitDate?.days * 24 + limitDate.hours}:${limitDate.minutes
            }:${limitDate.seconds}`,
          });
        }
      }
    }
  }, [countDownClock]);

  useEffect(() => {
    if (countDownClockGlobal) {
      if (new Date(countDownClockGlobal?.countdown).getTime() > Date.now()) {
        start();
      }
    }
  }, [countDownClockGlobal]);

  useEffect(() => {
    if (currentValue) setTime(currentValue);
  }, [currentValue]);

  useEffect(() => {
    const carrouselsItems: Carousel[] = data?.homePageCollection.items[0]
      .carrouselHomeCollection.items || [];

    const newCarrouselItems: Carousel[] = [
      ...carrouselsItems.slice(0, 1),
      brandsComponentObject,
      ...carrouselsItems.slice(1, carrouselsItems.length),
    ];

    setCarrousels(newCarrouselItems);

    const arrayImages = data?.homePageCollection.items[0].mediasCollection.items.map(
      (imageDescription: any) => ({
        fileName: imageDescription.image.fileName,
        title: imageDescription.image.title,
        width: imageDescription.image.width,
        height: imageDescription.image.height,
        size: imageDescription.image.size,
        url: imageDescription?.image?.url,
        reference: imageDescription.reference,
        route: imageDescription.route,
        isLandingPage: imageDescription.isLandingPage,
        landingPageId: imageDescription.landingPageId,
        reservaMini: imageDescription.reservaMini,
        linkMktIn: imageDescription.linkMktIn,
        orderBy: imageDescription.orderBy,
        filters: imageDescription.filters,
      }),
    );

    setImages(arrayImages);
  }, [data]);

  useEffect(() => {
    if (collectionData) {
      setOffersPage(collectionData?.configCollection?.items[0]?.offersPage || null);
      setModalDiscount(
        collectionData?.configCollection?.items[0]?.discountCodeBar,
      );
    }
  }, [collectionData, setOffersPage]);

  useLayoutEffect(() => {
    getItem('@RNOrder:ChristmasCouponModalOrderId').then((res) => {
      if (res) {
        setChristmasModal({ showModal: true, orderId: res });
      }
    });
  }, []);

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchPolocy = getFetchPolicyPerKey('home');

      if (fetchPolocy !== 'cache-first') {
        refetch();
      }
    }, [getFetchPolicyPerKey, refetch]),
  );

  const renderCarouselBanners = useMemo(() => carrousels.map((carrousel, index) => {
    switch (carrousel?.type) {
      case CarrouselTypes.mainCarrousel: {
        return (
          carrousel.itemsCollection.items.length > 1
            ? <DefaultCarrousel carrousel={carrousel} key={`com.usereserva:id/carousel-${carrousel.title}-${carrousel.type}-${index}`} />
            : (
              <Banner
                key={`carousel-${carrousel.title}-${carrousel.type}-${index}`}
                orderBy={carrousel.itemsCollection.items[0].orderBy}
                height={carrousel.itemsCollection.items[0].image.height}
                reference={carrousel.itemsCollection.items[0]?.reference || ''}
                url={carrousel.itemsCollection.items[0].image.url}
                reservaMini={carrousel.itemsCollection.items[0].reservaMini}
                linkMktIn={carrousel.itemsCollection.items[0].linkMktIn}
                filters={carrousel.itemsCollection.items[0]?.filters}
              />
            )
        );
      }
      case CarrouselTypes.cardsCarrousel: {
        const { items } = carrousel.itemsCollection;

        return items.length > 1 ? (
          <CardsCarrousel
            key={`carousel-${carrousel.title}-${carrousel.type}`}
            carrousel={carrousel}
          />
        ) : (
          <Banner
            key={`carousel-${carrousel.title}-${carrousel.type}`}
            orderBy={items[0].orderBy}
            height={items[0].image.height}
            reference={items[0].reference}
            url={items[0].image.url}
            reservaMini={items[0].reservaMini}
            linkMktIn={item[0].linkMktIn}
            filters={items[0]?.filters}
          />
        );
      }

      case CarrouselTypes.banner: {
        const {
          image, reference, reservaMini, orderBy,
          filters,
        } = carrousel.itemsCollection.items[0];

        return (
          <Banner
            key={`carousel-${carrousel.title}-${carrousel.type}`}
            orderBy={orderBy}
            height={image.height}
            reference={reference}
            url={image?.url}
            reservaMini={reservaMini}
            filters={filters}
          />
        );
      }

      case CarrouselTypes.brands: {
        return (
          <Brands />
        );
      }

      default: {
        return <></>;
      }
    }
  }), [carrousels]);

  const renderBannersFlatList = useMemo(() => (
    <FlatList
      data={images}
      {...testProps('com.usereserva:id/home_banner_flat_list')}
      renderItem={({ item }) => (
        <Banner
          orderBy={item.orderBy}
          height={item.height}
          reference={item.reference}
          url={item.url}
          route={item.isLandingPage ? 'LandingPage' : item.route}
          landingPageId={item.landingPageId}
          reservaMini={item.reservaMini}
          linkMktIn={item.linkMktIn}
          filters={item?.filters}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  ), [images]);

  const handleModalCodeIsVisible = useCallback(() => {
    setModalCodeIsVisible(false);
  }, []);

  const showCampaignBoyfriend = useMemo(() => getBoolean('show_campaign_boyfriend'), [getBoolean, initialized]);

  const goToBrowser = useCallback(async () => {
    EventProvider.logEvent('click_accessibility_app', {
      email: profile?.email || '',
      appState: 'out',
    });

    await DeepLinkPathModule.openUrlInBrowser({
      url: 'https://www.usereserva.com',
      closeCurrentAppInstance: true,
    });
  }, []);

  return (
    <Box flex={1} bg="white" testID="com.usereserva:id/home_container">

      {showCampaignBoyfriend
         && (
         <HeaderAccessibility
           title={'Para uma melhor experiência em acessibilidade,\nacesse nosso site, '}
           onPressTitle="tocando aqui"
           onPress={goToBrowser}
         />
         )}

      <TopBarDefault loading={loading} />

      <StoreUpdate />

      {modalDiscount && (
        <DiscoutCodeModal
          data={modalDiscount}
          isVisible={modalCodeIsVisible}
          onClose={handleModalCodeIsVisible}
        />
      )}

      {!!(christmasModal?.showModal) && (
        <ModalChristmasCoupon
          isVisible={christmasModal.showModal}
          orderId={christmasModal.orderId}
          onClose={() => setChristmasModal({ showModal: false, orderId: '' })}
        />
      )}

      <WithoutInternet />

      {loading ? (
        <Skeleton />
      ) : (
        <SafeAreaView
          {...testProps('com.usereserva:id/home_count_down_container')}
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
              style={{
                overflow: 'hidden',
              }}
            >
              {countDownClockLocal && showClockHome ? (
                <CountDownLocal countDownLocal={countDownClockLocal} />
              ) : (
                <CountDownBanner countDown={countDownClockGlobal} />
              )}

              {renderCarouselBanners}
            </Box>
            {renderBannersFlatList}
          </ScrollView>
        </SafeAreaView>
      )}

      {showModalSignUpComplete && <ModalSignUpComplete />}
    </Box>
  );
};
