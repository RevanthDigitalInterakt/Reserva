import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { Icon, Box, Typography, Divider, Button } from '@danilomsou/reserva-ui';
import { TopBarDefault } from '../Menu/components/TopBarDefault';
import { useNavigation } from '@react-navigation/native';

type ItemContactProps = {
  local?: string;
  label: string;
  icon: string;
  onPress?: Function;
  divider?: boolean;
};

const ItemContact = ({
  local,
  label,
  icon,
  onPress,
  divider,
}: ItemContactProps) => {
  return (
    <Box width={'100%'}>
      <TouchableOpacity onPress={onPress}>
        <Box
          pb={'xxxs'}
          pt={'xxxs'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Box
            justifyContent={'center'}
            flexDirection={'row'}
            alignItems="center"
          >
            <Box mr={'micro'}>
              <Icon name={icon} size={20} />
            </Box>

            <Box>
              {local && (
                <Typography color="borderColorProduct">{local}</Typography>
              )}
              <Typography fontFamily={'nunitoRegular'} fontSize={15}>
                {label}
              </Typography>
            </Box>
          </Box>

          <Icon name="ArrowProcced" size={26} />
        </Box>
      </TouchableOpacity>
      {divider === true && <Divider variant={'fullWidth'} />}
    </Box>
  );
};
const CallCenter = ({
  local,
  label,
  icon,
  onPress,
  divider,
}: ItemContactProps) => {
  const navigation = useNavigation();
  const onClickWhatsappButton = () => {
    Linking.openURL('https://whts.co/reserva');
  };

  const onClickMail = () => {
    Linking.openURL(`mailto:sac@usereserva.com`);
  };

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarDefault />

      <ScrollView>
        <Box variant="container" flex={1} pt={'xs'} paddingX={'xxxs'}>
          <Box mb={'xxxs'} alignSelf={'flex-start'}>
            <Typography variant={'tituloSessoes'}>
              Central de Atendimento
            </Typography>
            <Box mb={'micro'} mt={'micro'} alignSelf={'flex-start'}>
              <Typography
                fontFamily="nunitoRegular"
                fontSize={16}
                // style={{ marginTop: 7, marginBottom: 32 }}
              >
                Aqui você encontra todos os canais de contato com a Reserva.
                Escolha a melhor opção pra você.
              </Typography>
            </Box>
          </Box>

          <Box width={'100%'}>
            <Button
              onPress={() => {
                Linking.openURL(`whatsapp://send?phone=${552121084990}`);
              }}
              title="WHATSAPP RESERVA"
              variant="primarioEstreito"
              inline
              borderRadius={'nano'}
            />
            <Box mb={'micro'} alignItems="center" mt={'nano'}>
              <Typography fontFamily="nunitoRegular" fontSize={12}>
                Segunda a Sexta: 08 às 21hrs e aos Sábados: 08 às 18hrs
              </Typography>
            </Box>
          </Box>

          <Box width={'100%'} mt={'xxs'}>
            <Button
              onPress={() => {
                navigation.navigate('WebviewZendesk');
                // Linking.openURL(`sms:(21) 3900-7052`);
              }}
              title="ENVIE UMA MENSAGEM"
              variant="primarioEstreitoOutline"
              inline
              borderRadius={'nano'}
              backgroundColor={'transparente'}
            />
            <Box mb={'micro'} alignItems="center" mt={'nano'}>
              <Typography fontFamily="nunitoRegular" fontSize={12}>
                Disponível 24hrs por dia, 7 dias por semana.
              </Typography>
            </Box>
          </Box>

          {/* <ItemContact
            divider={true}
            icon="Mail"
            label="sac@usereserva.com"
            onPress={onClickMail}
          /> */}
          {/*
          <ItemContact
            divider={true}
            icon={'Phone'}
            label={'(21) 3900-7052'}
            onPress={() => {
              Linking.openURL(`tel: (21) 3900-7052`);
            }}
          />
          <ItemContact
            icon={'Whatsapp'}
            label={'Whatsapp Reserva'}
            onPress={() => {
              Linking.openURL(`whatsapp://send?phone=${552121084990}`);
            }}
          /> */}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CallCenter;
