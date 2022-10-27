import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MyCashbackScreensRoutes } from '../../my-cashback/navigation/MyCashbackNavigator';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Box, Button, Typography } from '@danilomsou/reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import {
  profileQuery,
  ProfileVars,
} from '../../../graphql/profile/profileQuery';
import { useCheckConnection } from '../../../shared/hooks/useCheckConnection';
import { FirebaseService } from '../../../shared/services/FirebaseService';
import { RemoteConfigService } from '../../../shared/services/RemoteConfigService';
import {
  StorageService,
  StorageServiceKeys,
} from '../../../shared/services/StorageService';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import ItemList from '../Components/ItemList';
import { withAuthentication } from '../HOC/withAuthentication';
import firestore from '@react-native-firebase/firestore';
import { differenceInMonths } from 'date-fns';

const MenuScreen: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const [cashbackDropOpen, setCashbackDropOpen] = useState(false);
  const { cookie, setCookie, setEmail, isCookieEmpty } = useAuth();
  const [balanceCashbackInApp, setBalanceCashbackInApp] = useState(false);
  const [profile, setProfile] = useState<ProfileVars>();
  const [imageProfile, setImageProfile] = useState<any>();
  const firebaseRef = new FirebaseService();
  const { WithoutInternet, showScreen: hasConnection } = useCheckConnection({});
  const [profileImagePath, setProfileImagePath] = useState<any>();
  const [isTester, setIsTester] = useState<boolean>(false);
  const [hasThreeMonths, setHasThreeMonths] = useState<boolean>(false);
  const [screenCashbackInStoreActive, setScreenCashbackInStoreActive] =
    useState<boolean>(false);

  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  const [{ loading, data, error }, setProfileQuery] = useState({
    loading: true,
    error: {} as any,
    data: null,
  });

  const refetch = async () => {
    setProfileQuery({
      loading: true,
      error: {} as any,
      data: null,
    });

    await getProfile().then((res) => {
      setProfileQuery({
        loading: false,
        error: res.error,
        data: res.data,
      });
    });
  };

  const logout = () => {
    AsyncStorage.removeItem('@RNAuth:cookie');
    AsyncStorage.removeItem('@RNAuth:email');
    AsyncStorage.removeItem('@RNAuth:typeLogin');
    AsyncStorage.removeItem('@RNAuth:lastLogin');
    setCookie(null);
    setEmail(null);
  };

  const getTesters = async () => {
    const testers = await remoteConfig().getValue('EMAIL_TESTERS');
    if (JSON.parse(testers.asString()).includes(data?.profile?.email)) {
      setIsTester(true);
    }
  };

  const getIsScreenCashbackInStoreActive = async () => {
    const cashback_in_store = await RemoteConfigService.getValue<boolean>(
      'FEATURE_CASHBACK_IN_STORE'
    );

    console.log('cashback_in_store', cashback_in_store);
    setScreenCashbackInStoreActive(cashback_in_store);
  };

  const userIsLogged = () => {
    if (isCookieEmpty()) {
      if (!hasConnection) {
        navigation.navigate('Login', { comeFrom: 'Profile' });
      }
    }
  };

  useFocusEffect(() => {
    userIsLogged();
  });

  useFocusEffect(
    useCallback(() => {
      getProfile().then((response) => {
        setProfileQuery({
          data: response.data,
          loading: false,
          error: response.error,
        });
      });
      remoteConfig().fetchAndActivate();
      const response = remoteConfig().getValue('balance_cashback_in_app');

      setBalanceCashbackInApp(response.asBoolean());
      getIsScreenCashbackInStoreActive();
      if (data) {
        refetch();
      }
    }, [])
  );

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
        const profileImagePath =
          data?.profile?.customFields.find(
            (x: any) => x.key == 'profileImagePath'
          ).value || null;
        setProfileImagePath(profileImagePath);
      }
      getTesters();
    }
  }, [data]);

  useEffect(() => {
    if (profile) {
      const { profile } = data;
      setProfile(profile);
      const profileImagePath =
        data?.profile?.customFields.find(
          (x: any) => x.key == 'profileImagePath'
        ).value || null;
      setProfileImagePath(profileImagePath);
    }
  }, [profile]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  const updateImageUrl = async () => {
    if (profileImagePath != null) {
      try {
        const response = await firebaseRef.getUrlFS(`${profileImagePath}`);
        setImageProfile(response);
      } catch (error) {
        setProfileImagePath(null);
      }
    } else {
      setImageProfile(null);
    }
  };

  useEffect(() => {
    updateImageUrl();
  }, [profileImagePath]);

  const checkPhoneTime = async (userId: string) => {
    const virifyPhoneCollection = firestore().collection('verify-phone');
    const user = await virifyPhoneCollection
      .where('userId', '==', userId)
      .get();
    if (user.size > 0) {
      const serverDate = user.docs[0].data()['date'].toDate().toISOString();
      const timeFirebase = firestore.Timestamp.now().toDate();
      const differenceAmountInMonths = differenceInMonths(
        timeFirebase,
        new Date(serverDate)
      );
      if (differenceAmountInMonths === 3) {
        setHasThreeMonths(true);
      } else {
        setHasThreeMonths(false);
      }
    } else {
      setHasThreeMonths(true);
    }
  };

  useEffect(() => {
    if (profile) {
      checkPhoneTime(profile.userId);
    }
  }, [profile]);

  const handleCashback = () => {
    if (hasThreeMonths) {
      if (profile?.homePhone) {
        if (profile?.document) {
          navigation.navigate('changePhoneNumber', {
            profile: profile,
          });
        } else {
          navigation.navigate('registerCPF', {
            profile: profile,
          });
        }
      } else {
        if (profile?.document) {
          navigation.navigate('registerPhoneNumber', {
            profile: profile,
          });
        } else {
          navigation.navigate('registerCPF', {
            profile: profile,
          });
        }
      }
    } else {
      navigation.navigate('cashbackInStore', {
        isLoyal: true,
        costumerDocument: profile?.document,
      });
    }
  };
  return (
    <Box flex={1} backgroundColor="white">
      <TopBarDefault loading={loading} />

      <WithoutInternet />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignContent="flex-start" pt="xs">
          <Box flexDirection="row" alignItems="center" paddingX="xxxs">
            <Box>
              {imageProfile === null ? (
                <Avatar
                  sizeImage={60}
                  sizeButton={25}
                  onPress={() => navigation.navigate('EditProfile')}
                  buttonEdit
                />
              ) : (
                <Avatar
                  imageSource={{ uri: imageProfile }}
                  onPress={() => navigation.navigate('EditProfile')}
                  sizeImage={60}
                  sizeButton={25}
                />
              )}
            </Box>
            <Box ml="xxxs">
              <Box mb="quarck">
                <Typography variant="tituloSessoes" fontSize={20}>
                  Perfil
                </Typography>
              </Box>
              <Typography variant="subtituloSessoes" fontSize={16}>
                Boas-vindas
                {profile && `, ${profile?.firstName || profile?.email}.`}
              </Typography>
            </Box>
          </Box>
          <Box mt="xxxs">
            <Box paddingX="xxxs">
              <ItemList
                title="Meus pedidos"
                descr="Acompanhe seus pedidos"
                icon="Handbag"
                onPress={() => {
                  navigation.navigate('OrderList');
                }}
              />
            </Box>
            <Box paddingX="xxxs">
              <ItemList
                title="Favoritos"
                descr="Veja os produtos que você curtiu"
                icon="Heart"
                onPress={() => {
                  navigation.navigate('WishList');
                }}
              />
            </Box>
            <Box paddingX="xxxs">
              <ItemList
                title="Minha conta"
                descr="Visualize e edite suas informações"
                icon="Profile"
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
              />
            </Box>

            {/* <ItemList
              title={'Meus cartões'}
              descr={'Consulte e adicione cartões de crédito'}
              icon={'Card'}
              onPress={() => {
                navigation.navigate('ListCards');
              }}
            /> */}
            <Box paddingX="xxxs">
              <ItemList
                title="Meu Cashback"
                descr="Escaneie o QR Code e veja sua carteira"
                icon="Cashback"
                arrowDown
                dropdownActive={cashbackDropOpen}
                onPress={() => {
                  setCashbackDropOpen(!cashbackDropOpen);
                }}
              />
            </Box>
            {cashbackDropOpen && (
              <Box bg="#F6F6F6" paddingX="xxs" paddingY="xxxs">
                <Box paddingX="xxs" pb="xxs">
                  <TouchableOpacity onPress={handleCashback}>
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      QR Code para cashback
                    </Typography>
                  </TouchableOpacity>
                </Box>
                <Box paddingX="xxs">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(MyCashbackScreensRoutes.MY_WALLET)
                    }
                  >
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      Ver minha carteira
                    </Typography>
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
            {balanceCashbackInApp && (
              <Box paddingX="xxxs">
                <ItemList
                  title="Meus créditos"
                  descr="Visualize seus créditos"
                  icon="Credit"
                  onPress={() => {
                    navigation.navigate('credits');
                  }}
                />
              </Box>
            )}

            <Box paddingX="xxxs">
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
            </Box>

            <Box paddingX="xxxs">
              <ItemList
                title="Alterar senha"
                descr="Altere a senha da sua conta"
                icon="Lock"
                onPress={() => {
                  navigation.navigate('EditPassword');
                }}
              />
            </Box>

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
