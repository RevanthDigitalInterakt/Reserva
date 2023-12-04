import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  BackHandler,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { Formik } from 'formik';
import images from '../../base/styles/icons';
import type { RootStackParamList } from '../../routes/StackNavigator';
import HeaderBanner from '../../modules/Forgot/componet/HeaderBanner';
import testProps from '../../utils/testProps';
import { usePageLoadingStore } from '../../zustand/usePageLoadingStore/usePageLoadingStore';
import { COLORS } from '../../base/styles/colors';
import IconInfoFill from '../../../assets/icons/IconInfoFill';
import { useNewAuthentication } from '../../hooks/useNewAuthentication';

import {
  emailSchema,
  passwordSchema,
} from '../Address/utils/inputValidations';

import styles from './SignIn.styles';

import IconEyeOn from '../../../assets/icons/IconEyeOn';
import IconEyeOff from '../../../assets/icons/IconEyeOff';

type Props = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export default function SignIn({ route, navigation }: Props): JSX.Element {
  const [hidePassword, setHidePassword] = useState(true);
  const { comeFrom, previousPage } = route.params || {};

  const inputPasswordRef = useRef<TextInput>(null);

  const showPasswordController = useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  const skipHomePage = comeFrom === 'BagScreen' ? () => {} : undefined;

  const FORM_SCHEMA = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
  });

  const {
    handleLogin,
    loadingSignIn,
  } = useNewAuthentication({
    closeModal: skipHomePage,
  });

  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const handleNavigatePreviousPage = useCallback(() => {
    if (previousPage) {
      navigation.navigate(previousPage);
      return;
    }

    navigation.navigate('Home');
  }, [previousPage, navigation]);

  useEffect(() => {
    if (startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [startLoadingTime, onFinishLoad]);

  useEffect(() => {
    if (comeFrom === 'Profile') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('Home');
        return true;
      });
    }
  }, [comeFrom, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={handleNavigatePreviousPage}
        loading={loadingSignIn}
      />
      <ScrollView
        {...testProps('com.usereserva:id/login_scrollview')}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            Boas-vindas!
          </Text>

          <Text style={styles.subTitle}>
            Insira seu e-mail para continuar:
          </Text>

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => handleLogin(values.email, values.password, comeFrom)}
            validationSchema={FORM_SCHEMA}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.contentForm}>
                  <View
                    style={
                    [styles.inputContainer, {
                      borderBottomColor: errors.email && touched.email
                        ? COLORS.INPUT_ERROR_MESSAGE : COLORS.TEXT_INPUT_CONTAINER,
                    },
                    ]
                  }
                  >
                    <TextInput
                      placeholder="Digite seu e-mail"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={styles.inputContent}
                      {...testProps('com.usereserva:id/login_input_email')}
                      onSubmitEditing={() => {
                        if (inputPasswordRef && inputPasswordRef.current) {
                          inputPasswordRef.current.focus();
                        }
                      }}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <View style={styles.errorContainer}>
                      <IconInfoFill />
                      <Text style={styles.errorMessage}>
                        {errors.email}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.contentForm}>
                  <View
                    style={
                      [styles.inputContainer, {
                        borderBottomColor: errors.email && touched.email
                          ? COLORS.INPUT_ERROR_MESSAGE : COLORS.TEXT_INPUT_CONTAINER,
                      },
                      ]
                    }
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TextInput
                        placeholder="Digite sua senha"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        keyboardType="default"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry={hidePassword}
                        value={values.password}
                        style={[styles.inputContent, { width: '90%' }]}
                        ref={inputPasswordRef}
                        onSubmitEditing={() => handleSubmit()}
                        {...testProps('com.usereserva:id/login_input_password')}
                      />
                      <TouchableOpacity onPress={showPasswordController}>
                        {hidePassword ? (
                          <IconEyeOn />
                        ) : (
                          <IconEyeOff />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.password && touched.password && (
                    <View style={styles.errorContainer}>
                      <IconInfoFill />
                      <Text style={styles.errorMessage}>
                        {errors.password}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ForgotEmail', {});
                    }}
                    style={styles.linkContainer}
                  >
                    <Text
                      style={styles.linkText}
                      {...testProps('com.usereserva:id/esqueci-minha-senha')}
                    >
                      Esqueci minha senha
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  {...testProps('com.usereserva:id/entrar_login_button')}
                  onPress={() => handleSubmit()}
                  testID="com.usereserva:id/login_button_submit"
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: COLORS.WHITE,
                      borderWidth: 1,
                      borderColor: COLORS.BLACK,
                      marginTop: 40,
                    },
                  ]}
                >
                  <Text style={styles.textActionButton}>ENTRAR</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.infoText}>
                    Ainda não possui uma conta?
                  </Text>
                  <View style={styles.divider} />
                </View>

                <TouchableOpacity
                  {...testProps('com.usereserva:id/cadastre_se_buttton')}
                  onPress={() => {
                    navigation.navigate('RegisterEmail', {});
                  }}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: COLORS.LIGHT_BLACK,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textActionButton,
                      {
                        color: COLORS.WHITE,
                      },
                    ]}
                  >
                    CADASTRE-SE
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
