import { useMutation } from '@apollo/client';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import images from '../../../base/styles/icons';
import UnderlineInput from '../../../components/UnderlineInput';
import { recoveryPasswordMutation } from '../../../graphql/login/loginMutations';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { platformType } from '../../../utils/platformType';
import HeaderBanner from '../componet/HeaderBanner';
import { Box } from '../../../components/Box/Box';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';

export interface PasswordCheckProps {
  text: string,
  checked: boolean
}

export const PasswordCheck: React.FC<PasswordCheckProps> = ({ text, checked }) => {
  const color = checked ? 'verdeSucesso' : 'neutroFrio2';
  return (
    <Box flexDirection="row" alignItems="center" width="50%" mt={15}>
      <Box mt="nano" mr={2}>
        <IconLegacy name="Check" size={16} color={color} />
      </Box>
      <Typography color={color}>
        {text}
      </Typography>
    </Box>
  );
};

export interface ForgotPasswordProps extends StackScreenProps<RootStackParamList, 'ForgotNewPassword'> { }

export const ForgotNewPassword: React.FC<ForgotPasswordProps> = ({ navigation, route }) => {
  const { code, email } = route.params;

  const [recoveryPassword] = useMutation(recoveryPasswordMutation);

  const [passwords, setPasswords] = useState({
    first: '',
    confirm: '',
  });

  const passwordCheckHandler = () => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) != null,
  });

  const [passwordsChecker, setPasswordChecker] = useState(passwordCheckHandler());

  const enabledButton = () => passwordsChecker.equal
  && passwordsChecker.digitsCount
  && passwordsChecker.uppercase
  && passwordsChecker.lowercase
  && passwordsChecker.number;

  const handleUpdaePassword = () => {
    const variables = {
      email,
      code,
      newPassword: passwords.confirm,
    };
    recoveryPassword({
      variables,
    }).then((x) => {
      if (x?.data?.recoveryPassword !== null) {
        return navigation.navigate('ForgotEmailSuccess');
      }
      return navigation.navigate('ForgotEmail', {});
    });
  };

  useEffect(() => {
    setPasswordChecker(passwordCheckHandler());
  }, [passwords]);

  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView ref={scrollViewRef}>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll={(Platform.OS === platformType.IOS)}
          extraScrollHeight={155}
        >

          <HeaderBanner
            imageHeader={images.headerLogin}
            onClickGoBack={() => { navigation.goBack(); }}
          />
          <Box mx={20} mt={13}>
            <Typography fontFamily="reservaSerifRegular" fontSize={22}>Atualize sua senha</Typography>
            <Box mt={27}>
              <Typography fontFamily="nunitoRegular" fontSize={15}>Por favor, cadastre sua nova senha:</Typography>
            </Box>
            <Box mt={27}>
              <UnderlineInput onFocus={(event) => scrollViewRef.current?.scrollToEnd()} onChangeText={(text) => setPasswords({ ...passwords, first: text })} placeholder="Digite sua nova senha" />
              <Box mt="sm">
                <UnderlineInput onFocus={(event) => scrollViewRef.current?.scrollToEnd()} onChangeText={(text) => setPasswords({ ...passwords, confirm: text })} placeholder="Confirme sua nova senha" />
              </Box>
            </Box>
            <Box mt={22}>
              <Typography>Sua senha deve ter pelo menos:</Typography>
            </Box>
            <Box
              mx={44}
              flexDirection="row"
              flexWrap="wrap"
              pt={2}
            >
              <PasswordCheck checked={passwordsChecker.digitsCount} text="8 dígitos" />
              <PasswordCheck checked={passwordsChecker.lowercase} text="1 letra maiúscula" />
              <PasswordCheck checked={passwordsChecker.number} text="1 número" />
              <PasswordCheck checked={passwordsChecker.uppercase} text="1 letra minúscula" />
            </Box>
            <Button mt={28} variant="primarioEstreito" title="ATUALIZAR SENHA" onPress={handleUpdaePassword} disabled={!enabledButton()} inline />
          </Box>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
