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
import { useQuery } from '@apollo/client'
import { Profile, ProfileState, profileQuery, ProfileQuery } from "../../../store/ducks/profile/types";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const EditProfile: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const [userData, setData] = useState<ProfileQuery>({
    userId: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    document: "",
    birthDate: "",
    homePhone: "",

  });
  const { loading, error, data } = useQuery(profileQuery);
  console.log('datasdatas', userData)
  useEffect(() => {
    setData({
      userId: data?.profile.userId,
      firstName: data?.profile.firstName,
      lastName: data?.profile.lastName,
      fullName: `${data?.profile.firstName} ${data?.profile.lastName}`,
      email: data?.profile.email,
      document: data?.profile.document,
      birthDate: data?.profile.birthDate,
      homePhone: data?.profile.homePhone
    });
  }, [data]);

  const updateUserData = () => {
    navigation.goBack();
  }
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
                  value={userData?.fullName}
                  onChangeText={(text) => {
                    const newFullName = userData.fullName = text
                    const fistName = newFullName.split(' ').slice(0, 1).join(' ');
                    const lastName = newFullName.split(' ').slice(1).join(' ');
                    setData(
                      {
                        ...userData,
                        firstName: fistName,
                        lastName: lastName
                      });
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
                  value={userData.email}
                  onChangeText={(text) => {
                    setData({ ...userData, ...{ email: text } });
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
                  value={userData.document}
                  maskType={"cpf"}
                  onChangeText={(text) => {
                    setData({ ...userData, ...{ userData: text } });
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
                  value={userData.birthDate}
                  onChangeText={(text) => {
                    setData({ ...userData, ...{ birthDate: text } });
                  }}
                />
              </Box>

              <Box mb={"nano"}>
                <TextField
                  maskType="cel-phone"
                  label={"Telefone (opcional)"}
                  value={userData.homePhone}
                  onChangeText={(text) => {
                    setData({ ...userData, ...{ homePhone: text } });
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
                    onPress={() => { updateUserData }}
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
