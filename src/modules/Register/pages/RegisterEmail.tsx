/* eslint-disable react/function-component-definition */
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useSignUpVerificationCodeMutation } from '../../../base/graphql/generated';
import images from '../../../base/styles/icons';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography/Typography';
import UnderlineInput from '../../../components/UnderlineInput';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { validateEmail } from '../../../utils/validateEmail';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import EventProvider from '../../../utils/EventProvider';
import ReactMoE,{MoEProperties} from 'react-native-moengage';

export interface RegisterEmailProps
  extends StackScreenProps<RootStackParamList, 'RegisterEmail'> { }

export const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const { comeFrom } = route.params || {};
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  const [inputError, setInputError] = useState('');

  const [signUpVerificationCode, { error, loading }] = useSignUpVerificationCodeMutation({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const handleEmailAccess = useCallback(async () => {
    const validEmail = validateEmail(email);

    if (!validEmail) {
      setInputError('Por favor, informe um e-mail válido.');
      return;
    }

    ReactMoE.setUserUniqueID(email);

    const properties = new MoEProperties();
    properties.addAttribute('source', comeFrom);
    ReactMoE.trackEvent('SignupStarted', properties);

    try {
      const { data } = await signUpVerificationCode({
        variables: {
          input: { email },
        },
      });

      if (!data?.signUpVerificationCode.ok) {
        setInputError('E-mail já cadastrado em nosso banco de dados');
        setShowRecoveryPassword(true);
        return;
      }

      if (data?.signUpVerificationCode?.cookies) {
        navigation.navigate(
          'ConfirmAccessCode',
          { email, cookies: data?.signUpVerificationCode?.cookies, comeFrom },
        );
      }
    } catch (err) {
      ExceptionProvider.captureException(err, "handleEmailAccess - RegisterEmail.tsx", { email });
    }
  }, [email]);

  const handleEmailRecovery = useCallback(async () => {
    try {
      const { data } = await signUpVerificationCode({
        variables: {
          input: { email },
        },
      });

      if (data?.signUpVerificationCode?.cookies) {
        navigation.navigate(
          'ConfirmAccessCode',
          { email, cookies: data?.signUpVerificationCode?.cookies },
        );
      }
    } catch (err) {
      ExceptionProvider.captureException(err, "handleEmailRecovery - RegisterEmail", {email});
    }
  }, [email]);

  const pressButton = () => {
    if (showRecoveryPassword) {
      EventProvider.logEvent('signup_recover_password_click', {});
      handleEmailRecovery();
    } else {
      EventProvider.logEvent('signup_register_email_click', {});
      handleEmailAccess();
    }
  };

  useEffect(() => {
    setInputError('');
    setShowRecoveryPassword(false);
  }, [email]);

  useEffect(() => {
    if (error) {
      setInputError('E-mail já cadastrado em nosso banco de dados');
      setShowRecoveryPassword(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={() => navigation.goBack()}
        loading={loading}
      />

      <Box mx={20} mt={13}>
        <Typography fontFamily="reservaSerifRegular" fontSize={22}>
          Cadastre seu e-mail
        </Typography>

        <Box mt={27}>
          <Typography fontFamily="nunitoRegular" fontSize={15}>
            Enviaremos um código de confirmação para o e-mail informado.
          </Typography>
        </Box>

        <Box mt={6}>
          <UnderlineInput
            testID="register_input_email"
            onChangeText={setEmail}
            placeholder="abcdefg@gmail.com"
            keyboardType="email-address"
            showError={!!inputError}
            errorMsg={inputError}
          />
        </Box>

        <Button
          mt={37}
          variant={showRecoveryPassword ? 'primarioEstreitoOutline' : 'primarioEstreito'}
          title={showRecoveryPassword ? 'RECUPERAR SENHA' : 'CADASTRAR E-MAIL'}
          onPress={pressButton}
          testID="com.usereserva:id/register_button_recover"
          disabled={!email.length}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
