import { Box } from '@usereservaapp/reserva-ui';
import React, { useEffect } from 'react';
import {
  FlatList, SafeAreaView,
} from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
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

dayjs.extend(utc);
dayjs.extend(timezone);

function Home() {
  const { onLoad, medias, loaded } = useHomeStore(['onLoad', 'medias', 'loaded']);
  const { showModalSignUpComplete } = useAuthModalStore(['showModalSignUpComplete']);
  const { isConnected } = useConnectivityStore(['isConnected']);

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

      {!!showModalSignUpComplete && <ModalSignUpComplete />}
    </Box>
  );
}

export default Home;
