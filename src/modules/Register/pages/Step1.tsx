import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Typography, 
  Box, 
  TextField, 
  Toggle, 
  Button, 
  SocialButton, 
  Icon, 
  Image 
} from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export const RegisterStep1: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { repositories } = useSelector((state: ApplicationState) => state);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: 'white', padding: 20 }} flex={1}>
      <TopBarBackButton message="Aqui entra variante da \Topbar" />
      <Box alignItems="center" marginTop="xxl" marginBottom="sm">
        <Box justifyContent="center" marginTop="xxxs">
          <Typography 
            fontSize={20}
            fontFamily="reservaSerifRegular"
          >
            Para começar seu cadastro, por favor, digite o seu CPF ou CNPJ
          </Typography>
        </Box>
      </Box>
      <Box flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField 
            height={52} 
            placeholder="Digite seu e-mail ou CPF ou CNPJ"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button 
            fontFamily="nunitoRegular"
            title='CONTINUAR' 
            onPress={() => navigation.navigate('RegisterStep2')}
            width={258}
            variant='primarioEstreitoOutline' 
            mb='nano' 
          />
        </Box>
      </Box>
    </SafeAreaView>
	);
};
