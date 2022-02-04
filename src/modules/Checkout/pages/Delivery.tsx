import React, { useState, useEffect, useCallback } from 'react';

import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import {
  request,
  checkMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import { Typography, Box, Button } from 'reserva-ui';

import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { withAuthentication } from '../../Profile/HOC/withAuthentication';
import ReceiveHome from '../components/ReceiveHome';
import Store from '../components/Store';

const Delivery: React.FC<{}> = () => {
  const navigation = useNavigation();
  const {
    orderForm,
    addShippingOrPickupInfo,
    addShippingData,
    identifyCustomer,
  } = useCart();
  const { cookie, setCookie, email } = useAuth();
  const [Permission, setPermission] = useState(false);
  const [mapPermission, setMapPermission] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const {
    loading: loadingProfile,
    data,
    refetch,
  } = useQuery(profileQuery, { fetchPolicy: 'no-cache' });
  const [profile, setProfile] = useState<any>({});
  const [typeOfDelivery, setTypeOfDelivery] = useState<any>([]);
  const [pickupPoint, setPickupPoint] = useState<any>();
  const [businessHours, setBusinessHours] = useState<any>([]);
  const [selectMethodDelivery, setSelectMethodDelivery] = useState(false);
  const [addressId, setAddressId] = React.useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        setProfile(profile);
      }
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        refetch();
      }
    }, [data])
  );

  // permissão para acessar o mapa
  const requestMap = async () => {
    try {
      const lacationAlways = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      const lacationInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const fineLoation = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (
        lacationAlways === 'granted' ||
        lacationInUse === 'granted' ||
        fineLoation === 'granted'
      ) {
        setPermission(true);
      }
    } catch (error) {}
  };

  // permissão para acessar o mapa
  const CkeckmapPermission = async () => {
    try {
      const check = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);
      if (
        check['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted' ||
        check['ios.permission.LOCATION_ALWAYS'] === 'granted' ||
        check['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
      ) {
        setMapPermission(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    requestMap();
  }, []);

  useEffect(() => {
    CkeckmapPermission();
  }, [Permission]);

  const selectShippingAddress = async (item: any) => {
    if (orderForm) {
      setLoading(true);

      // save selected logistc info
      const logisticInfo = orderForm.shippingData.logisticsInfo.map(
        ({ itemIndex }) => ({
          addressId: item.addressId,
          itemIndex,
          selectedDeliveryChannel: 'delivery',
          selectedSla: 'Padrão',
        })
      );

      const data = await addShippingOrPickupInfo(logisticInfo, [
        { ...item, addressType: 'residential' },
      ]);
      setLoading(false);
    }
  };

  const onAddressChosen = (item: any) => {
    setSelectedAddress({ ...item, addressType: 'residential' });
    selectShippingAddress(item);
  };

  const onDeliveryChosen = (item: any) => {
    setSelectedDelivery(item);
  };

  const onGoToPayment = async () => {
    if (orderForm) {
      setLoading(true);

      if (selectMethodDelivery) {
        // se for igual a true, retirar na loja
        if (pickupPoint) {
          const { deliveryChannel, id, pickupStoreInfo } = pickupPoint;

          // save selected logistc info
          const logisticInfo = orderForm.shippingData.logisticsInfo.map(
            ({ itemIndex }) => ({
              itemIndex,
              selectedDeliveryChannel: deliveryChannel,
              selectedSla: id,
            })
          );

          delete pickupStoreInfo.address.addressType;
          delete pickupStoreInfo.address.receiverName;

          const data = await addShippingOrPickupInfo(logisticInfo, [
            {
              addressType: 'search',
              receiverName: `${orderForm.clientProfileData.firstName} ${orderForm.clientProfileData.lastName}`,
              ...pickupStoreInfo?.address,
            },
          ]);

          setLoading(false);
          // case when update orderform has succeeded, must open payment webview
          if (data) {
            navigation.navigate('Checkout');
          } else {
            Alert.alert(
              'Ocorreu um problema',
              'Problema ao atualizar o pedido'
            );
          }
        }
      } else if (selectedDelivery) {
        const { deliveryChannel, id } = selectedDelivery;

        // save selected logistc info
        const logisticInfo = orderForm.shippingData.logisticsInfo.map(
          ({ itemIndex }) => ({
            itemIndex,
            selectedDeliveryChannel: deliveryChannel,
            selectedSla: id,
          })
        );

        const data = await addShippingOrPickupInfo(logisticInfo, [
          selectedAddress,
        ]);

        setLoading(false);

        if (data) {
          navigation.navigate('Checkout');
        } else {
          Alert.alert('Ocorreu um problema', 'Problema ao atualizar o pedido');
        }
      }
    }
  };

  useEffect(() => {
    const typeOfDeliveries =
      orderForm?.shippingData?.logisticsInfo[0].slas.filter((x) => {
        if (x.deliveryChannel === 'delivery') return true;
        return false;
      });

    const pickupPoint = orderForm?.shippingData?.logisticsInfo[0].slas.filter(
      (x) => {
        if (x.deliveryChannel === 'pickup-in-point') return true;
        return false;
      }
    );

    // loja mais próxima
    if (pickupPoint) {
      const closer = pickupPoint.reduce(
        (prev: any, curr: any) =>
          prev.pickupDistance < curr.pickupDistance ? prev : curr,
        0
      );
      const businessHours = orderForm?.shippingData?.pickupPoints.find(
        (x) => x.id === closer.pickupPointId
      );
      setPickupPoint(closer);
      setBusinessHours(businessHours?.businessHours);
    }
    setTypeOfDelivery(typeOfDeliveries);

    if (typeOfDeliveries) {
      setSelectedDelivery(typeOfDeliveries[0]);
    }
  }, [orderForm]);

  useEffect(() => {
    if (!selectMethodDelivery) {
      // se for para entregar em casa

      const availableAddressesOrderForm =
        orderForm &&
        orderForm?.shippingData &&
        orderForm?.shippingData.availableAddresses.map((a) => ({
          ...a,
          country: 'BRA',
        }));

      const selectedAddressOrderFom =
        orderForm &&
        orderForm?.shippingData &&
        orderForm?.shippingData.selectedAddresses[0];

      // if (selectedAddressOrderFom?.addressType === "search") {
      //   selectShippingAddress(selectedAddressOrderFom)
      // }
      // if (cookie != null) {
      //   const { addresses } = profile;
      //   const newAddresses = addresses?.map((item: any) => {
      //     const addressId = item.id;
      //     return ({ ...item, addressId })
      //   })
      //   setAddresses(newAddresses);
      // } else {
      //   if (availableAddressesOrderForm &&
      //     availableAddressesOrderForm?.length > 0) {
      //     setAddresses(availableAddressesOrderForm);
      //   }
      // }
      if (
        availableAddressesOrderForm &&
        availableAddressesOrderForm?.length > 0
      ) {
        const addresses = availableAddressesOrderForm?.filter(
          (x) => x.addressType != 'search'
        );

        if (selectedAddressOrderFom?.addressType === 'search') {
          selectShippingAddress(addresses[0]);
        }

        setAddresses(addresses);
        setSelectedAddress(selectedAddressOrderFom);
      }
    }
  }, [profile]);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton showShadow loading={loadingProfile || loading} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <Box paddingX="xxxs" pt="sm" pb="xxs">
          <Box>
            <Typography variant="tituloSessoes">Entrega</Typography>
          </Box>

          <Box marginTop="nano" marginBottom="xxxs">
            <Typography
              color="preto"
              fontFamily="reservaSansLight"
              fontSize={15}
            >
              Escolha abaixo se você prefere receber no conforto do seu lar ou
              retirar em uma de nossas lojas. Nesta opção o frete é grátis.
            </Typography>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Box flex={1}>
              <Button
                onPress={() => {
                  setSelectMethodDelivery(false);
                }}
                borderRadius="nano"
                borderColor="dropDownBorderColor"
                borderWidth="hairline"
                flexDirection="row"
                inline
                height={40}
                bg={!selectMethodDelivery ? 'dropDownBorderColor' : null}
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
                inline
                height={40}
                onPress={() => {
                  setSelectMethodDelivery(true);
                }}
                bg={selectMethodDelivery ? 'dropDownBorderColor' : null}
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

          {selectMethodDelivery && (
            <Store data={pickupPoint} storeDetail={businessHours} />
          )}

          {!selectMethodDelivery && (
            <ReceiveHome
              loading={loading}
              typeOfDelivery={typeOfDelivery}
              selectedDelivery={selectedDelivery}
              addresses={addresses}
              selectedAddress={selectedAddress}
              onDeliveryChosen={onDeliveryChosen}
              onAddressChosen={onAddressChosen}
            />
          )}
        </Box>
        {cookie != null && !selectMethodDelivery && (
          <Box justifyContent="flex-end" mt="xxs" mb="xxs" paddingX="xxxs">
            <Button
              onPress={() =>
                navigation.navigate('NewAddress', {
                  isCheckout: true,
                  id: null,
                })
              }
              inline
              title="ADICIONAR ENDEREÇO"
              variant="primarioEstreitoOutline"
              padding="xl"
            />
          </Box>
        )}
        {selectMethodDelivery && businessHours && businessHours.length > 0 && (
          <Box flex={1} justifyContent="flex-end" paddingX="xxxs" pb="xxs">
            <Button
              justifyContent="flex-end"
              onPress={() =>
                mapPermission
                  ? navigation.navigate('MapScreen', {
                      geolocation: '',
                      locationPermission: mapPermission,
                    })
                  : navigation.navigate('WithdrawInStore', { isCheckout: true })
              }
              inline
              title="LOJAS PRÓXIMAS A SUA REGIÃO"
              variant="primarioEstreitoOutline"
              padding="xl"
            />
          </Box>
        )}

        <Box justifyContent="flex-end">
          <Button
            disabled={
              !selectMethodDelivery
                ? loading || !selectedAddress || !selectedDelivery
                : !(businessHours?.length > 0)
            }
            onPress={onGoToPayment}
            title="FORMA DE PAGAMENTO"
            variant="primarioEstreito"
            inline
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export const DeliveryScreen = Delivery;
