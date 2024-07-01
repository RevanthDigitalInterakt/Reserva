import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, useWindowDimensions } from 'react-native';
import type { HomeCarouselOutput } from '../../../../base/graphql/generated';
import testProps from '../../../../utils/testProps';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import { BrandContainer, styles } from './HomeBrandsCarousel.styles';
import NewBanner from '../../../../components/Banner/NewBanner';
import EventProvider from '../../../../utils/EventProvider';

interface IHomeBrandsCarousel {
  data: HomeCarouselOutput;
}

function HomeBrandsCarousel({ data }: IHomeBrandsCarousel) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const onPress = useCallback((reference: string): void => {
    EventProvider.logEvent('carousel_brand_click', { reference });
    if (!reference) {
      navigation.navigate('ProductCatalog');
    }

    navigation.navigate('ProductCatalog', { referenceId: reference });
  }, [navigation]);

  if (data.items.length <= 1) {
    const [item] = data.items;

    return (
      <NewBanner
        facets={item!.facets}
        image={item!.image.url}
        orderBy={item!.orderBy}
        reference={item!.reference}
        reservaMini={item!.reservaMini}
      />
    );
  }

  return (
    <FlatList
      {...testProps('brands_flatList')}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data.items}
      scrollEnabled={data.items.length > 4}
      snapToAlignment="start"
      style={styles.carousel}
      keyExtractor={(item) => `idx-brands-${item.image.url}`}
      contentContainerStyle={styles.contentContainerCarousel}
      scrollEventThrottle={16}
      decelerationRate="fast"
      renderItem={({
        item: { image, reference },
        index,
      }) => (
        <BrandContainer
          {...testProps(`brands_brand_container-${index}`)}
          deviceWidth={width}
          index={index}
          onPress={() => onPress(reference)}
          lastIndex={data.items.length}
          style={styles.brandShadowContainer}
        >
          <ImageComponent
            source={{ uri: image.url }}
            style={{
              maxHeight: 20,
              width: 60,
              height: 20,
              maxWidth: 60,
            }}
          />
        </BrandContainer>

      )}
    />
  );
}

export default HomeBrandsCarousel;
