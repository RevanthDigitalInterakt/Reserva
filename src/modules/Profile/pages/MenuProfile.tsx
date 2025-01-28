import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { differenceInMonths } from 'date-fns';

import { MyCashbackScreensRoutes } from '../../my-cashback/navigation/MyCashbackNavigator';
import { useCheckConnection } from '../../../hooks/useCheckConnection';
import { FirebaseService } from '../../../shared/services/FirebaseService';
import { RemoteConfigService } from '../../../shared/services/RemoteConfigService';
import TopBarDefault from '../../Menu/components/TopBarDefault';
import ItemList from '../Components/ItemList';
import EventProvider from '../../../utils/EventProvider';
import testProps from '../../../utils/testProps';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Avatar } from '../../../components/Avatar/AvatarComponent';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import FormLink from '../../../components/FormLink/FormLink';
import CardCashback from '../../../components/CashBackBalance';

export function MenuProfile() {
  const navigation = useNavigation();
  const [cashbackDropOpen, setCashbackDropOpen] = useState(false);
  const [balanceCashbackInApp, setBalanceCashbackInApp] = useState(false);
  const [imageProfile, setImageProfile] = useState<any>();
  const firebaseRef = new FirebaseService();
  const { WithoutInternet } = useCheckConnection({});
  const [hasThreeMonths, setHasThreeMonths] = useState<boolean>(false);
  const [, setScreenCashbackInStoreActive] = useState<boolean>(false);

  const { profile, ...authStore } = useAuthStore(['profile', 'initialized']);

  const { handleLogout } = useAuthentication({});

  const { getBoolean, getString } = useRemoteConfig();

  const isLoading = useMemo(() => !authStore.initialized, [authStore.initialized]);

  const showForm = useMemo(() => getString('show_user_feedback_form'), []);

  const setImageUrl = useCallback(async (path?: string) => {
    try {
      if (!path) return;

      const response = await firebaseRef.getUrlFS(path);

      setImageProfile(response);
    } catch (error) {
      ExceptionProvider.captureException(error, "setImageUrl - MenuProfile");
    }
  }, [firebaseRef]);

  const onInitPage = useCallback((initialized: boolean) => {
    if (!initialized) return;

    if (!profile?.email) {
      navigation.navigate('Login', { comeFrom: 'Profile' });
      return;
    }

    const image = profile?.customFields?.find((item) => item?.key === 'profileImagePath');

    setImageUrl(image?.value || '');
  }, [profile?.email, profile?.customFields, setImageUrl, navigation]);

  useFocusEffect(
    useCallback(() => {
      onInitPage(authStore.initialized);
    }, [authStore.initialized, onInitPage, profile]),
  );

  const getIsScreenCashbackInStoreActive = async () => {
    const cashbackInStore = await RemoteConfigService.getValue<boolean>(
      'FEATURE_CASHBACK_IN_STORE',
    );

    setScreenCashbackInStoreActive(cashbackInStore);
  };

  useFocusEffect(
    useCallback(() => {
      const response = getBoolean('balance_cashback_in_app');

      setBalanceCashbackInApp(response);
      getIsScreenCashbackInStoreActive();
    }, []),
  );

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, [navigation]);

  const checkPhoneTime = async (userId: string) => {
    const virifyPhoneCollection = firestore().collection('verify-phone');
    const user = await virifyPhoneCollection
      .where('userId', '==', userId)
      .get();
    if (user.size > 0) {
      const serverDate = user.docs[0]?.data().date.toDate().toISOString();
      const timeFirebase = firestore.Timestamp.now().toDate();
      const differenceAmountInMonths = differenceInMonths(
        timeFirebase,
        new Date(serverDate),
      );

      setHasThreeMonths(differenceAmountInMonths === 3);
    } else {
      setHasThreeMonths(true);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      checkPhoneTime(profile?.id);
    }
  }, [profile]);

  return (
    <Box flex={1} backgroundColor="white">
      <TopBarDefault loading={isLoading} />

      <WithoutInternet />

      <ScrollView showsVerticalScrollIndicator={false}>
        {!!profile && (
          <Box alignContent="flex-start" pt="xs">
            <Box flexDirection="row" alignItems="center" paddingX="xxxs">
              <Box testID="com.usereserva:id/menu_profile_avatar">
                <Avatar
                  imageStyle={{ width: 60, height: 60, borderRadius: 60 }}
                  onPress={() => {
                    EventProvider.logEvent('profile_edit_click', {});
                    navigation.navigate('EditProfile');
                  }}
                  {...imageProfile ? { imageSource: { uri: imageProfile } } : { buttonEdit: true }}
                />
              </Box>

              <Box ml="xxxs">
                <Box mb="quarck">
                  <Typography variant="tituloSessoes" fontSize={20}>Perfil</Typography>
                </Box>

                <Typography variant="subtituloSessoes" fontSize={16}>
                  {`Boas-vindas, ${profile.firstName || profile.email}.`}
                </Typography>
              </Box>
            </Box>
            <Box
              style={{
                width: '88%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardCashback />
            </Box>
            <Box mt="xxxs">
              <Box paddingX="xxxs">
                <ItemList
                  title="Meus pedidos"
                  descr="Acompanhe seus pedidos"
                  icon="Handbag"
                  onPress={() => {
                    EventProvider.logEvent('profile_my_orders_click', {});
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
                    EventProvider.logEvent('profile_favorites_click', {});
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
                    EventProvider.logEvent('profile_my_account_click', {});
                    navigation.navigate('EditProfile');
                  }}
                />
              </Box>

              <Box paddingX="xxxs">
                <ItemList
                  title="Meu Cashback"
                  descr="Veja sua carteira"
                  icon="Cashback"
                  arrowDown
                  dropdownActive={cashbackDropOpen}
                  onPress={() => {
                    EventProvider.logEvent('profile_my_cashback_click', {});
                    setCashbackDropOpen(!cashbackDropOpen);
                  }}
                />
              </Box>

              {cashbackDropOpen && (
                <Box
                  bg="#F6F6F6"
                  paddingX="xxs"
                  paddingY="xxxs"
                  testID="com.usereserva:id/menu_profile_cash_back"
                >
                  <Box paddingX="xxs">
                    <TouchableOpacity
                      {...testProps('com.usereserva:id/my_cashback_button')}
                      onPress={() => {
                        EventProvider.logEvent('profile_my_portfolio_click', {});
                        navigation.navigate(MyCashbackScreensRoutes.MY_WALLET);
                      }}
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
                      EventProvider.logEvent('profile_my_credits_click', {});
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
                    EventProvider.logEvent('profile_my_addresses_click', {});
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
                    EventProvider.logEvent('profile_change_password_click', {});
                    navigation.navigate('EditPassword');
                  }}
                />
              </Box>

              {showForm === 'profile' ? <FormLink /> : null}

              <Box marginY="xs" justifyContent="flex-end">
                <Button
                  testID="com.usereserva:id/profile_button_logout"
                  width={150}
                  disabled={isLoading}
                  onPress={() => {
                    EventProvider.logEvent('profile_logout_click', {});
                    handleLogout();
                  }}
                  title="LOGOUT"
                  variant="primarioEstreitoOutline"
                />
              </Box>
            </Box>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
