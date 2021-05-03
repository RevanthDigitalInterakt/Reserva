import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Icon, TextField, Toggle, Typography } from 'reserva-ui';
import CreditCardDisplay from 'react-native-credit-card-display';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { Alert, SafeAreaView } from 'react-native';
import { images } from '../../../assets';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import Cardscan from 'react-native-cardscan';
import { borderWidth } from 'styled-system';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

interface Card {
  holder: string;
  number: string;
  expiration: string;
  CVC: string;
}

type CardWriting = 'manually' | 'scanned';

interface Props {
  cardOne: Card;
  onChangeCardOne: (value: React.SetStateAction<Card>) => void;
  cardTwo: Card;
  onChangeCardTwo: (value: React.SetStateAction<Card>) => void;
  handleNewTwoCards: boolean;
  setHandleNewTwoCards: (value: boolean) => void;
}

export const CardCheckout = ({
  cardOne,
  onChangeCardOne,
  cardTwo,
  onChangeCardTwo,
  setHandleNewTwoCards,
  handleNewTwoCards,
}: Props) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isFlippedCardTwo, setIsFlippedCardTwo] = React.useState(false);

  const [compatible, setCompatible] = useState(null);
  const [cardWritingType, setCardWritingType] = React.useState<CardWriting>(
    'manually'
  );

  const onChangeTextCardOne = (field: keyof Card, newValue: any) => {
    onChangeCardOne((preview) => {
      return { ...preview, [field]: newValue };
    });
  };

  const onChangeTextCardTwo = (field: keyof Card, newValue: any) => {
    onChangeCardTwo((preview) => {
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
      onChangeCardOne({
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
  }, [onChangeCardOne]);

  const canAddCard = useCallback((): boolean => {
    const { CVC, expiration, holder, number } = cardOne;

    if (CVC?.length && expiration?.length && holder?.length && number?.length) {
      return true;
    }
    return false;
  }, [cardOne]);

  return (
    <Box>
      <Box mt={'md'} overflow={'hidden'} paddingHorizontal={20}>
        <Box
          mb={'xxs'}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize={20} fontFamily="reservaSerifRegular">
            Adicionar Cartão
          </Typography>
          {!handleNewTwoCards && compatible && cardWritingType !== 'scanned' ? (
            <Button onPress={scanCard}>
              <Box flexDirection="row" alignItems="center">
                <Box mr="nano">
                  <Icon name="Cam" size={16} />
                </Box>
                <Typography>Escanear Cartão</Typography>
              </Box>
            </Button>
          ) : (
            <Box />
          )}
        </Box>

        <Button
          mb="xxs"
          width={'100%'}
          onPress={() => setHandleNewTwoCards(!handleNewTwoCards)}
        >
          <Box alignSelf="flex-start">
            <Toggle
              onValueChange={setHandleNewTwoCards}
              value={handleNewTwoCards}
              label="Usar dois cartões diferentes na compra"
              color="neutroFrio2"
              thumbColor="vermelhoAlerta"
            />
          </Box>
        </Button>

        <Box alignItems="center">
          {handleNewTwoCards && (
            <Box
              flexDirection="row"
              alignSelf="flex-start"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              mb="xxs"
            >
              <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                Cartão 1
              </Typography>
              {compatible && cardWritingType !== 'scanned' ? (
                <Button onPress={scanCard}>
                  <Box flexDirection="row" alignItems="center">
                    <Box mr="nano">
                      <Icon name="Cam" size={16} />
                    </Box>
                    <Typography>Escanear Cartão</Typography>
                  </Box>
                </Button>
              ) : (
                <Box />
              )}
            </Box>
          )}
          <CreditCardDisplay
            flipped={isFlipped}
            width={('100%' as unknown) as number}
            number={cardOne.number}
            cvc={cardOne.CVC}
            expiration={cardOne.expiration}
            name={cardOne.holder}
            backImage={images.cardVerso}
            frontImage={images.cardFront}
            fontColorCvc="white"
            fontSize={12}
            numberContainerStyles={
              cardOne.number
                ? {
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 6,
                    width: '45%',
                    alignItems: 'center',
                    paddingVertical: 4,
                  }
                : {}
            }
            nameContainerStyles={
              cardOne.holder
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
              marginTop: 9,
              transform: [{ translateX: 5 }],
            }}
          />
        </Box>
        <Box>
          <Box mt={'xxxs'}>
            <TextField
              height={55}
              placeholder="Nome do titular"
              value={cardOne.holder}
              onChangeText={(val) => onChangeTextCardOne('holder', val)}
              iconRight={
                <Box ml="nano">
                  <Icon color="neutroFrio2" name="HelpCircle" size={16} />
                </Box>
              }
            />
          </Box>
          <Box mt={'xxxs'}>
            <TextField
              maskType="credit-card"
              height={55}
              placeholder="Número do cartão"
              value={cardOne.number}
              onChangeText={(val) => onChangeTextCardOne('number', val)}
              iconRight={
                <Box ml="nano">
                  <Icon color="neutroFrio2" name="HelpCircle" size={16} />
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
                value={cardOne.expiration}
                onChangeText={(val) => onChangeTextCardOne('expiration', val)}
                iconRight={
                  <Box ml="nano">
                    <Icon color="neutroFrio2" name="HelpCircle" size={16} />
                  </Box>
                }
              />
            </Box>
            <Box flex={1}>
              <TextField
                height={55}
                maxLength={3}
                keyboardType="numeric"
                placeholder="CVC"
                value={cardOne.CVC}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                onChangeText={(val) => onChangeTextCardOne('CVC', val)}
                iconRight={
                  <Box ml="nano">
                    <Icon color="neutroFrio2" name="CreditCard" size={16} />
                  </Box>
                }
              />
            </Box>
          </Box>
        </Box>

        {
          //CARD 2

          handleNewTwoCards && (
            <Box my="md">
              <Box alignItems="center">
                {handleNewTwoCards && (
                  <Box
                    flexDirection="row"
                    alignSelf="flex-start"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    mb="xxs"
                  >
                    <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                      Cartão 2
                    </Typography>
                    {compatible && cardWritingType !== 'scanned' ? (
                      <Button onPress={scanCard}>
                        <Box flexDirection="row" alignItems="center">
                          <Box mr="nano">
                            <Icon name="Cam" size={16} />
                          </Box>
                          <Typography>Escanear Cartão</Typography>
                        </Box>
                      </Button>
                    ) : (
                      <Box />
                    )}
                  </Box>
                )}
                <CreditCardDisplay
                  flipped={isFlippedCardTwo}
                  width={('100%' as unknown) as number}
                  number={cardTwo.number}
                  cvc={cardTwo.CVC}
                  expiration={cardTwo.expiration}
                  name={cardTwo.holder}
                  backImage={images.cardVerso}
                  frontImage={images.cardFront}
                  fontColorCvc="white"
                  fontSize={12}
                  numberContainerStyles={
                    cardTwo.number
                      ? {
                          borderWidth: 1,
                          borderColor: 'red',
                          borderRadius: 6,
                          width: '45%',
                          alignItems: 'center',
                          paddingVertical: 4,
                        }
                      : {}
                  }
                  nameContainerStyles={
                    cardTwo.holder
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
                    marginTop: 9,
                    transform: [{ translateX: 5 }],
                  }}
                />
              </Box>
              <Box>
                <Box mt={'xxxs'}>
                  <TextField
                    height={55}
                    placeholder="Nome do titular"
                    value={cardTwo.holder}
                    onChangeText={(val) => onChangeTextCardTwo('holder', val)}
                    iconRight={
                      <Box ml="nano">
                        <Icon color="neutroFrio2" name="HelpCircle" size={16} />
                      </Box>
                    }
                  />
                </Box>
                <Box mt={'xxxs'}>
                  <TextField
                    maskType="credit-card"
                    height={55}
                    placeholder="Número do cartão"
                    value={cardTwo.number}
                    onChangeText={(val) => onChangeTextCardTwo('number', val)}
                    iconRight={
                      <Box ml="nano">
                        <Icon color="neutroFrio2" name="HelpCircle" size={16} />
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
                      value={cardTwo.expiration}
                      onChangeText={(val) =>
                        onChangeTextCardTwo('expiration', val)
                      }
                      iconRight={
                        <Box ml="nano">
                          <Icon
                            color="neutroFrio2"
                            name="HelpCircle"
                            size={16}
                          />
                        </Box>
                      }
                    />
                  </Box>
                  <Box flex={1}>
                    <TextField
                      height={55}
                      maxLength={3}
                      keyboardType="numeric"
                      placeholder="CVC"
                      value={cardTwo.CVC}
                      onFocus={() => setIsFlippedCardTwo(true)}
                      onBlur={() => setIsFlippedCardTwo(false)}
                      onChangeText={(val) => onChangeTextCardTwo('CVC', val)}
                      iconRight={
                        <Box ml="nano">
                          <Icon
                            color="neutroFrio2"
                            name="CreditCard"
                            size={16}
                          />
                        </Box>
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        }
      </Box>
    </Box>
  );
};
