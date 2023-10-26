import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
  BackHandler,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { categoriesQuery } from '../../../graphql/categories/categoriesQuery';
import { RemoteConfigService } from '../../../shared/services/RemoteConfigService';
import { TopBarMenu } from '../components/TopBarMenu';
import { slugify } from '../../../utils/slugify';
import testProps from '../../../utils/testProps';
import EventProvider from '../../../utils/EventProvider';
import { defaultBrand } from '../../../utils/defaultWBrand';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Box/Box';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { Divider } from '../../../components/Divider/Divider';
import { theme } from '../../../base/usereservappLegacy/theme';

interface IMenuSubItem {
  title: string;
  onPress?: Function;
  highlight?: boolean;
  testID: string;
}

interface IMenuItem {
  title: string;
  subItemList: Subcategory;
  opened?: boolean;
  onPress?: Function;
  index?: number;
  highlight?: boolean;
}

function Breadcrumbs() {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => navigation.navigate('Home')}
      alignSelf="flex-start"
      testID="com.usereserva:id/button_menu_initial"
    >
      <Box
        testID="com.usereserva:id/menu_initial_container"
        alignSelf="flex-start"
        paddingX="micro"
        paddingTop="nano"
        alignItems="center"
        flexDirection="row"
      >
        <IconLegacy name="MenuArrowBack" color="preto" size={22} />
        <Box paddingX="micro">
          <Typography fontSize={12} fontFamily="nunitoRegular">
            Pagina Inicial
          </Typography>
        </Box>
      </Box>
    </Button>
  );
}

function MenuSubItem({
  title, onPress, highlight, testID,
}: IMenuSubItem) {
  const navigation = useNavigation();
  const [clickMenu, setClickMenu] = useState<boolean>(false);

  useEffect(() => {
    if (clickMenu) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.dispatch(StackActions.popToTop());

        navigation.navigate('Menu');

        return true;
      });
    }
  }, [clickMenu]);

  useEffect(() => {
    setClickMenu(false);
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }

        setClickMenu(true);
      }}
      {...testProps(testID)}
    >
      <Box
        bg="backgroundMenuOpened"
        justifyContent="space-between"
        paddingY="micro"
        flexDirection="row"
        paddingX="xxs"
      >
        <Typography
          fontSize={13}
          fontFamily={highlight ? 'nunitoBold' : 'nunitoRegular'}
        >
          {title}
        </Typography>
      </Box>
    </TouchableOpacity>
  );
}

function MenuItem({
  title,
  opened,
  onPress,
  index: indexProp,
  subItemList,
  highlight,
}: IMenuItem) {
  const navigation = useNavigation();

  return (
    <Box>
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress(indexProp);
          }
        }}
        {...testProps(`com.usereserva:id/menu_button_${slugify(title)}`)}
      >
        <Box
          justifyContent="space-between"
          marginY="micro"
          flexDirection="row"
          marginX="xxxs"
        >
          <Typography
            color={highlight ? 'vermelhoAlerta' : 'preto'}
            fontSize={13}
            fontFamily="nunitoBold"
          >
            {title.toUpperCase()}
          </Typography>
          <Box>
            <IconLegacy
              style={{ transform: [{ rotate: opened ? '90deg' : '0deg' }] }}
              name="ChevronRight"
              color="preto"
              size={12}
            />
          </Box>
        </Box>
      </TouchableOpacity>
      {opened && (
        <>
          <Divider variant="fullWidth" marginTop="micro" />
          <View
            {...testProps('com.usereserva:id/animation_container')}
          >
            {subItemList?.items?.map((item, index) => (
              <MenuSubItem
                {...testProps(`com.usereserva:id/menu_sub_item_${index}`)}
                key={index}
                highlight={item.highlight}
                title={item.name}
                testID={`submenu_button_${slugify(item.name)}`}
                onPress={() => {
                  const facetInput: any[] = [];
                  const [subType, subcategories] = item?.referenceId?.split(':') || [undefined, undefined];

                  if (subType === 'category') {
                    if (subcategories) {
                      subcategories.split('|').forEach((sub) => {
                        if (sub !== '') {
                          facetInput.push({
                            key: 'c',
                            value: sub,
                          });
                        }
                      });
                    }
                  } else {
                    facetInput.push({
                      key: 'productClusterIds',
                      value: subcategories,
                    });
                  }
                  navigation.navigate('ProductCatalog', {
                    facetInput,
                    referenceId: item.referenceId,
                    title,
                    comeFrom: 'Menu',
                    indexMenuOpened: indexProp,
                  });
                }}
              />
            ))}
          </View>
        </>
      )}
    </Box>
  );
}

export const FixedMenuItem: React.FC<{
  iconName: string;
  title: JSX.Element;
  onPress?: Function;
  disabled?: boolean;
  testID: string;
}> = ({
  iconName, title, onPress, disabled, testID,
}) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} {...testProps(testID)}>
    <Box
      justifyContent="flex-start"
      alignItems="center"
      marginY="micro"
      flexDirection="row"
      marginX="xxxs"
    >
      <IconLegacy name={iconName} color="preto" size={18} />
      <Box marginX="micro">{title}</Box>
    </Box>
  </TouchableOpacity>
);

export interface Subcategory {
  items: {
    name: string;
    referenceId: string;
    highlight: boolean;
  }[];
}

export interface Category {
  name: string;
  children: Subcategory[];
  opened: boolean;
  highlight: boolean;
  referenceId: string;
}

export type MenuProps = StackScreenProps<RootStackParamList, 'Menu'>;

export function Menu({ route }: MenuProps) {
  const indexOpened = route?.params?.indexMenuOpened;
  const navigation = useNavigation();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [cep, setCep] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [screenRegionalizationActive, setScreenRegionalizationActive] = useState(false);
  const [resetGoBackButton, setResetGoBackButton] = useState<boolean>(false);
  const { getItem } = useAsyncStorageProvider();

  const { profile } = useAuthStore(['profile']);

  const [{ loading, data }, setCategoriesData] = useState({
    loading: true,
    data: null,
  });

  const [getCategories] = useLazyQuery(categoriesQuery, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    getCategories().then((response) => {
      setCategoriesData({
        loading: false,
        data: response.data,
      });
    });
  }, []);

  const getIsScreenRegionalizationActive = async () => {
    const cashback_in_store = await RemoteConfigService.getValue<boolean>(
      'FEATURE_REGIONALIZATION',
    );

    setScreenRegionalizationActive(cashback_in_store);
  };

  useEffect(() => {
    getIsScreenRegionalizationActive();
  }, []);

  const categoryItems = data?.appMenuCollection?.items[0]?.itemsCollection?.items || [];

  const getCep = async () => {
    const value = await AsyncStorage.getItem('RegionalSearch:cep');
    setCep(value);
  };

  useEffect(() => {
    getCep();
  }, []);

  useEffect(() => {
    setCategories(
      categoryItems.map((item: any, index: number) => ({
        ...item,
        name: item.name,
        children: item.childCategoryCollection,
        opened: indexOpened === index,
        highlight: false,
      })),
    );

    setResetGoBackButton(true);
  }, [data]);

  useEffect(() => {
    if (resetGoBackButton) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();

        return true;
      });
    }
  }, [resetGoBackButton]);

  const trackEventAccessedDepartmentDito = useCallback(async (openedCategories: string) => {
    const id = profile?.email
      ? await getItem('@Dito:userRef')
      : await AsyncStorage.getItem('@Dito:anonymousID');

    if (!openedCategories) return;

    EventProvider.sendTrackEvent('acessou-departamento', {
      id,
      action: 'acessou-departamento',
      data: {
        nome_departamento: openedCategories,
        origem: 'app',
      },
    });
  }, [getItem, profile?.email]);

  const openMenuItem = useCallback((index: number) => {
    const updatedCategories = categories.map((item, i) => ({
      ...item,
      opened: index === i && !item?.opened,
    }));
    setCategories(updatedCategories);
    const openedCategories = updatedCategories
      .filter((item) => item?.opened && item?.name)
      .map((item) => item.name)
      .join(',');
    trackEventAccessedDepartmentDito(openedCategories);
  }, [categories, trackEventAccessedDepartmentDito]);

  const getTestEnvironment = async () => {
    const res = await AsyncStorage.getItem('isTesting');

    if (res === 'true') {
      setIsTesting(true);
    } else {
      setIsTesting(false);
    }
  };

  const navigateFromMenu = (route: string) => {
    navigation.navigate(route, {
      comeFrom: 'Menu',
    });
  };

  useEffect(() => {
    getTestEnvironment();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }} {...testProps('com.usereserva:id/menu_container')}>
      <Box flex={1} backgroundColor="backgroundApp">
        <TopBarMenu loading={loading} />
        <ScrollView>
          <Box paddingX="nano" paddingTop="micro" />
          <Breadcrumbs />
          <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />
          {categories && (
            <View>
              {categories.map((item, index) => (
                <MenuItem
                  key={index}
                  highlight={item.highlight}
                  subItemList={item.children}
                  onPress={openMenuItem}
                  opened={item.opened}
                  index={index}
                  title={item.name}
                />
              ))}
              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />
              {screenRegionalizationActive && (
                <FixedMenuItem
                  iconName="Pin"
                  testID="com.usereserva:id/menu_button_cep"
                  title={(
                    <Typography
                      alignSelf="flex-end"
                      color="preto"
                      fontSize={15}
                      fontFamily="nunitoBold"
                    >
                      {`${cep != null ? cep : 'Inserir'} ou alterar CEP`}
                    </Typography>
                  )}
                  onPress={() => {
                    navigation.navigate('ChangeRegionalization');
                  }}
                />
              )}
              <FixedMenuItem
                iconName="Profile"
                disabled={!!profile?.email}
                testID="com.usereserva:id/menu_button_account"
                title={(
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    {profile?.email ? (
                      <Typography
                        onPress={() => {
                          navigation.navigate('Profile');
                        }}
                      >
                        Olá,
                        {' '}
                        {profile?.firstName || profile?.email}
                      </Typography>
                    ) : (
                      <Typography
                        onPress={() => {
                          navigation.navigate('Login', { comeFrom: 'Profile' });
                        }}
                      >
                        Acessar Conta
                      </Typography>
                    )}
                  </Typography>
                )}
              />
              <FixedMenuItem
                iconName="Heart"
                testID="com.usereserva:id/menu_button_favorites"
                title={(
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Favoritos
                  </Typography>
                )}
                onPress={() => {
                  navigation.navigate('WishList');
                }}
              />
              <FixedMenuItem
                iconName="Message"
                testID="com.usereserva:id/menu_button_callcenter"
                title={(
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Central de Ajuda
                  </Typography>
                )}
                onPress={() => {
                  navigateFromMenu('HelpCenter');
                }}
              />
              <FixedMenuItem
                iconName="Pin"
                testID="com.usereserva:id/menu_button_stores"
                title={(
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Lojas
                  </Typography>
                )}
                onPress={() => {
                  Linking.openURL('https://whts.co/reserva');
                }}
              />
              <FixedMenuItem
                iconName="PrivacyPolicy"
                testID="com.usereserva:id/menu_button_privacy"
                title={(
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Política de Privacidade
                  </Typography>
                )}
                onPress={() => {
                  navigateFromMenu('PrivacyPolicy');
                }}
              />
            </View>
          )}
          <Box mt="xs" alignItems="center">
            <Typography
              color="neutroFrio2"
              fontFamily="nunitoRegular"
              fontSize={11}
            >
              Versão
              {' '}
              {DeviceInfo.getVersion()}
              {isTesting ? ' - Teste' : ''}
            </Typography>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
