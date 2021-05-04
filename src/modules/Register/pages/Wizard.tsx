import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ProgressBar } from "reserva-ui";
import { useEffect } from "react";
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo";
import * as Animatable from "react-native-animatable";

export interface IUserData {
  cpf: string;
  name: string;
  mail: string;
  birth_date: string;
  password: string;
  confirm_password: string;
}

export const Wizard: React.FC<{
  children: React.ReactElement[];
}> = ({ children }) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [percentStep, setPercentStep] = useState(0);
  const [userData, setUserData] = useState<IUserData>({
    cpf: "",
    name: "",
    mail: "",
    birth_date: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    setPercentStep(children.length);
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleNextStep = () => {
    if (currentStep !== children.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteRegistration = () => {
    setCurrentStep(percentStep);
  };

  const handlePrevStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      {currentStep !== 0 && (
        <Animatable.View animation="fadeIn">
          <ProgressBar
            colorBar="neutroFrio1"
            colorProgress="neutroFrio2"
            bg="neutroFrio1"
            p={25}
            value={currentStep}
            max={percentStep}
            barHeight={3}
            colorLabel="neutroFrio2"
            showPercent
          />
        </Animatable.View>
      )}
      <TopBarBackButtonWithoutLogo
        showShadow={false}
        backButtonPress={() => handlePrevStep()}
      />
      {React.Children.map(children, (el, index) => {
        if (currentStep === index) {
          return React.cloneElement(el, {
            nextStep: handleNextStep,
            setUserData,
            userData,
            handleCompleteRegistration,
          });
        }
        return null;
      })}
    </SafeAreaView>
  );
};
