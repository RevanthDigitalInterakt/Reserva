import React, { useState, useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Typography,
  Box,
  Button,
  TextField,
} from '@usereservaapp/reserva-ui';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export function WithdrawInStore() {
  const navigation = useNavigation();
  const [state, setState] = useState('UF');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('Cidade');

  // limpar o state e city quando focar na tela
  useFocusEffect(
    useCallback(() => {
      setState('UF');
      setCity('Cidade');
    }, []),
  );

  const activateMapButton = useCallback((): boolean => {
    if (cep?.length && cep?.match(/^(?=.{9,})/)) {
      return true;
    }
    return false;
  }, [cep]);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX="xxxs" paddingY="sm">
          <Box marginBottom="xxs">
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Retirar na loja
            </Typography>
          </Box>

          <Box marginBottom="xxxs">
            <Typography variant="tituloSessao">
              Digite o seu CEP para localizarmos as lojas mais próximas de você.
            </Typography>
          </Box>

          <Box flexDirection="row">
            <Box flex={1} marginRight="micro">
              <TextField
                maskType="zip-code"
                value={cep}
                onChangeText={(cep) => {
                  setCep(cep);
                }}
                placeholder="Digite aqui o seu CEP"
              />
            </Box>
            <Box>
              <Button
                height={60}
                disabled={!activateMapButton()}
                onPress={() => navigation.navigate('MapScreen', { geolocation: cep })}
                title="MAPA"
                variant="primarioEstreito"
              />
            </Box>
          </Box>

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
