import React from 'react';
import {
  ImageBackground, TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import testProps from '../../../../utils/testProps';
import { commons } from '../../../../base/styles';

interface CardProps {
  imageUrl: string;
  handleRedirectToCatalog: () => void;
}

export function Card({
  imageUrl, handleRedirectToCatalog,
}: CardProps) {
  return (
    <TouchableOpacity onPress={handleRedirectToCatalog}>
      <ImageBackground
        imageStyle={{ borderRadius: 8 }}
        style={styles.container}
        source={imageUrl ? { uri: imageUrl } : commons.cardImage}
        {...testProps('imageBackground')}
      />
    </TouchableOpacity>
  );
}
