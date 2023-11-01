import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import Modal from 'react-native-modal';

import NewBanner from '../../components/Banner/NewBanner';
import { Box } from '../../components/Box/Box';
import ModalSignUpComplete from '../../components/ModalSignUpComplete';
import WithoutInternet from '../../components/WithoutInternet';
import { useConnectivityStore } from '../../zustand/useConnectivityStore';
import { COLORS } from '../../base/styles/colors';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { platformType } from '../../utils/platformType';
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

dayjs.extend(utc);
dayjs.extend(timezone);

// const injectedJavaScript = `
// window.ReactNativeWebView.postMessage('{"type":"button-action","state":false}');
//   `;
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

  const [isRoletaVisible, setIsRoletaVisible] = useState(false);

  const onHandleMessage = useCallback((ev: WebViewMessageEvent) => {
    try {
      if (ev?.nativeEvent?.data) {
        const parsed = JSON.parse(ev?.nativeEvent?.data);

        if (parsed?.type) {
          setIsRoletaVisible(false);
        }
      }
    } catch (err) {
      //
    }
  }, []);
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
    <Box flex={1} bg="white" {...testProps('home_container')}>
      {newHeaderIsActive ? renderHeader() : <TopBarDefault />}
      {!newHeaderIsActive ? <HomeDiscountModal /> : null}
      <SafeAreaView {...testProps('home_count_down_container')}>
        <FlatList
          ListHeaderComponent={(
            <>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsRoletaVisible(true)}
                  style={{
                    backgroundColor: COLORS.RED,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: '#fff' }}>ABRIR MODAL ROLETA</Text>
                </TouchableOpacity>
              </View>
              <ListHeader newHeaderIsActive={newHeaderIsActive} />
            </>
          )}
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

      <Modal
        isVisible={isRoletaVisible}
        onBackButtonPress={() => setIsRoletaVisible(false)}
        onBackdropPress={() => setIsRoletaVisible(false)}
        style={{
          height: configDeviceSizes.DEVICE_HEIGHT * 0.9,
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: configDeviceSizes.DEVICE_WIDTH / 2 - 25,
            top: (configDeviceSizes.DEVICE_HEIGHT * 0.9) / 2 - 25,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color={COLORS.RED} size="large" />
        </View>

        <WebView
          source={{
            uri: `https://www.usereserva.com/files/popconvert.html?${new Date().getTime()}`,
          }}
          style={{
            width: '100%',
            height: configDeviceSizes.DEVICE_HEIGHT * 0.9,
            backgroundColor: 'transparent',
          }}
          cacheEnabled={false}
          cacheMode="LOAD_NO_CACHE"
          renderLoading={() => <ActivityIndicator />}
          // injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
          onMessage={onHandleMessage}
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
            top: platformType.IOS ? 20 : 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: COLORS.RED,
          }}
          onPress={() => setIsRoletaVisible(false)}
        >
          <Text style={{ fontSize: 12, color: '#fff' }}>Fechar</Text>
        </TouchableOpacity>
      </Modal>

      {!!showModalSignUpComplete && <ModalSignUpComplete />}
    </Box>
  );
}

export default Home;
