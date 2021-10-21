import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { Linking, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  Divider,
  Icon,
  SearchBar,
  theme,
  Typography,
} from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import {
  categoriesQuery,
  CategoryQuery,
} from '../../../store/ducks/categories/types';
import { profileQuery } from '../../../store/ducks/profile/types';
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

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
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
      <TouchableOpacity onPress={() => onPress(index)}>
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
                  navigation.navigate('ProductCatalog', {
                    facetInput,
                    referenceId: item.referenceId,
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
  onPress: Function;
  underline: boolean;
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
  const { cookie } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile,
    refetch,
  } = useQuery(profileQuery);
  const [profile, setProfile] = useState<Profile>();

  const { loading, error, data } = useQuery(categoriesQuery, {
    context: { clientName: 'contentful' },
  });

  const categoryItems =
    data?.appMenuCollection.items[0].itemsCollection.items || [];

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
  }, [data]);

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
            </Animatable.View>
          )}
          <Box mt="xs" alignItems="center">
            <Typography
              color="neutroFrio2"
              fontFamily="nunitoRegular"
              fontSize={11}
            >
              Versão {DeviceInfo.getVersion()}
            </Typography>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
