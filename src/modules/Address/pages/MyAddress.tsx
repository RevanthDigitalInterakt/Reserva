import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, HomeCard, BottomBar, Button } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";
import { TopBarComum } from "../../Menu/components/TopBarComum";
const MyAddress = () => {
  //TODO : change the first icon from trash to Check.
  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarComum />
      <Box
        overflow={"hidden"}
        height={"75%"}
        paddingHorizontal={20}
        justifyContent="flex-start"
        paddingTop={49}
      >
        <Box alignSelf={"flex-start"} marginBottom={18}>
          <Typography
            fontSize={20}
            fontFamily="reservaSerifRegular"
            fontSize={20}
          >
            Meus endereços
          </Typography>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </Box>
      <Button title={"ADICIONAR ENDEREÇO"} variant="primarioEstreitoOutline" />
    </SafeAreaView>
  );
};

export default MyAddress;
