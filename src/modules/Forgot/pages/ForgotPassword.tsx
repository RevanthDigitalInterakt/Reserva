import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import images from '../../../base/styles/icons';
import HeaderBanner from '../componet/HeaderBanner';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { TextField } from '../../../components/TextField/TextField';
import { Button } from '../../../components/Button';

export interface ForgotPasswordProps
  extends StackScreenProps<RootStackParamList, 'ForgotPassword'> { }

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <HeaderBanner imageHeader={images.headerLogin} />
      <Box paddingX="micro" marginTop="xxl">
        <Box justifyContent="flex-start" marginTop="xxxs">
          <Typography variant="tituloSessoes">Esqueci minha senha</Typography>
        </Box>
      </Box>

      <Box paddingX="micro" flex={1}>
        <Box marginTop="sm" marginBottom="nano">
          <TextField
            value={email}
            onChangeText={(value) => setEmail(value)}
            height={55}
            placeholder="Digite seu e-mail"
          />
        </Box>
        <Box marginTop="xs" alignItems="center">
          <Button
            fontFamily="nunitoRegular"
            title="CONTINUAR"
            width={258}
            variant="primarioEstreitoOutline"
            onPress={() => {
              AsyncStorage.setItem('recoveryEmail', email);
              navigation.navigate('ForgotAccessCode');
            }}
            mb="nano"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};
