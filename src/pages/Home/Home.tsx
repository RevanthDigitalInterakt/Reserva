import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator, Animated, FlatList, SafeAreaView, Text, TouchableOpacity, View,
} from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NewBanner from '../../components/Banner/NewBanner';
import { Box } from '../../components/Box/Box';
import ModalSignUpComplete from '../../components/ModalSignUpComplete';
import WithoutInternet from '../../components/WithoutInternet';
import { useConnectivityStore } from '../../zustand/useConnectivityStore';
import { COLORS } from '../../base/styles/colors';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { NewTransparentTopBarDefault } from '../../modules/Menu/components/NewTransparentTopBarDefault';
import { NewWhiteTopBarDefault } from '../../modules/Menu/components/NewWhiteTopBarDefault';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import testProps from '../../utils/testProps';
import useAuthModalStore from '../../zustand/useAuthModalStore';
import { useHomeStore } from '../../zustand/useHomeStore';
import HomeCarousels from './components/HomeCarousels';
import HomeCountDown from './components/HomeCountDown';
import HomeDiscountModal from './components/HomeDiscountModal';
import { NewHomeCarousels } from './components/NewHomeCarousels';
import useHomeHeader from './hooks/useHomeHeader';
import styles from './styles';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { ActivityTracking } from '../../components/ActivityTracking';

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

function ListHeader({ newHeaderIsActive }: { newHeaderIsActive: boolean }) {
  return (
    <Box style={{ overflow: 'hidden' }}>
      {newHeaderIsActive ? (
        <NewHomeCarousels />
      ) : (
        <>
          <HomeCountDown />
          <HomeCarousels />
        </>
      )}
    </Box>
  );
}

function Home() {
  const { onLoad, medias, loaded } = useHomeStore([
    'onLoad',
    'medias',
    'loaded',
  ]);
  const { showModalSignUpComplete } = useAuthModalStore([
    'showModalSignUpComplete',
  ]);
  const { isConnected } = useConnectivityStore(['isConnected']);

  const { getBoolean } = useRemoteConfig();
  const newHeaderIsActive = getBoolean('show_new_header');

  const {
    handleScroll,
    topBarDefaultAnimated,
    transparentTopBarAnimated,
    whiteTopBarAnimated,
  } = useHomeHeader();

  const renderHeader = () => (
    <>
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
    </>
  );

  useEffect(() => {
    if (isConnected && !loaded) {
      onLoad();

      EventProvider.logEvent('page_view', { item_brand: defaultBrand.picapau });
    }
  }, [isConnected, loaded]);

  if (!loaded && !isConnected) {
    return (
      <Box flex={1} bg="white" {...testProps('home_container')}>
        {newHeaderIsActive ? (
          <NewTransparentTopBarDefault />
        ) : (
          <TopBarDefault />
        )}
        <WithoutInternet />
      </Box>
    );
  }

  return (
    <>
      <ActivityTracking />
      <Box flex={1} bg="white" {...testProps('home_container')}>
        {newHeaderIsActive ? renderHeader() : <TopBarDefault />}
        {!newHeaderIsActive ? <HomeDiscountModal /> : null}
        <SafeAreaView {...testProps('home_count_down_container')}>
          <RouletWebview />
          <FlatList
            ListHeaderComponent={
              <ListHeader newHeaderIsActive={newHeaderIsActive} />
                        }
            bounces
            onScroll={handleScroll}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyExtractor={(item) => `home-media-${item.image.url.toString()}-${item.image.title}`}
            data={medias}
            renderItem={({ item }) => (
              <NewBanner
                facets={item.facets}
                image={item.image.url}
                orderBy={item.orderBy}
                reference={item.reference}
                reservaMini={item.reservaMini}
              />
            )}
          />
        </SafeAreaView>
        {!!showModalSignUpComplete && <ModalSignUpComplete />}
      </Box>
    </>
  );
}

export default Home;
