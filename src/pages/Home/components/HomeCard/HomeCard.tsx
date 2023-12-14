import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import EventProvider from '../../../../utils/EventProvider';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import testProps from '../../../../utils/testProps';
import type { IFilters } from '../../../../utils/generateFacets';

export interface IHomeCard {
  imageUrl: string;
  reference: string;
  reservaMini: boolean;
  orderBy: string;
  filters?: IFilters;
}

function HomeCard({
  imageUrl,
  reference,
  reservaMini,
  orderBy,
  filters,
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

    let navigateParams: {
      referenceId: string;
      reservaMini: boolean;
      orderBy: string;
      filters?: IFilters;
    } = {
      referenceId: reference,
      reservaMini,
      orderBy,
    };

    if ((filters?.priceFilter?.from
                || filters?.priceFilter?.from === null)
            && filters?.priceFilter?.to) {
      navigateParams = {
        ...navigateParams,
        filters: {
          priceFilter: {
            from: filters?.priceFilter?.from || 0,
            to: filters?.priceFilter?.to || 0,
          },
        },
      };
    }

    navigation.navigate('ProductCatalog', navigateParams);
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
