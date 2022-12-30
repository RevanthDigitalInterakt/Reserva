import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Button, Icon, Image, Typography } from '@usereservaapp/reserva-ui';
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
    <Button onPress={onPressCard}>
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
        <Box flexDirection="row" flex={1} alignItems="center">
          {isMain && <Icon name="Check" color="preto" size={12} />}

          <Box mr="xxxs" ml={isMain && 'nano'} >
            <Image source={images[flag]} resizeMode="center" />
          </Box>
          <Typography variant="precoAntigo3">
            ****{cardNumbers.substring(12)}
          </Typography>
        </Box>

        <Button
          hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
          onPress={onPressTrash}
          height={'100%'}
          alignItems="center"
          justifyContent="center"
        >
          <Icon name="Trash" color="preto" size={22} />
        </Button>
      </Box>
    </Button>
  );
};
export default Card;
