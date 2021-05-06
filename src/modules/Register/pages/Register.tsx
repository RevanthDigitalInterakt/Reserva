import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { RegisterStep1 } from "./steps/Step1";
import { RegisterStep2 } from "./steps/Step2";
import { RegisterStep3 } from "./steps/Step3";
import { RegisterStep4 } from "./steps/Step4";
import { RegisterStep5 } from "./steps/Step5";
import { Wizard } from "./Wizard";

type Props = StackScreenProps<RootStackParamList, "Register">;

export const Register: React.FC<Props> = ({ route }) => {
  const { comeFrom } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <Wizard comeFrom={comeFrom}>
        <RegisterStep1 />
        <RegisterStep2 />
        <RegisterStep3 />
        <RegisterStep4 />
        <RegisterStep5 comeFrom={comeFrom} />
      </Wizard>
    </SafeAreaView>
  );
};
