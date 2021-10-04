import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, ScrollView, Platform, FlatList, TouchableOpacity } from "react-native";
import { Typography, Box, Button, Icon, Divider, Image } from "reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
import Modal from "react-native-modal";
import closestIndexTo from "date-fns/esm/fp/closestIndexTo/index.js";
import DeliverySelector from "../components/DeliverySelector";
import Geolocation from '@react-native-community/geolocation';
import ItemList from "../../HelpCenter/Components/ItemListHelp";


const Delivery: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { orderForm, addShippingOrPickupInfo } = useCart();
  const { cookie, setCookie } = useAuth()
  const { authentication } = useSelector((state: ApplicationState) => state);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const { loading: loadingProfile, data, refetch } = useQuery(profileQuery, { fetchPolicy: "no-cache" });
  const [profile, setProfile] = useState<any>({});
  const [typeOfDelivery, setTypeOfDelivery] = useState<any>([]);
  const [pickupPoint, setPickupPoint] = useState<any>([]);
  const [selectMethodDelivery, setSelectMethodDelivery] = useState(false)
  const [addressId, setAddressId] = React.useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        setProfile(profile);
      }
    }
  }, [data]);

  useFocusEffect(() => {
    if (data) {
      refetch();
    }
  });

  const onAddressChosen = (item: any) => {
    setSelectedAddress({ ...item, addressType: "residential" });
  };

  const onDeliveryChosen = (item: any) => {
    setSelectedDelivery(item);
  };

  const onGoToPayment = async () => {

    if (orderForm) {
      setLoading(true);

      if (selectedDelivery) {
        const { deliveryChannel, id } = selectedDelivery;

        // save selected logistc info
        const logisticInfo = orderForm.shippingData.logisticsInfo.map(
          ({ itemIndex }) => {
            return {
              itemIndex,
              selectedDeliveryChannel: deliveryChannel,
              selectedSla: id,
            };
          }

        );

        await addShippingOrPickupInfo(logisticInfo, [selectedAddress],);

      }
      setLoading(false);
    }
    navigation.navigate("Checkout");
  };



  useEffect(() => {
    const typeOfDeliveries = orderForm?.shippingData?.logisticsInfo[0].slas.filter((x) => {
      if (x.deliveryChannel === 'delivery') return true;
      return false
    })

    const pickupPoint = orderForm?.shippingData?.logisticsInfo[0].slas.filter((x) => {
      if (x.deliveryChannel === 'pickup-in-point') return true;
      return false
    })

    //loja mais próxima
    if (pickupPoint) {
      const closer = pickupPoint.reduce((prev: any, curr: any) => {
        return prev.pickupDistance < curr.pickupDistance ? prev : curr;
      }, 0);
      setPickupPoint(closer);
    }
    setTypeOfDelivery(typeOfDeliveries);

  }, [])

  useEffect(() => {
    const availableAddressesOrderForm =
      orderForm &&
      orderForm?.shippingData &&
      orderForm?.shippingData.availableAddresses
        .map((a) => ({ ...a, country: "BRA" }));

    if (cookie != null) {
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
      <TopBarBackButton showShadow loading={loadingProfile || loading} />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box>
            <Typography variant={"tituloSessoes"}>Entrega</Typography>
          </Box>

          <Box marginTop={"nano"} marginBottom={"xxxs"}>
            <Typography
              color="preto"
              fontFamily="reservaSansLight"
              fontSize={15}
            >
              Escolha abaixo se você prefere receber no conforto do seu lar ou retirar em uma de nossas lojas. Nesta opção o frete é grátis.
            </Typography>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Box flex={1} >
              <Button
                onPress={() => { setSelectMethodDelivery(false) }}
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline={true}
                height={40}
                bg={!selectMethodDelivery ? "dropDownBorderColor" : null}
              >
                <Typography
                  color="preto"
                  fontFamily="reservaSansMedium"
                  fontSize={12}
                >
                  RECEBER EM CASA
                </Typography>
              </Button>
            </Box>

            <Box flex={1}>
              <Button
                marginLeft="nano"
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline={true}
                height={40}
                onPress={() => { setSelectMethodDelivery(true) }}
                bg={selectMethodDelivery ? "dropDownBorderColor" : null}
              >
                <Typography
                  color="preto"
                  fontFamily="reservaSansMedium"
                  fontSize={12}
                >
                  RETIRAR NA LOJA
                </Typography>
              </Button>
            </Box>
          </Box>

          {selectMethodDelivery ? <Store /> :
            <>
              <Box mt="xs" mb="nano">
                <Typography
                  color="preto"
                  fontFamily="reservaSansBold"
                  fontSize={12}
                >
                  SELECIONE O TIPO DE ENTREGA
                </Typography>
              </Box>

              {typeOfDelivery && typeOfDelivery.length > 0 ? (
                typeOfDelivery.map((item: any) => {
                  let selected;
                  const {
                    id,
                    name,
                    shippingEstimate,
                    price,
                  } = item;

                  if (cookie != null) {
                    if (selectedDelivery) {
                      selected = id === selectedDelivery.id && item;
                    }
                  } else {
                    if (selectedDelivery) {
                      selected = id === selectedDelivery.id && item;
                    }
                  }

                  return (
                    <DeliverySelector
                      deliveryData={{
                        name: name,
                        price: price,
                        shippingEstimate: shippingEstimate,
                      }}
                      selected={selected}
                      select={() => {
                        onDeliveryChosen(item)
                      }}
                    />
                  );
                })
              ) : null}

              <Box mt="xs">
                <Typography
                  color="preto"
                  fontFamily="reservaSansBold"
                  fontSize={12}
                >
                  ESCOLHA SEU ENDEREÇO
                </Typography>
              </Box>

              <Box
                pt={"micro"}
                flex={1}
              >
                {addresses && addresses.length > 0 ? (
                  addresses.map((item) => {
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
                    } = item;

                    if (cookie != null) {
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
                        selected={selected}
                        select={() => {
                          onAddressChosen(item);
                        }}
                      />
                    );
                  })
                ) : (
                  <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                    Você ainda não tem endereços cadastrados, clique em Novo Endereço
                    e cadastre
                  </Typography>
                )}

              </Box>
            </>
          }
          {cookie != null &&
            <Box justifyContent="flex-end" mb="xxxs" mt="md">
              <Button
                onPress={() =>
                  navigation.navigate("NewAddress", {
                    isCheckout: true,
                    id: null,
                  })
                }
                inline={true}
                title={"ADICIONAR ENDEREÇO"}
                variant="primarioEstreitoOutline"
                padding="xl"
              />
            </Box>
          }
        </Box>

        {!selectMethodDelivery ?
          <Box justifyContent="flex-end">
            <Button
              disabled={loading || !selectedAddress || !selectedDelivery}
              onPress={onGoToPayment}
              title="FORMA DE PAGAMENTO"
              variant="primarioEstreito"
              inline={true}
            />
          </Box> : null}
      </ScrollView>
    </SafeAreaView >
  );
};
export const DeliveryScreen = Delivery;
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



// const Store = () => {
//   const [mapPermission, setMapPermission] = useState(false)
//   const navigation = useNavigation();
//   const [showModalStore, setShowModalStore] = useState(false)
//   const [Permission, setPermission] = useState(false)
//   const [pickupPoints, setPickupPoints] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { orderForm, pickupPoint, convertZipCode } = useCart();
//   const [profile, setProfile] = useState<any>({});
//   const { cookie, setCookie } = useAuth()

//   const requestMap = async () => {
//     try {
//       const lacationAlways = await request(
//         PERMISSIONS.IOS.LOCATION_ALWAYS);
//       const lacationInUse = await request(
//         PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//       );
//       const fineLoation = await request(
//         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//       )
//       if (lacationAlways === 'granted' || lacationInUse === 'granted' || fineLoation === 'granted') {
//         setPermission(true)
//       }
//     } catch (error) {
//     }
//   }

//   const CkeckmapPermission = async () => {
//     try {
//       const check = await checkMultiple([
//         PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//         PERMISSIONS.IOS.LOCATION_ALWAYS,
//         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//       ]);
//       if (check["ios.permission.LOCATION_WHEN_IN_USE"] === 'granted' || check["ios.permission.LOCATION_ALWAYS"] === 'granted' || check["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
//         setMapPermission(true)
//       }
//     } catch (err) {
//     }
//   }

//   useEffect(() => {
//     const availableAddressesOrderForm =
//       orderForm &&
//       orderForm?.shippingData &&
//       orderForm?.shippingData.availableAddresses
//         .map((a) => ({ ...a, country: "BRA" }));

//     if (cookie !== null) {
//       const { addresses } = profile;
//       console.log("ADRREsss", addresses);
//     } else {
//       if (availableAddressesOrderForm &&
//         availableAddressesOrderForm?.length > 0) {
//         console.log("AVAIBLE", availableAddressesOrderForm);
//       }
//     }
//   }, [orderForm, profile]);

//   useEffect(() => {
//     const pickupInPoint = orderForm?.shippingData?.logisticsInfo[0].slas.filter((x) => {
//       if (x.deliveryChannel === 'pickup-in-point') return true;
//       return false
//     })
//     console.log("PICKUP_IN_POINT", pickupInPoint)
//     setPickupPoints(pickupInPoint)
//   }, [])

//   useEffect(() => {
//     CkeckmapPermission();
//   }, [Permission])

//   useEffect(() => {
//     requestMap();
//   }, [])

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <Box mt="xxs">
//           <Typography
//             fontFamily="reservaSansBold"
//             fontSize={12}
//             color="neutroFrio2"
//           >
//             LOJA MAIS PRÓXIMA
//           </Typography>
//           <Box
//             flex={1}
//             backgroundColor={'white'}
//             my={'micro'}
//             borderWidth="hairline"
//             borderColor="divider"
//             pt="micro"
//             pb="xxxs"
//             px="nano"
//           >
//             {pickupPoints ?
//               <Box borderColor={'backgroundMenuOpened'}>
//                 <Box flexDirection="row">
//                   <Box alignItems="center">
//                     <Image
//                       height={40}
//                       source={images.localReserva}
//                       resizeMode={'contain'}
//                     />
//                     <Typography
//                       fontFamily="reservaSansMedium"
//                       fontSize={12}
//                     >
//                       1km
//                     </Typography>
//                   </Box>
//                   <Box flex={1}>
//                     <Box mb={'quarck'}>
//                       <Typography
//                         fontFamily="reservaSansBold"
//                         fontSize={14}
//                       >
//                         {/* {item.friendlyName} */}
//                         {console.log("teste", pickupPoints)}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography fontFamily="reservaSansRegular" fontSize={13}>
//                         AV DOUTOR OLIVIO LIRA 353, LOJA 302 K/L PRAIA DA COSTA - VILA VELHA - ES.
//                         {/* {`${item.address.street}, ${item.address.number}
//                    ${item.address.complement} - ${item.address.neighborhood} - ${item.address.state}, ${item.address.postalCode}`} */}
//                       </Typography>
//                     </Box>
//                     <Box flexDirection="row" mb="nano">
//                       <Box mr="xxs">
//                         <Typography
//                           fontFamily="reservaSansMedium"
//                           fontSize={12}
//                           color="verdeSucesso"
//                         >
//                           Grátis
//                         </Typography>
//                       </Box>
//                       <Typography
//                         fontFamily="reservaSansMedium"
//                         fontSize={12}
//                         color="verdeSucesso"
//                       >
//                         Pronto em até 2 dias
//                       </Typography>
//                     </Box>
//                     <Button
//                       flex={1}
//                       alignSelf="flex-start"
//                       onPress={() => setShowModalStore(true)}
//                     >
//                       <Box
//                         flex={1}
//                         alignSelf="flex-start"
//                       >
//                         <Typography
//                           style={{ textDecorationLine: "underline" }}
//                           fontFamily="nunitoRegular"
//                           fontSize={12}>
//                           Detalhes da loja
//                         </Typography>
//                       </Box>
//                     </Button>
//                   </Box>
//                 </Box>
//               </Box> : null}
//           </Box>
//           <Modal
//             isVisible={showModalStore}
//           >
//             <Box
//               bg='white'
//               height={200}
//               p="xxxs"
//             >
//               <Box
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Box>
//                   <Typography
//                     fontFamily="reservaSerifRegular"
//                     fontSize={20}
//                   >
//                     Detalhes da Loja
//                   </Typography>
//                 </Box>
//                 <Button
//                   hitSlop={{
//                     top: 30,
//                     bottom: 30,
//                     right: 30,
//                     left: 30,
//                   }}
//                   onPress={() => setShowModalStore(false)}
//                   variant='icone'
//                   icon={
//                     <Icon size={12} name='Close' />
//                   }
//                 />
//               </Box>
//               <Box mt="xxs" mb="micro">
//                 <Typography fontFamily="reservaSansMedium" fontSize={14}>
//                   Horários de funcionamento
//                 </Typography>
//               </Box>
//               {
//                 ["Segunda a Sexta-feira", "Sábado",].map((item) => (
//                   <>
//                     <Box
//                       py="nano"
//                       flexDirection="row"
//                       justifyContent="space-between"
//                     >
//                       <Typography fontFamily="reservaSansLight" fontSize={14}>
//                         {item}
//                       </Typography>
//                       <Typography fontFamily="reservaSansRegular" fontSize={14}>10:00 às 22:00</Typography>
//                     </Box>
//                     <Divider variant="fullWidth" />
//                   </>
//                 ))
//               }
//             </Box>
//           </Modal>
//           <Box mt="xxl" pb="xxl">
//             <Button
//               onPress={() =>
//                 mapPermission ?
//                   navigation.navigate('MapScreen', { geolocation: "", locationPermission: mapPermission })
//                   :
//                   navigation.navigate("WithdrawInStore", { isCheckout: true, })
//               }
//               borderColor="modalBackDropColor"
//               borderWidth="hairline"
//               flexDirection="row"
//               inline={true}
//               height={40}

//               title="LOJAS PRÓXIMAS A SUA REGIÃO"
//             />
//           </Box>

//         </Box>
//         <Box justifyContent="flex-end" >
//           <Button
//             disabled={false}
//             onPress={() => { }}
//             title="FORMA DE PAGAMENTO"
//             variant="primarioEstreito"
//             inline={true}
//           />
//         </Box>

//       </ScrollView>

//     </SafeAreaView>
//   );
// }


