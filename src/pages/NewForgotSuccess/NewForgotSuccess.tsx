/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconChevronLeft } from '../../components/IconLegacy/Svg';
import IconSuccessPassword from '../../components/IconLegacy/Svg/IconSuccessPassword';
import type { RootStackParamList } from '../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'NewForgotSuccess'>;

export default function NewForgotSuccess({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.goBack(); }}>
        <IconChevronLeft color="#999" />
      </TouchableOpacity>

      <View style={styles.content}>
        <IconSuccessPassword />
        <View style={styles.space} />

        <Text style={styles.text}>Senha alterada</Text>
        <Text style={styles.text}>com sucesso!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  space: {
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Inter28pt-SemiBold',
  },
});
