import React, { useCallback, useEffect, useState } from 'react';
import { Image } from '@usereservaapp/reserva-ui';
import { FlatList, useWindowDimensions } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import { brandsCarouselQuery, IBrandCarouselItem, IBrandsCarouselQuery } from '../../../../graphql/brands/brandsCarouselQuery';
import { BrandContainer, brandShadowContainer, styles } from './styles/styles';
import EventProvider from '../../../../utils/EventProvider';

const BrandsComponent = (): JSX.Element => {
  const [brands, setBrands] = useState<IBrandCarouselItem[]>([]);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const [getBrands] = useLazyQuery<IBrandsCarouselQuery>(brandsCarouselQuery, {
    context: { clientName: 'contentful' },
    variables: {
      id: Config.ID_BRANDS_COLLECTION_CONTENTFUL,
    },
  });

  const handleNavigateToBrand = useCallback((reference: string): void => {
    try {
      if (!reference) {
        navigation.navigate('ProductCatalog');
      }

      navigation.navigate('ProductCatalog', {
        referenceId: reference,
      });
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getBrands();

        const items = data?.brandsCarousel?.brandsCollection?.items;

        if (items?.length) {
          setBrands(items);
        }
      } catch (error) {
        EventProvider.captureException(error);
      }
    })();
  }, []);

  return (
    <FlatList
      testID="brands_flatList"
      horizontal
      showsHorizontalScrollIndicator={false}
      data={brands}
      scrollEnabled={brands.length > 4}
      snapToAlignment="start"
      style={styles.carousel}
      keyExtractor={(item) => `idx-brands-${item.brandLogo.url}`}
      contentContainerStyle={styles.contentContainerCarousel}
      scrollEventThrottle={16}
      decelerationRate="fast"
      renderItem={({ item: { brandLogo: { url }, reference }, index }): JSX.Element => (
        <BrandContainer
          testID="brands_brand_container"
          deviceWidth={width}
          index={index}
          onPress={() => handleNavigateToBrand(reference)}
          lastIndex={brands.length}
          style={brandShadowContainer}
        >
          {url ? (
            <Image
              source={{ uri: url }}
              autoHeight
              resizeMode="contain"
              style={styles.brandImageCarousel}
            />
          ) : null}
        </BrandContainer>
      )}
    />

  );
};

export default BrandsComponent;
