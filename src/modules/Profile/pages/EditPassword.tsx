import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { useMutation } from "@apollo/client";
import { profileMutationPassword } from "../../../store/ducks/profile/types";
import { FormikTextInput } from "../../../shared/componentes/FormikTextInput";

type Props = StackScreenProps<RootStackParamList, "EditPassword">;
export const EditPassword = ({ route }: Props) => {
  const { email } = route?.params;
  const navigation = useNavigation();
  const formRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [newPassword, { data: dataMutation, loading: loadingMutation }] =
    useMutation(profileMutationPassword);

  //acessa a função handleSubmit do formik
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [initialValues, setInitialValues] = useState({
    password: "",
    password_confirm: "",
    current_password: "",
  });

  const validation = Yup.object().shape({
    password: Yup.string().required(
      "Introduza uma senha segura, com no mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas e números."
    ),
    password_confirm: Yup.string()
      .required("Informe a senha novamente")
      .oneOf([Yup.ref("password"), null], "As senhas devem corresponder"),
    current_password: Yup.string().required("Informe sua senha atual"),
  });

  const changePassword = (password: string, current_password: string) => {
    newPassword({
      variables: {
        email: email,
        newPassword: password,
        currentPassword: current_password,
      },
    });
    navigation.goBack();
  };

  useEffect(() => { }, []);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton loading={loadingMutation} />
      <ScrollView>
        <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant="tituloSessoes">Alterar senha</Typography>
          </Box>

          <Box mt={"xxxs"}>
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              innerRef={formRef}
              onSubmit={(values) => {
                const { password, current_password } = values;
                changePassword(password, current_password);
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <Box mb={"micro"}>
                    <FormikTextInput
                      label={"Digite sua nova senha"}
                      secureTextEntry={showNewPassword}
                      field={"password"}
                      iconRight={
                        <Button
                          mr="xxxs"
                          onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ?
                            <Icon color="neutroFrio2" name="EyeOff" size={25} />
                            :
                            <Icon color="neutroFrio2" name="EyeOpen" size={25} />
                          }
                        </Button>
                      }
                    />
                  </Box>
                  <Box mb={"nano"}>
                    <FormikTextInput
                      label={"Repita a senha"}
                      field={"password_confirm"}
                    />
                  </Box>
                  <Box mb={"micro"}>
                    <FormikTextInput
                      label={"Digite sua senha atual"}
                      secureTextEntry={showCurrentPassword}
                      field={"current_password"}
                      iconRight={
                        <Button
                          mr="xxxs"
                          onPress={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ?
                            <Icon color="neutroFrio2" name="EyeOff" size={25} />
                            :
                            <Icon color="neutroFrio2" name="EyeOpen" size={25} />
                          }
                        </Button>
                      }
                    />
                  </Box>
                </>
              )}
            </Formik>
          </Box>
        </Box>
      </ScrollView>
      <Button
        onPress={handleSubmit}
        title="CONFIRMAR"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};
