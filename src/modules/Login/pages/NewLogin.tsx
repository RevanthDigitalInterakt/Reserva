/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  Alert, SafeAreaView, ScrollView,
  BackHandler,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import images from '../../../base/styles/icons';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import testProps from '../../../utils/testProps';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { useNavigationToDelivery } from '../../../hooks/useNavigationToDelivery';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../utils/EventProvider';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export function NewLoginScreen({
  route,
  navigation,
}: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaOculta, setSenhaOculta] = useState(true);

  // Função para limpar o campo de e-mail
  const limparEmail = () => {
    setEmail('');
  };

  // Função para alternar a visibilidade da senha
  const alternarSenha = () => {
    setSenhaOculta(!senhaOculta);
  };

  const { comeFrom, previousPage, invalidSession } = route.params || {};

  const skipHomePage = comeFrom === 'BagScreen' ? () => { } : undefined;

  const {
    handleLogin,
    loadingSignIn,
    isLoadingEmail,
    verifyUserEmail,
    setEmailIsValid,
    loginCredentials,
    setPasswordIsValid,
    setLoginCredentials,
  } = useAuthentication({
    closeModal: skipHomePage,
  });

  const { actions } = useBagStore(['actions']);

  const { onSignOut } = useAuthStore(['onSignOut']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const {
    handleNavigateToDelivery,
    setLoadingDelivery,
    loadingDelivery,
  } = useNavigationToDelivery();

  const afterLogin = useCallback(async (profile) => {
    if (comeFrom === 'Profile') {
      await actions.REFETCH_ORDER_FORM();
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }

    if (comeFrom === 'BagScreen') {
      setLoadingDelivery(true);
      return handleNavigateToDelivery(profile);
    }

    if (invalidSession) {
      await actions.REFETCH_ORDER_FORM();
    }
  }, [invalidSession,
    comeFrom,
    actions,
    navigation,
    setLoadingDelivery,
    handleNavigateToDelivery]);

  const doLogin = useCallback(async () => {
    try {
      EventProvider.logEvent('login_click', {});
      const profile = await handleLogin();
      if (profile) {
        afterLogin(profile);
      }
    } catch (e) {
      ExceptionProvider.captureException(e);
    }
  }, [afterLogin, handleLogin]);

  useEffect(() => {
    if (comeFrom === 'Profile') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }
  }, []);

  useEffect(() => {
    if (route?.params?.invalidSession) {
      Alert.alert('Sessão expirada', 'Faça login novamente');
      onSignOut();
    }
  }, [route?.params, onSignOut]);

  const ClientDelivery = useCallback(async () => {
    if (loadingSignIn) {
      return;
    }

    try {
      if (comeFrom === 'Checkout') {
        verifyUserEmail();
      }
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, [comeFrom, loadingSignIn, verifyUserEmail]);

  const handleNavigatePreviousPage = useCallback(() => {
    if (previousPage) {
      navigation.navigate(previousPage);
      return;
    }

    navigation.navigate('Home');
  }, [previousPage, navigation]);

  useEffect(() => {
    ClientDelivery();
  }, []);

  useEffect(() => {
    if (!loadingSignIn && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loadingSignIn, startLoadingTime, onFinishLoad]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        {...testProps('com.usereserva:id/login_scrollview')}
        keyboardShouldPersistTaps="always"
      >
        <HeaderBanner
          imageHeader={images.newHeaderLogin}
          onClickGoBack={handleNavigatePreviousPage}
          loading={isLoadingEmail || loadingDelivery}
        />
        <View style={{ position: 'absolute', left: '50%', top: 24 }}><IconLegacy name="Logo" color="vermelhoAlerta" size={24} /></View>

        <View style={{ marginTop: 24, marginHorizontal: 16 }}>
          <Text style={{
            fontSize: 20,
            fontFamily: 'Inter',
            fontWeight: 'bold',
            lineHeight: 24,
          }}
          >
            Preencha seu dados
          </Text>
          <Text style={{
            marginTop: 2,
            fontSize: 13,
            fontFamily: 'Inter',
            fontWeight: '400',
            lineHeight: 18,
          }}
          >
            Insira seu e-mail e senha para continuar
          </Text>

        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="email@email.com"
              placeholderTextColor="#A8A8A8"
              onChangeText={setEmail}
              value={email}
            />
            {email.length > 0 && (
            <TouchableOpacity onPress={limparEmail} style={styles.iconButton}>
              <Text style={styles.iconText}>X</Text>
            </TouchableOpacity>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              placeholderTextColor="#A8A8A8"
              secureTextEntry={senhaOculta}
              onChangeText={setSenha}
              value={senha}
            />
            <TouchableOpacity onPress={alternarSenha} style={styles.iconButton}>
              <Text style={styles.iconText}>
                {senhaOculta ? '🔒' : '👁'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{
            textAlign: 'right', fontFamily: 'Inter', fontWeight: 'bold', fontSize: 12, marginVertical: 6,
          }}
          >
            Esqueci minha senha
          </Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>ou</Text>
            <View style={styles.line} />
          </View>

          <Text style={styles.registerText}>
            Não tem uma conta?
            {' '}
            <Text style={styles.registerLink}>Cadastre-se agora.</Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    marginVertical: 16,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    paddingVertical: 10,
  },
  textInputError: {
    flex: 1,
    fontSize: 16,
    color: '#DD3636',
    paddingVertical: 10,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    color: '#999',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  loginButton: {
    width: '90%',
    height: 46,
    backgroundColor: '#3B9B50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  loginText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFF',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9E9D9C',
  },
  orText: {
    marginHorizontal: 24,
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  registerText: {
    marginBottom: 32,
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
