import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";

import { Typography, TextField, Box, Button, Toggle } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useRoute } from "@react-navigation/core";

type Props = StackScreenProps<RootStackParamList, "NewAddress">;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const id = route?.params;

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
                {id ? (
                  <Typography fontSize={20} fontFamily="reservaSerifRegular">
                    Editar endereço
                  </Typography>
                ) : (
                  <Typography fontSize={20} fontFamily="reservaSerifRegular">
                    Adicionar endereço
                  </Typography>
                )}
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

              {id && (
                <Button
                  mt={"xs"}
                  onPress={() => {}}
                  title={"SALVAR ALTERAÇÕES"}
                  variant="primarioEstreitoOutline"
                />
              )}
            </Box>
          </Box>
        </ScrollView>
        {!id && (
          <Button title="INCLUIR ENDEREÇO" variant="primarioEstreito" inline />
        )}
      </SafeAreaView>
    </>
  );
};

export default NewAddress;
