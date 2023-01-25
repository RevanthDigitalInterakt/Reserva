import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, TouchableHighlight } from 'react-native';
import { Box, Image } from '@usereservaapp/reserva-ui';
import EventProvider from '../../../utils/EventProvider';

export interface BannerProps {
  route?: string;
  landingPageId?: string;
  reference: string;
  height: number;
  url: string;
  reservaMini?: boolean;
  orderBy: string;
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
