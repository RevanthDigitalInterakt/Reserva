import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { TrackPageTypeEnum } from '../../base/graphql/generated';
import { COLORS } from '../../base/styles/colors';
import AbandonedCart from '../../components/AbandonedCart/AbandonedCart';
import { ActivityTracking } from '../../components/ActivityTracking';
import NewBanner from '../../components/Banner/NewBanner';
import { Box } from '../../components/Box/Box';
import { Drawer } from '../../components/Drawer';
import ModalSignUpComplete from '../../components/ModalSignUpComplete';
import OneP5P from '../../components/OneP5P/OneP5P';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import {
  NewTransparentTopBarDefault,
} from '../../modules/Menu/components/NewTransparentTopBarDefault';
import { NewWhiteTopBarDefault } from '../../modules/Menu/components/NewWhiteTopBarDefault';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import testProps from '../../utils/testProps';
import useAuthModalStore from '../../zustand/useAuthModalStore';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { useHomeStore } from '../../zustand/useHomeStore';
import { useProductDetailStore } from '../../zustand/useProductDetail/useProductDetail';
import { useShelfStore } from '../../zustand/useShelfStore/useShelfStore';
import { trackPageViewStore } from '../../zustand/useTrackPageViewStore/useTrackPageViewStore';
import { NewHomeCarousels } from './components/NewHomeCarousels';
import { NewHomeCountDown } from './components/NewHomeCountDown.tsx';
import ShowcaseDrawerContent from './components/ShowcaseDrawerContent/ShowcaseDrawerContent';
import useHomeHeader from './hooks/useHomeHeader';
import styles from './styles';

dayjs.extend(utc);
dayjs.extend(timezone);

function RouletWebview() {
  const { actions, rouletIsOpen, rouletIsLoading } = useBagStore([
    'actions',
    'rouletIsOpen',
    'rouletIsLoading',
  ]);

  const onHandleMessage = useCallback(async (ev: WebViewMessageEvent) => {
    actions.SET_ROULET_LOADING(false);
    if (ev?.nativeEvent?.data) {
      const parsed = JSON.parse(ev?.nativeEvent?.data);
      if (parsed?.data?.reward?.code) {
        actions.SAVE_ROULET_COUPON(
          parsed?.data?.reward?.code,
          parsed?.timestamp,
        );
        await AsyncStorage.setItem('rouletCoupon', JSON.stringify({
          code: parsed?.data?.reward?.code,
          timestamp: parsed?.timestamp,
          blocked: false,
        }));
      }
      if (parsed?.data?.closeMethod === 'button-click') {
        actions.CLOSE_ROULET();
      }
    }
  }, []);

  const webViewUri = useMemo(
    () => `https://www.usereserva.com/files/popconvert.html?${new Date().getTime()}`,
    [],
  );

  return rouletIsOpen ? (
    <View
      style={styles.rouletWrapper}
    >
      <WebView
        source={{
          uri: webViewUri,
        }}
        style={styles.webView}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        onMessage={onHandleMessage}
      />

      <View
        style={[{
          display: rouletIsLoading ? 'flex' : 'none',
        }, styles.loaderWrapper]}
      >
        <ActivityIndicator color={COLORS.RED} size="large" />
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => actions.CLOSE_ROULET()}
      >
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}

function ListHeader() {
  return (
    <Box style={{ overflow: 'hidden' }}>
      <NewHomeCarousels />
    </Box>
  );
}

function ListFooter() {
  const { getBoolean } = useRemoteConfig();
  const showOneP5P = getBoolean('show_onep5p_home');
  const showAbandonedCart = getBoolean('show_abandoned_cart');
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

  return (
    <View>
      {allItemsQuantity > 0 && showAbandonedCart && (<AbandonedCart />)}
      {showOneP5P && (<OneP5P comingFrom="home" />)}
    </View>
  );
}

function Home() {
  const { onLoad, medias, loading } = useHomeStore([
    'onLoad',
    'medias',
    'loading',
  ]);

  const { showModalSignUpComplete } = useAuthModalStore([
    'showModalSignUpComplete',
  ]);

  const { drawerIsOpen } = useProductDetailStore(['drawerIsOpen']);
  const { shelfItemData } = useShelfStore(['shelfItemData']);
  const { getString } = useRemoteConfig();

  const {
    handleScroll,
    topBarDefaultAnimated,
    transparentTopBarAnimated,
    whiteTopBarAnimated,
  } = useHomeHeader();

  useEffect(() => {
    const doRequest = async () => onLoad();
    doRequest();
  }, []);

  useEffect(() => {
    trackPageViewStore.getState().onTrackPageView('home', TrackPageTypeEnum.Home);
    EventProvider.logEvent('page_view', { item_brand: defaultBrand.picapau });

    DeviceInfo.isLocationEnabled().then((enabled) => {
      EventProvider.logEvent('device_info', { locationEnabled: enabled ? 'enabled' : 'disabled' });
    });
  }, []);

  return (
    <>
      <ActivityTracking />
      <Box flex={1} bg="white" {...testProps('home_container')}>
        <Animated.View style={[styles.topBarDefault, topBarDefaultAnimated]}>
          <TopBarDefault />
        </Animated.View>
        <Animated.View
          style={[styles.transparentTopBar, transparentTopBarAnimated]}
        >
          <NewTransparentTopBarDefault />
        </Animated.View>
        <Animated.View style={[styles.whiteTopBar, whiteTopBarAnimated]}>
          <NewWhiteTopBarDefault />
        </Animated.View>
        <SafeAreaView {...testProps('home_count_down_container')}>
          <RouletWebview />
          <FlatList
            ListHeaderComponent={
              <ListHeader />
            }
            bounces
            onScroll={handleScroll}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyExtractor={(item, index) => (index === 2 && (getString('count_down_position') === 'B') ? 'home-carousel' : `home-media-${item.image.url.toString()}-${item.image.title}`)}
            data={medias}
            renderItem={({ item, index }) => {
              if (index === 2 && (getString('count_down_position') === 'B')) {
                return (
                  <>
                    <NewHomeCountDown />
                    <NewBanner
                      facets={item.facets}
                      image={item.image.url}
                      orderBy={item.orderBy}
                      reference={item?.reference}
                      reservaMini={item.reservaMini}
                      deepLinkNewsletter={item?.deepLinkNewsletter}
                      deepLink={item?.deepLink}
                      headerImageUrl={item?.headerImage?.url}
                    />
                  </>
                );
              }
              if (index === medias.length - 1 && getString('count_down_position') === 'C') {
                return (
                  <>
                    <NewBanner
                      facets={item.facets}
                      image={item.image.url}
                      orderBy={item.orderBy}
                      reference={item?.reference}
                      reservaMini={item.reservaMini}
                      deepLinkNewsletter={item?.deepLinkNewsletter}
                      deepLink={item?.deepLink}
                      headerImageUrl={item?.headerImage?.url}
                    />
                    <NewHomeCountDown />
                  </>
                );
              }

              return (
                <NewBanner
                  facets={item.facets}
                  image={item.image.url}
                  orderBy={item.orderBy}
                  reference={item?.reference}
                  reservaMini={item.reservaMini}
                  deepLinkNewsletter={item?.deepLinkNewsletter}
                  deepLink={item?.deepLink}
                  headerImageUrl={item?.headerImage?.url}
                />
              );
            }}
            ListFooterComponent={!loading ? <ListFooter /> : null}
          />
        </SafeAreaView>
        {!!showModalSignUpComplete && <ModalSignUpComplete />}
      </Box>
      {drawerIsOpen && (
        <Drawer isOpen={drawerIsOpen} snapPoints={['10%', '53%']}>
          <ShowcaseDrawerContent productData={shelfItemData} />
        </Drawer>
      )}
    </>
  );
}

export default Home;
