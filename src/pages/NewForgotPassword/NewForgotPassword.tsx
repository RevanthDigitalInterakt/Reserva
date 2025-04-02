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
import { FONTS } from '../../base/styles';
import IconArrowRight from '../../components/IconLegacy/Svg/IconArrowrRight';
import { useAuthentication } from '../../hooks/useAuthentication';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { scale } from '../../utils/scale';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';

type Props = StackScreenProps<RootStackParamList, 'NewForgotPassword'>;

export default function NewForgotPassword({ navigation, route }: Props) {
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
          <IconChevronLeftSmall color="#999" />
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
          placeholderTextColor={loginCredentials.showUsernameError ? '#DD3636' : '#A8A8A8'}
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

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          disabled={loadingSignIn || isLoadingEmail}
          onPress={handleRecoveryPassword}
        >
          {(loadingSignIn || isLoadingEmail)
            ? <ActivityIndicator size="small" color="#FFF2F2" />
            : <IconArrowRight />}

        </TouchableOpacity>
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
  content: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 24,
  },
  usernameError: {
    color: '#DD3636',
    marginTop: 3,
    marginLeft: 4,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  forgotPasswordTitle: {
    marginTop: 24,
    fontSize: scale(24),
    color: '#000000',
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  forgotPasswordSubtitle: {
    marginBottom: 16,
    fontSize: scale(13),
    marginTop: 8,
    color: '#7B7B7B',
    fontFamily: FONTS.INTER_MEDIUM,
    lineHeight: 19.6,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    width: 64,
    height: 64,
    backgroundColor: '#11AB6B',
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
    color: '#282828',
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  forgotPasswordInputContainerError: {
    marginTop: 24,
    color: '#DD3636',
    borderColor: '#DD3636',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: scale(12),
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
});
