import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Avatar, TextField, Icon, Checkbox } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const EditPassword: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password: "*****",
    password_confirm: "*****",
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

      <ScrollView>
        <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={'micro'} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>Alterar senha</Typography>
          </Box>

          <Box mt={"xxxs"}>        
            <Box mb={"nano"}>
              <TextField
                label={"Digite sua nova senha"}
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
                label={"Repita a senha"}
                value={data.password_confirm}
                onChangeText={(text) => {
                  setData({ ...data, ...{ email: text } });
                }}
              />
            </Box>


            <Box bottom={0} justifyContent={'flex-end'}>
              <Button title='CONFIRMAR' variant={"primarioMaior"}></Button>
            </Box>
            
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
