import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, TextField, Toggle, Button, SocialButton, Icon } from 'reserva-ui';
import { ApplicationState } from '../../../store';
import { loadRequest } from '../../../store/ducks/repositories/actions';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';

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
      <Box flex={1} marginLeft="xxs" marginRight="xxs">
        <Box marginTop="sm" marginBottom="nano">
          <TextField height={52} placeholder="Digite seu e-mail ou CPF ou CNPJ" />
        </Box>
        <Typography>Esqueci meu e-mail</Typography>
        <Box marginTop="md" marginBottom="nano">
          <TextField 
            height={52} 
            placeholder="Digite sua senha" 
            iconRight={
              <Box ml="nano">
                <Icon color="neutroFrio2" name="EyeOpen" size={25} />
              </Box>
            } 
          />
        </Box>
        <Typography>Esqueci minha senha</Typography>
        <Box marginTop="xs" alignItems="center">
          <Toggle thumbColor="neutroFrio1" color="neutroFrio2" label="Lembrar meu acesso"/>
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button title='ENTRAR' variant='primarioEstreito' mb='nano' />
        </Box>
        <Box flexDirection="row" justifyContent="center" marginTop="xxxs">
            <SocialButton variant="Facebook" onPress={() => {}} />
            <SocialButton variant="Google" onPress={() => {}} />
        </Box>
        <Box flexDirection="row" justifyContent="center" marginTop="xxxs">
          <Typography>Ainda não possui uma conta? </Typography>
          <Typography>Clique para se cadastrar</Typography>
        </Box>
      </Box>
    </SafeAreaView>
	);
};
