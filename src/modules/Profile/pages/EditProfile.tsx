import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
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
import { ApplicationState } from "../../../store";
import { profileLoad } from "../../../store/ducks/profile/actions";
import { Profile, ProfileState } from "../../../store/ducks/profile/types";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const EditProfile: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState<Profile | undefined>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    receiveEmail: "",
    gender: "",
    fullName: "",
    phone: "",
    ddd: "",
    rsvCPF: "",
    rsvBirthDate: "",
    rsvPhoneNumber: "",
  });

  const { profile } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    setData(profile.data);
  });

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={80}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                  value={data?.fullName}
                  onChangeText={(text) => {
                    setData({ ...data, fullName: text });
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
                  value={data?.email}
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
                  value={data?.rsvCPF}
                  maskType={"cpf"}
                  onChangeText={(text) => {
                    setData({ ...data, ...{ rsvCPF: text } });
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
                  value={data?.password}
                  onChangeText={(text) => {
                    setData({ ...data, ...{ password: text } });
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
                  value={data?.rsvBirthDate}
                  onChangeText={(text) => {
                    setData({ ...data, ...{ rsvBirthDate: text } });
                  }}
                />
              </Box>

              <Box mb={"nano"}>
                <TextField
                  maskType="cel-phone"
                  label={"Telefone (opcional)"}
                  value={data?.rsvPhoneNumber}
                  onChangeText={(text) => {
                    setData({ ...data, ...{ rsvPhoneNumber: text } });
                  }}
                />
              </Box>

              <Box mb={"xs"} mt={"micro"} flexDirection="row">
                <Checkbox
                  color="dropDownBorderColor"
                  selectedColor="preto"
                  width={"100%"}
                  checked={data?.receiveEmail === "yes"}
                  onCheck={() => {
                    const value = data?.receiveEmail === "yes" ? "no" : "yes";
                    setData({
                      ...data,
                      ...{ receiveEmail: value },
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
                    onPress={() => {
                      navigation.goBack();
                    }}
                  ></Button>
                </Box>
                <Box paddingLeft="nano" width={1 / 2}>
                  <Button
                    title="SALVAR"
                    variant={"primarioEstreito"}
                    inline={true}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  ></Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
