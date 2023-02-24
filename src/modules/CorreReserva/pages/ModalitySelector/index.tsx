import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Box, Typography } from '@usereservaapp/reserva-ui';
import React, { useEffect } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CorreReservaStackParamList } from '../..';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { useCorre } from '../../context';
import { images } from '../../images';
import { ModalityCard } from './components/ModalityCard';

export interface ModalitySelectorProps { }

type ModalitySelectorNavigator = StackNavigationProp<
CorreReservaStackParamList,
'ModalitySelector'
>;

export const ModalitySelector: React.FC<ModalitySelectorNavigator> = ({ }) => {
  const { setSelectedModality, setHasStarted, setIsLastPage } = useCorre();
  const navigation = useNavigation<ModalitySelectorNavigator>();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
    setHasStarted(false);
    setIsLastPage(false);
  }, []);

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        paddingTop: 111,
      }}
    >
      <Box
        backgroundColor="#0F1113"
        zIndex={0}
        position="absolute"
        width="100%"
        height={configDeviceSizes.DEVICE_HEIGHT / 2}
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
    </SafeAreaView>
  );
};
