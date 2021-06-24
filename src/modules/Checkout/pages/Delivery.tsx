import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, Platform } from "react-native";
import { Typography, Box, Button, Icon, Divider } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { withAuthentication } from "../../Profile/HOC/withAuthentication";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { request, checkMultiple, PERMISSIONS, RESULTS, } from 'react-native-permissions';

const Delivery: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { authentication } = useSelector((state: ApplicationState) => state);
  const [Permission, setPermission] = useState(false)
  const [mapPermission, setMapPermission] = useState(false)

  const requestMap = async () => {
    try {
      const lacationAlways = await request(
        PERMISSIONS.IOS.LOCATION_ALWAYS);
      const lacationInUse = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      );
      const fineLoation = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      )
      if (lacationAlways === 'granted' || lacationInUse === 'granted' || fineLoation === 'granted') {
        setPermission(true)
      }
    } catch (error) {
    }
  }

  const CkeckmapPermission = async () => {
    try {
      const check = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      ]);
      if (check["ios.permission.LOCATION_WHEN_IN_USE"] === 'granted' || check["ios.permission.LOCATION_ALWAYS"] === 'granted' || check["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
        setMapPermission(true)
      }
    } catch (err) {
    }
  }

  useEffect(() => {
    if (authentication.data?.access_token) {
      requestMap();
    }
  }, [authentication])


  useEffect(() => {
    CkeckmapPermission();
  }, [Permission])

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box>
            <Typography variant={"tituloSessoes"}>Entrega</Typography>
          </Box>

          <Box marginTop={"xs"} marginBottom={"xxxs"}>
            <Typography variant={"subtituloSessoes"}>
              Escolha a forma de envio
            </Typography>
          </Box>
          <SelectOption
            title={"Retirar na loja"}
            subtitle={mapPermission ? "Segunda-feira, 06 de maio de 2021" : ""}
            onPress={() =>
              mapPermission ?
                navigation.navigate('MapScreen', { geolocation: "", locationPermission: mapPermission })
                :
                navigation.navigate("WithdrawInStore", { isCheckout: true, })
            }
            divider
          />
          <SelectOption
            title={"Receber em casa"}
            subtitle={mapPermission ? "Segunda-feira, 7 de maio de 2021" : ""}
            onPress={() =>
              navigation.navigate("AddressList", { isCheckout: true })
            }
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

interface ISelectOption {
  title: string;
  subtitle?: string;
  divider?: boolean;
  onPress?: () => void;
}
const SelectOption = ({ title, subtitle, divider, onPress }: ISelectOption) => {
  return (
    <>
      <Button flexDirection={"row"} onPress={onPress}>
        <Box
          flexDirection={"row"}
          alignItems={"center"}
          flex={1}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography variant={"tituloSessao"}>{title}</Typography>
            <Typography
              fontFamily={"nunitoSemiBold"}
              fontSize={13}
              color={"verdeSucesso"}
            >
              {subtitle}
            </Typography>
          </Box>
          <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
        </Box>
      </Button>
      {divider && <Divider variant={"fullWidth"} marginY={"micro"} />}
    </>
  );
};

export const DeliveryScreen = withAuthentication(Delivery, "Checkout");
