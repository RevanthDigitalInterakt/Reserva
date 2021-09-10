import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, Platform } from "react-native";
import { Typography, Box, Button, Icon, Divider } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { withAuthentication } from "../../Profile/HOC/withAuthentication";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { request, checkMultiple, PERMISSIONS, RESULTS, } from 'react-native-permissions';
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { add, addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Delivery: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm } = useCart();
  const { cookie, setCookie } = useAuth()
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
    requestMap();
  }, [])


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
          <Box flex={1}>
            <Button
              flex={1}
              width="100%"
              onPress={() =>
                mapPermission ?
                  navigation.navigate('MapScreen', { geolocation: "", locationPermission: mapPermission })
                  :
                  navigation.navigate("WithdrawInStore", { isCheckout: true, })
              }
            >
              <Box width="100%" >
                <Box
                  flex={1}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography>Retirar na loja</Typography>
                  </Box>
                  <Box height={20} bg="#EF1E1E" borderRadius="pico">
                    <Box marginLeft="nano" marginRight="sm">
                      <Typography
                        fontFamily="reservaSerifRegular"
                        fontSize={15}
                        color="white">
                        Recomendado: sem frete!
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box
                  mt="nano"
                  flexDirection={"row"}
                  alignItems={"center"}
                  flex={1}
                  justifyContent={"space-between"}

                >
                  <Box flex={2}>
                    <Typography fontFamily="nunitoRegular" fontSize={11} color="neutroFrio2">
                      Ao escolher esta opção vamos apresentar opções de lojas próximas a você
                    </Typography>
                  </Box>
                  <Box flex={1} alignItems="flex-end">
                    <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
                  </Box>
                </Box>
                {/* <Box alignSelf="flex-start" mt="quarck">
                  <Typography
                    fontFamily={"nunitoSemiBold"}
                    fontSize={13}
                    color={"verdeSucesso"}
                  >
                    Segunda-feira, 05 de abril de 2021
                  </Typography>
                </Box> */}
              </Box>
            </Button>
            <Divider variant={"fullWidth"} marginY={"micro"} />
            <Button
              flex={1}
              width="100%"
              height={80}
              onPress={() =>
                navigation.navigate("AddressList", { isCheckout: true })
              }
            >
              <>
                <Box
                  width="100%"
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography>Receber em casa</Typography>
                  </Box>

                </Box>

                <Box
                  mt="nano"
                  flexDirection={"row"}
                  alignItems={"center"}
                  flex={1}
                  justifyContent={"space-between"}
                >
                  {orderForm?.shippingData?.address &&
                    <Box flex={2}>
                      <Typography fontFamily="nunitoRegular" fontSize={11} color="neutroFrio2">
                        {orderForm?.shippingData?.address?.street} - {orderForm?.shippingData?.address?.neighborhood}
                      </Typography>
                      <Box mt="quarck">
                        <Typography fontFamily="nunitoRegular" fontSize={11} color="neutroFrio2">
                          CEP {orderForm?.shippingData?.address?.postalCode}
                        </Typography>
                      </Box>

                    </Box>
                  }
                  <Box flex={1} alignItems="flex-end">
                    <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
                  </Box>
                </Box>
                {orderForm && orderForm?.shippingData?.logisticsInfo[0].slas.length > 0 &&
                  <Box alignSelf="flex-start" mt="quarck">
                    <Typography
                      fontFamily={"nunitoSemiBold"}
                      fontSize={13}
                      color={"verdeSucesso"}
                    >
                      {format(
                        addDays(Date.now(), parseInt(orderForm?.shippingData?.logisticsInfo[0]?.slas[0]?.shippingEstimate?.split('bd')[0])),
                        "iiii, dd 'de' MMMM 'de' yyyy", { locale: ptBR }
                      )}
                    </Typography>
                  </Box>
                }
              </>
            </Button>
          </Box>
          {/* <SelectOption
            title={"Retirar na loja"}
            subtitle={mapPermission ? "Segunda-feira, 06 de maio de 2021" : ""}
            onPress={() =>
              mapPermission ?
                navigation.navigate('MapScreen', { geolocation: "", locationPermission: mapPermission })
                :
                navigation.navigate("WithdrawInStore", { isCheckout: true, })
            }
            divider
          /> */}
          {/* <SelectOption
            title={"Receber em casa"}
            subtitle={mapPermission ? "Segunda-feira, 7 de maio de 2021" : ""}
            onPress={() =>
              navigation.navigate("AddressList", { isCheckout: true })
            }
          /> */}

          {/* <SelectOption
            title={"wbeview"}
            subtitle={"S123123123"}
            onPress={() => navigation.navigate("Checkout")}
          /> */}
        </Box>
      </ScrollView>
    </SafeAreaView >
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

export const DeliveryScreen = Delivery;
