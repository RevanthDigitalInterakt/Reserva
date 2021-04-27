import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Box, Button, Icon, Typography, Alert } from 'reserva-ui';
import { SafeAreaView, ScrollView } from 'react-native';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Card, { FlagTypes } from '../components/Card';

interface MyCardsScreenProps {}
interface CardProps {
  cardNumber: string;
  flag?: FlagTypes;
  main: boolean;
  id: string;
}
export const MyCardsScreen = ({}: MyCardsScreenProps) => {
  const [cards, setCards] = React.useState<CardProps[]>([
    {
      cardNumber: '3000400050006000',
      flag: 'elo',
      main: false,
      id: '01',
    },
    {
      cardNumber: '3000400050006000',
      flag: 'mastercard',
      main: true,
      id: '02',
    },
    {
      cardNumber: '3000400050006000',
      flag: 'visa',
      main: false,
      id: '03',
    },
  ]);
  const [cardSelected, setCardSelected] = React.useState<CardProps>(
    {} as CardProps
  );

  const [isVisibleModalCard, setIsVisibleModalCard] = React.useState(false);
  const [isVisibleModalTrash, setIsVisibleModalTrash] = React.useState(false);
  const [isVisibleSuccessTrash, setIsVisibleSuccessTrash] = React.useState(
    false
  );

  const handleDeleteCard = (id: string) => {
    const restCards = cards.filter((card) => card.id !== id);
    setCards(restCards);
  };

  const handleMainCard = (id: string) => {
    const changeMain = cards.map((card) => {
      if (card.main) {
        card.main = false;
      }
      if (card.id === id) {
        card.main = true;
      }
      return card;
    });

    setCards(changeMain);
    setIsVisibleModalCard(false);
  };

  return (
    <>
      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton showShadow />

        <Box
          overflow={'hidden'}
          // height={'80%'}
          paddingHorizontal={20}
          pt={'md'}
        >
          <Box mb={'xxxs'}>
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Meus cartões
            </Typography>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            {cards.map((card) => {
              const { cardNumber, flag, main, id } = card;
              return (
                <Card
                  key={id}
                  flag={flag}
                  isMain={main}
                  cardNumbers={cardNumber}
                  onPressCard={() => {
                    setCardSelected(card);
                    setIsVisibleModalCard(true);
                  }}
                  onPressTrash={() => {
                    setCardSelected(card);
                    setIsVisibleModalTrash(true);
                  }}
                />
              );
            })}
          </ScrollView>
        </Box>
        <Button
          mt="xs"
          onPress={() => {}}
          title={'ADICIONAR CARTÃO'}
          variant="primarioEstreitoOutline"
        />
      </SafeAreaView>
      <Alert
        isVisible={isVisibleSuccessTrash}
        title={'Seu cartão foi excluído com sucesso'}
        confirmText={'OK'}
        onConfirm={() => {
          setIsVisibleSuccessTrash(false);
        }}
        onClose={() => {
          setIsVisibleModalTrash(false);
        }}
      />
      <Alert
        isVisible={isVisibleModalCard}
        title={'Cartão padrão'}
        subtitle={`Tem certeza que deseja tornar o cartão **** ${cardSelected?.cardNumber?.substring(
          12
        )} seu cartão principal?`}
        confirmText={'SIM'}
        cancelText={'NÃO'}
        onConfirm={() => {
          handleMainCard(cardSelected.id);
        }}
        onCancel={() => {
          setIsVisibleModalCard(false);
          setCardSelected({} as CardProps);
        }}
        onClose={() => {
          setIsVisibleModalCard(false);
          setCardSelected({} as CardProps);
        }}
      />

      <Alert
        isVisible={isVisibleModalTrash}
        title={'Excluir cartão'}
        subtitle={`Tem certeza que deseja excluir o cartão salvo?`}
        confirmText={'SIM'}
        cancelText={'NÃO'}
        onConfirm={() => {
          handleDeleteCard(cardSelected.id);
          setIsVisibleSuccessTrash(true);
          setIsVisibleModalTrash(false);
        }}
        onCancel={() => {
          setIsVisibleModalTrash(false);
        }}
        onClose={() => {
          setIsVisibleModalTrash(false);
        }}
      />
    </>
  );
};
