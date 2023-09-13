import { Box } from '@usereservaapp/reserva-ui';
import React, { useEffect, useState } from 'react';
import {
  FlatList, SafeAreaView, Text, TouchableOpacity, View,
} from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import testProps from '../../utils/testProps';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import HomeCarousels from './components/HomeCarousels';
import NewBanner from '../../components/Banner/NewBanner';
import HomeDiscountModal from './components/HomeDiscountModal';
import HomeCountDown from './components/HomeCountDown';
import useAuthModalStore from '../../zustand/useAuthModalStore';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import ModalSignUpComplete from '../../components/ModalSignUpComplete';
import { useHomeStore } from '../../zustand/useHomeStore';
import WithoutInternet from '../../components/WithoutInternet';
import { useConnectivityStore } from '../../zustand/useConnectivityStore';
import { COLORS } from '../../base/styles/colors';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { platformType } from '../../utils/platformType';

dayjs.extend(utc);
dayjs.extend(timezone);

function Home() {
  const { onLoad, medias, loaded } = useHomeStore(['onLoad', 'medias', 'loaded']);
  const { showModalSignUpComplete } = useAuthModalStore(['showModalSignUpComplete']);
  const { isConnected } = useConnectivityStore(['isConnected']);

  const [isRoletaVisible, setIsRoletaVisible] = useState(false);

  useEffect(() => {
    if (isConnected && !loaded) {
      onLoad();

      EventProvider.logEvent('page_view', { wbrand: defaultBrand.picapau });
    }
  }, [isConnected, loaded]);

  if (!loaded && !isConnected) {
    return (
      <Box flex={1} bg="white" {...testProps('home_container')}>
        <TopBarDefault />

        <WithoutInternet />
      </Box>
    );
  }

  return (
    <Box flex={1} bg="white" {...testProps('home_container')}>
      <TopBarDefault />

      <HomeDiscountModal />

      <SafeAreaView {...testProps('home_count_down_container')}>
        <FlatList
          ListHeaderComponent={(
            <Box style={{ overflow: 'hidden' }}>
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

              <HomeCountDown />

              <HomeCarousels />
            </Box>
          )}
          bounces
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
        style={{
          height: configDeviceSizes.DEVICE_HEIGHT * 0.9,
        }}
      >
        <WebView
          source={{ uri: `https://www.usereserva.com/files/popconvert.html?${new Date().getTime()}` }}
          style={{
            width: '100%',
            height: configDeviceSizes.DEVICE_HEIGHT * 0.9,
            backgroundColor: '#fff',
          }}
          cacheEnabled={false}
          cacheMode="LOAD_NO_CACHE"
          onError={(l) => console.log('onError', l)}
          onHttpError={(l) => console.log('onHttpError', l)}
          onMessage={(l) => console.log('onMessage', l)}
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
