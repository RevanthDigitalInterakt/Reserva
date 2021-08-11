import React from "react";
import { View, Text } from "react-native";
import { Icon } from "reserva-ui";

const CallCenter = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Loading...</Text>
      <Icon name="Call" color="preto" size={20} />
    </View>
  );
};

export default CallCenter;
