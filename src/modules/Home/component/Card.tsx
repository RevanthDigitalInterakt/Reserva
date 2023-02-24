import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Box, Button, Image } from '@usereservaapp/reserva-ui';
import type { CarrouselCard } from '../../../graphql/homePage/HomeQuery';
import EventProvider from '../../../utils/EventProvider';
import configDeviceSizes from '../../../utils/configDeviceSizes';

const Card: React.FC<Omit<CarrouselCard, 'mkt'>> = ({
  image,
  reference,
  reservaMini,
  orderBy,
  linkMktIn,
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    const facetInput = [];
    const [categoryType, categoryData] = reference.split(':');

    if (linkMktIn) {
      return navigation.navigate(linkMktIn);
    }

    if (categoryType === 'product') {
      EventProvider.logEvent('select_item', {
        item_list_id: categoryData ?? '',
        item_list_name: '',
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

  return (
    <Box>
      <Button onPress={handleNavigation}>
        <Image
          autoHeight
          width={configDeviceSizes.DEVICE_WIDTH * 0.85 - 16}
          source={{ uri: image?.url }}
        />
      </Button>
    </Box>
  );
};

export default Card;
