import { useNavigation } from '@react-navigation/native';
import { Box } from '@usereservaapp/reserva-ui';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import ImageComponent from '../ImageComponent/ImageComponent';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import testProps from '../../utils/testProps';
import { COLORS } from '../../base/styles/colors';

export interface BannerProps {
  reference: string;
  url: string;
  reservaMini?: boolean;
  orderBy?: string;
}

const Banner: React.FC<BannerProps> = ({
  reference,
  url,
  reservaMini,
  orderBy,
}) => {
  const navigation = useNavigation();

  const handleOnPressed = useCallback(() => {
    const facetInput = [];
    const [categoryType, categoryData] = reference?.split(':') || [undefined, undefined];

    if (categoryType === 'product') {
      EventProvider.logEvent('page_view', {
        wbrand: defaultBrand.picapau,
      });
      EventProvider.logEvent('select_item', {
        item_list_id: categoryData || '',
        item_list_name: '',
        wbrand: defaultBrand.reserva,
      });

      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: COLORS.WHITE,
      });
    } else {
      if (categoryType === 'category') {
        categoryData?.split('|').forEach((cat: string) => {
          facetInput.push({
            key: 'c',
            value: cat,
          });
        });
      } else {
        facetInput.push({
          key: 'productClusterIds',
          value: categoryData,
        });
      }
      navigation.navigate('ProductCatalog', {
        facetInput,
        referenceId: reference,
        reservaMini,
        orderBy,
      });
    }
  }, [reference, navigation, reservaMini, orderBy]);

  if (!url) {
    return null;
  }

  return (
    <Box testID="com.usereserva:id/banner_container" alignItems="flex-start">
      <Box mb="quarck" width={1 / 1}>
        <TouchableOpacity
          onPress={handleOnPressed}
          {...testProps('com.usereserva:id/banner_button')}
        >
          <ImageComponent
            source={{ uri: url }}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default Banner;
