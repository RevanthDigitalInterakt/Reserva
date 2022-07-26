import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

export const withAuthentication = (Component: React.FC, comeFrom: string) => ({
  ...props
}) => {
  const { cookie } = useAuth();
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (cookie === null) {
  //     navigation.navigate("Login", { comeFrom });
  //   }
  // }, [cookie]);

  return <Component {...props} />;
};
