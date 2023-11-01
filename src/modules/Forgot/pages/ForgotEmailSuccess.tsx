import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import images from '../../../base/styles/icons';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import HeaderBanner from '../componet/HeaderBanner';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';

export interface ForgotAccessCodeProps extends StackScreenProps<RootStackParamList, 'ForgotEmailSuccess'> { }

export const ForgotEmailSuccess: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <ScrollView>
        <HeaderBanner
          imageHeader={images.headerLogin}
          onClickGoBack={() => { navigation.goBack(); }}
        />
        <Box mx={20} mt={65}>
          <Typography fontFamily="reservaSerifRegular" fontSize={35}>Senha alterada com sucesso!</Typography>
          <Button
            mt={106}
            variant="primarioEstreito"
            title="VOLTAR AO LOGIN"
            onPress={() => {
              navigation.navigate('Login');
            }}
            inline
          />

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
