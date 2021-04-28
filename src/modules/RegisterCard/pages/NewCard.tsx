import React from 'react';
import { Box, Button, Icon, TextField, Toggle, Typography } from 'reserva-ui';
import CreditCardDisplay from 'react-native-credit-card-display';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { images } from '../../../assets';
import { ScrollView } from 'react-native-gesture-handler';

interface NewCardProps {}
interface Card {
  holder: string;
  number: string;
  expiration: string;
  CVC: string;
}
const NewCard = ({}: NewCardProps) => {
  const [card, setCard] = React.useState<Card>({} as Card);

  const onChangeTextCard = (field: keyof Card, newValue: any) => {
    setCard((preview) => {
      return { ...preview, [field]: newValue };
    });
  };
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
            mb={'xxxs'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Meus cartões
            </Typography>
            <Box>
              <Typography>Escanear Cartão</Typography>
            </Box>
          </Box>
          <Box alignItems="center">
            <CreditCardDisplay
              number={card.number}
              cvc={card.CVC}
              expiration={card.expiration}
              name={card.holder}
              //   frontStyles={{}}
              //   backStyles={{}}
              backImage={images.cardImage}
              frontImage={images.cardImage}
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
                  placeholder="CCV"
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
          title="ADICIONAR CARTÃO"
          variant="primarioEstreito"
          fontFamily="nunitoRegular"
          fontSize={13}
          inline
        />
      </Box>
    </SafeAreaView>
  );
};
export default NewCard;
