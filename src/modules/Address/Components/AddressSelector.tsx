import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  theme, Typography, Box, Button, Icon,
} from '@usereservaapp/reserva-ui';

export interface Address {
  id?: string;
  title?: string;
  address?: string;
  zipcode?: string;
}
interface IAddressesSelector {
  select?: () => void;
  edit?: () => void;
  deleteAddress?: () => void;
  addressData: Address;
  editAndDelete?: boolean;
  selected: boolean;
  disabled?: boolean;
}

const AddressSelector = ({
  selected,
  select,
  disabled,
  edit,
  deleteAddress,
  editAndDelete,
  addressData,
}: IAddressesSelector) => {
  const { address, title, zipcode } = addressData;

  const CEP = useMemo(() => {
    if (zipcode) {
      return `${zipcode
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')}`;
    }
    return '';
  }, [zipcode]);

  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={select}>
        <Box
          bg="white"
          borderWidth="hairline"
          borderColor="preto"
          width="100%"
          height="auto"
          flexDirection="row"
          p="nano"
          mt="xxxs"
          alignItems="center"
        >
          <Box
            height={50}
            width={50}
            alignItems="center"
            justifyContent="center"
          >
            <Box m="nano" alignItems="center">
              <Box width="10%">
                <Box
                  height={15}
                  width={15}
                  borderRadius="infinity"
                  borderWidth="hairline"
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
          <Box paddingX="quarck" mt="nano" flex={1}>
            <Typography
              fontFamily={theme.fonts.nunitoBold}
              fontSize={13}
              lineHeight={18}
            >
              {title}
            </Typography>
            <Box mb="nano">
              <Typography
                style={{ flexWrap: 'wrap' }}
                fontFamily="nunitoRegular"
                fontSize={13}
                lineHeight={16}
              >
                {address}
              </Typography>
            </Box>

            <Box flexDirection="row" width="100%">
              <Box width={1 / 2}>
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={13}
                  lineHeight={16}
                >
                  CEP:
                  {CEP}
                </Typography>
              </Box>

              <Box
                width={1 / 2}
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                {editAndDelete && (
                  <>
                    <Box flexDirection="row">
                      <Button
                        onPress={edit}
                        pb="quarck"
                        hitSlop={{
                          top: 10, left: 10, bottom: 30, right: 10,
                        }}
                      >
                        <Typography
                          fontFamily="nunitoRegular"
                          fontSize={13}
                          lineHeight={16}
                          style={{ textDecorationLine: 'underline' }}
                        >
                          editar
                        </Typography>
                      </Button>

                      <Button
                        hitSlop={{
                          top: 10,
                          left: -10,
                          bottom: 30,
                          right: 10,
                        }}
                        onPress={deleteAddress}
                      >
                        <Icon ml="xxs" name="Trash" color="preto" size={15} />
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default AddressSelector;
