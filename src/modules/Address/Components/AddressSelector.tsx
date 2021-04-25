import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { theme, TopBar } from "reserva-ui";
import { Typography, Box, Button, Icon } from "reserva-ui";

// TODO: REFACTOR THIS MARGINS, DONT'T USE NUMBERS, USE TOKENS NAMES

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
  return (
    <>
      <TouchableOpacity onPress={select}>
        <Box
          borderBottomWidth={"hairline"}
          borderColor={"divider"}
          width="100%"
          backgroundColor="white"
          flexDirection="row"
          mt={"xxxs"}
        >
          {/* //TODO:  change trash to check */}
          <Box width={24} mr={"micro"}>
            {selected && <Icon name="Check" color="preto" size={24} />}
          </Box>
          <Box paddingX="micro">
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              {title}
            </Typography>
            <Box mt="nano" mb="quarck">
              <Typography
                style={{ flexWrap: "wrap" }}
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
              mb={"xxxs"}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button onPress={edit} pb={"quarck"}>
                <Typography style={{ textDecorationLine: "underline" }}>
                  editar
                </Typography>
              </Button>
              <TouchableOpacity onPress={deleteAddress}>
                <Icon ml={"xxs"} name="Trash" color="preto" size={24} />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

export default AddressSelector;
