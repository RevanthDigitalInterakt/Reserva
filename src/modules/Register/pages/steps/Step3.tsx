import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Typography, Box, TextField, Button } from 'reserva-ui';
import { IUserData } from '../Wizard';

export const RegisterStep3: React.FC<{
  nextStep: () => void;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  userData: IUserData;
}> = ({ nextStep, setUserData, userData }) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <Box paddingX="micro" marginTop="xs" flex={1}>
        <Box marginTop="xxxs">
          <Typography variant={'tituloSessoes'}>
            Informe o seu e-mail:
          </Typography>
        </Box>

        <Box marginTop="sm" marginBottom="nano">
          <TextField
            height={55}
            value={userData.mail}
            autoCompleteType="email"
            textContentType="emailAddress"
            onChangeText={(text) => setUserData({ ...userData, mail: text })}
            placeholder="Digite seu e-mail"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            onPress={() => nextStep()}
            width={258}
            variant="primarioEstreitoOutline"
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
