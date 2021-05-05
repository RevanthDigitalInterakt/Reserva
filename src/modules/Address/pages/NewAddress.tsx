import React, { useRef } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { Typography, TextField, Box, Button, Toggle } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import {
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from "react-native-masked-text";
type Props = StackScreenProps<RootStackParamList, "NewAddress">;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { id } = route?.params;
  const [toggleActivated, setToggleActivated] = React.useState(false);
  const [zipcode, setZipcode] = React.useState("");

  const { isCheckout } = route.params;

  return (
    <>
      <SafeAreaView
        flex={1}
        style={{ justifyContent: "space-between" }}
        backgroundColor="white"
      >
        <TopBarBackButton showShadow />
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <Box pb="sm">
            <Box paddingX={"xxxs"} justifyContent="flex-start" pt={"sm"}>
              <Box alignSelf={"flex-start"} mb={"nano"}>
                {id ? (
                  <Typography variant="tituloSessoes">
                    Editar endereço
                  </Typography>
                ) : (
                  <Typography variant="tituloSessoes">Entrega</Typography>
                )}
              </Box>
              <Box>
                <Typography variant={"tituloSessao"}>
                  Receba em casa ou no endereço de sua preferência
                </Typography>
              </Box>

              <InputOption
                placeholder={"Digite seu CEP"}
                maskType={"zip-code"}
                value={zipcode}
                onChangeText={() => {}}
              />

              <Box flexDirection={"row"} justifyContent="space-between">
                <Box flex={1} marginRight={"micro"}>
                  <InputOption
                    placeholder={"Digite seu estado"}
                    onChangeText={() => {}}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption
                    placeholder={"Digite sua cidade"}
                    onChangeText={() => {}}
                  />
                </Box>
              </Box>

              <InputOption placeholder={"Endereço"} onChangeText={() => {}} />

              <Box flexDirection={"row"} justifyContent="space-between">
                <Box flex={1} marginRight={"micro"}>
                  <InputOption
                    placeholder={"Digite seu bairro"}
                    onChangeText={() => {}}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption placeholder={"Número"} onChangeText={() => {}} />
                </Box>
              </Box>

              <InputOption
                placeholder={"Complemento"}
                onChangeText={() => {}}
              />

              <Box mt="xs" mb="xxxs">
                <Toggle
                  label="A entrega é para presente"
                  color="preto"
                  thumbColor="vermelhoAlerta"
                  value={toggleActivated}
                  onValueChange={() => {
                    setToggleActivated(!toggleActivated);
                    scrollViewRef.current &&
                      scrollViewRef.current.scrollToEnd({ animated: true });
                  }}
                />
              </Box>

              {toggleActivated && (
                <Box mb={"sm"}>
                  <InputOption
                    placeholder={"Nome do destinatário"}
                    onChangeText={() => {}}
                  />

                  <InputOption
                    placeholder={"Telefone para contato"}
                    onChangeText={() => {}}
                  />

                  <InputOption
                    height={135}
                    textAlignVertical={"top"}
                    placeholder={"Deseja enviar algum recado junto?"}
                    onChangeText={() => {}}
                  />
                </Box>
              )}

              {id && !isCheckout && (
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
        {isCheckout && (
          <Button
            onPress={() => navigation.navigate("PaymentMethodScreen")}
            title="FORMA DE PAGAMENTO"
            variant="primarioEstreito"
            inline
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default NewAddress;

interface IInputOption {
  label?: string;
  placeholder?: string;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
  value?: string;
  height?: number;
  textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined;
  onChangeText?: (value: string) => void;
}
const InputOption = ({
  label,
  placeholder,
  maskType,
  maskOptions,
  value,
  height,
  textAlignVertical,
  onChangeText,
}: IInputOption) => {
  return (
    <>
      <Box mt={"xxxs"}>
        <TextField
          // label={"Nome do titular"}
          textAlignVertical={textAlignVertical}
          height={height}
          maskType={maskType}
          maskOptions={maskOptions}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
        />
      </Box>
    </>
  );
};
