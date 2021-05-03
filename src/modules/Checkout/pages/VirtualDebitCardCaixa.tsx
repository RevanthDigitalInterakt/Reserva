import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Button, Icon, Divider, TextField } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import {
  TextInputMask,
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from "react-native-masked-text";

export const VirtualDebitCardCaixaScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box marginBottom={"xxs"}>
            <Typography fontFamily={"reservaSerifRegular"} fontSize={20}>
              Cartão de Débito Virtual Caixa
            </Typography>
          </Box>

          <InputOption
            placeholder={"Nome do titular"}
            iconName={"HelpCircle"}
            onPressIcon={() => {}}
          />

          <InputOption
            placeholder={"Número do cartão"}
            iconName={"HelpCircle"}
            maskType={"credit-card"}
            onChangeText={() => {}}
            onPressIcon={() => {}}
          />
          <Box flexDirection={"row"}>
            <Box width={"55%"}>
              <InputOption
                placeholder={"Vencimento"}
                iconName={"HelpCircle"}
                maskType={"datetime"}
                maskOptions={{
                  format: "MM/YYYY",
                }}
                onChangeText={() => {}}
                onPressIcon={() => {}}
              />
            </Box>
            <Box width="5%" />
            <Box width="40%">
              <InputOption placeholder={"CVV"} iconName={"CreditCard"} />
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Button
        onPress={() =>
          navigation.navigate("SummaryScreen", { paymentType: "Debit" })
        }
        title="ADICIONAR CARTÃO"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};

interface IInputOption {
  label?: string;
  placeholder?: string;
  iconName: string;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
  onChangeText?: (value: string) => void;
  onPressIcon?: () => void;
}
const InputOption = ({
  label,
  placeholder,
  iconName,
  maskType,
  maskOptions,
  onChangeText,
  onPressIcon,
}: IInputOption) => {
  return (
    <>
      <Box marginBottom={"xxs"}>
        <TextField
          // label={"Nome do titular"}
          maskType={maskType}
          maskOptions={maskOptions}
          onChangeText={onChangeText}
          placeholder={placeholder}
          iconRight={
            onPressIcon ? (
              <Button
                variant={"icone"}
                onPress={onPressIcon}
                icon={<Icon name={iconName} color={"preto"} size={16} />}
              />
            ) : (
              <Icon name={iconName} color={"preto"} size={16} />
            )
          }
        />
      </Box>
    </>
  );
};
