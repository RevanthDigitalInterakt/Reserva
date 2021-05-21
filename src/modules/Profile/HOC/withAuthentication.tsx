import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";

export const withAuthentication = (Component: React.FC, { ...props }) => ({
  ...props
}) => {
  const navigation = useNavigation();
  const { profile } = useSelector((state: ApplicationState) => state);
  const { authentication } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    if (!authentication || !authentication.data?.access_token) {
      navigation.navigate("LoginAlternative");
    }
  }, [authentication]);

  return profile.data ? <Component {...props} /> : null;
};
