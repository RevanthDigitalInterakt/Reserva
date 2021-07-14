import AsyncStorage from '@react-native-community/async-storage';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from 'reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import { ApplicationState } from '../../../store';

import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import ItemList from '../Components/ItemList';
import { withAuthentication } from '../HOC/withAuthentication';
import { useQuery } from '@apollo/client';
import { profileQuery } from '../../../store/ducks/profile/types';
import { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/StackNavigator';

type Profile = {
  birthDate: string | null;
  document: string;
  email: string;
  firstName: string;
  homePhone: string;
  lastName: string;
  userId: string;
};

const MenuScreen: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const { cookie, setCookie } = useAuth();
  // const { profile } = useSelector((state: ApplicationState) => state);
  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [profile, setProfile] = useState<Profile>();
  const isFocused = useIsFocused();
  const logout = () => {
    AsyncStorage.removeItem('@RNAuth:cookie');
    setCookie(null);
    navigation.navigate('Home');
  };

  useFocusEffect(() => {
    if (cookie === null) {
      navigation.navigate('Login', { comeFrom: 'Profile' });
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      const { profile } = data;
      console.log(profile);
      if (profile) {
        const { profile } = data;
        setProfile(profile);
      } else {
        logout();
      }
    }
  }, [data]);

  return (
    <Box flex={1} backgroundColor="white">
      <TopBarDefault loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignContent={'flex-start'} pt={'xs'} paddingX={'xxxs'}>
          <Box mb={'xxs'}>
            <Typography variant="tituloSessoes" fontSize={20}>
              Perfil
            </Typography>
          </Box>
          <Typography variant="subtituloSessoes" fontSize={16}>
            Bem-vindo, {profile?.firstName || profile?.email}
          </Typography>

          <Box mt={'xxxs'}>
            <ItemList
              title={'Meus pedidos'}
              descr={'Acompanhe seus pedidos'}
              icon={'Handbag'}
              onPress={() => {
                navigation.navigate('OrderList');
              }}
            />

            <ItemList
              title={'Favoritos'}
              descr={'Veja os produtos que você curtiu'}
              icon={'Heart'}
              onPress={() => {
                navigation.navigate('WishList');
              }}
            />

            <ItemList
              title={'Meus dados'}
              descr={'Visualize e edite suas informações'}
              icon={'Profile'}
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
            {/* <ItemList
              title={'Meus créditos'}
              descr={'Visualize seus créditos e cashbacks'}
              icon={'Card'}
              onPress={() => {
                navigation.navigate('Cashback');
              }}
            /> */}

            <ItemList
              title={'Meus endereços'}
              descr={'Consulte e adicione seus endereços'}
              icon={'Pin'}
              onPress={() => {
                navigation.navigate('AddressList');
              }}
            />

            <ItemList
              title={'Alterar senha'}
              descr={'Altere a senha da sua conta'}
              icon={'Lock'}
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

            <Box marginY={'xs'} justifyContent={'flex-end'}>
              <Button
                width={150}
                disabled={loading}
                onPress={() => logout()}
                title="LOGOUT"
                variant={'primarioEstreitoOutline'}
              ></Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export const MenuProfile = withAuthentication(MenuScreen, 'Profile');
