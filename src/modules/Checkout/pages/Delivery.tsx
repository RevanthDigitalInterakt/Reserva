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
import ReceiveHome from "../components/ReceiveHome"
import closestIndexTo from "date-fns/esm/fp/closestIndexTo/index.js";
import DeliverySelector from "../components/DeliverySelector";
import Geolocation from '@react-native-community/geolocation';
import ItemList from "../../HelpCenter/Components/ItemListHelp";
import Store from "../components/Store";


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
  const [pickupPoint, setPickupPoint] = useState<any>();
  const [businessHours, setBusinessHours] = useState<any>([]);

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
      const businessHours = orderForm?.shippingData?.pickupPoints.find((x) => x.id === closer.pickupPointId);
      setPickupPoint(closer);
      setBusinessHours(businessHours?.businessHours)
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

  useEffect(() => {
    console.log('pickupPoint', pickupPoint)
  }, [pickupPoint]);

  useEffect(() => {
    console.log('selectedDelivery', selectedDelivery)
  }, [selectedDelivery]);

  useEffect(() => {
    console.log('selectedAddress', selectedAddress)
  }, [selectedAddress]);


  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow loading={loadingProfile || loading} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <Box paddingX="xxxs" pt="sm" pb="xxs">
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

          {selectMethodDelivery ?
            <Store
              data={pickupPoint}
              storeDetail={businessHours}
            /> :
            <ReceiveHome
              typeOfDelivery={typeOfDelivery}
              selectedDelivery={selectedDelivery}
              addresses={addresses}
              selectedAddress={selectedAddress}
              onDeliveryChosen={(item) => {
                // console.log('onDeliveryChosen', item)
                onDeliveryChosen(item)
              }}
              onAddressChosen={
                onAddressChosen
              }
            />
            // <>
            //   <Box mt="xs" mb="nano">
            //     <Typography
            //       color="preto"
            //       fontFamily="reservaSansBold"
            //       fontSize={12}
            //     >
            //       SELECIONE O TIPO DE ENTREGA
            //     </Typography>
            //   </Box>

            //   {typeOfDelivery && typeOfDelivery.length > 0 ? (
            //     typeOfDelivery.map((item: any) => {
            //       let selected;
            //       const {
            //         id,
            //         name,
            //         shippingEstimate,
            //         price,
            //       } = item;

            //       if (cookie != null) {
            //         if (selectedDelivery) {
            //           selected = id === selectedDelivery.id && item;
            //         }
            //       } else {
            //         if (selectedDelivery) {
            //           selected = id === selectedDelivery.id && item;
            //         }
            //       }

            //       return (
            //         <DeliverySelector
            //           deliveryData={{
            //             name: name,
            //             price: price,
            //             shippingEstimate: shippingEstimate,
            //           }}
            //           selected={selected}
            //           select={() => {
            //             onDeliveryChosen(item)
            //           }}
            //         />
            //       );
            //     })
            //   ) : null}

            //   <Box mt="xs">
            //     <Typography
            //       color="preto"
            //       fontFamily="reservaSansBold"
            //       fontSize={12}
            //     >
            //       ESCOLHA SEU ENDEREÇO
            //     </Typography>
            //   </Box>

            //   <Box
            //     pt={"micro"}
            //     flex={1}
            //   >
            //     {addresses && addresses.length > 0 ? (
            //       addresses.map((item) => {
            //         let selected;
            //         const {
            //           id,
            //           city,
            //           complement,
            //           number,
            //           postalCode,
            //           state,
            //           street,
            //           neighborhood,
            //           addressId,
            //         } = item;

            //         if (cookie != null) {
            //           if (selectedAddress) {
            //             selected = id === selectedAddress.id && item;
            //           }
            //         } else {
            //           if (selectedAddress) {
            //             selected = addressId === selectedAddress.addressId && item;
            //           }
            //         }

            //         return (
            //           <AddressSelector
            //             addressData={{
            //               address: `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`,
            //               title: street,
            //               zipcode: postalCode,
            //             }}
            //             selected={selected}
            //             select={() => {
            //               onAddressChosen(item);
            //             }}
            //           />
            //         );
            //       })
            //     ) : (
            //       <Typography fontFamily="reservaSerifRegular" fontSize={16}>
            //         Você ainda não tem endereços cadastrados, clique em Novo Endereço
            //         e cadastre
            //       </Typography>
            //     )}

            //   </Box>
            // </>
          }
        </Box>
        {cookie != null && !selectMethodDelivery &&
          <Box justifyContent="flex-end" mt="xxs" mb="xxs" paddingX={"xxxs"}>
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
        {selectMethodDelivery &&
          <Box flex={1} justifyContent="flex-end" paddingX={"xxxs"} pb="xxs">
            <Button
              justifyContent="flex-end"
              onPress={() =>
                navigation.navigate("NewAddress", {
                  isCheckout: true,
                  id: null,
                })
              }
              inline={true}
              title={"LOJAS PRÓXIMAS A SUA REGIÃO"}
              variant="primarioEstreitoOutline"
              padding="xl"
            />
          </Box>
        }

        <Box justifyContent="flex-end">
          <Button
            disabled={loading || !selectedAddress || !selectedDelivery}
            onPress={onGoToPayment}
            title="FORMA DE PAGAMENTO"
            variant="primarioEstreito"
            inline={true}
          />
        </Box>
      </ScrollView>
    </SafeAreaView >
  );
};
export const DeliveryScreen = Delivery;

interface IStore {
  storeDetail: any[];
  data: any[];
}

// const Store = ({ storeDetail, data }: IStore) => {
//   const [mapPermission, setMapPermission] = useState(false)
//   const navigation = useNavigation();
//   const [showModalStore, setShowModalStore] = useState(false)
//   const [pickupPoints, setPickupPoints] = useState([])
//   const diasDaSemana = [
//     'Segunda-feira',
//     'Terça-feira',
//     'Quarta-feira',
//     'Quinta-feira',
//     'Sexta-feira',
//     'Sábado',
//     'Domingo',
//   ]
//   // console.log('storeDetail', storeDetail)
//   useEffect(() => {
//     console.log('storeDetail', storeDetail)
//   }, [storeDetail])

//   return (
//     <Box>
//       <Box mt="xxs">
//         <Typography
//           fontFamily="reservaSansBold"
//           fontSize={12}
//           color="neutroFrio2"
//         >
//           LOJA MAIS PRÓXIMA
//         </Typography>
//         <Box
//           flex={1}
//           backgroundColor={'white'}
//           my={'micro'}
//           borderWidth="hairline"
//           borderColor="divider"
//           pt="micro"
//           pb="xxxs"
//           px="nano"
//         >
//           {pickupPoints ?
//             <Box borderColor={'backgroundMenuOpened'}>
//               <Box flexDirection="row">
//                 <Box alignItems="center">
//                   <Image
//                     height={40}
//                     source={images.localReserva}
//                     resizeMode={'contain'}
//                   />
//                   <Typography
//                     fontFamily="reservaSansMedium"
//                     fontSize={12}
//                   >
//                     {+data.pickupDistance.toFixed(1)} km
//                   </Typography>
//                 </Box>
//                 <Box flex={1}>
//                   <Box mb={'quarck'}>
//                     <Typography
//                       fontFamily="reservaSansBold"
//                       fontSize={14}
//                     >
//                       {data.pickupStoreInfo.friendlyName}

//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography fontFamily="reservaSansRegular" fontSize={13}>
//                       AV DOUTOR OLIVIO LIRA 353, LOJA 302 K/L PRAIA DA COSTA - VILA VELHA - ES.
//                       {/* {`${item.address.street}, ${item.address.number}
//                    ${item.address.complement} - ${item.address.neighborhood} - ${item.address.state}, ${item.address.postalCode}`} */}
//                     </Typography>
//                   </Box>
//                   <Box flexDirection="row" mb="nano">
//                     <Box mr="xxs">
//                       <Typography
//                         fontFamily="reservaSansMedium"
//                         fontSize={12}
//                         color="verdeSucesso"
//                       >
//                         Grátis
//                       </Typography>
//                     </Box>
//                     <Typography
//                       fontFamily="reservaSansMedium"
//                       fontSize={12}
//                       color="verdeSucesso"
//                     >
//                       Pronto em até {data.shippingEstimate?.split('bd')[0]} dias
//                     </Typography>
//                   </Box>
//                   <Button
//                     flex={1}
//                     alignSelf="flex-start"
//                     onPress={() => setShowModalStore(true)}
//                   >
//                     <Box
//                       flex={1}
//                       alignSelf="flex-start"
//                     >
//                       <Typography
//                         style={{ textDecorationLine: "underline" }}
//                         fontFamily="nunitoRegular"
//                         fontSize={12}>
//                         Detalhes da loja
//                       </Typography>
//                     </Box>
//                   </Button>
//                 </Box>
//               </Box>
//             </Box> : null}
//         </Box>
//         <Modal
//           isVisible={showModalStore}
//         >
//           <Box
//             bg='white'
//             p="xxxs"
//           >
//             <Box
//               flexDirection="row"
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Box>
//                 <Typography
//                   fontFamily="reservaSerifRegular"
//                   fontSize={20}
//                 >
//                   Detalhes da Loja
//                 </Typography>
//               </Box>
//               <Button
//                 hitSlop={{
//                   top: 30,
//                   bottom: 30,
//                   right: 30,
//                   left: 30,
//                 }}
//                 onPress={() => setShowModalStore(false)}
//                 variant='icone'
//                 icon={
//                   <Icon size={12} name='Close' />
//                 }
//               />
//             </Box>
//             <Box mt="xxs" mb="micro">
//               <Typography fontFamily="reservaSansMedium" fontSize={14}>
//                 Horários de funcionamento
//               </Typography>
//             </Box>
//             {storeDetail &&
//               storeDetail.map((item) => (
//                 <>
//                   <Box
//                     py="nano"
//                     flexDirection="row"
//                     justifyContent="space-between"
//                   >
//                     <Typography fontFamily="reservaSansLight" fontSize={14}>
//                       {diasDaSemana[item.DayOfWeek]}
//                     </Typography>
//                     <Typography fontFamily="reservaSansRegular" fontSize={14}>
//                       {item.OpeningTime} às {item.ClosingTime}
//                     </Typography>
//                   </Box>
//                   <Divider variant="fullWidth" />
//                 </>
//               ))
//             }
//           </Box>
//         </Modal>
//       </Box>
//     </Box>
//   );
// }
