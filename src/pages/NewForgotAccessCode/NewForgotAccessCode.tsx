/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { scale } from '../../utils/scale';
import { COLORS, FONTS } from '../../base/styles';
import { useAuthentication } from '../../hooks/useAuthentication';
import { ConfirmationCode } from '../../components/ConfirmationCode/ConfirmationCode';

type Props = StackScreenProps<RootStackParamList, 'NewForgotAccessCode'>;

export default function NewForgotAccessCode({ navigation, route }: Props) {
  const username = route?.params?.username;
  const cookies = route?.params?.cookies || [];
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);

  const { handleResendCode, loadingSignIn } = useAuthentication({ closeModal: undefined });

  const navigateToNewPassword = useCallback(() => {
    if (code.length < 6) {
      setIsError(true);
      return;
    }

    navigation.navigate('NewForgotNewPassword', {
      email: username,
      code,
      cookies,
    });
  }, [code, cookies, username]);

  return (
    <SafeAreaView style={styles.container}>
      <ConfirmationCode
        username={username}
        cookies={cookies}
        requestResendCode={handleResendCode}
        onChangeCode={setCode}
        isError={isError}
      />

      <TouchableOpacity
        style={styles.button}
        disabled={loadingSignIn}
        onPress={navigateToNewPassword}
      >
        <Text style={styles.buttonText}>Continuar</Text>
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
  buttonText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: scale(13),
    fontFamily: FONTS.INTER_REGULAR,
  },
});
