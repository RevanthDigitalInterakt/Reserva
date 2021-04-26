import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { 
  Typography, 
  Box, 
  TextField,
  Button
} from 'reserva-ui';
import { IUserData } from '../Wizard';

export const RegisterStep4: React.FC<{
  nextStep: () => void,
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>
  userData: IUserData
}> = ({
  nextStep,
  setUserData,
  userData
}) => {

	return (
		<SafeAreaView style={{ backgroundColor: 'white', padding: 20 }} flex={1}>
      <Box marginTop="xxl" marginBottom="sm">
        <Box marginTop="xxxs">
          <Typography 
            fontSize={20}
            fontFamily="reservaSerifRegular"
          >
            Informe a sua data de nascimento:
          </Typography>
        </Box>
      </Box>
      <Box flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField 
            height={55} 
            maskType={"custom"}
            maskOptions={{
              mask: '99/99/9999'
            }}
            value={userData.birth_date}
            onChangeText={(text) => setUserData({ ...userData, birth_date: text})}
            placeholder="Digite sua data de nascimento"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button 
            fontFamily="nunitoRegular"
            title='CONTINUAR' 
            onPress={() => nextStep()}
            width={258}
            variant='primarioEstreitoOutline' 
            mb='nano' 
          />
        </Box>
      </Box>
    </SafeAreaView>
	);
};
