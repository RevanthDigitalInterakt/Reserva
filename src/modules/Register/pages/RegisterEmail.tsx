import AsyncStorage from '@react-native-community/async-storage';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Typography, Box, Button } from '@usereservaapp/reserva-ui';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import { RootStackParamList } from '../../../routes/StackNavigator';
import UnderlineInput from '../../Login/components/UnderlineInput';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import { useCart } from '../../../context/CartContext';
import { validateEmail } from '../../../utils/validateEmail';
import { useSignUpVerificationCodeMutation } from '../../../base/graphql/generated';
import EventProvider from '../../../utils/EventProvider';

export interface RegisterEmailProps
  extends StackScreenProps<RootStackParamList, 'RegisterEmail'> {}

export const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
  const { setCookie } = useAuth();
  const { verifyEmail } = useCart();

  const [email, setEmail] = useState('');
  const [showRecoveryPassword, setShowRecoveryPassword] = useState(false);
  const [inputError, setInputError] = useState('');

  const [signUpVerificationCode, { error, loading }] = useSignUpVerificationCodeMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const handleEmailAccess = useCallback(async () => {
    const validEmail = validateEmail(email);

    if (!validEmail) {
      setInputError('Por favor, informe um e-mail válido.');
      return;
    }

    const isEmailAlreadyExist = await verifyEmail(email);

    if (isEmailAlreadyExist) {
      setInputError('E-mail já cadastrado em nosso banco de dados');
      setShowRecoveryPassword(true);
      return;
    }

    try {
      signUpVerificationCode({
        variables: {
          input: {
            email,
          },
        },
      }).then(async ({ data }) => {
        if (data?.signUpVerificationCode?.cookies) {
          setCookie(data?.signUpVerificationCode?.cookies);
          await AsyncStorage.setItem('@RNAuth:cookie', JSON.stringify(data?.signUpVerificationCode?.cookies));
          navigation.navigate('ConfirmAccessCode', { email });
        }
      });
    } catch (err) {
      EventProvider.captureException(err);
    }
  }, [email]);

  const handleEmailRecovery = useCallback(() => {
    try {
      signUpVerificationCode({
        variables: {
          input: {
            email,
          },
        },
      }).then(async ({ data }) => {
        if (data?.signUpVerificationCode?.cookies) {
          setCookie(data?.signUpVerificationCode?.cookies);
          await AsyncStorage.setItem('@RNAuth:cookie', JSON.stringify(data?.signUpVerificationCode?.cookies));
          navigation.navigate('ForgotAccessCode', { email });
        }
      });
    } catch (err) {
      EventProvider.captureException(err);
    }
  }, [email]);

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
            accessibilityLabel="register_input_email"
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
          onPress={showRecoveryPassword ? handleEmailRecovery : handleEmailAccess}
          testID="com.usereserva:id/register_button_recover"
          disabled={!email.length}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
