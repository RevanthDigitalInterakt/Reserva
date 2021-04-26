import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Avatar, TextField, Icon } from "reserva-ui";
import { textAlign } from "styled-system";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const EditProfile: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "João da Silva",
    email: "João da Silva",
  });

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <Box flex={1}>
      <TopBarBackButton />

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
                console.log({ ...data, ...{ name: text } });
                setData({ ...data, ...{ name: text } });
              }}
              iconRight={
                <Box ml="nano">
                  <Icon color="neutroFrio2" name="Check" size={25} />
                </Box>
              }
            />
          </Box>

          <TextField
            label={"Digite seu e-mail"}
            value={data.email}
            onChangeText={(text) => {
              console.log({ ...data, ...{ email: text } });
              setData({ ...data, ...{ email: text } });
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
