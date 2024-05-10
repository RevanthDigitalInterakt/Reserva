import React, { useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';

import { TopBarDefault } from '../Menu/components/TopBarDefault';
import { Box } from '../../components/Box/Box';
import { Typography } from '../../components/Typography/Typography';
import { Button } from '../../components/Button';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import EventProvider from '../../utils/EventProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

function CallCenter() {
  const { getNumber } = useRemoteConfig();

  const phoneNumber = getNumber('call_center_number');

  const onClickCallCenter = useCallback(() => {
    try {
      EventProvider.logEvent('call_center_click', {
        phoneNumber,
      });
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, [phoneNumber]);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarDefault />

      <ScrollView>
        <Box variant="container" flex={1} pt="xs" paddingX="xxxs">
          <Box mb="xxxs" alignSelf="flex-start">
            <Typography variant="tituloSessoes">
              Central de Atendimento
            </Typography>
            <Box mb="micro" mt="micro" alignSelf="flex-start">
              <Typography
                fontFamily="nunitoRegular"
                fontSize={16}
              >
                Aqui você encontra todos os canais de contato com a Reserva.
                Escolha a melhor opção pra você.
              </Typography>
            </Box>
          </Box>

          <Box width="100%">
            <Button
              onPress={() => {
                onClickCallCenter();
                Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
              }}
              title="WHATSAPP RESERVA"
              variant="primarioEstreito"
              inline
              borderRadius="nano"
            />
            <Box mb="micro" alignItems="center" mt="nano">
              <Typography fontFamily="nunitoRegular" fontSize={12}>
                Segunda a Sexta: 08 às 20hrs e aos Sábados: 08 às 18hrs
              </Typography>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CallCenter;
