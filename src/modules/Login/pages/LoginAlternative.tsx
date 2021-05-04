import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
  Typography,
  Box,
  Image,
  Button
} from "reserva-ui";
import { images } from "../../../assets";
import { ModalLoginAlternative } from "./ModalLoginAlternative";


export const LoginAlternative: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
      <ScrollView>
        <ModalLoginAlternative isVisible={isVisible} />
        <Image source={images.bannerLogin} height={578} width="100%" />
        <Box 
          flex={1} 
          marginLeft="xxs" 
          marginTop="xxs"
          marginBottom="xxs"
          marginRight="xxs" 
          justifyContent="center"
        >
          <Typography fontFamily="reservaSerifRegular" fontSize={24} textAlign="center">
            Identifique-se para continuar sua navegação
          </Typography>
        </Box>
        <Box flexDirection="row" justifyContent="center">
          <Button 
            padding="micro" 
            height={50} 
            width={150}
            bg="preto" 
            color="white" 
            title="CRIAR CONTA" 
          />
          <Button 
            padding="micro" 
            height={50} 
            marginLeft="xxxs"
            width={150}
            title="ENTRAR"
            onPress={() => {
              setIsVisible(true);
            }}
            borderColor="preto"
            borderWidth={1}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
