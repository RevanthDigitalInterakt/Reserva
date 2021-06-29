import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Animated, SafeAreaView, ScrollView } from "react-native";
import {
  Typography,
  Box,
  Image,
  Button,
  TextField,
  Icon,
  Toggle,
  theme,
} from "reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { ApplicationState } from "../../../store";
import ProgressBar from "react-native-progress/Bar";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { classicSignInMutation } from "../../../graphql/login/loginMutations";

type Props = StackScreenProps<RootStackParamList, "LoginAlternative">;

export const LoginAlternative: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [loginCredentials, setLoginCredentials] = React.useState({
    username: "danilo.sousa@globalsys.com.br",
    password: "Danilo123",
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const imageTranslation = React.useRef(new Animated.Value(0)).current;
  const boxTranslation = React.useRef(new Animated.Value(100)).current;
  const [isSecureText, setIsSecureText] = React.useState(true);
  const [login, { data, loading }] = useMutation(classicSignInMutation);
  const { comeFrom } = route.params;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(imageTranslation, {
        toValue: isVisible ? -125 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(boxTranslation, {
        toValue: isVisible ? 0 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isVisible]);

  const handleLogin = async () => {
    login({
      variables: {
        email: loginCredentials.username,
        password: loginCredentials.password,
      },
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <Box position="relative" paddingBottom="xxl" height="100%" width="100%">
          <Animated.View
            style={{
              transform: [
                {
                  translateY: imageTranslation,
                },
              ],
            }}
          >
            <Image source={images.bannerLogin} height={578} width="100%" />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: "100%",
              bottom: isVisible ? 60 : 32,
            }}
          >
            {!isVisible ? (
              <>
                <Box
                  flex={1}
                  marginLeft="xxs"
                  marginTop="xxs"
                  marginBottom="xxs"
                  marginRight="xxs"
                  justifyContent="center"
                >
                  <Typography
                    variant="tituloSessoes"
                    fontSize={24}
                    textAlign="center"
                  >
                    Identifique-se para continuar sua navegação
                  </Typography>
                </Box>
                <Box flexDirection="row" justifyContent="center">
                  <Button
                    padding="micro"
                    height={50}
                    width={150}
                    fontFamily="nunitoBold"
                    fontSize={13}
                    bg="preto"
                    color="white"
                    title="ENTRAR"
                    onPress={() => {
                      setIsVisible(true);
                    }}
                  />
                  <Button
                    padding="micro"
                    height={50}
                    marginLeft="xxxs"
                    width={150}
                    fontFamily="nunitoBold"
                    fontSize={13}
                    title="CRIAR CONTA"
                    borderColor="preto"
                    onPress={() =>
                      navigation.navigate("Register", { reset: true, comeFrom })
                    }
                    borderWidth={1}
                  />
                </Box>
              </>
            ) : (
              <Animated.View
                style={{
                  marginBottom: 8,
                  transform: [
                    {
                      translateY: boxTranslation,
                    },
                  ],
                }}
              >
                <ProgressBar
                  animated
                  indeterminate={loading}
                  color={theme.colors.vermelhoAlerta}
                  height={2}
                  borderWidth={0}
                  width={null}
                  borderRadius={0}
                />
                <Box marginX="xxs">
                  <Box marginTop="xxs">
                    <Typography
                      fontSize="24px"
                      fontFamily="reservaSerifRegular"
                    >
                      {comeFrom == "Profile" &&
                        "Acesse ou crie sua conta para continuar"}
                      {comeFrom == "Menu" &&
                        "Acesse ou crie sua conta para continuar"}
                      {comeFrom == "Checkout" &&
                        "Ótimo gosto! Agora, acesse ou crie sua conta para finalizar seu pedido"}
                      {comeFrom == "Favorite" &&
                        "Acesse ou crie sua conta para a gente não se esquecer dos seus produtos favoritos"}
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <Box marginTop="xxs" marginBottom="nano">
                      <TextField
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        value={loginCredentials.username}
                        onChangeText={(value) => {
                          setLoginCredentials({
                            ...loginCredentials,
                            username: value,
                          });
                        }}
                        keyboardType="email-address"
                        height={55}
                        placeholder="Digite seu e-mail ou CPF ou CNPJ"
                      />
                    </Box>
                    <Typography
                      fontFamily="nunitoRegular"
                      style={{ textDecorationLine: "underline" }}
                      onPress={() => navigation.navigate("ForgotEmail")}
                    >
                      Esqueci meu e-mail
                    </Typography>
                    <Box marginTop="md" marginBottom="nano">
                      <TextField
                        secureTextEntry={isSecureText}
                        height={55}
                        placeholder="Digite sua senha"
                        fontFamily="nunitoRegular"
                        value={loginCredentials.password}
                        onChangeText={(value) => {
                          setLoginCredentials({
                            ...loginCredentials,
                            password: value,
                          });
                        }}
                        iconRight={
                          <Button
                            mr="xxxs"
                            onPress={() => setIsSecureText(!isSecureText)}
                          >
                            <Icon color="neutroFrio2" name="EyeOff" size={25} />
                          </Button>
                        }
                      />
                    </Box>
                    <Typography
                      fontFamily="nunitoRegular"
                      style={{ textDecorationLine: "underline" }}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      Esqueci minha senha
                    </Typography>
                    <Box marginTop="xs" alignItems="center">
                      <Toggle
                        thumbColor="neutroFrio1"
                        color="neutroFrio2"
                        label="Lembrar meu acesso"
                      />
                    </Box>
                    <Box marginTop="xs" alignItems="center">
                      <Button
                        onPress={() => {
                          handleLogin();
                        }}
                        width={190}
                        disabled={loading}
                        fontFamily="nunitoRegular"
                        title="ENTRAR"
                        variant="primarioEstreito"
                        mb="nano"
                      />
                    </Box>
                    {/* <Box flexDirection="row" justifyContent="center" marginTop="xxxs">
                    <SocialButton variant="Google" onPress={() => {}} />
                    <SocialButton variant="Facebook" onPress={() => {}} />
                  </Box> */}
                    <Box
                      flexDirection="row"
                      justifyContent="center"
                      marginTop="xxxs"
                    >
                      <Typography fontSize={13} fontFamily="nunitoRegular">
                        Ainda não possui uma conta?
                      </Typography>
                      <Box marginLeft="quarck">
                        <Typography
                          fontSize={13}
                          style={{ textDecorationLine: "underline" }}
                          fontFamily="nunitoRegular"
                          onPress={() =>
                            navigation.navigate("Register", {
                              reset: true,
                              comeFrom,
                            })
                          }
                        >
                          Clique para se cadastrar
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Animated.View>
            )}
          </Animated.View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
