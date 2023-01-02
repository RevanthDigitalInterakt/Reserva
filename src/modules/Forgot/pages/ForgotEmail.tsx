import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  Typography, Box, Button,
} from '@usereservaapp/reserva-ui';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import {
  sendEmailVerificationMutation,
} from '../../../graphql/login/loginMutations';
import { RootStackParamList } from '../../../routes/StackNavigator';
import UnderlineInput from '../../Login/components/UnderlineInput';
import HeaderBanner from '../componet/HeaderBanner';

export interface ForgotEmailProps
  extends StackScreenProps<RootStackParamList, 'ForgotEmail'> {}

export const ForgotEmail: React.FC<ForgotEmailProps> = ({ navigation }) => {
  const { cookie, setCookie } = useAuth();
  // const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const [sendEmailVerification, { data, loading }] = useMutation(
    sendEmailVerificationMutation,
  );

  const handleEmailAccess = () => {
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
            }}
            accessibilityLabel="forgot_input_email"
            placeholder="Digite seu e-mail"
          />
        </Box>
        <Button
          mt={55}
          variant="primarioEstreito"
          title="ENVIAR E-MAIL"
          onPress={handleEmailAccess}
          disabled={email.length <= 0}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
