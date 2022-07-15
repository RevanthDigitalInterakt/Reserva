import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography, Box, Button, Icon, theme } from '@danilomsou/reserva-ui';

export interface Delivery {
  id?: string;
  name?: string;
  price?: number;
  shippingEstimate?: string;
}
interface IDeliverySelector {
  select?: () => void;
  deliveryData: Delivery;
  selected: boolean;
  disabled?: boolean;
}

const DeliverySelector = ({
  selected,
  select,
  deliveryData,
  disabled,
}: IDeliverySelector) => {
  const { name, price, shippingEstimate, id } = deliveryData;
  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={select}>
        <Box
          bg="white"
          borderWidth="hairline"
          borderColor="preto"
          width="100%"
          height={84}
          flexDirection="row"
          p="nano"
          alignItems="center"
        >
          <Box
            height={50}
            width={50}
            justifyContent="center"
            alignItems="center"
          >
            <Box m={'nano'} alignItems="center">
              <Box width="10%">
                <Box
                  height={20}
                  width={20}
                  borderRadius="infinity"
                  borderWidth="thin"
                  alignItems="center"
                  justifyContent="center"
                >
                  {selected && (
                    <Box
                      height={10}
                      width={10}
                      borderRadius="nano"
                      bg="preto"
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            alignContent={'center'}
            flex={1}
            marginX="micro"
            borderRightWidth="hairline"
            borderColor="divider"
            marginLeft="nano"
          >
            <Typography
              fontFamily="reservaSerifRegular"
              fontSize={16}
              lineHeight={21}
            >
              {name}
            </Typography>
            <Typography
              style={{ flexWrap: 'wrap' }}
              fontFamily="nunitoRegular"
              fontSize={13}
              lineHeight={16}
            >
              Em até {shippingEstimate?.split('bd')[0]} dias úteis
            </Typography>
          </Box>
          <Box width="25%" alignItems="center">
            {price && price > 0 ? (
              <Box alignItems="center">
                <Typography>
                  R$ {(price / 100).toFixed(2).replace('.', ',')}
                </Typography>
              </Box>
            ) : (
              <Box
                borderRadius="infinity"
                bg="verdeSucesso"
                borderColor="verdeSucesso"
                px="nano"
                py="nano"
                alignItems="center"
                width={74}
                height={31}
              >
                <Typography
                  color="white"
                  fontFamily="nunitoRegular"
                  fontSize={11}
                  letterSpacing={1.6}
                >
                  GRÁTIS
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default DeliverySelector;
