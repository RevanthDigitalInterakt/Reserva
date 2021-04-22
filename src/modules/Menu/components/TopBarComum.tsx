import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { TopBar, Icon, Box } from "reserva-ui";

export const TopBarComum: React.FC<{}> = () => {
  const navigation = useNavigation();

  //TODO : add shadow under the box
  return (
    <Box
      boxShadow="bottomBarShadow"
      width={"100%"}
      height={50}
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      paddingHorizontal={20}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="ArrowBack" color="preto" size={24} />
      </TouchableOpacity>
      <Icon name="Logo" size={24} />
      <Icon name="" color="preto" size={24} />
    </Box>
  );
};
