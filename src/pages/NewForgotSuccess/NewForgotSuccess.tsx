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
import IconSuccessPassword from '../../components/IconLegacy/Svg/IconSuccessPassword';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { FONTS } from '../../base/styles';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';

type Props = StackScreenProps<RootStackParamList, 'NewForgotSuccess'>;

export default function NewForgotSuccess({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <TouchableOpacity
          hitSlop={{
            top: 24, left: 24, bottom: 24, right: 24,
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <IconChevronLeftSmall color="#999" />
        </TouchableOpacity>

        <View style={styles.content}>
          <IconSuccessPassword />
          <View style={styles.space} />

          <Text style={styles.text}>Senha alterada</Text>
          <Text style={styles.text}>com sucesso!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#FFF',
  },
  contentHeader: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 24,
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
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
});
