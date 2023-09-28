import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button } from '@usereservaapp/reserva-ui';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import testProps from '../../../../utils/testProps';

export interface IHomeCard {
  imageUrl: string;
  reference: string;
  reservaMini: boolean;
  orderBy: string;
}

function HomeCard({
  imageUrl,
  reference,
  reservaMini,
  orderBy,
}: IHomeCard) {
  const navigation = useNavigation();

  const handleNavigation = () => {
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

      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
      });

      return;
    }

    navigation.navigate('ProductCatalog', {
      referenceId: reference,
      reservaMini,
      orderBy,
    });
  };

  if (!imageUrl) return null;

  return (
    <Box {...testProps(`card_container_${reference}`)}>
      <Button
        onPress={handleNavigation}
        {...testProps(`card_button_${reference}`)}
      >
        <ImageComponent
          height={280}
          width={configDeviceSizes.DEVICE_WIDTH * 0.85 - 16}
          source={{ uri: imageUrl }}
        />
      </Button>
    </Box>
  );
}

export default HomeCard;
