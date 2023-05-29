import AsyncStorage from '@react-native-community/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Avatar, Box, Button, Typography,
} from '@usereservaapp/reserva-ui';
import firestore from '@react-native-firebase/firestore';
import { differenceInMonths } from 'date-fns';
import { MyCashbackScreensRoutes } from '../../my-cashback/navigation/MyCashbackNavigator';
import { useAuth } from '../../../context/AuthContext';
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
import EventProvider from '../../../utils/EventProvider';
import useDitoStore from '../../../zustand/useDitoStore';
import testProps from '../../../utils/testProps';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { ProfileQuery, useProfileLazyQuery } from '../../../base/graphql/generated';
import { useCart } from '../../../context/CartContext';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';

type TProfileData = {
  data: ProfileQuery | null
  loading: boolean
};

const MenuScreen: React.FC<{}> = ({}) => {
  const navigation = useNavigation();
  const { orderform } = useCart();
  const [cashbackDropOpen, setCashbackDropOpen] = useState(false);
  const {
    setCookie, setEmail, isCookieEmpty, cleanEmailAndCookie,
  } = useAuth();
  const [balanceCashbackInApp, setBalanceCashbackInApp] = useState(false);
  const [profileData, setProfileData] = useState<ProfileQuery>();
  const [imageProfile, setImageProfile] = useState<any>();
  const firebaseRef = new FirebaseService();
  const { WithoutInternet, showScreen: hasConnection } = useCheckConnection({});
  const [profileImagePath, setProfileImagePath] = useState<any>();
  const [, setIsTester] = useState<boolean>(false);
  const [hasThreeMonths, setHasThreeMonths] = useState<boolean>(false);
  const [, setScreenCashbackInStoreActive] = useState<boolean>(false);
  const { setItem } = useAsyncStorageProvider();

  const { getBoolean } = useRemoteConfig();
  const [getProfile] = useProfileLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'cache-and-network',
  });

  const [{ loading, data }, setProfileQuery] = useState<TProfileData>({
    loading: true,
    data: null,
  });

  const logout = async () => {
    // TODO refactor Auth to use zustand
    await AsyncStorage.removeItem('@RNAuth:cookie');
    await AsyncStorage.removeItem('@RNAuth:email');
    await AsyncStorage.removeItem('@RNAuth:typeLogin');
    await AsyncStorage.removeItem('@RNAuth:lastLogin');
    await AsyncStorage.removeItem('@Dito:anonymousID');
    await AsyncStorage.setItem('@RNAuth:Token', '');
    await setItem('@RNAuth:NextRefreshTime', 0);
    useDitoStore.persist.clearStorage();
    EventProvider.removePushExternalUserId();
    setCookie(null);
    setEmail(null);
    cleanEmailAndCookie();
    orderform();
  };

  const getTesters = async () => {
    const testers = await remoteConfig().getValue('EMAIL_TESTERS');
    if (JSON.parse(testers.asString()).includes(data?.profile?.email)) {
      setIsTester(true);
    }
  };

  const getIsScreenCashbackInStoreActive = async () => {
    const cashback_in_store = await RemoteConfigService.getValue<boolean>(
      'FEATURE_CASHBACK_IN_STORE',
    );

    setScreenCashbackInStoreActive(cashback_in_store);
  };

  useFocusEffect(() => {
    if (isCookieEmpty()) {
      if (!hasConnection) {
        navigation.navigate('Login', { comeFrom: 'Profile' });
      }
    }
  });

  useFocusEffect(
    useCallback(() => {
      getProfile().then((response) => {
        setProfileQuery({
          data: response.data,
          loading: false,
        });
      });
      const response = getBoolean('balance_cashback_in_app');

      setBalanceCashbackInApp(response);
      getIsScreenCashbackInStoreActive();
    }, []),
  );

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        StorageService.setItem({
          key: StorageServiceKeys.PROFILE,
          value: profile,
          isJSON: true,
        });
        setProfileData(profile);
        const profileImagePath = data?.profile?.customFields.find(
          (x: any) => x.key === 'profileImagePath',
        ).value || null;
        setProfileImagePath(profileImagePath);
      }
      getTesters();
    }
  }, [data, getTesters, profileData]);

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      wbrand: defaultBrand.picapau,
    });

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
      const serverDate = user.docs[0].data().date.toDate().toISOString();
      const timeFirebase = firestore.Timestamp.now().toDate();
      const differenceAmountInMonths = differenceInMonths(
        timeFirebase,
        new Date(serverDate),
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
    if (profileData) {
      checkPhoneTime(profileData?.id);
    }
  }, [profileData]);

  const handleCashback = () => {
    if (hasThreeMonths) {
      if (profileData?.homePhone) {
        if (profileData?.document) {
          navigation.navigate('changePhoneNumber', {
            profileData,
          });
        } else {
          navigation.navigate('registerCPF', {
            profileData,
          });
        }
      } else if (profileData?.document) {
        navigation.navigate('registerPhoneNumber', {
          profileData,
        });
      } else {
        navigation.navigate('registerCPF', {
          profileData,
        });
      }
    } else {
      navigation.navigate('cashbackInStore', {
        isLoyal: true,
        costumerDocument: profileData?.document,
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
            <Box testID="com.usereserva:id/menu_profile_avatar">
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
                {profileData && `, ${profileData?.firstName || profileData?.email}.`}
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
              <Box bg="#F6F6F6" paddingX="xxs" paddingY="xxxs" testID="com.usereserva:id/menu_profile_cash_back">
                <Box paddingX="xxs" pb="xxs">
                  <TouchableOpacity onPress={handleCashback}>
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      QR Code para cashback
                    </Typography>
                  </TouchableOpacity>
                </Box>
                <Box paddingX="xxs">
                  <TouchableOpacity
                    {...testProps('com.usereserva:id/my_cashback_button')}
                    onPress={() => navigation.navigate(MyCashbackScreensRoutes.MY_WALLET)}
                  >
                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                      Ver minha carteira
                    </Typography>
                  </TouchableOpacity>
                </Box>
              </Box>
            )}
            {balanceCashbackInApp && (
              <Box paddingX="xxxs" testID="com.usereserva:id/menu_profile_balance">
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
                  navigation.navigate('AddressList');
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
                testID="com.usereserva:id/profile_button_logout"
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
