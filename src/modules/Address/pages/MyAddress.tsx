import * as React from "react";
import { SafeAreaView } from "react-native";

import { Typography, Box, HomeCard, BottomBar } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";

const MyAddress = () => {
  //TODO : change the first icon from trash to Check.
  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <Box
        variant="container"
        paddingHorizontal={20}
        justifyContent="flex-start"
        paddingTop={49}
      >
        <Box alignSelf={"flex-start"} marginBottom={18}>
          <Typography fontWeight="bold" variant="tituloSessao" fontSize={20}>
            Meus endereços
          </Typography>
        </Box>

        <AddressSelector
          address={
            "R. Tomas antonio gonzaga, 123, Apto 101, Cristovao colombo, Vila velha - ES"
          }
          title={"Casa"}
          zipcode={"29.123-456"}
          deleteAddress={() => {
            console.log("delete o endeereço");
          }}
          edit={() => {
            console.log("editar endereço");
          }}
          selected={true}
        />

        <AddressSelector
          address={
            "R. Tomas antonio gonzaga, 123, Apto 101, Cristovao colombo, Vila velha - ES"
          }
          title={"Casa"}
          zipcode={"29.123-456"}
          deleteAddress={() => {
            console.log("delete o endeereço");
          }}
          edit={() => {
            console.log("editar endereço");
          }}
          selected={false}
        />
      </Box>
    </SafeAreaView>
  );
};

export default MyAddress;
