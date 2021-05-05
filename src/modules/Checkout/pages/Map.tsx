import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Platform } from "react-native";
import { Typography, Box, Button, Image, Divider, Icon } from "reserva-ui";
import { images } from "../../../assets";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export const MapScreen = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [markers, setMarkers] = useState([
    {
      latitude: -20.312225246494084,
      longitude: -40.28799595837181,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    {
      latitude: -22.99146412201489,
      longitude: -43.383208321806656,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    {
      latitude: -22.98577509792866,
      longitude: -43.36054902034232,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
  ]);
  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const coords = pos.coords;
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    });
  }, []);

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />

      <Box flex={2}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={position}
        >
          <Marker coordinate={position}>
            <Box>
              <Image
                height={40}
                source={images.pinYou}
                resizeMode={"contain"}
              />
            </Box>
          </Marker>
          {markers.map((marker, index) => (
            <Marker key={index} coordinate={marker}>
              <Image
                height={40}
                source={images.localReserva}
                resizeMode={"contain"}
              />
            </Marker>
          ))}
        </MapView>
        <Box position={"absolute"} right={20} bottom={20}>
          <Button
            height={40}
            width={40}
            bg="white"
            borderRadius={"infinity"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon name={"Crosshair"} size={30} color={"preto"} />
          </Button>
        </Box>
      </Box>
      <Box flex={1}>
        <ScrollView>
          <Box paddingX={"xxxs"}>
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
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

interface IItemStoresAddress {
  local: string;
  address: string;
}
const ItemStoresAddress = ({ local, address }: IItemStoresAddress) => {
  return (
    <>
      <Box width={"100%"} backgroundColor={"white"} my={"micro"}>
        <Box borderColor={"backgroundMenuOpened"}>
          <Box flexDirection="row">
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
        </Box>
      </Box>
      <Divider variant={"fullWidth"} />
    </>
  );
};
