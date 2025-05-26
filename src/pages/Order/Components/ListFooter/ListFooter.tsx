import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { loadingSpinner } from '../../../../../assets/animations';

import styles from './styles';

interface IListFooter {
  loading: boolean;
}

function ListFooter({ loading }: IListFooter) {
  if (!loading) return null;

  return (
    <View style={styles.mainContainer}>
      <LottieView
        source={loadingSpinner}
        style={{ width: 40, height: 40 }}
        autoPlay
        loop
      />
    </View>
  );
}

export default ListFooter;
