// @flow
import React from 'react';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    margin: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: '#36f',
    borderWidth: 1,
    borderColor: '#36f',
    fontSize: 12,
  },
});

export const Button = ({ onPress, label }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.root}>{label}</Text>
  </TouchableOpacity>
);
