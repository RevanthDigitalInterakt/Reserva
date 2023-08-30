import React, {
  useCallback, useEffect, FC,
} from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  Alert, SafeAreaView, ScrollView,
  BackHandler, Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { Formik } from 'formik';
import images from '../../../base/styles/icons';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import UnderlineInput from '../../../components/UnderlineInput';
import testProps from '../../../utils/testProps';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { useNavigationToDelivery } from '../../../hooks/useNavigationToDelivery';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';
import { COLORS } from '../../../base/styles/colors';

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export const LoginScreen: FC<Props> = ({
  route,
  navigation,
}) => {
  const { comeFrom, previousPage, invalidSession } = route.params || {};

  const skipHomePage = comeFrom === 'BagScreen' ? () => {} : undefined;

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
        return;
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
        <View style={{ margin: 20 }}>
          <Text style={{ fontFamily: 'reservaSerifRegular', fontSize: 22 }}>
            Boas-vindas!
          </Text>

          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontFamily: 'reservaSerifRegular', fontSize: 16 }}>
                Insira seu e-mail para continuar:
              </Text>
            </View>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={() => { }}
            >
              {() => (
                <>
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

                  <View style={{ marginTop: 40 }}>
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
                    <View style={{ marginTop: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ForgotEmail', {});
                        }}
                      >
                        <Text
                          style={{ textDecorationLine: 'underline' }}
                          {...testProps('com.usereserva:id/esqueci-minha-senha')}
                        >
                          Esqueci minha senha
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {loginCredentials.hasError && (
                      <Text
                        style={{ fontFamily: 'Nunito-Regular', color: COLORS.INPUT_ERROR_MESSAGE }}
                        {...testProps('com.usereserva:id/login-error')}
                      >
                        {loginCredentials.showMessageError}
                      </Text>
                    )}
                  </View>

                  <View style={{ marginTop: 60 }} />

                  <TouchableOpacity
                    accessible={false}
                    {...testProps('com.usereserva:id/entrar_login_button')}
                    // variant="primarioEstreitoOutline"
                    disabled={loadingSignIn || isLoadingEmail || loadingDelivery}
                    onPress={doLogin}
                    style={{
                      alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.WHITE, height: 50, borderWidth: 1, borderColor: COLORS.BLACK,
                    }}
                  >
                    <Text style={{ fontFamily: 'Nunito-Regular' }}>ENTRAR</Text>
                  </TouchableOpacity>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 75,
                    marginBottom: 30,
                  }}

                  >
                    <View style={{
                      borderWidth: 1,
                      marginLeft: 30,
                      marginRight: 10,
                      flex: 1,
                      borderColor: COLORS.INPUT_BORDER,
                    }}
                    />
                    <Text style={{ alignContent: 'center' }}>
                      Ainda não possui uma conta?
                    </Text>
                    <View style={{
                      borderWidth: 1,
                      marginLeft: 10,
                      marginRight: 30,
                      flex: 1,
                      borderColor: COLORS.INPUT_BORDER,
                    }}
                    />
                  </View>
                  <TouchableOpacity
                    {...testProps('com.usereserva:id/cadastre_se_buttton')}
                    disabled={loadingSignIn || isLoadingEmail || loadingDelivery}
                    onPress={() => {
                      navigation.navigate('RegisterEmail', {});
                    }}
                    style={{
                      alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.ACTION_BUTTON_COLOR, height: 50, borderWidth: 1, borderColor: COLORS.BLACK,
                    }}
                  >
                    <Text style={{ fontFamily: 'ReservaSans-Medium', fontSize: 16, color: COLORS.WHITE }}>CADASTRE-SE</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
