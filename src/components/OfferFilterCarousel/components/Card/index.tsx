import React from 'react';
import {
  ImageBackground, Text, TouchableOpacity, View,
} from 'react-native';
import { styles } from './styles';
import testProps from '../../../../utils/testProps';
import { commons } from '../../../../base/styles';

interface CardProps {
  info: string;
  imageUrl: string;
  title: string;
  prefix: string;
}

export function Card({
  info, imageUrl, prefix, title,
}: CardProps) {
  return (
    <TouchableOpacity>
      <ImageBackground
        imageStyle={{ borderRadius: 8 }}
        style={styles.container}
        source={imageUrl ? { uri: imageUrl } : commons.cardImage}
        {...testProps('imageBackground')}
      >
        <Text style={styles.offerInfo}>
          {title}
        </Text>
        <View style={styles.amountWrapper}>
          {prefix && (
            <Text style={styles.currencyText}>
              {prefix}
            </Text>
          )}
          <Text style={styles.amountText}>
            {info}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
