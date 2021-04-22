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

export const RegisterStep2: React.FC<{
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
    <TopBarBackButton backButtonPress={() => navigation.navigate('RegisterStep1')} />
      <Box marginTop="xxl" marginBottom="sm">
        <Box marginTop="xxxs">
          <Typography 
            fontSize={20}
            fontFamily="reservaSerifRegular"
          >
            Seu nome completo:
          </Typography>
        </Box>
      </Box>
      <Box flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField 
            height={55} 
            placeholder="Digite seu nome completo"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button 
            fontFamily="nunitoRegular"
            title='CONTINUAR' 
            onPress={() => navigation.navigate('RegisterStep3')}
            width={258}
            variant='primarioEstreitoOutline' 
            mb='nano' 
          />
        </Box>
      </Box>
    </SafeAreaView>
	);
};
