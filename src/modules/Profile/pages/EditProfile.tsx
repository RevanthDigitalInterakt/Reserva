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
import { addHours, format, parseISO } from "date-fns";
import { ApplicationState } from "../../../store";
import { profileLoad } from "../../../store/ducks/profile/actions";
import { useQuery, useMutation } from "@apollo/client";
import {
  Profile,
  ProfileState,
  profileQuery,
  ProfileQuery,
  profileMutation,
  ProfileCustomFieldsInput,
} from "../../../store/ducks/profile/types";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { subscribeNewsLetter } from "../../../graphql/profile/newsLetter";

export const EditProfile: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const [subscribed, setSubscribed] = useState(false);
  const [userData, setUserData] = useState<ProfileQuery>({
    userId: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    document: "",
    birthDate: "",
    homePhone: "",
  });
  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [
    updateNewsLetter,
    { data: NewsLetterData, loading: newsLetterLoading },
  ] = useMutation(subscribeNewsLetter);

  const [updateUserdata, { data: updateData, loading: updateLoading }] =
    useMutation(profileMutation);

  useEffect(() => {
    if (data) {
      console.log(data);
      setUserData({
        userId: data?.profile?.userId,
        firstName: data?.profile?.firstName || "",
        lastName: data?.profile?.lastName || "",
        fullName: data?.profile?.firstName
          ? `${data?.profile?.firstName} ${data?.profile?.lastName}`
          : "",
        email: data?.profile?.email || "",
        document: data?.profile?.document || "",
        birthDate:
          data?.profile?.birthDate &&
          format(
            addHours(new Date(Date.parse(data.profile.birthDate)), 3),
            "dd/MM/yyyy"
          ),
        homePhone: data?.profile?.homePhone || "",
      });
      setSubscribed(
        data?.profile?.customFields.find(
          (x: any) => x.key == "isNewsletterOptIn"
        ).value === "true" || subscribed
      );
    }
  }, [data]);

  useEffect(() => {
    if (updateData) {
      refetch();

      if (!loading) navigation.goBack();
    }
  }, [updateData]);

  useEffect(() => {
    refetch();
  }, []);

  const saveUserData = () => {
    const splittedBirthDate = userData.birthDate?.split("/");
    const [firstName, ...rest] = userData.fullName.trim().split(" ");
    const lastName = rest.join(" ");
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: userData.email,
      document: userData.document,
      birthDate: splittedBirthDate.reverse().join("-"),
      homePhone: userData.homePhone,
    };

    const newsletterCustomField: ProfileCustomFieldsInput = {
      key: "isNewsletterOptIn",
      value: `${subscribed}`,
    };
    updateUserdata({
      variables: {
        fields: user,
        customFields: [newsletterCustomField],
      },
    });
  };

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
        <TopBarBackButton
          loading={loading || updateLoading || newsLetterLoading}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
        >
          <Box alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"} pb="xxl">
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
                  navigation.navigate("EditPassword", {
                    email: userData.email,
                  });
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
              <Box mb={"xxs"}>
                <TextField
                  label="Digite seu nome completo"
                  value={userData.fullName}
                  onChangeText={(text) => {
                    // const newFullName = (userData.fullName = text);
                    // const firstName = newFullName
                    //   .split(' ')
                    //   .slice(0, 1)
                    //   .join(' ');
                    // const lastName = newFullName.split(' ').slice(1).join(' ');
                    setUserData({
                      ...userData,
                      fullName: text,
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

              <Box mb={"xxs"}>
                <TextField
                  label={"Digite seu e-mail"}
                  value={userData.email}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ email: text } });
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

              <Box mb={"xxs"}>
                <TextField
                  keyboardType="number-pad"
                  label={"Digite seu CPF/CNPJ"}
                  value={userData.document}
                  maskType={"cpf"}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ document: text } });
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

              <Box mb={"xxs"}>
                <TextField
                  keyboardType="number-pad"
                  label={"Digite sua data de nascimento"}
                  maskType={"custom"}
                  maskOptions={{
                    mask: "99/99/9999",
                  }}
                  value={userData.birthDate}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ birthDate: text } });
                  }}
                />
              </Box>

              <Box mb={"nano"}>
                <TextField
                  maskType="cel-phone"
                  label={"Telefone (opcional)"}
                  value={userData.homePhone}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ homePhone: text } });
                  }}
                />
              </Box>

              <Box mb={"xs"} mt={"micro"} flexDirection="row">
                <Checkbox
                  color="dropDownBorderColor"
                  selectedColor="preto"
                  width={"100%"}
                  // checked={data?.receiveEmail === "yes"}
                  checked={subscribed}
                  onCheck={async () => {
                    const { data } = await updateNewsLetter({
                      variables: {
                        email: userData.email,
                        isNewsletterOptIn: !subscribed,
                      },
                    });
                    if (data["subscribeNewsletter"]) setSubscribed(!subscribed);
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
                    onPress={saveUserData}
                    disabled={updateLoading}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
