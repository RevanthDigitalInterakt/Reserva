import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useEffect } from "react";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  TextField,
  Toggle,
  Button,
  SocialButton,
  Icon,
  Image,
} from "reserva-ui";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";


export interface ModalLoginAlternativeProps {
  isVisible: boolean;
}

export const ModalLoginAlternative = ({ isVisible }: ModalLoginAlternativeProps) => 
  {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { repositories } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
      <Modal
        backdropColor="white"
        backdropOpacity={1}
        isVisible={isVisible}
        style={{ marginTop: 48 }}
        animationInTiming={300}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <Box marginLeft="xxs" marginTop="xxl" >
          <Typography fontFamily="reservaSerifRegular" fontSize={24}>
            Seja bem-vindo novamente!
          </Typography>
        </Box>
        <Box flex={1} marginLeft="xxs" marginRight="xxs">
          <Box marginTop="xxxs" marginBottom="nano">
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
          <Box flexDirection="row" justifyContent="center" marginTop="xxxs">
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
      </Modal>
  );
};
