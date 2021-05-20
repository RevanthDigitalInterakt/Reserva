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

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const NearbyStores: React.FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} pt={"sm"}>
          <Box paddingX={"xxxs"} mb={"xxs"} alignSelf={"flex-start"}>
            <Typography variant="tituloSessoes">
              Lojas próximas da sua região
            </Typography>
          </Box>

          <Box paddingX={"xxxs"} bg="divider">
            <ItemStoresAddress
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
            />

            <ItemStoresAddress
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
            />

            <ItemStoresAddress
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
            />

            <ItemStoresAddress
              local={"Shopping Praia Grande"}
              address={
                "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
              }
            />
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

interface IItemStoresAddress {
  local: string;
  address: string;
}
const ItemStoresAddress = ({ local, address }: IItemStoresAddress) => {
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
          title={"IR ATÉ A LOJA"}
          onPress={() => {}}
          variant={"primarioEstreito"}
          width={"100%"}
        />
      </Box>
    </Box>
  );
};
