import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, TouchableHighlight } from 'react-native';
import { Box, Typography, Image } from 'reserva-ui';

export interface BannerProps {
  route?: string;
  reference: string;
  height: number;
  url: string;
}

const deviceWidth = Dimensions.get('window').width;

export const Banner: React.FC<BannerProps> = ({
  route,
  reference,
  height,
  url,
}) => {
  const navigation = useNavigation();
  return (
    <Box alignItems="flex-start">
      <Box mb="quarck" width={1 / 1}>
        <TouchableHighlight
          onPress={() => {
            if (route) {
              navigation.navigate(route);
            } else {
              const facetInput = [];
              const [categoryType, categoryData] = reference.split(':');
              if (categoryType === 'category') {
                categoryData.split('|').forEach((cat: string) => {
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
              });
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
