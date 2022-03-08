import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, TouchableHighlight } from 'react-native';
import { Box, Typography, Image } from 'reserva-ui';
import { useCacheImages } from '../../../context/CacheImagesContext';

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

  const [uri, setUri] = useState<any>();

  const navigation = useNavigation();
  const { fetchImage } = useCacheImages()

  useEffect(() => {
    fetchImage(url).then((x) => {
      setUri(x);
      console.log('fetchImage', x)
    });
    // setUri(fetchImage(url))
  }, [url])

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
              if (categoryType === 'product') {
                navigation.navigate('ProductDetail', {
                  productId: categoryData,
                  itemId: categoryData,
                  colorSelected: '#FFFFFF',
                })
              } else {
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
            }
          }}
        >
          {
            !!uri ?
              <Image
                height={height}
                autoHeight
                width={deviceWidth}
                source={uri}
                isSkeletonLoading
              />
              :
              <></>
          }
        </TouchableHighlight>
      </Box>
    </Box>
  );
};
