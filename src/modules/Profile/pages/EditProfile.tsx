import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Avatar, TextField, Icon, Checkbox } from "reserva-ui";
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
    <Box flex={1}>
      <TopBarBackButton />

      <ScrollView>
        <Box alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box alignItems={"center"}>
            <Avatar
              buttonEdit={true}
              onPress={() => {
                console.log("okx");
              }}
            ></Avatar>
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
                    <Icon color="neutroFrio2" name="Check" size={25} />
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
                    <Icon color="neutroFrio2" name="Check" size={25} />
                  </Box>
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                label={"Digite seu CPF"}
                value={data.cpf}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
                iconRight={
                  <Box ml="nano">
                    <Icon color="neutroFrio2" name="Check" size={25} />
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
                    <Icon color="neutroFrio2" name="EyeOff" size={25} />
                  </Box>
                }
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                label={"Digite sua data de nascimento"}
                value={data.birth}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
              />
            </Box>

            <Box mb={"nano"}>
              <TextField
                label={"Telefone (opcional)"}
                value={data.phone}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
              />
            </Box>

            <Box mb={"xs"} mt={"micro"} flexDirection="row">
              <Checkbox width={"100%"} checked={data.sendNotification} onCheck={() => {
                  setData({ ...data, ...{ sendNotification: (!data.sendNotification) } });
              }} optionName={"Desejo receber e-mails com promoções das marcas Reserva."} />
            </Box>

            <Box mb={"nano"} justifyContent={'space-between'} flexDirection='row'>
              <Button title='CANCELAR' variant={"primarioEstreitoOutline"}></Button>

              <Button title='SALVAR' variant={"primarioEstreito"}></Button>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
