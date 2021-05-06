import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Avatar,
  TextField,
  Icon,
  Checkbox,
} from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const EditProfile: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "João da Silva",
    email: "joao@email.com",
    cpf: "123.456.789-10",
    password: "*****",
    birth: "01/02/1983",
    phone: "01/02/1983",
    sendNotification: false,
  });

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box alignItems={"center"}>
            <Avatar
              buttonEdit={true}
              onPress={() => {
                console.log("okx");
              }}
            ></Avatar>

            <Button
              inline
              onPress={() => {
                navigation.navigate("EditPassword");
              }}
              title="Alterar senha"
            >
              <Typography
                style={{ textDecorationLine: "underline" }}
                fontSize="12px"
                fontFamily="nunitoRegular"
              >
                Alterar senha
              </Typography>
            </Button>
          </Box>

          <Box mt={"xxxs"}>
            <Box mb={"nano"}>
              <TextField
                label={"Digite seu nome completo"}
                value={data.name}
                onChangeText={(text) => {
                  setData({ ...data, ...{ name: text } });
                }}
                iconRight={
                  <Box ml="nano">
                    <Icon
                      color="preto"
                      name="Check"
                      size={18}
                      marginX="micro"
                    ></Icon>
                  </Box>
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                label={"Digite seu e-mail"}
                value={data.email}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
                iconRight={
                  <Box ml="nano">
                    <Icon
                      color="preto"
                      name="Check"
                      size={18}
                      marginX="micro"
                    ></Icon>
                  </Box>
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                keyboardType="number-pad"
                label={"Digite seu CPF/CNPJ"}
                value={data.cpf}
                maskType={data.cpf.length > 13 ? "cnpj" : "cpf"}
                onChangeText={(text) => {
                  setData({ ...data, ...{ cpf: text } });
                }}
                iconRight={
                  <Box ml="nano">
                    <Icon
                      color="preto"
                      name="Check"
                      size={18}
                      marginX="micro"
                    ></Icon>
                  </Box>
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                label={"Digite sua senha"}
                value={data.password}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
                iconRight={
                  <Box ml="nano">
                    <Icon
                      color="preto"
                      name="EyeOff"
                      size={18}
                      marginX="micro"
                    />
                  </Box>
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                keyboardType="number-pad"
                label={"Digite sua data de nascimento"}
                value={data.birth}
                onChangeText={(text) => {
                  setData({ ...data, ...{ birth: text } });
                }}
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                maskType="cel-phone"
                label={"Telefone (opcional)"}
                value={data.phone}
                onChangeText={(text) => {
                  setData({ ...data, ...{ phone: text } });
                }}
              />
            </Box>

            <Box mb={"xs"} mt={"micro"} flexDirection="row">
              <Checkbox
                width={"100%"}
                checked={data.sendNotification}
                onCheck={() => {
                  setData({
                    ...data,
                    ...{ sendNotification: !data.sendNotification },
                  });
                }}
                optionName={
                  "Desejo receber e-mails com promoções das marcas Reserva."
                }
              />
            </Box>

            <Box
              mb={"nano"}
              justifyContent={"space-between"}
              flexDirection="row"
            >
              <Box width={1 / 2} paddingRight="nano">
                <Button
                  title="CANCELAR"
                  variant={"primarioEstreitoOutline"}
                  inline={true}
                ></Button>
              </Box>
              <Box paddingLeft="nano" width={1 / 2}>
                <Button
                  title="SALVAR"
                  variant={"primarioEstreito"}
                  inline={true}
                ></Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
