import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Platform, FlatList } from "react-native";
import { Typography, Box, Button, Image, Divider, Icon } from "reserva-ui";
import { images } from "../../../assets";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";

type Props = StackScreenProps<RootStackParamList, "MapScreen">;
export const MapScreen = ({ route }: Props) => {
  const { geolocation, locationPermission } = route?.params;
  const navigation = useNavigation();

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [positionCep, setPositionCep] = useState({
    latitude: -20.3559106,
    longitude: -40.3202333,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
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

  const listOfStores = [
    {
      id: 1,
      local: "Shopping Praia Grande",
      address: "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
    },
    {
      id: 2,
      local: "Shopping Praia Grande",
      address: "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
    },
    {
      id: 3,
      local: "Shopping Praia Grande",
      address: "Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260"
    }
  ]

  const getGeolocation = () => {
    if (locationPermission) {
      Geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      });
    }
  }
  //Pega a posição do usuário
  useEffect(() => {
    getGeolocation()
  }, []);

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />

      <Box flex={2}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 2 }}
          initialRegion={geolocation?.toString() != "" ? positionCep : position}
        >
          <Marker coordinate={geolocation?.toString() != "" ? positionCep : position}>
            {/* Posição do usuário */}
            <Box>
              <Image
                height={40}
                source={images.pinYou}
                resizeMode={"contain"}
              />
            </Box>
          </Marker>
          {markers?.map((marker, index) => (
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
        <FlatList
          data={listOfStores}
          renderItem={({ item }) => (
            <>
              <Button
                width={"100%"}
                onPress={() => { navigation.navigate("PaymentMethodScreen") }}
              >
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
                            {item.local}
                          </Typography>
                        </Box>
                        <Typography fontFamily="nunitoRegular" fontSize={14}>
                          {item.address}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Button>
              <Divider variant={"fullWidth"} />
            </>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </Box>
    </SafeAreaView >
  );
};
