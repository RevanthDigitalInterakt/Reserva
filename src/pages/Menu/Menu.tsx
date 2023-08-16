import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { BackHandler, Linking, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useLinkTo, useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarMenu } from '../../modules/Menu/components/TopBarMenu';
import testProps from '../../utils/testProps';
import EventProvider from '../../utils/EventProvider';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { type MenuCategoryItemOutput, MenuItemTypeEnum, useAppMenuQuery } from '../../base/graphql/generated';
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

export type MenuProps = StackScreenProps<RootStackParamList, 'Menu'>;

function Menu() {
  const navigation = useNavigation();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [openedIndex, setOpenedIndex] = useState<number>();

  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { profile } = useAuthStore(['profile']);
  const { getBoolean } = useRemoteConfig();
  const linkTo = useLinkTo();

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
      navigation.navigate('ProductCatalog', {
        facetInput: selectedItem.facets,
        referenceId: selectedItem.referenceId,
        title: selectedItem.name,
        comeFrom: 'Menu',
        indexMenuOpened: index,
      });

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
    <SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }} {...testProps('com.usereserva:id/menu_container')}>
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
            <Animatable.View animation="fadeIn">
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

              <FixedMenuItem
                iconName="Profile"
                testID="com.usereserva:id/menu_button_account"
                onPress={() => {
                  if (profile?.email) {
                    navigation.navigate('Profile');
                    return;
                  }

                  navigation.navigate('Login', { comeFrom: 'Profile' });
                }}
                title={profile?.email ? `Olá, ${profile?.firstName || profile?.email}` : 'Acessar Conta'}
              />

              <FixedMenuItem
                iconName="Heart"
                testID="com.usereserva:id/menu_button_favorites"
                title="Favoritos"
                onPress={() => navigation.navigate('WishList')}
              />

              <FixedMenuItem
                iconName="Message"
                testID="com.usereserva:id/menu_button_callcenter"
                title="Central de Ajuda"
                onPress={() => navigateFromMenu('HelpCenter')}
              />

              <FixedMenuItem
                iconName="Pin"
                testID="com.usereserva:id/menu_button_stores"
                title="Lojas"
                onPress={() => Linking.openURL('https://whts.co/reserva')}
              />

              <FixedMenuItem
                iconName="PrivacyPolicy"
                testID="com.usereserva:id/menu_button_privacy"
                title="Política de Privacidade"
                onPress={() => navigateFromMenu('PrivacyPolicy')}
              />
            </Animatable.View>
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
