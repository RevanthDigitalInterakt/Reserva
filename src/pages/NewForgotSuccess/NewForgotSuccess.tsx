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
import { COLORS, FONTS } from '../../base/styles';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';
import { scale } from '../../utils/scale';

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>
          Voltar para login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: COLORS.WHITE,
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
    backgroundColor: COLORS.WHITE,
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  button: {
    backgroundColor: COLORS.DARK_GREY_VARIANT_1,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  disabledButton: {

  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: scale(13),
    fontFamily: FONTS.INTER_REGULAR,
  },
});
