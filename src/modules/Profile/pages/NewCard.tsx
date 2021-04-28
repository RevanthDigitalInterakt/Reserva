import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Icon, TextField, Toggle, Typography } from 'reserva-ui';
import CreditCardDisplay from 'react-native-credit-card-display';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { images } from '../../../assets';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import Cardscan from 'react-native-cardscan';
import { borderWidth } from 'styled-system';

interface NewCardProps {}

interface Card {
  holder: string;
  number: string;
  expiration: string;
  CVC: string;
}

type CardWriting = 'manually' | 'scanned';

export const NewCard = ({}: NewCardProps) => {
  const [card, setCard] = useState<Card>({} as Card);

  const [compatible, setCompatible] = useState(null);
  const [cardWritingType, setCardWritingType] = React.useState<CardWriting>(
    'manually'
  );

  const navigation = useNavigation();

  const onChangeTextCard = (field: keyof Card, newValue: any) => {
    setCard((preview) => {
      return { ...preview, [field]: newValue };
    });
  };
  const checkCompatible = useCallback(async () => {
    const isCompatible = await Cardscan.isSupportedAsync();
    setCompatible(isCompatible);
  }, [setCompatible]);

  useEffect(() => {
    checkCompatible();
  }, []);

  const scanCard = useCallback(async () => {
    // TODO customizar ScanView
    const { action, scanId, payload, canceledReason } = await Cardscan.scan();

    if (action === 'scanned') {
      setCardWritingType('scanned');
      let issuer = payload.issuer || '??';
      if (issuer === 'MasterCard') {
        issuer = 'master-card';
      } else if (issuer === 'American Express') {
        issuer = 'american-express';
      } else {
        issuer = issuer.toLowerCase();
      }
      setCard({
        CVC: payload.cvc ?? '',
        expiration:
          payload.expiryMonth && payload.expiryYear
            ? `${payload.expiryMonth}/${payload.expiryYear}`
            : '',
        holder: payload.cardholderName,
        number: payload.number,
      });
    }

    if (action === 'canceled') {
      if (canceledReason === 'enter_card_manually') {
        Alert.alert('Enter card manually');
      }

      if (canceledReason === 'user_canceled') {
        Alert.alert('User canceled scan');
      }

      if (canceledReason === 'camera_error') {
        Alert.alert('Camera error during scan');
      }

      if (canceledReason === 'fatal_error') {
        Alert.alert('Processing error during scan');
      }

      if (canceledReason === 'unknown') {
        Alert.alert('Unknown reason for scan cancellation');
      }
    }
  }, [setCard]);

  const canAddCard = useCallback((): boolean => {
    const { CVC, expiration, holder, number } = card;

    if (CVC?.length && expiration?.length && holder?.length && number?.length) {
      return true;
    }
    return false;
  }, [card]);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <Box>
        <TopBarBackButton showShadow />

        <Box
          overflow={'hidden'}
          // height={'80%'}
          paddingHorizontal={20}
          pt={'md'}
        >
          <Box
            mb={'xxs'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Adicionar cartão
            </Typography>
            {compatible || cardWritingType !== 'scanned' ? (
              <Button onPress={scanCard}>
                <Box flexDirection="row" alignItems="center">
                  <Box mr="nano">
                    <Icon name="Cam" size={25} />
                  </Box>
                  <Typography>Escanear Cartão</Typography>
                </Box>
              </Button>
            ) : (
              <Box />
            )}
          </Box>
          {/* {cardWritingType === 'scanned' ? (
            <Box width={'70%'}>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                Agora, digite o CVV do seu cartão. Geralmente, fica localizado
                no verso.{' '}
              </Typography>
            </Box>
          ) : (
            <Box alignItems="center">
              <CreditCardDisplay
                number={card.number}
                cvc={card.CVC}
                expiration={card.expiration}
                name={card.holder}
                backImage={images.cardImage}
                frontImage={images.cardImage}
              />
            </Box>
          )} */}
          <Box alignItems="center">
            <CreditCardDisplay
              width={('100%' as unknown) as number}
              number={card.number}
              cvc={card.CVC}
              expiration={card.expiration}
              name={card.holder}
              backImage={images.cardImage}
              frontImage={images.cardImage}
              fontColorCvc="white"
              fontSize={12}
              numberContainerStyles={
                card.number
                  ? {
                      borderWidth: 1,
                      borderColor: 'red',
                      borderRadius: 6,
                      width: '60%',
                      alignItems: 'center',
                      paddingVertical: 4,
                    }
                  : {}
              }
              nameContainerStyles={
                card.holder
                  ? {
                      borderWidth: 1,
                      borderColor: 'red',
                      borderRadius: 6,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: 4,
                      paddingVertical: 5,
                    }
                  : {}
              }
              expirationContainerStyles={{
                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 3,
                alignItems: 'center',
                paddingHorizontal: 4,
                paddingVertical: 5,
              }}
            />
          </Box>
          <Box>
            <Box mt={'xxxs'}>
              <TextField
                height={55}
                placeholder="Nome do titular"
                value={card.holder}
                onChangeText={(val) => onChangeTextCard('holder', val)}
                iconRight={
                  <Box ml="nano">
                    <Icon color="neutroFrio2" name="Card" size={25} />
                  </Box>
                }
              />
            </Box>
            <Box mt={'xxxs'}>
              <TextField
                maskType="credit-card"
                height={55}
                placeholder="Número do cartão"
                value={card.number}
                onChangeText={(val) => onChangeTextCard('number', val)}
                iconRight={
                  <Box ml="nano">
                    <Icon color="neutroFrio2" name="Card" size={25} />
                  </Box>
                }
              />
            </Box>
            <Box mt={'xxxs'} flexDirection="row">
              <Box flex={1} mr="xxxs">
                <TextField
                  height={55}
                  maskType="custom"
                  maskOptions={{
                    mask: '99/99',
                  }}
                  placeholder="Vencimento"
                  value={card.expiration}
                  onChangeText={(val) => onChangeTextCard('expiration', val)}
                  iconRight={
                    <Box ml="nano">
                      <Icon color="neutroFrio2" name="Card" size={25} />
                    </Box>
                  }
                />
              </Box>
              <Box flex={1}>
                <TextField
                  height={55}
                  maskType="custom"
                  maskOptions={{
                    mask: '999',
                  }}
                  placeholder="CVC"
                  value={card.CVC}
                  onChangeText={(val) => onChangeTextCard('CVC', val)}
                  iconRight={
                    <Box ml="nano">
                      <Icon color="neutroFrio2" name="Card" size={25} />
                    </Box>
                  }
                />
              </Box>
            </Box>
            <Box mt="xs" alignItems="center" justifyContent="center">
              <Toggle
                value={false}
                label="Tornar esse meu endereço principal"
                color="neutroFrio2"
                thumbColor="vermelhoAlerta"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex={1} justifyContent="flex-end">
        <Button
          disabled={!canAddCard()}
          title="ADICIONAR CARTÃO"
          variant="primarioEstreito"
          fontFamily="nunitoRegular"
          onPress={() => console.log('prin')}
          fontSize={13}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
