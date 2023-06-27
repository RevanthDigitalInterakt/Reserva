import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';

import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import {
  IBrandCarouselItem,
  IBrandsCarouselQuery,
  brandsCarouselQuery,
} from '../../../../graphql/brands/brandsCarouselQuery';
import EventProvider from '../../../../utils/EventProvider';
import testProps from '../../../../utils/testProps';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { BrandContainer, brandShadowContainer, styles } from './styles/styles';

const BrandsComponent = (): JSX.Element => {
  const [brands, setBrands] = useState<IBrandCarouselItem[]>([]);
  const { width } = useWindowDimensions();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const navigation = useNavigation();

  const [getBrands] = useLazyQuery<IBrandsCarouselQuery>(brandsCarouselQuery, {
    context: { clientName: 'contentful' },
    variables: { id: Config.ID_BRANDS_COLLECTION_CONTENTFUL },
    fetchPolicy: getFetchPolicyPerKey('brandsCarousel'),
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
  }, [navigation]);

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
  }, [getBrands]);

  return (
    <FlatList
      {...testProps('com.usereserva:id/brands_flatList')}
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
      renderItem={({
        item: {
          brandLogo: { url },
          reference,
        },
        index,
      }) => (
        <BrandContainer
          {...testProps(`com.usereserva:id/brands_brand_container-${index}`)}
          deviceWidth={width}
          index={index}
          onPress={() => handleNavigateToBrand(reference)}
          lastIndex={brands.length}
          style={brandShadowContainer}
        >
          {url ? (
            <ImageComponent
              source={{ uri: url }}
              style={{
                maxHeight: 20,
                width: 60,
                height: 20,
                maxWidth: 60,
              }}
            />
          ) : <View />}
        </BrandContainer>

      )}
    />

  );
};

export default BrandsComponent;
