import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Button,
  Divider,
  Icon,
  SearchBar,
  TextField,
  theme,
  Typography,
} from "reserva-ui";
import { TopBarMenu } from "../components/TopBarMenu";
import * as Animatable from "react-native-animatable";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

interface IBreadCumbs {
  title: string;
}

interface IMenuSubItem {
  title: string;
  onPress?: Function;
  highlight?: boolean;
}
interface IMenuItem {
  title: string;
  subItemList: IMenuSubItem[];
  opened?: boolean;
  onPress?: Function;
  index?: number;
  highlight?: boolean;
}

const Breadcumbs: React.FC<IBreadCumbs> = ({ title }) => {
  return (
    <Box
      paddingX="micro"
      paddingTop="xxxs"
      alignItems="center"
      flexDirection="row"
    >
      <Icon
        style={{ transform: [{ rotate: "180deg" }] }}
        name="RightArrow"
        color="preto"
        size={22}
      />
      <Box paddingX="micro">
        <Typography
          fontSize={12}
          fontFamily="nunitoRegular"
          fontWeight="normal"
        >
          Pagina Inicial
        </Typography>
      </Box>
    </Box>
  );
};

const MenuSubItem: React.FC<IMenuSubItem> = ({ title, onPress, highlight }) => {
  return (
    <Box
      bg="backgroundMenuOpened"
      justifyContent="space-between"
      paddingY="micro"
      flexDirection="row"
      paddingX="xxs"
    >
      <Typography
        fontSize={13}
        fontFamily="nunitoRegular"
        fontWeight={highlight ? "bold" : "normal"}
      >
        {title}
      </Typography>
    </Box>
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
            color={highlight ? "vermelhoAlerta" : "preto"}
            fontSize={13}
            fontFamily="nunitoBold"
            fontWeight="bold"
          >
            {title.toUpperCase()}
          </Typography>
          <Box>
            <Icon
              style={{ transform: [{ rotate: opened ? "90deg" : "0deg" }] }}
              name="ChevronRight"
              color="preto"
              size={16}
            />
          </Box>
        </Box>
      </TouchableOpacity>
      {opened && (
        <>
          <Divider variant="fullWidth" marginTop="micro" />
          <Animatable.View animation="fadeIn">
            {subItemList.map((item) => {
              return (
                <MenuSubItem
                  highlight={item.highlight}
                  title={item.title}
                  onPress={() => {}}
                />
              );
            })}
          </Animatable.View>
        </>
      )}
    </Box>
  );
};

export const FixedMenuItem: React.FC<{
  iconName: string;
  title: string;
  onPress: Function;
}> = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity>
      <Box
        justifyContent="flex-start"
        alignItems="flex-end"
        marginY="micro"
        flexDirection="row"
        marginX="xxxs"
      >
        <Icon mb="quarck" name={iconName} color="preto" size={18} />
        <Box marginX="micro">
          <Typography
            alignSelf="flex-end"
            color="preto"
            fontSize={15}
            fontFamily="nunitoBold"
            fontWeight="bold"
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
export const Menu: React.FC<{}> = () => {
  const navigation = useNavigation();

  const [mockSubItemList] = useState([
    { title: "Roupas", highlight: true },
    { title: "Ver tudo" },
    { title: "Camisetas" },
    { title: "Camisas" },
    { title: "Polos" },
    { title: "Casacos" },
    { title: "Bermudas" },
    { title: "Calças" },
    { title: "Cuecas" },
    { title: "Sungas" },
  ]);
  const [mockItens, setMockItens] = useState([
    {
      title: "Novidades",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Masculino",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Infantil",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Calçados",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Acessórios",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Crie sua Camiseta",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Parcerias",
      opened: false,
      subItemList: mockSubItemList,
    },
    {
      title: "Ofertas",
      opened: false,
      subItemList: mockSubItemList,
      highlight: true,
    },
    {
      title: "Sobre a Reserva",
      opened: false,
      subItemList: mockSubItemList,
    },
  ]);

  const openMenuItem = (index: number) => {
    let itens: IMenuItem[] = JSON.parse(JSON.stringify(mockItens));

    if (itens[index].opened) {
      itens[index].opened = false;
      setMockItens(itens);
      return;
    }

    itens.forEach((menuItem, itemIndex) => {
      if (menuItem.opened) {
        menuItem.opened = false;
      }
    });

    itens[index].opened = !itens[index].opened;

    setMockItens(itens);
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
      <Box flex={1} backgroundColor="backgroundApp">
        <TopBarMenu />
        <ScrollView>
          <Box paddingX="nano" paddingTop="micro">
            <SearchBar height={36} placeholder="Buscar" />
          </Box>
          <Breadcumbs title="Página Inicial" />
          <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />
          {mockItens.map((item, index) => {
            return (
              <MenuItem
                highlight={item.highlight}
                subItemList={item.subItemList}
                onPress={openMenuItem}
                opened={item.opened}
                index={index}
                title={item.title}
              />
            );
          })}
          <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />
          <FixedMenuItem
            iconName="Profile"
            title="Acessar Conta ou Cadastre-se"
            onPress={() => {}}
          ></FixedMenuItem>
          <FixedMenuItem
            iconName="Heart"
            title="Favoritos"
            onPress={() => {}}
          ></FixedMenuItem>
          <FixedMenuItem
            iconName="Message"
            title="Central de Ajuda"
            onPress={() => {}}
          ></FixedMenuItem>
          <FixedMenuItem
            iconName="Pin"
            title="Lojas"
            onPress={() => {}}
          ></FixedMenuItem>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
