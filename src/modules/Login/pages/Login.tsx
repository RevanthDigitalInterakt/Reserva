import React, { useCallback, useEffect } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  Alert, SafeAreaView, ScrollView,
  BackHandler,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import images from '../../../base/styles/icons';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import UnderlineInput from '../../../components/UnderlineInput';
import testProps from '../../../utils/testProps';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { useNavigationToDelivery } from '../../../hooks/useNavigationToDelivery';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import EventProvider from '../../../utils/EventProvider';

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export function LoginScreen({
  route,
  navigation,
}: Props) {
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
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={handleNavigatePreviousPage}
        loading={isLoadingEmail || loadingDelivery}
      />
      <ScrollView
        {...testProps('com.usereserva:id/login_scrollview')}
        keyboardShouldPersistTaps="always"
      >
        <Box px="xxs" pt="xxs" paddingBottom="xxl">
          <Typography fontFamily="reservaSerifRegular" fontSize={22}>
            Boas-vindas!
          </Typography>

          <Box mt="xxs">
            <Box marginBottom="xxxs">
              <Typography variant="tituloSessao">
                Insira seu e-mail para continuar:
              </Typography>
            </Box>

            <UnderlineInput
              testID="com.usereserva:id/login_input_email"
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              isSecureText={false}
              value={loginCredentials.username}
              showError={loginCredentials.showUsernameError}
              errorMsg={loginCredentials.usernameError}
              onChangeText={(text) => {
                try {
                  setLoginCredentials({ ...loginCredentials, username: text });
                  setEmailIsValid(
                    Yup.string().required().email().isValidSync(text.trim()),
                  );
                } catch (error) {
                  ExceptionProvider.captureException(error, { writtenEmail: text });
                }
              }}
            />

            <Box mt="md" width="100%">
              <UnderlineInput
                testID="com.usereserva:id/login_input_password"
                isSecureText
                placeholder="Digite sua senha"
                value={loginCredentials.password}
                showError={loginCredentials.showPasswordError}
                onChangeText={(text) => {
                  setLoginCredentials({
                    ...loginCredentials,
                    password: text,
                  });
                  setPasswordIsValid(
                    Yup.string()
                      .required()
                      .matches(/^(?=.{8,})/) // 8 caracteres
                      .matches(/^(?=.*[A-Z])/) // pelo menos uma maiuscula
                      .matches(/^(?=.*[a-z])/) // pelo menos uma minuscula
                      .matches(/^(?=.*[0-9])/) // pelo menos um nuemro
                      .isValidSync(text),
                  );
                }}
              />
              <Box mt="micro" mb="quarck">
                <TouchableOpacity
                  onPress={() => {
                    EventProvider.logEvent('login_forgot_password_click', {});
                    navigation.navigate('ForgotEmail', {});
                  }}
                >
                  <Typography
                    style={{ textDecorationLine: 'underline' }}
                    {...testProps('com.usereserva:id/esqueci-minha-senha')}
                  >
                    Esqueci minha senha
                  </Typography>
                </TouchableOpacity>
              </Box>
              {loginCredentials.hasError && (
                <Typography
                  color="vermelhoAlerta"
                  fontFamily="nunitoRegular"
                  fontSize={13}
                  {...testProps('com.usereserva:id/login-error')}
                >
                  {loginCredentials.showMessageError}
                </Typography>
              )}
            </Box>
          </Box>

          <Box mt="md" />
          <Button
            accessible={false}
            {...testProps('com.usereserva:id/entrar_login_button')}
            title="ENTRAR"
            inline
            variant="primarioEstreitoOutline"
            disabled={loadingSignIn || isLoadingEmail || loadingDelivery}
            onPress={doLogin}
          />

          <Box
            flexDirection="row"
            mt="xxl"
            mb="xxs"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              style={{ borderWidth: 1 }}
              marginLeft="xxs"
              marginRight="nano"
              flex={1}
              borderColor="divider"
            />
            <Typography textAlign="center">
              Ainda não possui uma conta?
            </Typography>
            <Box
              style={{ borderWidth: 1 }}
              marginLeft="nano"
              marginRight="xxs"
              flex={1}
              borderColor="divider"
            />
          </Box>

          <Button
            {...testProps('com.usereserva:id/cadastre_se_buttton')}
            title="CADASTRE-SE"
            inline
            variant="primarioEstreito"
            disabled={loadingSignIn || isLoadingEmail || loadingDelivery}
            onPress={() => {
              EventProvider.logEvent('login_register_click', {});
              navigation.navigate('RegisterEmail', {
                comeFrom,
              });
            }}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
