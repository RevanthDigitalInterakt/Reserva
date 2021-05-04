import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";
import ItemList from "../Components/ItemList";

export const MenuProfile: React.FC<{}> = ({ route, navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <Box flex={1} backgroundColor="white">
      <TopBarDefault />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"}>
            <Typography variant="tituloSessoes">
              Perfil
            </Typography>
          </Box>
          <Typography variant="subtituloSessoes">
            Bem-vindo, João.
          </Typography>

          <Box mt={"xxxs"}>
            <ItemList
              title={"Meus pedidos"}
              descr={"Acompanhe seus pedidos"}
              icon={"Handbag"}
              onPress={() => {
                navigation.navigate("OrderList");
              }}
            />

            <ItemList
              title={"Favoritos"}
              descr={"Veja os produtos que você curtiu"}
              icon={"Heart"}
              onPress={() => {
                navigation.navigate("WishList");
              }}
            />

            <ItemList
              title={"Meus dados"}
              descr={"Visualize e edite suas informações"}
              icon={"Profile"}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            />

            <ItemList
              title={"Meus cartões"}
              descr={"Consulte e adicione cartões de crédito"}
              icon={"Card"}
              onPress={() => {
                navigation.navigate("ListCards");
              }}
            />

            <ItemList
              title={"Meus endereços"}
              descr={"Consulte e adicione seus endereços"}
              icon={"Pin"}
              onPress={() => {
                navigation.navigate("AddressList");
              }}
            />

            <ItemList
              title={"Alterar senha"}
              descr={"Altere a senha da sua conta"}
              icon={"Lock"}
              onPress={() => {
                navigation.navigate("EditPassword");
              }}
            />

            <ItemList
              title={"Notificações"}
              descr={"Mantenha-se informado sobre as novidades"}
              icon={"Bell"}
              onPress={() => {
                navigation.navigate("NotificationProfile");
              }}
            />

            <Box marginY={"xs"} justifyContent={"flex-end"}>
              <Button
                title="LOGOUT"
                variant={"primarioEstreitoOutline"}
              ></Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
