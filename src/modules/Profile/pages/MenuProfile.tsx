import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Typography, Box, Button } from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import {
  profileQuery,
  ProfileVars,
} from '../../../graphql/profile/profileQuery';
import {
  StorageService,
  StorageServiceKeys,
} from '../../../services/StorageService';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import ItemList from '../Components/ItemList';
import { withAuthentication } from '../HOC/withAuthentication';

const MenuScreen: React.FC<{}> = ({ }) => {
  const navigation = useNavigation();
  const { cookie, setCookie, setEmail, isCookieEmpty } = useAuth();
  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [balanceCashbackInApp, setBalanceCashbackInApp] = useState(false);
  const [profile, setProfile] = useState<ProfileVars>();
  const { WithoutInternet, showScreen: hasConnection } = useCheckConnection({});

  const logout = () => {
    AsyncStorage.removeItem('@RNAuth:cookie');
    AsyncStorage.removeItem('@RNAuth:email');
    AsyncStorage.removeItem('@RNAuth:typeLogin');
    AsyncStorage.removeItem('@RNAuth:lastLogin');
    setCookie(null);
    setEmail(null);
    navigation.navigate('Home');
  };

  useFocusEffect(() => {
    remoteConfig().fetchAndActivate();
    const response = remoteConfig().getValue('balance_cashback_in_app');

    setBalanceCashbackInApp(response.asBoolean());
    if (data) {
      refetch();
    }
    if (isCookieEmpty()) {
      if (!hasConnection) {
        // check internet connection
        navigation.navigate('Login', { comeFrom: 'Profile' });
      }
    }
  });

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        const { profile } = data;
        StorageService.setItem({
          key: StorageServiceKeys.PROFILE,
          value: profile,
          isJSON: true,
        });
        setProfile(profile);
      }
    }
  }, [data]);

  return (
    <Box flex={1} backgroundColor="white">
      <TopBarDefault loading={loading} />

      <WithoutInternet />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignContent="flex-start" pt="xs" paddingX="xxxs">
          <Box mb="xxs">
            <Typography variant="tituloSessoes" fontSize={20}>
              Perfil
            </Typography>
          </Box>
          <Typography variant="subtituloSessoes" fontSize={16}>
            Bem-vindo, {profile?.firstName || profile?.email}
          </Typography>

          <Box mt="xxxs">
            <ItemList
              title="Meus pedidos"
              descr="Acompanhe seus pedidos"
              icon="Handbag"
              onPress={() => {
                navigation.navigate('OrderList');
              }}
            />

            <ItemList
              title="Favoritos"
              descr="Veja os produtos que você curtiu"
              icon="Heart"
              onPress={() => {
                navigation.navigate('WishList');
              }}
            />

            <ItemList
              title="Meus dados"
              descr="Visualize e edite suas informações"
              icon="Profile"
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
            />

            {/* <ItemList
              title={'Meus cartões'}
              descr={'Consulte e adicione cartões de crédito'}
              icon={'Card'}
              onPress={() => {
                navigation.navigate('ListCards');
              }}
            /> */}
            {balanceCashbackInApp && (
              <ItemList
                title="Meus créditos"
                descr="Visualize seus créditos e cashbacks"
                icon="Cashback"
                onPress={() => {
                  navigation.navigate('Credits');
                }}
              />
            )}

            <ItemList
              title="Meus endereços"
              descr="Consulte e adicione seus endereços"
              icon="Pin"
              onPress={() => {
                navigation.navigate('AddressList', {
                  comeFrom: 'Home',
                });
              }}
            />

            <ItemList
              title="Alterar senha"
              descr="Altere a senha da sua conta"
              icon="Lock"
              onPress={() => {
                navigation.navigate('EditPassword');
              }}
            />

            {/* <ItemList
              title={'Notificações'}
              descr={'Mantenha-se informado sobre as novidades'}
              icon={'Bell'}
              onPress={() => {
                navigation.navigate('NotificationProfile');
              }}
            /> */}

            <Box marginY="xs" justifyContent="flex-end">
              <Button
                width={150}
                disabled={loading}
                onPress={() => logout()}
                title="LOGOUT"
                variant="primarioEstreitoOutline"
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export const MenuProfile = withAuthentication(MenuScreen, 'Profile');
