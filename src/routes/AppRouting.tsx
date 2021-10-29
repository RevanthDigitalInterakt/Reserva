import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { horizontalAnimationBackwards } from '../animations/animations';
import { Menu } from '../modules/Menu/modals/Menu';

import { MainStackScreen } from './StackNavigator';
import { useAuth } from '../context/AuthContext';
import { profileQuery } from '../graphql/profile/profileQuery';
import { useQuery } from '@apollo/client';

const RootStack = createStackNavigator();

export const AppRouting = () => {
  const { cleanEmailAndCookie, setCookie } = useAuth()
  const { data: profileData, loading: profileLoading } =
    useQuery(profileQuery);

  useEffect(() => {
    // setCookie('VtexIdclientAutCookie_lojausereserva=eyJhbGciOiJFUzI1NiIsImtpZCI6IjFFNjFBNkY2M0Y2MDI3QkUwNjIzQzBGQzUzOEJEMjFBMjhEOTJDNzEiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJ0aWFnby5yb2RyaWd1ZXNAZ2xvYmFsc3lzLmNvbS5iciIsImFjY291bnQiOiJsb2phdXNlcmVzZXJ2YSIsImF1ZGllbmNlIjoid2Vic3RvcmUiLCJzZXNzIjoiNWI5ZjgzZGQtNzc1My00MjM5LTgwMTMtYmRkNzA4YTUxYTk4IiwiZXhwIjoxNjM0NjUyMjU4LCJ1c2VySWQiOiI0ZDBiMGU2Ni1iOTIxLTQxZjgtYTJjNC0yMjc1MzQ4ODM0N2QiLCJpYXQiOjE2MzQ1NjU4NTgsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiIzMGRmOTA1My1kYjg2LTQzZjUtOTgxYS1mMmE4OWVmMzcyZGEifQ.eyXEQsGXqUThzPkiHFq_seBOAs8rMoCxUD_eCMLiCaOuk5GSksgf4ehL29UmoRsOynT-bV86zF9bztMljVd3XQ; Max-Age=86400; Path=/; HttpOnly; Secure')
    !profileData && !profileLoading ? cleanEmailAndCookie() : null
  }, [])

  return <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <RootStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="Menu"
      options={horizontalAnimationBackwards}
      component={Menu}
    />
  </RootStack.Navigator>
}

