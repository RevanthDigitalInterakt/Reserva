import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { TopBar } from "reserva-ui";
import { Typography, Box, Button, Icon } from "reserva-ui";

interface IAdressSelector {
  select?: () => void;
  edit?: () => void;
  deleteAddress?: () => void;
  title?: string;
  address?: string;
  zipcode?: string;
  selected: boolean;
}

const AddressSelector = ({
  selected,
  select,
  edit,
  deleteAddress,
  title,
  address,
  zipcode,
}: IAdressSelector) => {
  //TODO: check icon before title
  return (
    <>
      <TouchableOpacity onPress={select}>
        <Box
          borderBottomWidth={"hairline"}
          borderColor={"#D8D9DA"}
          width="100%"
          backgroundColor="white"
          flexDirection="row"
          marginTop={18}
        >
          <Box width={24} marginRight={10}>
            {selected && <Icon name="Trash" color="preto" size={24} />}
          </Box>
          <Box>
            <Typography fontWeight="SemiBold" fontFamily="nunito" fontSize={16}>
              {title}
            </Typography>
            <Box marginTop={7} marginBottom={6}>
              <Typography variant="tituloSessao" fontSize={13}>
                {address}
              </Typography>
            </Box>

            <Typography variant="tituloSessao" fontSize={13}>
              {zipcode}
            </Typography>

            <Box
              flexDirection="row"
              marginBottom={18.1}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button underline title="editar" color="preto" />
              <TouchableOpacity onPress={deleteAddress}>
                <Icon marginLeft={24.7} name="Trash" color="preto" size={24} />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default AddressSelector;
