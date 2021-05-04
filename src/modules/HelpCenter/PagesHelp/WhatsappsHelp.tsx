import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Image, Button } from "reserva-ui";
import { images } from "../../../assets";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

type ItemWhatsappProps = {
  local: string;
  address: string;
  whatsapp: string;
};

export const WhatsappsHelp: React.FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const ItemWhatsapp = ({ local, address, whatsapp }: ItemWhatsappProps) => {
    return (
      <Box
        boxShadow={Platform.OS === "ios" ? "topBarShadow" : null}
        width={"100%"}
        height={171}
        backgroundColor={"white"}
        style={{ elevation: 5 }}
        mt={"xxs"}
      >
        <Box
          height={160}
          borderColor={"backgroundMenuOpened"}
          paddingY={"xxxs"}
          paddingX={"xxxs"}
        >
          <Box mb={"nano"} flexDirection="row">
            <Box>
              <Image
                height={40}
                source={images.localReserva}
                resizeMode={"contain"}
              />
            </Box>
            <Box>
              <Box mb={"quarck"}>
                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  {local}
                </Typography>
              </Box>
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                {address}
              </Typography>
            </Box>
          </Box>

          <Button
            title={"WHATSAPP"}
            onPress={() => {
              Linking.openURL(
                `whatsapp://send?text=Olá quero comprar!&phone=${whatsapp}`
              );
            }}
            variant={"primarioEstreitoOutline"}
            width={"100%"}
          />
        </Box>
      </Box>
    );
  };

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} pt={"xs"}>
          <Box paddingX={"xxxs"}>
            <Box mb={"nano"} alignSelf={"flex-start"}>
              <Typography variant={"tituloSessoes"}>
                Whatsapp
              </Typography>
            </Box>

            <Typography fontSize={14} fontFamily="nunitoRegular" color="preto">
              Selecione seu estado e cidade para falar com um vendedor da loja
              mais próxima das 10h ás 21h.
            </Typography>

            <Box mt={"nano"}>
              <Typography
                fontSize={14}
                fontFamily="nunitoRegular"
                color="preto"
              >
                Dúvidas com seu pedido?
              </Typography>
            </Box>
          </Box>

          <Box mt={"micro"} mb={"xs"}>
            <Button
              variant={"primarioEstreito"}
              title={"FALE COM O SAC"}
              width={"80%"}
            />
          </Box>

          <Box paddingX={"xxxs"} bg="backgoundInput">
            <ItemWhatsapp
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
              whatsapp={"99 99999 9999"}
            />

            <ItemWhatsapp
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
              whatsapp={"99 99999 9999"}
            />

            <ItemWhatsapp
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
              whatsapp={"99 99999 9999"}
            />

            <ItemWhatsapp
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
              whatsapp={"99 99999 9999"}
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
