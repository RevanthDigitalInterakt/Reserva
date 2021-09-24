import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Box, Button, Typography, Icon } from "reserva-ui";
import { images } from "../../../assets";
import { useAuth } from "../../../context/AuthContext";
import { accessKeySignInMutation } from "../../../graphql/login/loginMutations";
import { recoveryPasswordMutation } from "../../../graphql/login/loginMutations";
import { recoveryPassword } from "../../../graphql/login/recoveryPassword";
import { RootStackParamList } from "../../../routes/StackNavigator";
import CodeInput from "../../Login/components/CodeInput";
import HeaderBanner from "../componet/HeaderBanner";
import UnderlineInput from "../../Login/components/UnderlineInput";

export interface ForgotAccessCodeProps
  extends StackScreenProps<RootStackParamList, "ForgotAccessCode"> { }

export const ForgotAccessCode: React.FC<ForgotAccessCodeProps> = ({
  navigation,
  route,
}) => {
  const { cookie, setCookie } = useAuth();
  const { email } = route.params;
  const [showError, setShowError] = useState(false);
  const [code, setCode] = useState("");
  const [loginWithCode, { data, loading }] = useMutation(
    accessKeySignInMutation
  );

  const passwordCheckHandler = () => ({
    equal: passwords.first === passwords.confirm,
    digitsCount: passwords.first.length >= 8,
    uppercase: passwords.first.match(/[a-z]/g) != null,
    lowercase: passwords.first.match(/[A-Z]/g) != null,
    number: passwords.first.match(/[0-9]/g) != null,
  });

  const enabledButton = () =>
    passwordsChecker.equal &&
    passwordsChecker.digitsCount &&
    passwordsChecker.uppercase &&
    passwordsChecker.lowercase &&
    passwordsChecker.number;

  const [
    recoveryPassword,
    { data: dataRecoveryPassword, loading: loadingRecoveryPassword, error },
  ] = useMutation(recoveryPasswordMutation);

  const handleUpdatePassword = () => {
    let variables = {
      email,
      code,
      newPassword: passwords.confirm,
    };
    if (error != null || code.length < 6 || code == `${code}`) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    recoveryPassword({
      variables,
    }).then((x) => {
      x.data.recoveryPassword != null
        ? navigation.navigate("ForgotEmailSuccess")
        : navigation.navigate("ForgotEmail", {});
    });
  };

  //const [recovery, { data }] = useMutation<{ email: string }>(recoveryPassword)

  const [passwords, setPasswords] = useState({
    first: "",
    confirm: "",
  });

  const [passwordsChecker, setPasswordChecker] = useState(
    passwordCheckHandler()
  );

  const handleReset = () => {
    if (code.length < 6) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    loginWithCode({
      variables: {
        email: email,
        code: `${code}`,
      },
    });
  };

  useEffect(() => {
    if (!loading && data?.cookie) {
      setShowError(false);
      navigation.navigate("ForgotNewPassword", { email, code });
    }
    if (data?.accessKeySignIn === "WrongCredentials") {
      setShowError(true);
    }
  }, [data]);

  useEffect(() => {
    setPasswordChecker(passwordCheckHandler());
  }, [passwords]);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <>
          <HeaderBanner
            imageHeader={images.headerLogin}
            onClickGoBack={() => {
              navigation.goBack();
            }}
          />
          <Box mx={20} mt={13}>
            <Typography fontFamily="reservaSerifRegular" fontSize={22}>
              Atualize sua senha
            </Typography>
            <Box mt={27}>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                Para alterar a senha, digite o código enviado para o e-mail
                abaixo:
              </Typography>
              {email && (
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  color="neutroFrio2"
                >
                  {email}
                </Typography>
              )}
            </Box>
            <Box mt={17}>
              <CodeInput
                code={code}
                onChageCode={setCode}
                showError={showError}
              />
            </Box>
          </Box>
          <Box mx={20} mt={13}>
            <UnderlineInput
              onChangeText={(text) =>
                setPasswords({ ...passwords, first: text })
              }
              placeholder="Digite sua nova senha"
            />
            <Box mt="sm">
              <UnderlineInput
                onChangeText={(text) =>
                  setPasswords({ ...passwords, confirm: text })
                }
                placeholder="Confirme sua nova senha"
              />
            </Box>
            <Box mt={22}>
              <Typography>Sua senha deve ter pelo menos:</Typography>
            </Box>
            <Box mx={44} flexDirection="row" flexWrap="wrap" pt={2}>
              <PasswordCheck
                checked={passwordsChecker.digitsCount}
                text="8 dígitos"
              />
              <PasswordCheck
                checked={passwordsChecker.lowercase}
                text="1 letra maiúscula"
              />
              <PasswordCheck
                checked={passwordsChecker.number}
                text="1 número"
              />
              <PasswordCheck
                checked={passwordsChecker.uppercase}
                text="1 letra minúscula"
              />
            </Box>
            <Box mb={20}>
              <Button
                mt={28}
                variant="primarioEstreito"
                title="ALTERAR SENHA"
                onPress={handleUpdatePassword}
                disabled={!enabledButton()}
                inline
              />
            </Box>
          </Box>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export interface PasswordCheckProps {
  text: string;
  checked: boolean;
}

export const PasswordCheck: React.FC<PasswordCheckProps> = ({
  text,
  checked,
}) => {
  const color = checked ? "verdeSucesso" : "neutroFrio2";
  return (
    <Box flexDirection="row" alignItems="center" width="50%" mt={15}>
      <Box mt="nano" mr={2}>
        <Icon name="Check" size={16} color={color} />
      </Box>
      <Typography color={color}>{text}</Typography>
    </Box>
  );
};
