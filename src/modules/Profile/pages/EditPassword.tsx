import React, { useState, useRef, useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { Formik } from 'formik';
import { BackHandler, SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, Button, Icon } from 'reserva-ui';
import * as Yup from 'yup';

import { profileQuery } from '../../../graphql/profile/profileQuery';
import { redefinePasswordMutation } from '../../../graphql/profile/redefinePassword';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { FormikTextInput } from '../../../shared/components/FormikTextInput';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

type Props = StackScreenProps<RootStackParamList, 'EditPassword'>;
export const EditPassword = ({ route }: Props) => {
  const formRef = useRef<any>(null);
  const [email, setEmail] = useState();
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const [
    newPassword,
    { data: dataMutation, loading: loadingMutation, error: newPasswordError },
  ] = useMutation(redefinePasswordMutation);

  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [resultChangePassword, setResultChangePassword] = useState<any>([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading) {
      setEmail(data?.profile?.email);
    }
  }, [data]);

  // acessa a função handleSubmit do formik
  const handleSubmit = async () => {
    if (formRef.current) {
      await formRef.current.handleSubmit();
    }
  };

  const [initialValues, setInitialValues] = useState({
    password: '',
    password_confirm: '',
    current_password: '',
  });

  const validation = Yup.object().shape({
    password: Yup.string().required(
      'Introduza uma senha segura, com no mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas e números.'
    ),
    password_confirm: Yup.string()
      .required('Informe a senha novamente')
      .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder'),
    current_password: Yup.string().required('Informe sua senha atual'),
  });

  const changePassword = (password: string, current_password: string) => {
    newPassword({
      variables: {
        email,
        newPassword: password,
        currentPassword: current_password,
      },
    });
    // navigation.goBack();
  };

  useEffect(() => {
    if (dataMutation?.redefinePassword === 'Success') {
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
                    const { password, current_password } = values;
                    changePassword(password, current_password);
                  }}
                >
                  {() => (
                    <>
                      <Box mb="micro">
                        <FormikTextInput
                          label="Digite sua senha atual"
                          placeholder='Digite sua senha atual'
                          secureTextEntry={showCurrentPassword}
                          field="current_password"
                          iconRight={
                            <Button
                              mr="xxxs"
                              onPress={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
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
                          }
                        />
                      </Box>
                      <Box mb="micro">
                        <FormikTextInput
                          label="Digite sua nova senha"
                          placeholder='Digite sua nova senha'
                          secureTextEntry={showNewPassword}
                          field="password"
                          iconRight={
                            <Button
                              mr="xxxs"
                              onPress={() =>
                                setShowNewPassword(!showNewPassword)
                              }
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
                          }
                        />
                      </Box>
                      <Box mb="nano">
                        <FormikTextInput
                          label="Repita a senha"
                          placeholder='Repita a senha'
                          field="password_confirm"
                          secureTextEntry={showRepeatPassword}
                          iconRight={
                            <Button
                              mr="xxxs"
                              onPress={() =>
                                setShowRepeatPassword(!showRepeatPassword)
                              }
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
                          }
                        />
                      </Box>
                    </>
                  )}
                </Formik>
              </Box>
              {/* {newPasswordError &&
                <Box>
                  <Typography>{newPasswordError.message.toString()}</Typography>
                </Box>} */}
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

const EditPasswordSuccessful = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView>
        <>
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
        </>
      </ScrollView>
    </SafeAreaView>
  );
};
