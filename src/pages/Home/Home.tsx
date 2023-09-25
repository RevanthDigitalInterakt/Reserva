import { Box } from '@usereservaapp/reserva-ui';
import React, { useEffect } from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
} from 'react-native';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import testProps from '../../utils/testProps';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import HomeCarousels from './components/HomeCarousels';
import NewBanner from '../../components/Banner/NewBanner';
import HomeCountDown from './components/HomeCountDown';
import useAuthModalStore from '../../zustand/useAuthModalStore';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import ModalSignUpComplete from '../../components/ModalSignUpComplete';
import { useHomeStore } from '../../zustand/useHomeStore';
import WithoutInternet from '../../components/WithoutInternet';
import { useConnectivityStore } from '../../zustand/useConnectivityStore';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { NewHomeCarousels } from './components/NewHomeCarousels';
import { NewTransparentTopBarDefault } from '../../modules/Menu/components/NewTransparentTopBarDefault';
import HomeDiscountModal from './components/HomeDiscountModal';
import { NewWhiteTopBarDefault } from '../../modules/Menu/components/NewWhiteTopBarDefault';
import styles from './styles';
import useHomeHeader from './hooks/useHomeHeader';

dayjs.extend(utc);
dayjs.extend(timezone);

const ListHeader = ({ newHeaderIsActive }: { newHeaderIsActive: boolean }) => (
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

      EventProvider.logEvent('page_view', { wbrand: defaultBrand.picapau });
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
          ListHeaderComponent={<ListHeader newHeaderIsActive={newHeaderIsActive} />}
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
  );
}

export default Home;
