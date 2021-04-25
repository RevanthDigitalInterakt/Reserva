import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, TextField, Box, Button, Alert } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
const AddressList = () => {
  return (
    <>
      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton showShadow />
        <Box paddingX={"xxxs"} justifyContent="flex-start" pt={"md"}>
          <Box alignSelf={"flex-start"} mb={"xxxs"}>
            <Typography fontSize={20} fontFamily="reservaSerifRegular">
              Adicionar endereço
            </Typography>
          </Box>

          <Box mt={"xxxs"}>
            <TextField
              height={55}
              placeholder="Digite seu CEP"
              maskType="zip-code"
            />
          </Box>
          <Box mt={"xxxs"}>
            <TextField
              value={zipcode}
              onChangeText={(text) => setZipcode(text)}
              placeholder="Digite seu CEP"
              maskType="zip-code"
            />
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Box mt={"xxxs"} width={"54%"}>
              <TextField
                value={zipcode}
                onChangeText={(text) => setZipcode(text)}
                placeholder="Digite seu CEP"
                maskType="zip-code"
              />
            </Box>
            <Box mt={"xxxs"} width={"43%"}>
              <TextField
                value={zipcode}
                onChangeText={(text) => setZipcode(text)}
                placeholder="Digite seu CEP"
                maskType="zip-code"
              />
            </Box>
          </Box>

          <Box mt={"xxxs"}>
            <TextField
              value={zipcode}
              onChangeText={(text) => setZipcode(text)}
              placeholder="Digite seu CEP"
              maskType="zip-code"
            />
          </Box>
          <Box mt={"xxxs"}>
            <TextField
              value={zipcode}
              onChangeText={(text) => setZipcode(text)}
              placeholder="Digite seu CEP"
              maskType="zip-code"
            />
          </Box>
        </Box>
      </SafeAreaView>
      <Button title="INCLUIR ENDEREÇO" variant="primarioEstreito" inline />
    </>
  );
};

export default AddressList;
