import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";

export const withAuthentication = (Component: React.FC) => ({ ...props }) => {
  const navigation = useNavigation();
  const { profile } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    navigation.navigate("LoginAlternative");
  }, [profile]);

  return !profile ? <Component {...props} /> : null;
};
