import React from 'react';
import Modal from 'react-native-modal';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Box, Icon, Typography } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';

import testProps from '../../utils/testProps';
import EventProvider from '../../utils/EventProvider';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';

import { Button } from '../Button';
import UnderlineInput from '../UnderlineInput';
import { FooterModalPrime } from './components/FooterModal';

import * as Styles from './styles';
import type { IParamsComponent } from './types';
import { isValidEmail, isValidPassword } from './utils';
import IconLogoPrime from '../../../assets/icons/IconLogoPrime';

export const ModalSignIn: React.FC<IParamsComponent> = ({
  onClose,
  isVisible,
  onModalHide,
}) => {
  const { navigate } = useNavigation();
  const { profile } = useAuthStore(['profile']);

  const {
    loadingSignIn,
    handleLogin,
    loginCredentials,
    setLoginCredentials,
    setEmailIsValid,
    setPasswordIsValid,
  } = useAuthentication({ closeModal: onClose });

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="zoomOut"
      isVisible={isVisible}
      animationInTiming={300}
      onBackdropPress={onClose}
      onModalHide={onModalHide}
      style={Styles.objectStyles.modal}
      {...testProps('com.usereserva:id/modal_sign_in')}
    >
      <Box
        p="xxxs"
        backgroundColor="white"
        style={Styles.objectStyles.containerModal}
        {...testProps('com.usereserva:id/modal_sign_in_container')}
      >
        <Box flexDirection="row-reverse">
          <TouchableOpacity
            onPress={onClose}
            {...testProps('com.usereserva:id/modal_sign_in_close')}
          >
            <Icon name="Close" size={14} />
          </TouchableOpacity>
        </Box>

        <IconLogoPrime
          {...testProps('com.usereserva:id/modal_sign_in_title')}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {!profile?.email && (
            <>
              <Box style={Styles.objectStyles.headerDescription}>
                <Typography fontSize={14} color="neutroFrio2">
                  Olá! Já é cliente Prime? Então basta inserir seu e-mail abaixo
                  para poder comprar:
                </Typography>
              </Box>

              <Box>
                <UnderlineInput
                  isSecureText={false}
                  keyboardType="email-address"
                  placeholder="Digite seu e-mail"
                  value={loginCredentials.username}
                  errorMsg={loginCredentials.usernameError}
                  testID="com.usereserva:id/modal_sign_in_input_email"
                  showError={loginCredentials.showUsernameError}
                  onChangeText={(text) => {
                    try {
                      setLoginCredentials({
                        ...loginCredentials,
                        username: text,
                      });
                      setEmailIsValid(isValidEmail(text));
                    } catch (error) {
                      EventProvider.sentry.captureException(error, {
                        extra: {
                          writtenEmail: text,
                        },
                      });
                    }
                  }}
                />

                <View style={{
                  marginTop: 24,
                }}
                >
                  <UnderlineInput
                    isSecureText
                    placeholder="Digite sua senha"
                    value={loginCredentials.password}
                    showError={loginCredentials.showPasswordError}
                    testID="com.usereserva:id/modal_sign_in_input_password"
                    onChangeText={(text) => {
                      setLoginCredentials({
                        ...loginCredentials,
                        password: text,
                      });
                      setPasswordIsValid(isValidPassword(text));
                    }}
                  />
                  <Box mt="micro" mb="quarck">
                    <TouchableOpacity
                      {...testProps(
                        'com.usereserva:id/modal_sign_in_cta_forgot_password',
                      )}
                      onPress={() => {
                        onClose();
                        navigate('ForgotEmail', {});
                      }}
                    >
                      <Typography
                        fontSize={14}
                        style={{ textDecorationLine: 'underline' }}
                      >
                        Esqueci minha senha
                      </Typography>
                    </TouchableOpacity>
                  </Box>

                  {loginCredentials.hasError && (
                    <Typography
                      fontSize={13}
                      color="vermelhoAlerta"
                      fontFamily="nunitoRegular"
                    >
                      {loginCredentials.showMessageError}
                    </Typography>
                  )}
                </View>
              </Box>

              <Button
                inline
                mt="xs"
                mb="xxs"
                onPress={handleLogin}
                disabled={loadingSignIn}
                variant="primarioEstreito"
                title="CONTINUAR COMPRANDO"
                testID="com.usereserva:id/modal_sign_in-cta_enter"
              />

              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="center"
                style={Styles.objectStyles.wrapperAboutPrime}
              >
                <Box
                  flex={1}
                  marginRight="md"
                  borderColor="divider"
                  borderWidth="hairline"
                />
                <Typography fontSize={14} textAlign="center">
                  Ainda não é
                  {' '}
                  <Typography fontSize={14} fontFamily="reservaSerifBlack">
                    Prime
                  </Typography>
                  ?
                </Typography>
                <Box
                  flex={1}
                  marginLeft="md"
                  borderColor="divider"
                  borderWidth="hairline"
                />
              </Box>
            </>
          )}

          <FooterModalPrime onClose={onClose} />
        </ScrollView>
      </Box>
    </Modal>
  );
};
