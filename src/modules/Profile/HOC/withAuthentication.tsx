import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";

export const withAuthentication = (Component: React.FC, comeFrom: string) => ({
  ...props
}) => {
  const navigation = useNavigation();
  const { profile } = useSelector((state: ApplicationState) => state);
  const { authentication } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    if (!authentication.data?.access_token && !authentication.loading) {
      navigation.navigate("LoginAlternative", { comeFrom });
    }
  }, [authentication]);

  return authentication.data ? <Component {...props} /> : null;
};
