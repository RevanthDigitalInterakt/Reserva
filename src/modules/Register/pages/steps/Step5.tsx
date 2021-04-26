import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { 
  Typography, 
  Box, 
  TextField,
  Button,
  Icon
} from 'reserva-ui';
import { IUserData } from '../Wizard';

export const RegisterStep5: React.FC<{
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>
  userData: IUserData
}> = ({
  setUserData,
  userData
}) => {
  const navigation = useNavigation();

	return (
		<SafeAreaView style={{ backgroundColor: 'white', padding: 20 }} flex={1}>
      <Box marginTop="xxl">
        <Box marginTop="xxxs">
          <Typography 
            fontSize={20}
            fontFamily="reservaSerifRegular"
          >
            Registre sua senha:
          </Typography>
        </Box>
      </Box>
      <Box flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField 
            secureTextEntry
            height={55} 
            placeholder="Digite sua senha"
            value={userData.password}
            onChangeText={(text) => setUserData({ ...userData, password: text})}
            iconRight={
              <Box ml="nano">
                <Icon color="neutroFrio2" name="EyeOpen" size={25} />
              </Box>
            } 
          />
          <Box marginTop="quarck">
          <Typography color="neutroFrio2" fontFamily="nunitoRegular" fontSize={13}>
            No mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas e números. 
          </Typography>
          </Box>
        </Box>
        <Box marginTop="xxxs" marginBottom="nano">
          <TextField 
            secureTextEntry
            height={52} 
            placeholder="Repita a senha" 
            value={userData.confirm_password}
            onChangeText={(text) => setUserData({ ...userData, confirm_password: text})}
            iconRight={
              <Box ml="nano">
                <Icon color="neutroFrio2" name="EyeOpen" size={25} />
              </Box>
            } 
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button 
            fontFamily="nunitoRegular"
            title='CONTINUAR' 
            onPress={() => navigation.navigate('RegisterSuccess')}
            width={258}
            variant='primarioEstreitoOutline' 
            mb='nano' 
          />
        </Box>
      </Box>
    </SafeAreaView>
	);
};
