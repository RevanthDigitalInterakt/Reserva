import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { BackHandler, SafeAreaView, ScrollView } from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import { FormikTextInput } from '../../../shared/components/FormikTextInput';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useRedefinePasswordMutation } from '../../../base/graphql/generated';
import { useAuth } from '../../../context/AuthContext';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';

const EditPasswordSuccessful = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView>
        <Box mx={20} mt="60%" p={20}>
          <Typography
            fontFamily="reservaSerifRegular"
            fontSize={35}
            textAlign="center"
          >
            Senha alterada com sucesso!
          </Typography>
          <Button
            mt="100%"
            variant="primarioEstreito"
            title="VOLTAR PARA HOME"
            onPress={() => {
              navigation.navigate('Home');
            }}
            inline
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export const EditPassword = () => {
  const formRef = useRef<any>(null);
  const { email } = useAuth();
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const [newPassword,
    {
      data: dataMutation,
      loading: loadingMutation,
    }] = useRedefinePasswordMutation(({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  }));

  const [changeSuccess, setChangeSuccess] = useState(false);
  const navigation = useNavigation();
  const { setItem } = useAsyncStorageProvider();

  const handleSubmit = async () => {
    if (formRef.current) {
      await formRef.current.handleSubmit();
    }
  };

  const [initialValues, setInitialValues] = useState({
    password: '',
    passwordConfirm: '',
    currentPassword: '',
  });

  const validation = Yup.object().shape({
    password: Yup.string().required(
      'Introduza uma senha segura, com no mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas e números.',
    ),
    passwordConfirm: Yup.string()
      .required('Informe a senha novamente')
      .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder'),
    currentPassword: Yup.string().required('Informe sua senha atual'),
  });

  const changePassword = useCallback(async (password: string, currentPassword: string) => {
    if (email) {
      const { data: dataNewPassword } = await newPassword({
        variables: {
          input: {
            currentPassword,
            newPassword: password,
          },
        },
      });
      if (dataNewPassword) {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const expires = date.getTime();
        await setItem('@RNAuth:NextRefreshTime', expires);
        await AsyncStorage.setItem('@RNAuth:Token', dataNewPassword?.redefinePassword?.token);
        await AsyncStorage.setItem('@RNAuth:cookie', JSON.stringify(dataNewPassword?.redefinePassword?.authCookie));
      }
    }
  }, [email, newPassword, setItem]);

  useEffect(() => {
    if (dataMutation?.redefinePassword?.token) {
      setChangeSuccess(true);
    }
  }, [dataMutation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      {!changeSuccess ? (
        <>
          <TopBarBackButton loading={loadingMutation} />
          <ScrollView>
            <Box flex={1} alignContent="flex-start" pt="xs" paddingX="xxxs">
              <Box mb="nano" alignSelf="flex-start">
                <Typography variant="tituloSessoes">Alterar senha</Typography>
              </Box>

              <Box mt="xxxs">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  innerRef={formRef}
                  onSubmit={(values: any) => {
                    const { password, currentPassword } = values;
                    changePassword(password, currentPassword);
                  }}
                >
                  {() => (
                    <>
                      <Box mb="micro">
                        <FormikTextInput
                          label="Digite sua senha atual"
                          placeholder="Digite sua senha atual"
                          secureTextEntry={showCurrentPassword}
                          field="currentPassword"
                          iconRight={(
                            <Button
                              mr="xxxs"
                              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? (
                                <Icon
                                  color="neutroFrio2"
                                  name="EyeOff"
                                  size={25}
                                />
                              ) : (
                                <Icon
                                  color="neutroFrio2"
                                  name="EyeOpen"
                                  size={25}
                                />
                              )}
                            </Button>
                          )}
                        />
                      </Box>
                      <Box mb="micro">
                        <FormikTextInput
                          label="Digite sua nova senha"
                          placeholder="Digite sua nova senha"
                          secureTextEntry={showNewPassword}
                          field="password"
                          iconRight={(
                            <Button
                              mr="xxxs"
                              onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? (
                                <Icon
                                  color="neutroFrio2"
                                  name="EyeOff"
                                  size={25}
                                />
                              ) : (
                                <Icon
                                  color="neutroFrio2"
                                  name="EyeOpen"
                                  size={25}
                                />
                              )}
                            </Button>
                          )}
                        />
                      </Box>
                      <Box mb="nano">
                        <FormikTextInput
                          label="Repita a senha"
                          placeholder="Repita a senha"
                          field="passwordConfirm"
                          secureTextEntry={showRepeatPassword}
                          iconRight={(
                            <Button
                              mr="xxxs"
                              onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                            >
                              {showRepeatPassword ? (
                                <Icon
                                  color="neutroFrio2"
                                  name="EyeOff"
                                  size={25}
                                />
                              ) : (
                                <Icon
                                  color="neutroFrio2"
                                  name="EyeOpen"
                                  size={25}
                                />
                              )}
                            </Button>
                          )}
                        />
                      </Box>
                    </>
                  )}
                </Formik>
              </Box>
            </Box>
          </ScrollView>
          <Button
            onPress={handleSubmit}
            title="CONFIRMAR"
            variant="primarioEstreito"
            inline
          />
        </>
      ) : (
        <EditPasswordSuccessful />
      )}
    </SafeAreaView>
  );
};
