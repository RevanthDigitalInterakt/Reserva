import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Divider,
  Icon,
  theme,
  Typography,
} from '@danilomsou/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../../context/AuthContext';
import { useContentfull } from '../../../context/ContentfullContext';
import { categoriesQuery } from '../../../graphql/categories/categoriesQuery';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { RemoteConfigService } from '../../../shared/services/RemoteConfigService';
import { TopBarMenu } from '../components/TopBarMenu';

interface IBreadCrumbs {
  title: string;
}

interface IMenuSubItem {
  title: string;
  onPress?: Function;
  highlight?: boolean;
}
interface IMenuItem {
  title: string;
  subItemList: Subcategory;
  opened?: boolean;
  onPress?: Function;
  index?: number;
  highlight?: boolean;
}

const Breadcrumbs: React.FC<IBreadCrumbs> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <Button onPress={() => navigation.navigate('Home')} alignSelf="flex-start">
      <Box
        alignSelf="flex-start"
        paddingX="micro"
        paddingTop="nano"
        alignItems="center"
        flexDirection="row"
      >
        <Icon name="MenuArrowBack" color="preto" size={22} />
        <Box paddingX="micro">
          <Typography fontSize={12} fontFamily="nunitoRegular">
            Pagina Inicial
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

const MenuSubItem: React.FC<IMenuSubItem> = ({ title, onPress, highlight }) => {
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
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();

        setClickMenu(true);
      }}
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
};

const MenuItem: React.FC<IMenuItem> = ({
  title,
  opened,
  onPress,
  index,
  subItemList,
  highlight,
}) => {
  // console.log(subItemList)
  const navigation = useNavigation();
  return (
    <Box>
      <TouchableOpacity
        onPress={() => {
          onPress(index);
        }}
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
            <Icon
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
          <Animatable.View animation="fadeIn">
            {subItemList.items.map((item, index) => (
              <MenuSubItem
                key={index}
                highlight={item.highlight}
                title={item.name}
                onPress={() => {
                  const facetInput: any[] = [];
                  const [subType, subcategories] = item.referenceId.split(':');

                  if (subType == 'category') {
                    subcategories.split('|').forEach((sub) => {
                      if (sub !== '') {
                        facetInput.push({
                          key: 'c',
                          value: sub,
                        });
                      }
                    });
                  } else {
                    facetInput.push({
                      key: 'productClusterIds',
                      value: subcategories,
                    });
                  }
                  console.log('itemReferenceId', item.referenceId, facetInput);
                  navigation.navigate('ProductCatalog', {
                    facetInput,
                    referenceId: item.referenceId,
                    title: title,
                  });
                }}
              />
            ))}
          </Animatable.View>
        </>
      )}
    </Box>
  );
};

export const FixedMenuItem: React.FC<{
  iconName: string;
  title: JSX.Element;
  onPress?: Function;
  underline?: boolean;
  disabled?: boolean;
}> = ({ iconName, title, onPress, disabled, underline }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <Box
      justifyContent="flex-start"
      alignItems="center"
      marginY="micro"
      flexDirection="row"
      marginX="xxxs"
    >
      <Icon name={iconName} color="preto" size={18} />
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
  mkt?: boolean;
}
type Profile = {
  birthDate: string | null;
  document: string;
  email: string;
  firstName: string;
  homePhone: string;
  lastName: string;
  userId: string;
};

export const Menu: React.FC<{}> = () => {
  const navigation = useNavigation();
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const { cookie } = useAuth();
  // const { cep } = useRegionalSearch()
  const [cep, setCep] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const [screenRegionalizationActive, setScreenRegionalizationActive] =
    useState(false);
  const [resetGoBackButton, setResetGoBackButton] = useState<boolean>(false);

  const [{ dataProfile, refetch }, setProfileData] = useState({
    dataProfile: null,
    refetch: () => {},
  });

  const [getProfile] = useLazyQuery(profileQuery);

  const [{ loading, data }, setCategoriesData] = useState({
    loading: true,
    data: null,
  });

  const [getCategories] = useLazyQuery(categoriesQuery, {
    context: { clientName: 'contentful' },
  });

  useEffect(() => {
    getCategories().then((reponse) =>
      setCategoriesData({
        loading: false,
        data: reponse.data,
      })
    );
    getProfile().then((response) =>
      setProfileData({
        dataProfile: response.data,
        refetch: response.refetch,
      })
    );
  }, []);

  const getIsScreenRegionalizationActive = async () => {
    const cashback_in_store = await RemoteConfigService.getValue<boolean>(
      'FEATURE_REGIONALIZATION'
    );

    setScreenRegionalizationActive(cashback_in_store);
  };

  useEffect(() => {
    getIsScreenRegionalizationActive();
  }, []);

  const categoryItems =
    data?.appMenuCollection.items[0].itemsCollection.items || [];

  const getCep = async () => {
    const value = await AsyncStorage.getItem('RegionalSearch:cep'); //.then((x) => (regionId = x));
    console.log('value', value);
    setCep(value);
  };

  useEffect(() => {
    getCep();
  }, []);

  useEffect(() => {
    setCategories(
      categoryItems.map((item: any) => ({
        ...item,
        name: item.name,
        children: item.childCategoryCollection,
        opened: false,
        highlight: false,
      }))
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

  useEffect(() => {
    if (dataProfile) {
      refetch();
      const { profile } = dataProfile;
      if (profile) {
        const { profile } = dataProfile;
        setProfile(profile);
      }
    }
  }, [dataProfile]);

  const openMenuItem = (index: number) => {
    setCategories(
      categories.map((item, i) => ({
        ...item,
        opened: index === i && !item.opened,
      }))
    );
  };

  const getTestEnvironment = async () => {
    const res = await AsyncStorage.getItem('isTesting');

    if (res === 'true') {
      setIsTesting(true);
    } else {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    getTestEnvironment();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
      <Box flex={1} backgroundColor="backgroundApp">
        <TopBarMenu loading={loading} />
        <ScrollView>
          <Box paddingX="nano" paddingTop="micro" />
          <Breadcrumbs title="Página Inicial" />
          <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />
          {categories && (
            <Animatable.View animation="fadeIn">
              {categories.map((item, index) => (
                !item.mkt ? (
                  <MenuItem
                  key={index}
                  highlight={item.highlight}
                  subItemList={item.children}
                  onPress={openMenuItem}
                  opened={item.opened}
                  index={index}
                  title={item.name}
                />
                ) : null
              ))}
              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />
              {screenRegionalizationActive && (
                <FixedMenuItem
                  iconName="Pin"
                  title={
                    <Typography
                      alignSelf="flex-end"
                      color="preto"
                      fontSize={15}
                      fontFamily="nunitoBold"
                    >
                      {`${cep != null ? cep : 'Inserir'} ou alterar CEP`}
                    </Typography>
                  }
                  onPress={() => {
                    navigation.navigate('ChangeRegionalization');
                  }}
                />
              )}
              <FixedMenuItem
                iconName="Profile"
                disabled={!!cookie}
                title={
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    {cookie ? (
                      <Typography
                        onPress={() => {
                          navigation.navigate('Profile');
                        }}
                      >
                        Olá, {profile?.firstName || profile?.email}
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
                }
              />
              <FixedMenuItem
                iconName="Heart"
                title={
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Favoritos
                  </Typography>
                }
                onPress={() => {
                  navigation.navigate('WishList');
                }}
              />
              <FixedMenuItem
                iconName="Message"
                title={
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Central de Ajuda
                  </Typography>
                }
                onPress={() => {
                  navigation.navigate('HelpCenter');
                }}
              />
              <FixedMenuItem
                iconName="Pin"
                title={
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Lojas
                  </Typography>
                }
                onPress={() => {
                  Linking.openURL('https://whts.co/reserva');
                }}
              />
              <FixedMenuItem
                iconName="PrivacyPolicy"
                title={
                  <Typography
                    alignSelf="flex-end"
                    color="preto"
                    fontSize={15}
                    fontFamily="nunitoBold"
                  >
                    Política de Privacidade
                  </Typography>
                }
                onPress={() => {
                  navigation.navigate('PrivacyPolicy');
                }}
              />
            </Animatable.View>
          )}
          <Box mt="xs" alignItems="center">
            <Typography
              color="neutroFrio2"
              fontFamily="nunitoRegular"
              fontSize={11}
            >
              Versão {DeviceInfo.getVersion()}
              {isTesting ? ' - Teste' : ''}
            </Typography>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
