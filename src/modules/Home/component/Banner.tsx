import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, TouchableHighlight } from 'react-native';
import { Box, Image } from '@usereservaapp/reserva-ui';
import EventProvider from '../../../utils/EventProvider';
import type { IQueryFilters } from '../../../graphql/homePage/HomeQuery';
import testProps from '../../../utils/testProps';

export interface BannerProps {
  route?: string;
  landingPageId?: string;
  offsetWidth?: number;
  reference: string;
  height: number;
  url: string;
  reservaMini?: boolean;
  linkMktIn?: string;
  orderBy: string;
  filters?: IQueryFilters
}

const deviceWidth = Dimensions.get('window').width;

const Banner: React.FC<BannerProps> = ({
  route,
  landingPageId,
  reference,
  offsetWidth = 0,
  height,
  url,
  reservaMini,
  linkMktIn,
  orderBy,
  filters,
}) => {
  const navigation = useNavigation();

  const handleOnPressed = useCallback(() => {
    if (linkMktIn) {
      navigation.navigate(linkMktIn);
      return;
    }

    if (route) {
      navigation.navigate(route, { landingPageId });
      return;
    }

    const facetInput = [];
    const [categoryType, categoryData] = reference?.split(':') || [undefined, undefined];

    if (categoryType === 'product') {
      EventProvider.logEvent('select_item', {
        item_list_id: categoryData ?? '',
        item_list_name: '',
      });

      navigation.navigate('ProductDetail', {
        productId: categoryData,
        itemId: categoryData,
        colorSelected: '#FFFFFF',
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
  }, [navigation, route, landingPageId, reference, reservaMini, linkMktIn, orderBy]);

  if (!url) {
    return null;
  }

  return (
    <Box testID="com.usereserva:id/banner_container" alignItems="flex-start">
      <Box mb="quarck" width={1 / 1}>
        <TouchableHighlight
          onPress={handleOnPressed}
          {...testProps('com.usereserva:id/banner_button')}
        >
          <Image
            height={height}
            autoHeight
            width={deviceWidth - offsetWidth}
            source={{ uri: url }}
            isSkeletonLoading
          />
        </TouchableHighlight>
      </Box>
    </Box>
  );
};
export default React.memo(Banner);
