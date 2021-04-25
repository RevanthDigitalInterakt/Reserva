import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, TextField, Box, Button, Toggle } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
const AddressList = () => {
  const [zipcode, setZipcode] = React.useState("");

  return (
    <>
      <SafeAreaView
        flex={1}
        style={{ justifyContent: "space-between" }}
        backgroundColor="white"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <TopBarBackButton showShadow />
            <Box paddingX={"xxxs"} justifyContent="flex-start" pt={"md"}>
              <Box alignSelf={"flex-start"} mb={"xxxs"}>
                <Typography fontSize={20} fontFamily="reservaSerifRegular">
                  Adicionar endereço
                </Typography>
              </Box>

              <Box mt={"xxxs"}>
                <TextField
                  value={zipcode}
                  height={55}
                  placeholder="Digite seu CEP"
                  maskType="zip-code"
                />
              </Box>
              <Box mt={"xxxs"}>
                <TextField height={55} placeholder="Endereço" />
              </Box>
              <Box flexDirection="row" justifyContent="space-between">
                <Box mt={"xxxs"} width={"50%"}>
                  <TextField height={55} placeholder="Digite seu Bairro" />
                </Box>
                <Box mt={"xxxs"} width={"45%"}>
                  <TextField height={55} placeholder="Digite seu estado" />
                </Box>
              </Box>

              <Box mt={"xxxs"}>
                <TextField height={55} placeholder="Número" />
              </Box>
              <Box mt={"xxxs"}>
                <TextField height={55} placeholder="Complemento" />
              </Box>

              <Box alignSelf="center" mt="xs">
                <Toggle
                  label="Tornar esse meu endereço principal"
                  color="neutroFrio2"
                  thumbColor="vermelhoAlerta"
                />
              </Box>
            </Box>
          </Box>
        </ScrollView>
        <Button title="INCLUIR ENDEREÇO" variant="primarioEstreito" inline />
      </SafeAreaView>
    </>
  );
};

export default AddressList;
