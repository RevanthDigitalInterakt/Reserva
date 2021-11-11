import React, { useEffect, useRef, useState } from 'react';

import { useLazyQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import moment from 'moment';
import { Pressable, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Button, Typography } from 'reserva-ui';

import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import {
  accessKeySignInMutation,
  sendEmailVerificationMutation,
} from '../../../graphql/login/loginMutations';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../../Forgot/componet/HeaderBanner';
import CodeInput from '../components/CodeInput';

export interface AccessCodeProps
  extends StackScreenProps<RootStackParamList, 'AccessCode'> { }

const AccessCode: React.FC<AccessCodeProps> = ({ navigation, route }) => {
  const { cookie, setCookie } = useAuth();
  const { email } = route.params;
  const [accessCode, setAccessCode] = useState('');
  const [showError, setShowError] = useState(false);

  const [loginWithCode, { data, loading }] = useMutation(
    accessKeySignInMutation
  );

  const [sendEmail, { loading: loadingSendMail, data: dataSendMail }] =
    useMutation(sendEmailVerificationMutation);

  const handleLogin = () => {
    if (accessCode.length < 6) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    loginWithCode({
      variables: {
        email,
        code: `${accessCode}`,
      },
    });
  };

  const handleResendCode = () => {
    sendEmail({
      variables: {
        email,
      },
    });
  };
  useEffect(() => {
    if (!loading && data?.cookie) {
      setCookie(data?.cookie);

      AsyncStorage.setItem('@RNAuth:typeLogin', 'code');
      AsyncStorage.setItem('@RNAuth:lastLogin', `${moment.now()}`);
      AsyncStorage.setItem('@RNAuth:cookie', data?.cookie).then(() => {
        setShowError(false);
        navigation.navigate('Home');
      });
    }
    if (data?.accessKeySignIn === 'WrongCredentials') {
      setShowError(true);
    }
  }, [data]);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView>
        <HeaderBanner
          imageHeader={images.headerLogin}
          onClickGoBack={() => {
            navigation.goBack();
          }}
        />
        <Box px={20} pt="md">
          <Typography variant="tituloSessao">
            Digite aqui o código enviado para o e-mail:
          </Typography>
          <Box mt={25} mb={16}>
            <CodeInput
              code={accessCode}
              onChageCode={setAccessCode}
              showError={showError}
            />
          </Box>
          <Button
            title="ENTRAR"
            variant="primarioEstreito"
            disabled={loading}
            onPress={() => handleLogin()}
            inline
          />
          <Button mt="xs" onPress={handleResendCode}>
            <Typography
              fontSize={14}
              fontFamily="nunitoRegular"
              style={{ textDecorationLine: 'underline' }}
            >
              Reenviar código
            </Typography>
          </Button>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccessCode;
