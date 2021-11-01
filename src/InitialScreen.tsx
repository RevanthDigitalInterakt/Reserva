import React, { FC, useEffect } from 'react';

import { StatusBar, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

const InitialScreen: React.FC<{ children: FC }> = ({ children }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <Animatable.View animation="fadeIn" style={{ height: '100%' }}>
          {children}
        </Animatable.View>
      </SafeAreaView>
    </>
  );
};

export default InitialScreen;
