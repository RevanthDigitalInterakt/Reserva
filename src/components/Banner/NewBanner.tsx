import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Linking, TouchableOpacity } from 'react-native';

import testProps from '../../utils/testProps';
import { Box } from '../Box/Box';
import ImageComponent from '../ImageComponent/ImageComponent';

interface INewBanner {
  image: string;
  reference?: string | null;
  facets: { key: string; value: string; }[];
  reservaMini: boolean;
  orderBy: string;
  deepLinkNewsletter?: string | null;
  deepLink?: string | null;
  headerImageUrl?: string;
}

function NewBanner({
  image,
  facets,
  reference,
  reservaMini,
  orderBy,
  deepLinkNewsletter,
  deepLink,
  headerImageUrl,
}: INewBanner) {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    if (deepLink?.length) {
      Linking.openURL(deepLink);
      return;
    }

    // TODO deprecate this on future
    if (deepLinkNewsletter?.includes('/newsletter')) {
      navigation.navigate('Newsletter', { headerImageUrl });
      return;
    }

    navigation.navigate('ProductCatalog', {
      facets,
      referenceId: reference,
      reservaMini,
      orderBy,
    });
  }, [navigation, facets, reference, reservaMini, orderBy, deepLinkNewsletter]);

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
