import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import type { Maybe } from '../../../../../../base/graphql/generated';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';
import EventProvider from '../../../../../../utils/EventProvider';
import { ExceptionProvider } from '../../../../../../base/providers/ExceptionProvider';
import testProps from '../../../../../../utils/testProps';

interface ICategoryCard {
  url: string | undefined;
  id: Maybe<string> | undefined;
  referenceId: Maybe<string> | undefined;
}

export default function CategoryCard({
  url,
  id,
  referenceId,
}: ICategoryCard) {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    try {
      EventProvider.logEvent('offers_category_banner_click', {
        category: referenceId,
        banner_position: id,
      });
      navigation.navigate('ProductCatalog', { referenceId });
    } catch (error) {
      ExceptionProvider.captureException(error, "onPress - CategoryCard", {referenceId: (JSON.stringify(referenceId) || "")});
    }
  }, [referenceId]);

  if (!url) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.childContainer}
      {...testProps('category_card_item')}
    >
      {url && (
        <ImageComponent
          style={styles.image}
          source={{ uri: url }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
}
