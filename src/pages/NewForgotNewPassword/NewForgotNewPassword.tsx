/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EyeClose from '../../base/svgs/EyeClose';
import EyeOpen from '../../base/svgs/EyeOpen';
import { IconLegacy } from '../../components/IconLegacy/IconLegacy';
import { IconChevronLeftSmall } from '../../components/IconLegacy/Svg';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { useRecoverPasswordResetMutation } from '../../base/graphql/generated';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { COLORS, FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

type Props = StackScreenProps<RootStackParamList, 'NewForgotNewPassword'>;

export default function NewForgotNewPassword({ navigation, route }: Props) {
  const code = route.params?.code;
  const email = route.params?.email;
  const cookies = route.params?.cookies;

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwords, setPasswords] = useState({
    first: '',
    confirm: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [recoveryPasswordReset, { loading }] = useRecoverPasswordResetMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const passwordsChecker = useMemo(() => ({
    equal: (passwords.first.length > 0 && passwords.confirm.length > 0)
      && (passwords.first === passwords.confirm),
    digitsCount: passwords.first.length >= 8 && passwords.confirm.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) !== null && passwords.confirm.match(/[a-z]/g) !== null,
    lowercase: passwords.first.match(/[A-Z]/g) !== null && passwords.confirm.match(/[A-Z]/g) !== null,
    number: passwords.first.match(/[0-9]/g) !== null && passwords.confirm.match(/[0-9]/g) !== null,
  }), [passwords.first, passwords.confirm]);

  const togglePasswordHidden = () => {
    setPasswordHidden(!passwordHidden);
  };

  const isValidPassword = useMemo(() => passwordsChecker.digitsCount
    && passwordsChecker.uppercase
    && passwordsChecker.lowercase
    && passwordsChecker.number, [passwordsChecker]);

  const isEqualPassword = useMemo(
    () => passwordsChecker.equal,
    [passwordsChecker.equal, passwords],
  );

  const isError = submitted && (!isValidPassword || !isEqualPassword);

  const handleUpdatePassword = useCallback(async () => {
    if (!isValidPassword || !isEqualPassword) {
      setSubmitted(true);
      Alert.alert('Erro', 'Não foi possível trocar sua senha, tente novamente');
      return;
    }

    try {
      const variables = {
        input: {
          email,
          code,
          password: passwords.confirm,
          cookies,
        },
      };

      const { data: recoveryPasswordData } = await recoveryPasswordReset({
        variables,
      });

      if (!recoveryPasswordData) {
        Alert.alert('Erro', 'código invalido, tente mais tarde');
        return;
      }

      if (recoveryPasswordData?.recoverPasswordReset?.token) {
        navigation.replace('NewForgotSuccess');
      }
    } catch (err) {
      Alert.alert('Erro', 'código invalido, tente mais tarde');
      ExceptionProvider.captureException(err, 'handleUpdatePassword - NewForgotNewPassword.tsx', { email });
    }
  }, [code, cookies, email, passwords.confirm,
    isValidPassword, isEqualPassword, recoveryPasswordReset, navigation]);

  const handleChangeFirstPassword = (text: string) => {
    if (submitted) setSubmitted(false);
    setPasswords((prev) => ({ ...prev, first: text }));
  };

  const handleChangeConfirmPassword = (text: string) => {
    if (submitted) setSubmitted(false);
    setPasswords((prev) => ({ ...prev, confirm: text }));
  };

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

        <Text style={styles.forgotPasswordTitle}>Atualize sua senha</Text>
        <Text style={styles.forgotPasswordSubtitle}>
          Insira o código recebido por e-mail abaixo:
        </Text>

        <View style={isError ? styles.inputContainerError : styles.inputContainer}>
          <TextInput
            style={[styles.forgotPasswordInputContainer, isError ? { color: '#DD3636' } : {}]}
            placeholder="Digite sua nova senha"
            autoCapitalize="none"
            secureTextEntry={passwordHidden}
            onChangeText={handleChangeFirstPassword}
            value={passwords.first}
          />

          <TouchableOpacity onPress={togglePasswordHidden} style={styles.iconButton}>
            {passwordHidden
              ? <EyeClose color={isError ? '#DD3636' : '#A8A8A8'} />
              : <EyeOpen color={isError ? '#DD3636' : '#A8A8A8'} />}
          </TouchableOpacity>
        </View>

        <View style={isError ? styles.inputContainerError : styles.inputContainer}>
          <TextInput
            style={[styles.forgotPasswordInputContainer, isError ? { color: '#DD3636' } : {}]}
            placeholder="Confirme sua nova senha"
            autoCapitalize="none"
            secureTextEntry={passwordHidden}
            onChangeText={handleChangeConfirmPassword}
            value={passwords.confirm}
          />

          <TouchableOpacity onPress={togglePasswordHidden} style={styles.iconButton}>
            {passwordHidden
              ? <EyeClose color={isError ? '#DD3636' : '#A8A8A8'} />
              : <EyeOpen color={isError ? '#DD3636' : '#A8A8A8'} />}
          </TouchableOpacity>
        </View>
        <Text style={styles.errorPassword}>
          {!isEqualPassword && !!passwords.confirm.length ? 'As senhas não estão iguais.' : ''}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <PasswordCheck isError={isError} checked={passwordsChecker.digitsCount} text="8 caracteres" />
            <PasswordCheck isError={isError} checked={passwordsChecker.number} text="1 número" />
          </View>
          <View style={{ marginLeft: 16 }}>
            <PasswordCheck isError={isError} checked={passwordsChecker.lowercase} text="1 letra maiúscula" />
            <PasswordCheck isError={isError} checked={passwordsChecker.uppercase} text="1 letra minúscula" />
          </View>
        </View>
      </View>

      <TouchableOpacity disabled={loading} style={styles.button} onPress={handleUpdatePassword}>
        {loading
          ? <ActivityIndicator size="small" color="#FFF2F2" />
          : <Text style={styles.buttonText}>Continuar</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

interface IPasswordCheck {
  text: string,
  checked: boolean;
  isError: boolean;
}
export function PasswordCheck({ text, checked, isError }: IPasswordCheck) {
  const color = useMemo(() => {
    if (checked) return 'verdeSucesso';
    if (isError && !checked) return 'error';
    return 'neutroFrio2';
  }, [checked, isError]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
      <IconLegacy style={{ marginTop: 10 }} name="Check" size={18} color={color} />
      <Text style={{ marginLeft: 4 }}>
        {text}
      </Text>
    </View>
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
  forgotPasswordInputContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: scale(12),
    color: COLORS.DARK_GREY_VARIANT_1,
    paddingVertical: 10,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  inputContainerError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
    color: COLORS.ERROR_INPUT,
    borderColor: COLORS.ERROR_INPUT,
  },
  errorPassword: {
    color: COLORS.ERROR_INPUT,
    marginLeft: 4,
    fontFamily: FONTS.INTER_MEDIUM,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.DARK_GREY_VARIANT_1,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: scale(13),
    fontFamily: FONTS.INTER_REGULAR,
  },
});
