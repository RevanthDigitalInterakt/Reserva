import React from 'react';
import { Text, View } from 'react-native';
import testProps from '../../../../../../utils/testProps';
import styles from './styles';

interface IProductDescription {
  title: string;
  description: string;
  testID: string;
}

export function ProductPaymentDescription({ title, description, testID }: IProductDescription) {
  return (
    <View {...testProps(testID)}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
}
