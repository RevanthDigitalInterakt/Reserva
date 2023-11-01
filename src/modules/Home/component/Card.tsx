import React from 'react';
import { useNavigation } from '@react-navigation/native';

import type { CarrouselCard, IQueryFilters } from '../../../graphql/homePage/HomeQuery';
import EventProvider from '../../../utils/EventProvider';
import configDeviceSizes from '../../../utils/configDeviceSizes';
import { defaultBrand } from '../../../utils/defaultWBrand';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';

export interface IHomeCard {
  image: {
    fileName?: string;
    size?: number;
    title?: string;
    url: string;
    width?: number;
    height?: number;
  };
  reservaMini: boolean;
  name: string;
  description: string;
  reference: string;
  orderBy: string;
  filters?: IQueryFilters
}

const Card = ({
  image,
  reference,
  reservaMini,
  orderBy,
}: CarrouselCard) {
  const navigation = useNavigation();

  const handleNavigation = () => {
    const facetInput = [];
    const [categoryType, categoryData] = reference.split(':');

    if (categoryType === 'product') {
      EventProvider.logEvent('page_view', {
        item_brand: defaultBrand.picapau,
      });
      EventProvider.logEvent('select_item', {
        item_list_id: categoryData || '',
        item_list_name: '',
        item_brand: defaultBrand.reserva,
      });

      return navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      });
    }

    if (categoryType === 'category') {
      categoryData?.split('|').forEach((cat: string) => {
        facetInput.push({
          key: 'c',
          value: cat,
        });
      });
    } else { // TODO get map default categoryType
      facetInput.push({
        key: 'productClusterIds',
        value: categoryData,
      });
    }

    return navigation.navigate('ProductCatalog', {
      referenceId: reference,
      reservaMini,
      orderBy,
    });
  };

  if (!image?.url) {
    return null;
  }

  return (
    <Box testID="com.usereserva:id/card_container">
      <Button onPress={handleNavigation} testID="com.usereserva:id/card_button">
        <ImageComponent
          height={280}
          width={configDeviceSizes.DEVICE_WIDTH * 0.85 - 16}
          source={{ uri: image?.url }}
        />
      </Button>
    </Box>
  );
}

export default Card;
