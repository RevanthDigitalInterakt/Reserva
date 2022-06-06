import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { Box, Button, Icon, Typography } from '@danilomsou/reserva-ui';

import { StackActions, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const ButtonClose = () => {
  const navigation = useNavigation();
  return (
    <Box
      position={'absolute'}
      top={height * 0.03}
      right={width * 0.1}
      zIndex={4}
      style={{ marginTop: height * 0.03 }}
    >
      <Button
        hitSlop={{
          top: 30,
          bottom: 30,
          right: 30,
          left: 30,
        }}
        onPress={() => navigation.dispatch(StackActions.replace('Main'))}
        variant="icone"
        icon={<Icon size={13} name="Close" color="white" />}
      />
    </Box>
  );
};
