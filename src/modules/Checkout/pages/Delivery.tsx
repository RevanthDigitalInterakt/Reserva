import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, Platform, FlatList, TouchableOpacity } from "react-native";
import { Typography, Box, Button, Icon, Divider, Image } from "reserva-ui";
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
import { images } from '../../../assets';

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
  const [typeOfDelivery, setTypeOfDelivery] = useState<any>([]);
  const [selectMethodDelivery, setSelectMethodDelivery] = useState(false)

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

  const onAddressChosen = (item: any) => {
    setSelectedAddress({ ...item, addressType: "residential" });
  };

  useEffect(() => {
    requestMap();
  }, [])

  useEffect(() => {
    const typeOfDeliveries = orderForm?.shippingData?.logisticsInfo[0].slas.filter((x) => {
      if (x.deliveryChannel === 'delivery') return true;
      return false
    })
    console.log("Types", typeOfDeliveries)
    setTypeOfDelivery(typeOfDeliveries)
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
                onPress={() => { setSelectMethodDelivery(false) }}
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
                onPress={() => { setSelectMethodDelivery(true) }}
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

          {selectMethodDelivery ? Store() :
            <>
              <Box marginTop={"xs"}>
                <Typography
                  variant={"subtituloSessoes"}
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontWeight="bold"
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
                {typeOfDelivery && typeOfDelivery.length > 0 ? (
                  <FlatList
                    style={{ marginBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={typeOfDelivery}
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
                          flex={1}
                          mt='nano'
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-around"
                          p="xxxs"
                          borderColor={'divider'}
                        >
                          <Box width="10%">
                            <Box
                              height={20}
                              width={20}
                              borderRadius="infinity"
                              borderWidth="thin"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                height={10}
                                width={10}
                                borderRadius="nano"
                                bg="preto"
                              />
                            </Box>
                          </Box>
                          <Box
                            alignContent={"center"}
                            // bg="dropDownBorderColor"
                            flex={1}
                            width="70%"
                            marginX="micro"
                            borderRightWidth="hairline"
                            borderColor="divider"
                          >
                            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                              {name}
                            </Typography>
                            <Typography
                              style={{ flexWrap: 'wrap' }}
                              fontFamily="nunitoRegular"
                              fontSize={12}
                            >
                              Em até {shippingEstimate?.split('bd')[0]} dias úteis</Typography>
                          </Box>
                          {price > 0 ?
                            <Box width="20%" alignItems="center">
                              <Typography>
                                R$ {(price / 100).toFixed(2).replace(".", ",")}
                              </Typography>
                            </Box>
                            : <Box width="20%">
                              <Box
                                borderRadius="infinity"
                                bg="verdeSucesso"
                                borderColor="verdeSucesso"
                                height="100%"
                                alignItems="center"
                                p="nano"
                              >
                                <Typography color="white" style={{ textTransform: "uppercase" }}>Grátis</Typography>
                              </Box>
                            </Box>
                          }
                        </Box>
                      )
                    }}
                  />
                ) : null}
              </Box>

              <Box >
                <Typography
                  variant={"subtituloSessoes"}
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontWeight="bold"
                  fontSize="14px"
                  style={{ textTransform: "uppercase" }}
                >
                  Escolha seu endereço
                </Typography>
              </Box>

              <Box
                pt={"micro"}
                overflow={"hidden"}
                flex={1}
                justifyContent="flex-start"
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
                          editAndDelete={true}
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
                            onAddressChosen(item);
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
            </>
          }
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

const Store = () => {
  return (
    <Box mt="xxs">
      <Typography
        fontFamily="reservaSansBold"
        fontSize={12}
        color="neutroFrio2"
      >
        LOJA MAIS PRÓXIMA
      </Typography>
      <Box
        flex={1}
        backgroundColor={'white'}
        my={'micro'}
        borderWidth="hairline"
        borderColor="divider"
        pt="micro"
        pb="xxxs"
        px="nano"
      >
        <Box borderColor={'backgroundMenuOpened'}>
          <Box flexDirection="row">
            <Box alignItems="center">
              <Image
                height={40}
                source={images.localReserva}
                resizeMode={'contain'}
              />
              <Typography
                fontFamily="reservaSansMedium"
                fontSize={12}
              >
                1km
              </Typography>
            </Box>
            <Box flex={1}>
              <Box mb={'quarck'}>
                <Typography
                  fontFamily="reservaSansBold"
                  fontSize={14}
                >
                  {/* {item.friendlyName} */}
                  RESERVA VILA VELHA
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily="reservaSansRegular" fontSize={13}>
                  AV DOUTOR OLIVIO LIRA 353, LOJA 302 K/L PRAIA DA COSTA - VILA VELHA - ES.
                  {/* {`${item.address.street}, ${item.address.number}
${item.address.complement} - ${item.address.neighborhood} - ${item.address.state}, ${item.address.postalCode}`} */}
                </Typography>
              </Box>
              <Box flexDirection="row">
                <Box mr="xxs">
                  <Typography
                    fontFamily="reservaSansMedium"
                    fontSize={12}
                    color="verdeSucesso"
                  >
                    Grátis
                  </Typography>
                </Box>
                <Typography
                  fontFamily="reservaSansMedium"
                  fontSize={12}
                  color="verdeSucesso"
                >
                  Pronto em até 2 dias
                </Typography>
              </Box>

              <Typography
                style={{ textDecorationLine: "underline" }}
                fontFamily="nunitoRegular"
                fontSize={12}>
                Detalhes da loja
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export const DeliveryScreen = Delivery;
