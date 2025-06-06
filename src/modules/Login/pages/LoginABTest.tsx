import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { useIsTester } from '../../../hooks/useIsTester';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { NewLoginScreen } from './NewLogin';
import { LoginScreen } from './Login';

type TLoginProps = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export default function LoginABTest(
  loginProps: TLoginProps,
) {
  const { getBoolean, initialized } = useRemoteConfig();
  const isTester = useIsTester();

  const showNewLogin = useMemo(() => getBoolean(isTester ? 'show_new_login_layout_tester' : 'show_new_login_layout'), [getBoolean, isTester]);

  if (!initialized) {
    return null;
  }

  return showNewLogin ? <NewLoginScreen {...loginProps} /> : <LoginScreen {...loginProps} />;
}
