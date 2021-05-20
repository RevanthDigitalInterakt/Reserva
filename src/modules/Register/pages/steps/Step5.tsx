import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { format } from 'date-fns';
import { Typography, Box, TextField, Button, Icon } from "reserva-ui";
import { register } from "../../../../store/ducks/profile/actions";
import { Profile } from "../../../../store/ducks/profile/types";
import { IUserData } from "../Wizard";

export const RegisterStep5: React.FC<{
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  userData: IUserData;
  comeFrom: string;
}> = ({ setUserData, userData, comeFrom }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const dateSplit = userData.birth_date.split('/');
    const birthDate = new Date(
      `${dateSplit[1]}-${dateSplit[0]}-${dateSplit[2]}`
    ).toISOString();
    const profileCredentials: Profile = {
      firstName: userData.name,
      lastName: userData.name,
      email: userData.mail,
      password: userData.password,
      receiveEmail: "yes",
      fullName: userData.name,
      rsvCPF: userData.cpf,
      rsvBirthDate: birthDate
    };

    dispatch(register(profileCredentials));
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <Box paddingX="micro" marginTop="xs" flex={1}>
        <Box marginTop="xxxs">
          <Typography variant={"tituloSessoes"}>Registre sua senha:</Typography>
        </Box>

        <Box marginTop="sm" marginBottom="nano">
          <TextField
            secureTextEntry
            height={55}
            fontFamily="nunitoRegular"
            placeholder="Digite sua senha"
            value={userData.password}
            onChangeText={(text) =>
              setUserData({ ...userData, password: text })
            }
            iconRight={
              <Box mr="xxxs">
                <Icon color="neutroFrio2" name="EyeOff" size={25} />
              </Box>
            }
          />
          <Box marginTop="quarck">
            <Typography
              color="neutroFrio2"
              fontFamily="nunitoRegular"
              fontSize={13}
            >
              No mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas
              e números.
            </Typography>
          </Box>
        </Box>
        <Box marginTop="xxxs" marginBottom="nano">
          <TextField
            secureTextEntry
            height={55}
            fontFamily="nunitoRegular"
            placeholder="Repita a senha"
            value={userData.confirm_password}
            onChangeText={(text) =>
              setUserData({ ...userData, confirm_password: text })
            }
            iconRight={
              <Box mr="xxxs">
                <Icon color="neutroFrio2" name="EyeOff" size={25} />
              </Box>
            }
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            onPress={() => {
              console.log(userData);
              handleSubmit();
              // navigation.navigate("RegisterSuccess", { comeFrom })
            }}
            width={258}
            variant="primarioEstreitoOutline"
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
