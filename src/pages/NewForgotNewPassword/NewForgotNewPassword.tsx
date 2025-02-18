/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMutation } from '@apollo/client';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EyeClose from '../../base/svgs/EyeClose';
import EyeOpen from '../../base/svgs/EyeOpen';
import { IconLegacy } from '../../components/IconLegacy/IconLegacy';
import { IconChevronLeft } from '../../components/IconLegacy/Svg';
import { recoveryPasswordMutation } from '../../graphql/login/loginMutations';
import type { RootStackParamList } from '../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'NewForgotNewPassword'>;

export default function NewForgotNewPassword({ navigation, route }: Props) {
  const code = route.params?.code;
  const email = route.params?.email;

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwords, setPasswords] = useState({
    first: '',
    confirm: '',
  });

  const [loading, setLoading] = useState(false);

  const passwordsChecker = useMemo(() => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8 && passwords.confirm.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) !== null && passwords.confirm.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) !== null && passwords.confirm.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) !== null && passwords.first.match(/[0-9]/g) !== null,
  }), [passwords.first, passwords.confirm]);

  const [recoveryPassword] = useMutation(recoveryPasswordMutation);

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

  const isError = !!(!isValidPassword && !isEqualPassword && passwords.confirm);

  const handleUpdatePassword = () => {
    if (isError) {
      Alert.alert('ERROR');
    }

    setLoading(true);

    setTimeout(() => {
      navigation.replace('NewForgotSuccess');
      setLoading(false);
    }, 2000);

    /* const variables = {
      email,
      code,
      newPassword: passwords.confirm,
    };
    recoveryPassword({
      variables,
    }).then((x) => {
      if (x?.data?.recoveryPassword !== null) {
        Alert.alert('success');

        // return navigation.navigate('ForgotEmailSuccess');
      }
      Alert.alert('ERROR');
      // return navigation.navigate('ForgotEmail', {});
    }); */
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <IconChevronLeft color="#999" />
        </TouchableOpacity>
        <ScrollView style={{ flex: 1 }}>
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
              onChangeText={(text) => setPasswords({ ...passwords, first: text })}
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
              onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
              value={passwords.confirm}
            />

            <TouchableOpacity onPress={togglePasswordHidden} style={styles.iconButton}>
              {passwordHidden
                ? <EyeClose color={isError ? '#DD3636' : '#A8A8A8'} />
                : <EyeOpen color={isError ? '#DD3636' : '#A8A8A8'} />}
            </TouchableOpacity>
          </View>
          <Text style={{
            color: '#DD3636',
            marginLeft: 4,
            fontFamily: 'Inter-Medium',
          }}
          >
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

        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Continuar</Text>
        {loading && <ActivityIndicator size="small" color="#FFF2F2" /> }
      </TouchableOpacity>
    </>
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
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  forgotPasswordTitle: {
    marginTop: 24,
    fontSize: 28,
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  forgotPasswordSubtitle: {
    marginBottom: 16,
    fontSize: 14,
    marginTop: 8,
    color: '#7B7B7B',
    fontFamily: 'Inter-Medium',
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
    paddingHorizontal: 12,
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
    color: '#DD3636',
    borderColor: '#DD3636',
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#282828',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
