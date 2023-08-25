import { useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { intervalToDuration } from 'date-fns';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import DeepLinkPathModule from '../../../NativeModules/DeepLinkPathModule';
import { useCountDown } from '../../../context/ChronometerContext';
import { useConfigContext } from '../../../context/ConfigContext';
import { type ICountDownClock, countdownClockQuery } from '../../../graphql/countDownClock/countdownClockQuery';
import {
  type Carousel,
  configCollection, homeQuery,
} from '../../../graphql/homePage/HomeQuery';
import { useChronometer } from '../../../hooks/useChronometer';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { useCheckConnection } from '../../../hooks/useCheckConnection';
import EventProvider from '../../../utils/EventProvider';
import allSettled from '../../../utils/allSettled';
import configDeviceSizes from '../../../utils/configDeviceSizes';
import { defaultBrand } from '../../../utils/defaultWBrand';
import testProps from '../../../utils/testProps';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { CountDownBanner } from '../component/CountDown';
import DiscoutCodeModal from '../component/DiscoutCodeModal';
import HeaderAccessibility from '../component/HeaderAccessibility';
import ManagerBanner from '../component/ManagerBanner';
import ManagerCarousel from '../component/ManagerCarousel';
import { CountDownLocal } from '../component/countDownLocal/CountDownLocal';
import useAuthModalStore from '../../../zustand/useAuthModalStore';
import ModalSignUpComplete from '../component/ModalSignUpComplete';
import { durationToTimeString } from '../../../utils/durationToTimeString';
import { Box } from '../../../components/Box/Box';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';

dayjs.extend(utc);
dayjs.extend(timezone);

export function HomeScreen() {
  const { setOffersPage } = useConfigContext();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { showModalSignUpComplete } = useAuthModalStore(['showModalSignUpComplete']);
  const { setTime } = useCountDown();
  const [modalCodeIsVisible, setModalCodeIsVisible] = useState(true);
  const [modalDiscount, setModalDiscount] = useState<any>();
  const { profile } = useAuthStore(['profile']);

  const [countDownClockLocal, setCountDownClockLocal] = useState<ICountDownClock>();

  const [showClockHome, setShowClockHome] = useState<boolean>(false);

  const [countDownClockGlobal, setCountDownClockGlobal] = useState<ICountDownClock>();

  const [data, setData] = useState<{ carousels: Carousel[], images: Array<any> }>({
    carousels: [],
    images: [],
  });

  const [getHome, { refetch }] = useLazyQuery(homeQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 },
  });

  const [getConfig] = useLazyQuery(configCollection, {
    context: { clientName: 'contentful' },
  });

  const [getcountdownClock] = useLazyQuery(countdownClockQuery, {
    context: { clientName: 'contentful' },
    variables: {
      selectClockScreenHome: 'HOME',
      selectClockScreenAll: 'ALL',
    },
  });

  const { WithoutInternet } = useCheckConnection({ refetch });

  const { getBoolean, initialized } = useRemoteConfig();

  const { currentValue, start } = useChronometer({
    countDown: true,
    initial: countDownClockGlobal?.formattedValue,
  });

  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);
  const [isLoadCompleted, setIsLoadCompleted] = useState<boolean>(false);

  const requestHome = useCallback(async () => {
    try {
      const { data: dataHome } = await getHome({
        fetchPolicy: getFetchPolicyPerKey('home'),
      });

      const carousels: Carousel[] = dataHome?.homePageCollection.items[0]
        .carrouselHomeCollection.items || [];

      const images = dataHome?.homePageCollection?.items[0]?.mediasCollection?.items?.map(
        (imageDescription: any) => ({
          fileName: imageDescription?.image?.fileName,
          title: imageDescription?.image?.title,
          width: imageDescription?.image?.width,
          height: imageDescription?.image?.height,
          size: imageDescription?.image?.size,
          url: imageDescription?.image?.url,
          reference: imageDescription?.reference,
          route: imageDescription?.route,
          reservaMini: imageDescription?.reservaMini,
          orderBy: imageDescription?.orderBy,
          filters: imageDescription?.filters,
        }),
      );

      setData({
        carousels,
        images,
      });
    } catch (e) {
      ExceptionProvider.captureException(e);
    }
  }, [getFetchPolicyPerKey, getHome]);

  const requestConfig = useCallback(async () => {
    try {
      const { data: dataConfig } = await getConfig({
        fetchPolicy: getFetchPolicyPerKey('config'),
      });

      if (dataConfig) {
        setOffersPage(dataConfig?.configCollection?.items[0]?.offersPage || null);
        setModalDiscount(
          dataConfig?.configCollection?.items[0]?.discountCodeBar,
        );
      }
    } catch (e) {
      ExceptionProvider.captureException(e);
    }
  }, [getConfig, getFetchPolicyPerKey, setOffersPage]);

  const requestCountdownClock = useCallback(async () => {
    try {
      const { data: dataCountdownClock } = await getcountdownClock({
        fetchPolicy: getFetchPolicyPerKey('countdownClock'),
      });

      const items = dataCountdownClock?.countdownClockCollection?.items;

      if (items && items?.length > 0) {
        const clockHome = items?.find(
          (x) => x?.selectClockScreen === 'HOME',
        );
        const clockALL = items?.find(
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

          let limitDate: Duration | undefined;

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
              formattedValue: durationToTimeString(limitDate),
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
              formattedValue: durationToTimeString(limitDate),
            });
          }
        }
      }
    } catch (e) {
      ExceptionProvider.captureException(e);
    }
  }, [getFetchPolicyPerKey, getcountdownClock, showClockHome]);

  const initialRequest = useCallback(async () => {
    await allSettled([
      requestHome(),
      requestConfig(),
      requestCountdownClock(),
    ]);

    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
    });
  }, [requestConfig, requestCountdownClock, requestHome]);

  useEffect(() => {
    initialRequest().finally(() => setIsLoadCompleted(true));
  }, [initialRequest]);

  useEffect(() => {
    if (isLoadCompleted && startLoadingTime > 0) onFinishLoad();
  }, [isLoadCompleted, onFinishLoad, startLoadingTime]);

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

  useFocusEffect(
    useCallback(() => {
      const fetchPolocy = getFetchPolicyPerKey('home');

      if (fetchPolocy !== 'cache-first') {
        refetch();
      }
    }, [getFetchPolicyPerKey, refetch]),
  );

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
  }, [profile?.email]);

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

      <TopBarDefault />

      {modalDiscount && (
        <DiscoutCodeModal
          data={modalDiscount}
          isVisible={modalCodeIsVisible}
          onClose={handleModalCodeIsVisible}
        />
      )}

      <WithoutInternet />

      <SafeAreaView
        {...testProps('com.usereserva:id/home_count_down_container')}
        style={{
          marginBottom: modalDiscount && modalCodeIsVisible ? 87 : 50,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: configDeviceSizes.DEVICE_WIDTH * 0.1,
          }}
        >
          <Box style={{ overflow: 'hidden' }}>
            {countDownClockLocal && showClockHome ? (
              <CountDownLocal countDownLocal={countDownClockLocal} />
            ) : (
              <CountDownBanner countDown={countDownClockGlobal} />
            )}

            <ManagerCarousel carousels={data.carousels} />
          </Box>

          <ManagerBanner data={data.images} />

        </ScrollView>
      </SafeAreaView>
      {showModalSignUpComplete && <ModalSignUpComplete />}
    </Box>
  );
}
