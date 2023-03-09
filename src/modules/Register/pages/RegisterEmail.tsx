import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Typography, Box, Button } from '@usereservaapp/reserva-ui';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import { sendEmailVerificationMutation } from '../../../graphql/login/loginMutations';
import { RootStackParamList } from '../../../routes/StackNavigator';
import UnderlineInput from '../../Login/components/UnderlineInput';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import { useCart } from '../../../context/CartContext';

export interface RegisterEmailProps
  extends StackScreenProps<RootStackParamList, 'RegisterEmail'> {}

export const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
  const { cookie, setCookie } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [showRecoveryPassword, setShowRecoveryPassword] = useState<boolean>(false);
  const [emailEmpty, setEmailEmpty] = useState<boolean>(true);

  const { verifyEmail } = useCart();

  const [sendEmailVerification, { data, loading }] = useMutation(
    sendEmailVerificationMutation,
  );

  const handleEmailAccess = async () => {
    const isEmailAlreadyExist = await verifyEmail(email);

    if (isEmailAlreadyExist) {
      setShowRecoveryPassword(true);
    } else {
      sendEmailVerification({
        variables: {
          email,
        },
      }).then((x) => {
        setCookie(x?.data?.cookie);
        AsyncStorage.setItem('@RNAuth:cookie', x?.data?.cookie);
        navigation.navigate('ConfirmAccessCode', { email });
      });
    }
  };

  const handleEmailRecovery = () => {
    sendEmailVerification({
      variables: {
        email,
      },
    }).then((x) => {
      setCookie(x?.data?.cookie);
      AsyncStorage.setItem('@RNAuth:cookie', x?.data?.cookie);
      navigation.navigate('ForgotAccessCode', { email });
    });
  };

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
            onChangeText={(text) => {
              setEmail(text);

              if (text.length >= 1) {
                setEmailEmpty(false);
              } else {
                setEmailEmpty(true);
              }
            }}
            placeholder="abcdefg@gmail.com"
            keyboardType="email-address"
            showError={showRecoveryPassword}
          />
        </Box>
        {showRecoveryPassword && (
          <Typography
            color="vermelhoAlerta"
            fontFamily="nunitoRegular"
            fontSize={13}
            style={{
              marginTop: -14,
            }}
          >
            E-mail já cadastrado em nosso banco de dados
          </Typography>
        )}
        <Button
          mt={37}
          variant={
            showRecoveryPassword
              ? 'primarioEstreitoOutline'
              : 'primarioEstreito'
          }
          title={showRecoveryPassword ? 'RECUPERAR SENHA' : 'CADASTRAR E-MAIL'}
          onPress={
            showRecoveryPassword ? handleEmailRecovery : handleEmailAccess
          }
          testID="com.usereserva:id/register_button_recover"
          disabled={emailEmpty}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
