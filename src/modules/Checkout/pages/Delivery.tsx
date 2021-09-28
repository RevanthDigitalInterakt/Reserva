import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, Platform, FlatList } from "react-native";
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
import AddressSelector from "../../Address/Components/AddressSelector";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { profileQuery } from "../../../store/ducks/profile/types";
import { AddressTypes } from "../../../store/ducks/address/types";

const Delivery: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm } = useCart();
  const { cookie, setCookie } = useAuth()
  const { authentication } = useSelector((state: ApplicationState) => state);
  const [Permission, setPermission] = useState(false)
  const [mapPermission, setMapPermission] = useState(false)
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const { loading: loadingProfile, data, refetch } = useQuery(profileQuery, { fetchPolicy: "no-cache" });
  const [profile, setProfile] = useState<any>({});
  const [typesOfDelivery, setTypesOfDelivery] = useState<any>([]);

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
    const typeOfDeliveries = orderForm?.shippingData?.logisticsInfo[0].slas.filter((x) => {
      if (x.deliveryChannel === 'delivery') return true;
      return false
    })
    console.log("Types", typeOfDeliveries)
    setTypesOfDelivery(typeOfDeliveries)
  }, [])


  useEffect(() => {
    CkeckmapPermission();
  }, [Permission])

  useEffect(() => {
    const availableAddressesOrderForm =
      orderForm &&
      orderForm?.shippingData &&
      orderForm?.shippingData.availableAddresses
        .map((a) => ({ ...a, country: "BRA" }));

    if (cookie) {
      const { addresses } = profile;
      setAddresses(addresses);
    } else {
      if (availableAddressesOrderForm &&
        availableAddressesOrderForm?.length > 0) {
        setAddresses(availableAddressesOrderForm);
      }
    }
  }, [orderForm, profile]);

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box>
            <Typography variant={"tituloSessoes"}>Entrega</Typography>
          </Box>

          <Box marginTop={"nano"} marginBottom={"xxxs"}>
            <Typography
              variant={"subtituloSessoes"}
              color="preto"
              fontFamily="nunitoExtraBold"
              fontSize="14px"
            >
              Escolha abaixo se você prefere receber no conforto do seu lar ou retirar em uma de nossas lojas. Nesta opção o frete é grátis.
            </Typography>
          </Box>

          <Box paddingY="micro" flexDirection="row" justifyContent="center">
            <Box width={1 / 2} >
              <Button
                onPress={() => { }}
                marginRight="nano"
                marginLeft="micro"
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline={true}
                height={40}
                bg="dropDownBorderColor"
              >
                <Typography
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontSize="14px"
                  style={{ textTransform: "uppercase" }}
                >
                  Receber em casa
                </Typography>
              </Button>
            </Box>

            <Box width={1 / 2}>
              <Button
                marginRight="micro"
                marginLeft="nano"
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline={true}
                height={40}
                onPress={() => { }}
              >
                <Typography
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontSize="14px"
                  style={{ textTransform: "uppercase" }}
                >
                  Retirar na loja
                </Typography>
              </Button>
            </Box>
          </Box>

          <Box marginTop={"xs"}>
            <Typography
              variant={"subtituloSessoes"}
              color="preto"
              fontFamily="nunitoSemiBold"
              fontSize="14px"
              style={{ textTransform: "uppercase" }}
            >
              Selecione o tipo de entrega
            </Typography>
          </Box>

          <Box
            pt={"micro"}
            overflow={"hidden"}
            flex={1}
            justifyContent="flex-start"
          >
            {typesOfDelivery && typesOfDelivery.length > 0 ? (
              <FlatList
                style={{ marginBottom: 20 }}
                showsVerticalScrollIndicator={false}
                data={typesOfDelivery}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  let selected;
                  const {
                    id,
                    name,
                    shippingEstimate,
                    price
                  } = item;

                  return (
                    <Box
                      borderWidth="hairline"
                      width="100%"
                      flex={1}
                      mt='nano'
                      flexDirection="row"
                    >
                      <Box
                        width="100"
                      >

                      </Box>
                      <Box alignContent={"center"} bg="dropDownBorderColor">
                        <Typography>
                          {name}
                        </Typography>
                        <Typography>
                          Em até {shippingEstimate?.split('bd')[0]} dias úteis</Typography>
                      </Box>
                      {price > 0 ?
                        <Box>
                          <Typography>
                            R$ {price / 100}
                          </Typography>
                        </Box>
                        : <Box>
                          <Typography>Grátis</Typography>
                        </Box>
                      }
                    </Box>
                  )
                }}
              />
            ) : null}
          </Box>

          <Box marginTop={"xs"} marginBottom={"xxxs"}>
            <Typography
              variant={"subtituloSessoes"}
              color="preto"
              fontFamily="nunitoSemiBold"
              fontSize="14px"
              style={{ textTransform: "uppercase" }}
            >
              Selecione o tipo de entrega
            </Typography>
          </Box>

          <Box
            overflow={"hidden"}
            paddingHorizontal={20}
            flex={1}
            justifyContent="flex-start"
            pt={"md"}
          >
            {addresses && addresses.length > 0 ? (

              <FlatList
                style={{ marginBottom: 20 }}
                showsVerticalScrollIndicator={false}
                data={addresses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  let selected;
                  const {
                    id,
                    city,
                    complement,
                    number,
                    postalCode,
                    state,
                    street,
                    neighborhood,
                    addressId,
                    addressType,
                  } = item;

                  if (cookie) {
                    if (selectedAddress) {
                      selected = id === selectedAddress.id && item;
                    }
                  } else {
                    if (selectedAddress) {
                      selected = addressId === selectedAddress.addressId && item;
                    }
                  }

                  return (
                    <AddressSelector
                      addressData={{
                        address: `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`,
                        title: street,
                        zipcode: postalCode,
                      }}
                      deleteAddress={() => {

                      }}
                      editAndDelete={() => { }}
                      edit={() => {
                        navigation.navigate("NewAddress", {
                          edit: true,
                          editAddress: {
                            id,
                            postalCode,
                            state,
                            city,
                            street,
                            neighborhood,
                            number,
                            complement,
                            addressType
                          },
                        });
                      }}
                      selected={selected}
                      select={() => {

                      }}
                    />
                  );
                }}
              />
            ) : (
              <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                Você ainda não tem endereços cadastrados, clique em Novo Endereço
                e cadastre
              </Typography>
            )}
          </Box>
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
