/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { COLORS, FONTS } from '../../base/styles';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';
import IconArrowRight from '../../components/IconLegacy/Svg/IconArrowrRight';
import { useAuthentication } from '../../hooks/useAuthentication';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { scale } from '../../utils/scale';

type Props = StackScreenProps<RootStackParamList, 'NewForgotPassword'>;

export default function NewForgotPassword({ navigation }: Props) {
  const {
    loadingSignIn,
    isLoadingEmail,
    setEmailIsValid,
    loginCredentials,
    setLoginCredentials,
    handleRecoveryPassword,
  } = useAuthentication({
    closeModal: undefined,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          hitSlop={{
            top: 24, left: 24, bottom: 24, right: 24,
          }}
          onPress={navigation.goBack}
        >
          <IconChevronLeftSmall color={COLORS.SHELF_GRAY} />
        </TouchableOpacity>

        <Text style={styles.forgotPasswordTitle}>Alterar sua senha</Text>
        <Text style={styles.forgotPasswordSubtitle}>
          Para alterar a senha, digite seu e-mail abaixo
        </Text>

        <TextInput
          style={loginCredentials.showUsernameError
            ? styles.forgotPasswordInputContainerError
            : styles.forgotPasswordInputContainer}
          placeholder="email@email.com"
          placeholderTextColor={loginCredentials.showUsernameError
            ? COLORS.ERROR_INPUT : COLORS.GRAY_1}
          autoCapitalize="none"
          onChangeText={(text) => {
            try {
              setLoginCredentials({ ...loginCredentials, username: text });

              if (loginCredentials.showUsernameError) {
                setLoginCredentials({
                  ...loginCredentials,
                  username: text,
                  showUsernameError: false,
                });
              }

              setEmailIsValid(
                Yup.string().required().email().isValidSync(text.trim()),
              );
            } catch (error) {
              ExceptionProvider.captureException(error, 'onChangeText - newLoginScreen');
            }
          }}
          value={loginCredentials.username}
        />

        {(loginCredentials.showUsernameError)
        && (
          <Text style={styles.usernameError}>
            {loginCredentials.showMessageError}
          </Text>
        )}

      </View>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        disabled={loadingSignIn || isLoadingEmail}
        onPress={handleRecoveryPassword}
      >
        {(loadingSignIn || isLoadingEmail)
          ? <ActivityIndicator size="small" color={COLORS.WHITE} />
          : <IconArrowRight />}

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
  content: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 24,
  },
  usernameError: {
    color: COLORS.ERROR_INPUT,
    marginTop: 3,
    marginLeft: 4,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  forgotPasswordTitle: {
    marginTop: 24,
    fontSize: scale(24),
    color: COLORS.BLACK,
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  forgotPasswordSubtitle: {
    marginBottom: 16,
    fontSize: scale(13),
    marginTop: 8,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.INTER_MEDIUM,
    lineHeight: 19.6,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 24,
    marginBottom: 24,
    width: 64,
    height: 64,
    backgroundColor: COLORS.GREEN_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginTop: 34,

  },
  forgotPasswordInputContainer: {
    marginTop: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: scale(12),
    color: COLORS.DARK_GREY_VARIANT_1,
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  forgotPasswordInputContainerError: {
    marginTop: 24,
    color: COLORS.ERROR_INPUT,
    borderColor: COLORS.ERROR_INPUT,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: scale(12),
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
});
