import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Linking,
  Text,
  View,
} from 'react-native';

import TopBarDefault from '../Menu/components/TopBarDefault';
import { Box } from '../../components/Box/Box';
import { Typography } from '../../components/Typography/Typography';
import { Button } from '../../components/Button';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import EventProvider from '../../utils/EventProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import styles from './styles';
import { ModalSignIn } from '../../components/ModalSignIn';

function CallCenter() {
  const { getNumber } = useRemoteConfig();
  const { isPrime } = usePrimeInfo();

  const phoneNumber = getNumber('call_center_number');

  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);

  const onClickCallCenter = useCallback(() => {
    try {
      EventProvider.logEvent('call_center_click', {
        phoneNumber,
      });
      EventProvider.logScreenViewEvent('call_center_click');
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, [phoneNumber]);

  const onClickCallCenterPrime = useCallback(() => {
    try {
      EventProvider.logEvent('call_center_click_prime', {
        phoneNumber,
      });
      EventProvider.logScreenViewEvent('call_center_click_prime');
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
    if (!isPrime) {
      setIsModalSignInVisible(true);
    } else {
      Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
    }
  }, [phoneNumber]);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <ModalSignIn
        isVisible={isModalSignInVisible}
        onClose={() => setIsModalSignInVisible(false)}
      />
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
            {!isPrime && (

            <>
              <Button
                onPress={() => {
                  onClickCallCenter();
                  Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
                }}
                title="NÃO SOU ASSINANTE PRIME"
                variant="primarioEstreito"
                inline
                borderRadius="nano"
              />
              <View style={styles.container}>
                <View style={styles.divider} />
                <Text style={styles.text}>ou</Text>
                <View style={styles.divider} />
              </View>
            </>
            )}
            <Button
              onPress={onClickCallCenterPrime}
              style={styles.primeButton}
              title="SOU ASSINANTE PRIME"
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
