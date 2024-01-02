import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  BackHandler, Linking, ScrollView, View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useLinkTo, useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarMenu } from '../../modules/Menu/components/TopBarMenu';
import testProps from '../../utils/testProps';
import EventProvider from '../../utils/EventProvider';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import {
  type Maybe,
  type MenuCategoryItemOutput,
  MenuItemTypeEnum,
  useAppMenuQuery,
} from '../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import MenuItem from './components/MenuItem';
import FixedMenuItem from './components/MenuFixedItem';
import { getDitoUserID } from '../../utils/Dito/src/utils/getDitoUserID';
import MenuBreadcrumb from './components/MenuBreadcrumb';
import { Box } from '../../components/Box/Box';
import { Divider } from '../../components/Divider/Divider';
import { Typography } from '../../components/Typography/Typography';
import { theme } from '../../base/usereservappLegacy/theme';
import NewFixedMenuItem from './components/NewMenuFixedItem';
import FormLink from '../../components/FormLink/FormLink';

export type MenuProps = StackScreenProps<RootStackParamList, 'Menu'>;

function Menu() {
  const navigation = useNavigation();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [openedIndex, setOpenedIndex] = useState<number>();

  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { profile } = useAuthStore(['profile']);
  const { getBoolean, getString } = useRemoteConfig();
  const linkTo = useLinkTo();

  const showForm = useMemo(() => getString('show_form'), []);

  const { data, loading: loadingMenu } = useAppMenuQuery({
    fetchPolicy: getFetchPolicyPerKey('appMenu'),
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });
  const regionalizationActive = useMemo(() => getBoolean('regionalization'), [getBoolean]);

  const trackEventAccessedDepartmentDito = useCallback(async (openedCategories: string) => {
    if (!openedCategories) return;

    const id = await getDitoUserID(profile?.email);

    EventProvider.sendTrackEvent('acessou-departamento', {
      id,
      action: 'acessou-departamento',
      data: {
        nome_departamento: openedCategories,
        origem: 'app',
      },
    });
  }, [profile?.email]);

  const getTestEnvironment = useCallback(async () => {
    const res = await AsyncStorage.getItem('isTesting');
    setIsTesting(res === 'true');
  }, []);

  const navigateFromMenu = useCallback((routeName: string) => {
    navigation.navigate(routeName, { comeFrom: 'Menu' });
  }, [navigation]);

  const onSelectMenuItem = useCallback((
    index: number,
    selectedItem: Omit<MenuCategoryItemOutput, '__typename'>,
  ) => {
    trackEventAccessedDepartmentDito(selectedItem.name);

    if (selectedItem.type === MenuItemTypeEnum.ParentCategory) {
      setOpenedIndex(openedIndex === index ? undefined : index);
      return;
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Menu');

      return true;
    });

    if (
      selectedItem.type === MenuItemTypeEnum.Category
            || selectedItem.type === MenuItemTypeEnum.Collection
    ) {
      const navigateParams: {
        facetInput: MenuCategoryItemOutput['facets'];
        referenceId: Maybe<string> | undefined;
        title: string;
        comeFrom: string;
        indexMenuOpened: number;
        filters?: {
          priceFilter: {
            from: number;
            to: number;
          };
        };
      } = {
        facetInput: selectedItem.facets,
        referenceId: selectedItem.referenceId,
        title: selectedItem.name,
        comeFrom: 'Menu',
        indexMenuOpened: index,
      };

      if (
        (selectedItem.filters?.priceFilter?.from
                    || selectedItem.filters?.priceFilter?.from === null)
                && selectedItem.filters?.priceFilter?.to) {
        navigateParams.filters = {
          priceFilter: {
            from: selectedItem.filters?.priceFilter?.from || 0,
            to: selectedItem.filters?.priceFilter?.to || 0,
          },
        };
      }

      navigation.navigate('ProductCatalog', navigateParams);

      return;
    }

    if (selectedItem.type === MenuItemTypeEnum.Deeplink && selectedItem.deeplinkUrl) {
      linkTo(selectedItem.deeplinkUrl);
    }
  }, [linkTo, navigation, openedIndex, trackEventAccessedDepartmentDito]);

  useEffect(() => {
    getTestEnvironment();
  }, [getTestEnvironment]);

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.white, flex: 1 }}
      {...testProps('com.usereserva:id/menu_container')}
    >
      <Box flex={1} backgroundColor="backgroundApp">
        <TopBarMenu loading={loadingMenu} />

        <ScrollView>
          <Box paddingX="nano" paddingTop="micro" />

          <MenuBreadcrumb
            title="Página Inicial"
            onPress={() => navigation.navigate('Home')}
          />

          <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />

          {data?.appMenu?.length && (
            <>
              <View>
                {data.appMenu.map((item, index) => (
                  <MenuItem
                    key={`${item.name}-${item.type}-${item.children.length}`}
                    data={item}
                    onPress={(pressedItem) => onSelectMenuItem(index, pressedItem)}
                    opened={openedIndex === index}
                  />
                ))}

                <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />

                {regionalizationActive && (
                <FixedMenuItem
                  iconName="Pin"
                  testID="com.usereserva:id/menu_button_cep"
                  title="Inserir ou alterar CEP"
                  onPress={() => navigation.navigate('ChangeRegionalization')}
                />
                )}

                <NewFixedMenuItem
                  iconName="profile"
                  testID="com.usereserva:id/menu_button_account"
                  title={profile?.email ? `Olá, ${profile?.firstName || profile?.email}` : 'Acessar Conta'}
                  onPress={() => {
                    if (profile?.email) {
                      navigation.navigate('Profile');
                      return;
                    }

                    navigation.navigate('Login', { comeFrom: 'Profile' });
                  }}
                />

                <NewFixedMenuItem
                  iconName="heart"
                  testID="com.usereserva:id/menu_button_favorites"
                  title="Favoritos"
                  onPress={() => navigation.navigate('WishList')}
                />

                <NewFixedMenuItem
                  iconName="faq"
                  testID="com.usereserva:id/menu_button_callcenter"
                  title="Dúvidas Frequentes"
                  onPress={() => navigateFromMenu('HelpCenter')}
                />

                <NewFixedMenuItem
                  iconName="chat"
                  testID="com.usereserva:id/menu_button_callcenter"
                  title="Central de Atendimento"
                  onPress={() => navigateFromMenu('CallCenter')}
                />

                <NewFixedMenuItem
                  iconName="pinPlace"
                  testID="com.usereserva:id/menu_button_stores"
                  title="Lojas"
                  onPress={() => Linking.openURL('https://whts.co/reserva')}
                />

                <NewFixedMenuItem
                  iconName="document"
                  testID="com.usereserva:id/menu_button_privacy"
                  title="Política de Privacidade"
                  onPress={() => navigateFromMenu('PrivacyPolicy')}
                />
              </View>
              {showForm === 'menu' ? (
                <>
                  <Divider variant="fullWidth" marginBottom="nano" marginTop="xxs" marginX="micro" />
                  <FormLink />
                </>
              ) : null}
            </>
          )}

          <Box mt="xs" alignItems="center">
            <Typography color="neutroFrio2" fontFamily="nunitoRegular" fontSize={11}>
              {`Versão ${DeviceInfo.getVersion()} ${isTesting ? ' - Teste' : ''}`}
            </Typography>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}

export default Menu;
