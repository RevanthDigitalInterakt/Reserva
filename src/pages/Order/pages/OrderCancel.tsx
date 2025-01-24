import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../components/Typography/Typography';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';

type ItemContactProps = {
  number: string;
  type: string;
};

function ItemContact({ number, type }: ItemContactProps) {
  const { getNumber } = useRemoteConfig();
  const phoneNumber = getNumber('call_center_number');
  return (
    <TouchableOpacity
      onPress={() => {
        switch (type) {
          case 'wp':
            Linking.openURL(
              `whatsapp://send?phone=${phoneNumber}`,
            );
            break;

          case 'phone':
            Linking.openURL(`tel:${number}`);
            break;

          default:
            break;
        }
      }}
    >
      <Box
        border={1}
        borderColor="neutroFrio1"
        borderRadius="nano"
        p="xxxs"
        alignItems="center"
        mb="xxs"
      >
        <Box flexDirection="row">
          <IconLegacy
            name={type === 'wp' ? 'WhatsappBg' : 'PhoneBg'}
            color={type === 'wp' ? 'verdeSucesso' : 'neutroFrio2'}
            mr="nano"
            size={20}
          />
          <Typography fontSize={15}>{number}</Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

function OrderList() {
  const navigation = useNavigation();

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton showShadow />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          mb="xxxs"
          paddingX="xxxs"
          justifyContent="flex-start"
          paddingTop="md"
        >
          <Typography variant="tituloSessoes">Cancelar pedido</Typography>
        </Box>
        <Box paddingX="xxxs" mb="xxxs">
          <Typography fontSize={15} fontFamily="nunitoRegular">
            {'Entre em contato conosco por telefone que nós providenciaremos a devolução.\n\n'}
            Você precisará informar o seu CPF, o número do pedido e o produto a ser devolvido.
          </Typography>
        </Box>
        <Box paddingX="xxxs">
          <Typography
            fontSize={12}
            fontFamily="nunitoRegular"
            color="neutroFrio2"
          >
            Obs: De acordo com o CDC (Código de Defesa do Consumidor), a
            solicitação de cancelamento de compras virtuais deve ser feita em
            até 7 dias úteis/corridos após a data de recebimento.
          </Typography>
        </Box>

        <Box
          paddingX="xxxs"
          mt="xxs"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box flexDirection="row" mb="xxs">
            <Box
              width="100%"
              justifyContent="center"
            >
              <Typography
                fontFamily="nunitoRegular"
                fontSize={15}
                textAlign="center"
              >
                SAC
              </Typography>
            </Box>
          </Box>

          <Box flexDirection="row" justifyContent="center">
            <Box width="43%">
              <ItemContact number="(21) 3609-2550" type="wp" />
            </Box>
          </Box>
        </Box>

        <Box paddingY="micro" alignSelf="center" mt="micro">
          <Button
            inline
            onPress={() => {
              navigation.goBack();
            }}
            title="RETORNAR AO PEDIDO"
            variant="primarioEstreitoOutline"
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OrderList;
