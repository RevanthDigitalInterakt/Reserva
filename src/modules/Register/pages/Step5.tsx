import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
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

export const RegisterStep5: React.FC<{
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
      <TopBarBackButton backButtonPress={() => navigation.navigate('RegisterStep4')} />
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
            placeholder="Digite sua senha" secureTextEntry
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
