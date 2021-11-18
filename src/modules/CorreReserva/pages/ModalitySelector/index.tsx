import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Typography } from 'reserva-ui';

import { CorreReservaStackParamList } from '../..';
import { useCorre } from '../../context';
import { images } from '../../images';

import { ModalityCard } from './components/ModalityCard';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export interface ModalitySelectorProps { }

type ModalitySelectorNavigator = StackNavigationProp<
  CorreReservaStackParamList,
  'ModalitySelector'
>;

export const ModalitySelector: React.FC<ModalitySelectorNavigator> = ({ }) => {
  const { setSelectedModality } = useCorre();
  const navigation = useNavigation<ModalitySelectorNavigator>();
  return (
    <SafeAreaView
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 111,
      }}
    >
      {/* <HeaderCorreReserva /> */}
      <Box
        backgroundColor="#0F1113"
        zIndex={0}
        position="absolute"
        width="100%"
        height={DEVICE_HEIGHT / 2}
      />
      <ScrollView>
        <Box marginTop={34}>
          <Typography
            fontFamily="reservaSerifRegular"
            fontSize={24}
            color="white"
            textAlign="center"
          >
            Escolha sua modalidade
          </Typography>
          <Typography
            style={{ marginTop: 4 }}
            color="white"
            fontSize={16}
            fontFamily="reservaSansLight"
            textAlign="center"
            lineHeight={20}
          >
            {
              'Seja do Rio ou de qualquer outro lugar do Brasil, \ntodo mundo pode fazer parte do nosso CORRE®.'
            }
            <Typography fontFamily="reservaSansBold">
              {'\nDe qual forma você vai participar?'}
            </Typography>
          </Typography>
        </Box>
        <Box mt={36} alignItems="center">
          <ModalityCard
            onPress={() => {
              setSelectedModality('presential');
              navigation.navigate('QrCodeScanner', { isFinalizingRace: false });
            }}
            imageSource={images.presencial}
            title="Presencial"
            description={
              'Estou em um dos pontos de largada no \nRio de Janeiro e quero ler o QR Code.'
            }
          />
          <ModalityCard
            onPress={() => {
              setSelectedModality('virtual');
              navigation.navigate('RaceDetail');
            }}
            imageSource={images.virtual}
            title="Virtual"
            description={
              'Estou longe do local do evento e \nquero iniciar minha corrida agora.'
            }
          />
        </Box>
      </ScrollView>
    </SafeAreaView >
  );
};
