import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, TouchableHighlight } from 'react-native';
import { Box, Image } from '@usereservaapp/reserva-ui';
import EventProvider from '../../../utils/EventProvider';
import type { IQueryFilters } from '../../../graphql/homePage/HomeQuery';

export interface BannerProps {
  route?: string;
  landingPageId?: string;
  reference: string;
  height: number;
  url: string;
  reservaMini?: boolean;
  orderBy: string;
  filters?: IQueryFilters
}

const deviceWidth = Dimensions.get('window').width;

const Banner: React.FC<BannerProps> = ({
  route,
  landingPageId,
  reference,
  height,
  url,
  reservaMini,
  orderBy,
  filters,
}) => {
  const navigation = useNavigation();
  return (
    <Box alignItems="flex-start">
      <Box mb="quarck" width={1 / 1}>
        <TouchableHighlight
          onPress={() => {
            if (route) {
              navigation.navigate(route, { landingPageId });
            } else {
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
                navigation.navigate('ProductCatalog', {
                  referenceId: reference,
                  reservaMini,
                  orderBy,
                  filters: {
                    categories: filters?.categoriesFilterCollection
                      ?.items.map(({ category }) => category),
                    priceFilter: filters?.priceFilter,
                  },
                });
              }
            }
          }}
        >
          <Image
            height={height}
            autoHeight
            width={deviceWidth}
            source={{ uri: url }}
            isSkeletonLoading
          />
        </TouchableHighlight>
      </Box>
    </Box>
  );
};
export default React.memo(Banner);
