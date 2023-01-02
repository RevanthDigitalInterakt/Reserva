import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Typography, Box, Button, TextField,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { RootStackParamList } from '../../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'GiftVoucherScreen'>;
export const GiftVoucherScreen = ({ route }: Props) => {
  const { cashback } = route?.params;
  const navigation = useNavigation();
  const [codigo, setCodigo] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [touchedCod, setTouchedCod] = useState<boolean>(false);
  const [touchedCpf, setTouchedCpf] = useState<boolean>(false);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX="xxxs" paddingY="sm">
          <Box>
            <Typography variant="tituloSessoes">Cartão presente</Typography>
          </Box>

          <Box marginTop="xs">
            <Box paddingBottom="xxs">
              <TextField
                placeholder="Digite aqui o código"
                value={codigo}
                onChangeText={(text) => {
                  setCodigo(text);
                }}
                touched={touchedCpf}
                onBlur={() => {
                  setTouchedCpf(true);
                }}
                error={codigo === '' && touchedCpf && 'Informe um código'}
              />
            </Box>
            <Box>
              <TextField
                maskType="cpf"
                placeholder="Digite aqui o seu CPF"
                value={cpf}
                onChangeText={(text) => {
                  setCpf(text);
                }}
                touched={touchedCod}
                onBlur={() => {
                  setTouchedCod(true);
                }}
                error={cpf === '' && touchedCod && 'Informe um cpf'}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Button
        onPress={() => navigation.navigate('SummaryScreen', { paymentType: 'GiftCard', cashback })}
        title="RESUMO"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};
