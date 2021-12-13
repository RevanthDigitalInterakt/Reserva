import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useEffect } from 'react';
import { Box, Button, Icon, Typography, Alert } from 'reserva-ui';
import { BackHandler, SafeAreaView, ScrollView } from 'react-native';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import Card, { FlagTypes } from '../Components/Card';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useQuery } from '@apollo/client';
import { profileQuery } from '../../../graphql/profile/profileQuery';

interface ListCardsScreenProps {}
interface CardProps {
  cardNumber: string;
  id: string;
}

type Props = StackScreenProps<RootStackParamList, 'ListCards'>;

export const ListCards = ({ navigation, route }: Props) => {
  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [cards, setCards] = React.useState<CardProps[]>();
  const [cardSelected, setCardSelected] = React.useState<CardProps>(
    {} as CardProps
  );

  const [isVisibleModalCard, setIsVisibleModalCard] = React.useState(false);
  const [isVisibleModalTrash, setIsVisibleModalTrash] = React.useState(false);
  const [isVisibleSuccessTrash, setIsVisibleSuccessTrash] =
    React.useState(false);
  const modalTrash = useRef(false);

  const { isCheckout, cashback } = route.params;

  const handleDeleteCard = (id: string) => {
    // const restCards = cards.filter((card) => card.id !== id);
    // const cardsMain = restCards.filter((card) => card.main);
    // if (restCards.length && !cardsMain.length) {
    //   restCards[0].main = true;
    // }
    // setCards(restCards);
  };

  const handleMainCard = (id: string) => {
    // const changeMain = cards.map((card) => {
    //   if (card.main) {
    //     card.main = false;
    //   }
    //   if (card.id === id) {
    //     card.main = true;
    //   }
    //   return card;
    // });
    // setCards(changeMain);
    // setIsVisibleModalCard(false);
  };

  useEffect(() => {
    if (data) {
      const { profile } = data;
      setCards(profile.payments);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  return (
    <>
      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton loading={loading} showShadow />

        <Box
          overflow={'hidden'}
          // height={'80%'}
          paddingHorizontal={20}
          pt={'md'}
        >
          <Box mb={'xs'}>
            <Typography variant="tituloSessoes">Meus cartões</Typography>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            {cards &&
              cards.length > 0 &&
              cards.map((card) => {
                const { cardNumber, id } = card;
                return (
                  <Card
                    key={id}
                    flag="visa"
                    // isMain={main}
                    cardNumbers={cardNumber}
                    onPressCard={() => {
                      setCardSelected(card);
                      // if (!card.main) {
                      //   setIsVisibleModalCard(true);
                      // }
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
          onPress={() =>
            navigation.navigate('NewCard', {
              isCheckout: isCheckout,
            })
          }
          inline
          marginX="xl"
          title={'ADICIONAR CARTÃO'}
          variant="primarioEstreitoOutline"
          padding="xl"
        />
        {isCheckout && (
          <Box flex={1} justifyContent="flex-end">
            <Button
              variant="primarioEstreito"
              inline
              title="PRÓXIMO"
              onPress={() =>
                navigation.navigate('SummaryScreen', {
                  paymentType: 'Credit',
                  cashback: cashback,
                })
              }
            />
          </Box>
        )}
      </SafeAreaView>
      <Alert
        isVisible={isVisibleSuccessTrash}
        title={'Seu cartão foi excluído com sucesso'}
        confirmText={'OK'}
        onConfirm={() => {
          modalTrash.current = false;
          setIsVisibleSuccessTrash(false);
          setIsVisibleModalTrash(false);
        }}
        onClose={() => {
          setIsVisibleModalTrash(false);
        }}
      />
      <Alert
        isVisible={!isVisibleSuccessTrash && isVisibleModalCard}
        title={'Cartão padrão'}
        subtitle={`Deseja definir o cartão **** ${cardSelected?.cardNumber?.substring(
          12
        )} como principal?`}
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
        onModalHide={() => {
          modalTrash.current && setIsVisibleSuccessTrash(true);
        }}
        isVisible={isVisibleModalTrash}
        title={'Excluir cartão'}
        subtitle={`Tem certeza que deseja excluir o cartão salvo?`}
        confirmText={'SIM'}
        cancelText={'NÃO'}
        onConfirm={() => {
          handleDeleteCard(cardSelected.id);
          modalTrash.current = true;
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
