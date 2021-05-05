import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Animated, SafeAreaView, ScrollView } from "react-native";
import {
  Typography,
  Box,
  Image,
  Button,
  TextField,
  Icon,
  Toggle,
} from "reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";

type Props = StackScreenProps<RootStackParamList, "LoginAlternative">;

export const LoginAlternative: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = React.useState(false);
  const imageTranslation = React.useRef(new Animated.Value(0)).current;
  const boxTranslation = React.useRef(new Animated.Value(100)).current;

  const { isCheckout } = route.params;

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
                  <Typography variant="tituloSessoes" textAlign="center">
                    Identifique-se para continuar sua navegação
                  </Typography>
                </Box>
                <Box flexDirection="row" justifyContent="center">
                  <Button
                    padding="micro"
                    height={50}
                    width={150}
                    bg="preto"
                    color="white"
                    title="CRIAR CONTA"
                    onPress={() => navigation.navigate("Register")}
                  />
                  <Button
                    padding="micro"
                    height={50}
                    marginLeft="xxxs"
                    width={150}
                    title="ENTRAR"
                    onPress={() => {
                      setIsVisible(true);
                    }}
                    borderColor="preto"
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
                <Box marginLeft="xxs" marginTop="xxs">
                  <Typography variant="tituloSessoes">
                    Seja bem-vindo novamente!
                  </Typography>
                </Box>
                <Box flex={1} marginLeft="xxs" marginRight="xxs">
                  <Box marginTop="xxs" marginBottom="nano">
                    <TextField
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
                      secureTextEntry
                      height={55}
                      placeholder="Digite sua senha"
                      iconRight={
                        <Box ml="nano">
                          <Icon color="neutroFrio2" name="EyeOpen" size={25} />
                        </Box>
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
                        if (isCheckout) {
                          navigation.navigate("DeliveryScreen");
                        } else {
                          navigation.navigate("Home");
                        }
                      }}
                      width="150px"
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
                    <Box marginLeft="micro">
                      <Typography
                        fontSize={13}
                        style={{ textDecorationLine: "underline" }}
                        fontFamily="nunitoRegular"
                        onPress={() => navigation.navigate("Register")}
                      >
                        Clique para se cadastrar
                      </Typography>
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
