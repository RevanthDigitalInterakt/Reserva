import { useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { Box } from '@usereservaapp/reserva-ui';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Dimensions, SafeAreaView, ScrollView, View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Sentry from '../../../config/sentryConfig';
import {
  Carousel,
  CarrouselTypes,
} from '../../../graphql/homePage/HomeQuery';
import { lpMktQuery } from '../../../graphql/lpMktIn/LpMktIn';
import { ProductList } from '../../../shared/components/ProductList';
import Banner from '../../Home/component/Banner';
import DefaultCarrousel from '../../Home/component/Carousel';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import MktBrandsCarousel from '../components/MktBrandsCarousel';
import Skeleton from '../components/Skeleton';

export const LandingPageMkt = () => {
  const [isReady, setIsReady] = useState(false);
  const [mktCollection, setMktCollection] = useState('');
  const [images, setImages] = useState<typeof lpMktQuery[]>([]);
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [brandsCarousel, setBrandsCarousel] = useState<Carousel>();

  const [{ data, loading }, setDataHome] = useState({
    data: null,
    loading: true,
  });

  const [getHome, { refetch }] = useLazyQuery(lpMktQuery, {
    context: { clientName: 'contentful' },
    variables: { limit: 0 },
  });

  const deviceWidth = Dimensions.get('screen').width;

  useEffect(() => {
    getHome().then((response) => {
      setDataHome({
        data: response.data,
        loading: false,
      });
    });
  }, []);

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('LandingPageMkt'));
  }, []);

  useEffect(() => {
    const carouselsItems: Carousel[] = data
      ?.lpMktinCollection
      ?.items[0]
      ?.carouselCollection
      ?.items || [];

    setCarousels(carouselsItems);

    const brandsItems: Carousel = data
      ?.lpMktinCollection
      ?.items[0]
      ?.brandsCollection
      ?.items[0] || [];

    setBrandsCarousel(brandsItems);
    const mktReferencie: string = data?.lpMktinCollection?.items[0]?.mktCollection || '';

    setMktCollection(mktReferencie);

    const arrayImages = data?.lpMktinCollection?.items[0]?.bannersCollection?.items?.map(
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
      }),
    );

    setImages(arrayImages);
    // TODO Refactor
    if (loading === false && data) {
      setTimeout(() => {
        setIsReady(true);
      }, 0);
    }
  }, [data]);

  const renderCarouselBanners = useMemo(() => carousels.map((carousel) => {
    switch (carousel?.type) {
      case CarrouselTypes.mainCarrousel: {
        return (
          <>
            <DefaultCarrousel carrousel={carousel} />
          </>
        );
      }
      default: {
        return <View />;
      }
    }
  }), [carousels]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <Box flex={1} bg="white">
      <TopBarDefaultBackButton loading={false} />
      {isReady ? (
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: deviceWidth * 0.08,
            }}
          >
            <Box
              style={{
                overflow: 'hidden',
              }}
            >
              {renderCarouselBanners}
            </Box>
            <Box>
              <MktBrandsCarousel carousel={brandsCarousel} />
            </Box>
            <Box style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <FlatList
                data={images}
                renderItem={({ item }) => (
                  <Box style={{ paddingBottom: 14 }}>
                    <Banner
                      offsetWidth={16}
                      height={item.height}
                      reference={item.reference}
                      url={item.url}
                      route={item.isLandingPage ? 'LandingPage' : item.route}
                      landingPageId={item.landingPageId}
                      reservaMini={item.reservaMini}
                    />
                  </Box>
                )}
                keyExtractor={(item) => item.id}
              />
            </Box>
            <Box style={{ paddingTop: 5 }}>
              <ProductList referenceId={mktCollection} />
            </Box>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
};
