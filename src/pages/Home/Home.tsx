import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useMemo } from 'react';
import {
  FlatList, SafeAreaView, Animated
} from 'react-native';

import NewBanner from '../../components/Banner/NewBanner';
import { Box } from '../../components/Box/Box';
import ModalSignUpComplete from '../../components/ModalSignUpComplete';
import WithoutInternet from '../../components/WithoutInternet';
import { useIsTester } from '../../hooks/useIsTester';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { NewTransparentTopBarDefault } from '../../modules/Menu/components/NewTransparentTopBarDefault';
import { NewWhiteTopBarDefault } from '../../modules/Menu/components/NewWhiteTopBarDefault';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import testProps from '../../utils/testProps';
import useAuthModalStore from '../../zustand/useAuthModalStore';
import { useConnectivityStore } from '../../zustand/useConnectivityStore';
import { useHomeStore } from '../../zustand/useHomeStore';
import HomeCarousels from './components/HomeCarousels';
import HomeCountDown from './components/HomeCountDown';
import HomeDiscountModal from './components/HomeDiscountModal';
import { NewHomeCarousels } from './components/NewHomeCarousels';
import useHomeHeader from './hooks/useHomeHeader';
import styles from './styles';

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

  const isTester = useIsTester();
  const { getBoolean } = useRemoteConfig();
  const newHeaderIsActive = useMemo(
    () => getBoolean(isTester ? 'show_new_header_tester' : 'show_new_header'),
    [getBoolean, isTester],
  );

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
