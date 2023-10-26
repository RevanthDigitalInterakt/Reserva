import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import testProps from '../../utils/testProps';
import { Box } from '../Box/Box';
import ImageComponent from '../ImageComponent/ImageComponent';

interface INewBanner {
  image: string;
  reference: string;
  facets: { key: string; value: string; }[];
  reservaMini: boolean;
  orderBy: string;
}

function NewBanner({
  image,
  facets,
  reference,
  reservaMini,
  orderBy,
}: INewBanner) {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('ProductCatalog', {
      facets,
      referenceId: reference,
      reservaMini,
      orderBy,
    });
  }, [navigation, facets, reference, reservaMini, orderBy]);

  if (!image) {
    return null;
  }

  return (
    <Box {...testProps(`banner_container_${reference}`)} alignItems="flex-start">
      <Box mb="quarck" width={1}>
        <TouchableOpacity onPress={onPress} {...testProps(`banner_button_${reference}`)}>
          <ImageComponent source={{ uri: image }} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

export default NewBanner;
