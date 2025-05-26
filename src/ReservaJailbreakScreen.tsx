import React from 'react';
import {
  Text, View, StyleSheet, Image,
} from 'react-native';
import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { theme } from './base/usereservappLegacy/theme';
import { commons } from './base/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  image: {
    maxWidth: 200,
    height: 30,
    marginBottom: 10,
  },
});

function ReservaJailbreakScreen() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Image
          source={commons.logo}
          style={styles.image}
        />
        <Text style={styles.text}>
          Este aplicativo não é suportado em dispositivos com modificações não autorizadas.
        </Text>
      </View>
    </ThemeProvider>
  );
}

export default ReservaJailbreakScreen;
