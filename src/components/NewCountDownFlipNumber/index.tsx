import React from 'react';
import { View } from 'react-native';
import testProps from '../../utils/testProps';
import { useCountDown } from '../../context/ChronometerContext';
import styles from './styles';
import { NewFlipNumber } from './components/NewFlipNumber';

function Divider() {
  return (
    <View style={styles.dividerWrapper}>
      <View style={styles.divider} />
      <View style={styles.divider} />
    </View>
  );
}

export function NewCountDownFlipNumber() {
  const { time = '00:00:01' } = useCountDown();

  return (
    <View style={styles.container}>
      <NewFlipNumber
        {...testProps('flip_number_hours')}
        number={time.split(':')[0] || ''}
      />

      <Divider />

      <NewFlipNumber
        {...testProps('flip_number_minutes')}
        number={time?.split(':')[1] || ''}
      />

      <Divider />

      <NewFlipNumber
        {...testProps('flip_number_seconds')}
        number={time?.split(':')[2] || ''}
      />
    </View>
  );
}
