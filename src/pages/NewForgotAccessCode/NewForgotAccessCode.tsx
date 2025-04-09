/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { scale } from '../../utils/scale';
import { COLORS, FONTS } from '../../base/styles';
import { useAuthentication } from '../../hooks/useAuthentication';
import { ConfirmationCode } from '../../components/ConfirmationCode/ConfirmationCode';
import InputPassword, { type IPassword } from './InputPassword';
import { useRecoverPasswordResetMutation } from '../../base/graphql/generated';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

type Props = StackScreenProps<RootStackParamList, 'NewForgotAccessCode'>;

interface IPasswordExtraData extends IPassword {
  isEqualPassword: boolean;
  isValidPassword: boolean;
}

export default function NewForgotAccessCode({ navigation, route }: Props) {
  const username = route?.params?.username;
  const cookies = route?.params?.cookies || [];
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);
  const [passwordExtraData, setPasswordExtraData] = useState<IPasswordExtraData | null>(null);
  const [disabledButton, setDisableButton] = useState(true);

  const [recoveryPasswordReset, { loading }] = useRecoverPasswordResetMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const { handleResendCode, loadingSignIn } = useAuthentication({ closeModal: undefined });

  useEffect(() => {
    if (code.length === 6
      && passwordExtraData?.isEqualPassword
      && passwordExtraData?.isValidPassword) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [code, passwordExtraData]);

  const handleUpdatePassword = async () => {
    if (code.length < 6) {
      setIsError(true);
      return;
    }

    if (!passwordExtraData?.isValidPassword || !passwordExtraData?.isEqualPassword) {
      setDisableButton(true);
      Alert.alert('Erro', 'Não foi possível trocar sua senha, tente novamente');
      return;
    }

    try {
      const variables = {
        input: {
          email: username,
          code,
          password: passwordExtraData.confirm,
          cookies,
        },
      };

      const { data: recoveryPasswordData } = await recoveryPasswordReset({
        variables,
      });

      if (!recoveryPasswordData) {
        Alert.alert('Erro', 'código invalido, tente mais tarde');
        return;
      }

      if (recoveryPasswordData?.recoverPasswordReset?.token) {
        navigation.replace('NewForgotSuccess');
      }
    } catch (err) {
      Alert.alert('Erro', 'código invalido, tente mais tarde');
      ExceptionProvider.captureException(err, 'handleUpdatePassword - NewForgotNewPassword.tsx', { email: username });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ConfirmationCode
          username={username}
          cookies={cookies}
          requestResendCode={handleResendCode}
          onChangeCode={setCode}
          isError={isError}
          ContentBody={code.length === 6 ? (
            <InputPassword onChange={(value, isEqualPassword, isValidPassword) => {
              setPasswordExtraData({
                first: value.first,
                confirm: value.confirm,
                isEqualPassword,
                isValidPassword,
              });
            }}
            />
          ) : null}
        />
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.button,
          disabledButton && { backgroundColor: COLORS.GRAY_0 },
        ]}
        disabled={disabledButton}
        onPress={handleUpdatePassword}
      >
        {loading
          ? <ActivityIndicator size="small" color={COLORS.GRAY_1} />
          : (
            <Text
              style={[
                styles.buttonText,
                disabledButton && { color: COLORS.GRAY_1 },
              ]}
            >
              Continuar
            </Text>
          )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: COLORS.WHITE,
  },
  button: {
    backgroundColor: COLORS.DARK_GREY_VARIANT_1,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  disabledButton: {

  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: scale(13),
    fontFamily: FONTS.INTER_REGULAR,
  },
});
