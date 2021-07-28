import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { theme, TopBar } from 'reserva-ui';
import { Typography, Box, Button, Icon } from 'reserva-ui';

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
}

const AddressSelector = ({
  selected,
  select,
  edit,
  deleteAddress,
  editAndDelete,
  addressData,
}: IAddressesSelector) => {
  const { address, title, zipcode, id } = addressData;
  return (
    <>
      <TouchableOpacity onPress={select}>
        <Box
          bg="white"
          borderBottomWidth={'hairline'}
          borderColor={'divider'}
          width="100%"
          flexDirection="row"
          mt={'xxxs'}
        >
          <Box width={24} mr={'micro'}>
            {selected && <Icon name="Check" color="preto" size={24} />}
          </Box>
          <Box paddingX="micro" flex={1}>
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              {title}
            </Typography>
            <Box mt="nano" mb="quarck">
              <Typography
                style={{ flexWrap: 'wrap' }}
                fontFamily="nunitoRegular"
                fontSize={12}
              >
                {address}
              </Typography>
            </Box>

            <Typography fontFamily="nunitoRegular" fontSize={12}>
              {zipcode}
            </Typography>

            <Box
              flexDirection="row"
              mb={'xxxs'}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              {editAndDelete &&
                <>
                  <Button
                    onPress={edit}
                    pb={'quarck'}
                    hitSlop={{ top: 10, left: 10, bottom: 30, right: 10 }}
                  >
                    <Typography style={{ textDecorationLine: 'underline' }}>
                      editar
                    </Typography>
                  </Button>

                  <Button
                    hitSlop={{ top: 10, left: -10, bottom: 30, right: 10 }}
                    onPress={deleteAddress}
                  >
                    <Icon ml={'xxs'} name="Trash" color="preto" size={24} />
                  </Button>
                </>
              }
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default AddressSelector;
