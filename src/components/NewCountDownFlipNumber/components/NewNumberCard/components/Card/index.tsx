import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import testProps from "../../../../../../utils/testProps";

interface ICard {
  type: "upper" | "lower";
  number: any;
  testID: string;
}

export function Card({ type, number, testID }: ICard) {
  return (
    <View
      style={
        styles({
          upper: type === "upper",
        }).card
      }
      {...testProps(testID)}
    >
      <Text
        style={
          styles({
            upper: type === "upper",
          }).number
        }
        {...testProps("com.usereserva:id/card_number")}
      >
        {number}
      </Text>
    </View>
  );
}
