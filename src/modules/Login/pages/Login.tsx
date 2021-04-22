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

import logo from '../../../assets/img/logo.png';

export const LoginScreen: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { repositories } = useSelector((state: ApplicationState) => state);

	useEffect(() => {
		dispatch(loadRequest());
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <Box alignItems="center" marginTop="xxl" marginBottom="sm">
        <Image source={logo} />
      </Box>
      <Box flex={1} marginLeft="xxs" marginRight="xxs">
        <Box marginTop="sm" marginBottom="nano">
          <TextField 
            height={55} 
            placeholder="Digite seu e-mail ou CPF ou CNPJ"
          />
        </Box>
        <Typography fontFamily="nunitoRegular">Esqueci meu e-mail</Typography>
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
        <Typography fontFamily="nunitoRegular">Esqueci minha senha</Typography>
        <Box marginTop="xs" alignItems="center">
          <Toggle
            thumbColor="neutroFrio1" 
            color="neutroFrio2" 
            label="Lembrar meu acesso"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button 
            fontFamily="nunitoRegular"
            title='ENTRAR' 
            variant='primarioEstreito' 
            mb='nano' 
          />
        </Box>
        <Box flexDirection="row" justifyContent="center" marginTop="xxxs">
            <SocialButton variant="Facebook" onPress={() => {}} />
            <SocialButton variant="Google" onPress={() => {}} />
        </Box>
        <Box flexDirection="row" justifyContent="center" marginTop="xxxs">
          <Typography 
            fontSize={13}
            fontFamily="nunitoRegular"
          >
            Ainda não possui uma conta? 
          </Typography>
          <Typography 
            fontSize={13}
            fontFamily="nunitoRegular" 
            onPress={() => navigation.navigate('RegisterStep1')}
          >
            Clique para se cadastrar
          </Typography>
        </Box>
      </Box>
    </SafeAreaView>
	);
};
