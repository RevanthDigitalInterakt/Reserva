import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, Button } from '@usereservaapp/reserva-ui';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';

export const ContactUs: React.FC<{}> = () => {
  const navigation = useNavigation();

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
            <Typography variant="tituloSessoes">Fale conosco</Typography>

            <Box mb="micro" mt="micro" alignSelf="flex-start">
              <Typography fontFamily="nunitoRegular" fontSize={16}>
                Aqui você encontra todos os canais de contato com a Reserva.
                Escolha a melhor opção pra você.
              </Typography>
            </Box>
          </Box>

          <Box width="100%">
            <Button
              onPress={() => Linking.openURL(`whatsapp://send?phone=${552121084990}`)}
              testID="callcenter_button_whatsapp"
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

          <Box width="100%" mt="xxs">
            <Button
              onPress={() => navigation.navigate('WebviewZendesk')}
              testID="callcenter_button_send_message"
              title="ENVIE UMA MENSAGEM"
              variant="primarioEstreitoOutline"
              inline
              borderRadius="nano"
              backgroundColor="transparente"
            />
            <Box mb="micro" alignItems="center" mt="nano">
              <Typography fontFamily="nunitoRegular" fontSize={12}>
                Disponível 24hrs por dia, 7 dias por semana.
              </Typography>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
