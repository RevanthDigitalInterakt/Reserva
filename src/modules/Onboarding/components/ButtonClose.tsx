import { Box, Button, Icon } from '@danilomsou/reserva-ui';
import React from 'react';
import { Dimensions } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';
import { styles } from '../assets/Styles';

const { width, height } = Dimensions.get('window');

export const ButtonClose = () => {
  const navigation = useNavigation();
  return (
    <Box style={[styles.boxButtonClose]}>
      <Button
        hitSlop={{
          top: 30,
          bottom: 30,
          right: 30,
          left: 30,
        }}
        onPress={() => navigation.dispatch(StackActions.replace('Main'))}
        variant="icone"
        icon={<Icon size={24} name="CloseThin" color="white" />}
      />
    </Box>
  );
};
