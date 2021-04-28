import React from 'react';
import { Box, Button, Icon, Image, Typography } from 'reserva-ui';
import { images } from '../../../assets';

export type FlagTypes = 'elo' | 'mastercard' | 'visa' | 'americanExpress';
interface CardProps {
  cardNumbers: string;
  isMain?: boolean;
  flag: FlagTypes;
  onPressCard: () => void;
  onPressTrash: () => void;
}

const Card = ({
  flag,
  cardNumbers,
  isMain,
  onPressCard,
  onPressTrash,
}: CardProps) => {
  return (
    <Box
      bg="backgoundDivider"
      width={'100%'}
      height={47}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="xxs"
      my="quarck"
    >
      <Button onPress={onPressCard}>
        <Box flexDirection="row" flex={1} alignItems="center">
          {isMain && <Icon name="Check" color="preto" size={12} />}

          <Box mr="xxxs" ml={isMain && 'nano'}>
            <Icon name="Card" size={20} />
          </Box>
          <Typography variant="precoAntigo3">
            ****{cardNumbers.substring(-1, 4)}
          </Typography>
        </Box>
      </Button>

      <Button
        onPress={onPressTrash}
        height={'100%'}
        alignItems="center"
        justifyContent="center"
      >
        <Icon name="Trash" color="preto" size={22} />
      </Button>
    </Box>
  );
};
export default Card;
