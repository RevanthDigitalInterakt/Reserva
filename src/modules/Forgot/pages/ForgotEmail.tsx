import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import images from '../../../base/styles/icons';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import UnderlineInput from '../../../components/UnderlineInput';
import HeaderBanner from '../componet/HeaderBanner';
import testProps from '../../../utils/testProps';
import { useRecoverPasswordVerificationCodeMutation } from '../../../base/graphql/generated';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';

export interface ForgotEmailProps
  extends StackScreenProps<RootStackParamList, 'ForgotEmail'> { }

export const ForgotEmail: React.FC<ForgotEmailProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);

  const [sendEmailVerification, { error }] = useRecoverPasswordVerificationCodeMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const handleEmailAccess = useCallback(async () => {
    try {
      const { data } = await sendEmailVerification({
        variables: {
          input: { email },
        },
      });

      if (data?.recoverPasswordVerificationCode?.cookies) {
        navigation.navigate(
          'ForgotAccessCode',
          {
            email,
            cookies: data?.recoverPasswordVerificationCode?.cookies,
          },
        );
      }
    } catch (e) {
      ExceptionProvider.captureException(e, "handleEmailAccess - ForgotEmail.tsx", { email });
    }
  }, [email]);

  useEffect(() => {
    if (error) {
      setHasError(true);
    }
  }, [error]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <HeaderBanner
        imageHeader={images.headerLogin}
        onClickGoBack={() => {
          navigation.goBack();
        }}
      />
      <Box mx={20} mt={13}>
        <Typography fontFamily="reservaSerifRegular" fontSize={22}>
          Atualize sua senha
        </Typography>
        <Box mt={27}>
          <Typography fontFamily="nunitoRegular" fontSize={15}>
            Para alterar a senha, digite seu e-mail abaixo:
          </Typography>
        </Box>
        <Box mt={33}>
          <UnderlineInput
            keyboardType="email-address"
            autoComplete="email"
            onChangeText={(text) => {
              setEmail(text);
              if (!text.length) setHasError(false);
            }}
            {...testProps('com.usereserva:id/forgot_input_email')}
            placeholder="Digite seu e-mail"
          />
        </Box>
        {hasError
          && (
            <Box mt="quarck">
              <Typography style={{ color: 'red' }} fontFamily="nunitoRegular" fontSize={13}>
                Não há nenhum usuário cadastrado com o e-mail fornecido
              </Typography>
            </Box>
          )}
        <Button
          mt={55}
          variant="primarioEstreito"
          title="ENVIAR E-MAIL"
          onPress={handleEmailAccess}
          disabled={email.length <= 0}
          {...testProps('com.usereserva:id/send_email')}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
