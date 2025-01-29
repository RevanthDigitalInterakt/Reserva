import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { useIsTester } from '../../../hooks/useIsTester';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { NewLoginScreen } from './NewLogin';
import SignIn from '../../../pages/SignIn/SignIn';

type TLoginProps = StackScreenProps<RootStackParamList, 'LoginAlternative'>;

export default function LoginABTest(
  loginProps: TLoginProps,
): JSX.Element {
  const { getBoolean } = useRemoteConfig();
  const isTester = useIsTester();

  const showNewLogin = useMemo(() => getBoolean(isTester ? 'show_new_login_layout_tester' : 'show_new_login_layout'), [getBoolean, isTester]);

  return showNewLogin ? <NewLoginScreen {...loginProps} /> : <SignIn {...loginProps} />;
}
