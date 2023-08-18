import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import { useFocusEffect } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, SafeAreaView, ScrollView,
} from 'react-native';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useCart } from '../../../context/CartContext';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import ReceiveHome from '../components/ReceiveHome';
import Store from '../components/Store';
import EventProvider from '../../../utils/EventProvider';
import configDeviceSizes from '../../../utils/configDeviceSizes';
import { getBrands } from '../../../utils/getBrands';
import { isValidMinimalProfileData } from '../../../utils/clientProfileData';
import { defaultBrand } from '../../../utils/defaultWBrand';
import {
  useProfileAddressMutation,
} from '../../../base/graphql/generated';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';

type Props = StackScreenProps<RootStackParamList, 'DeliveryScreen'>;

const Delivery: React.FC<Props> = ({ route, navigation }) => {
  const { comeFrom } = route.params;
  const {
    orderForm,
    addShippingOrPickupInfo,
    orderform,
    identifyCustomer,
  } = useCart();
  const { profile } = useAuthStore(['profile']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const [Permission, setPermission] = useState(false);
  const [mapPermission, setMapPermission] = useState(false);
  const [shippingValue, setShippingValue] = useState(0);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [typeOfDelivery, setTypeOfDelivery] = useState<any>([]);
  const [pickupPoint, setPickupPoint] = useState<any>();
  const [businessHours, setBusinessHours] = useState<any>([]);
  const [selectMethodDelivery, setSelectMethodDelivery] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileAddress] = useProfileAddressMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  useFocusEffect(
    useCallback(() => {
      identifyCustomer();
    }, []),
  );

  const requestMap = async () => {
    try {
      const lacationAlways = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      const lacationInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const fineLoation = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (
        lacationAlways === 'granted'
        || lacationInUse === 'granted'
        || fineLoation === 'granted'
      ) {
        setPermission(true);
      }
    } catch (error) { }
  };

  const CkeckmapPermission = async () => {
    try {
      const check = await checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);
      if (
        check['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted'
        || check['ios.permission.LOCATION_ALWAYS'] === 'granted'
        || check['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
      ) {
        setMapPermission(true);
      }
    } catch (err) { }
  };

  useEffect(() => {
    requestMap();
    setSelectMethodDelivery(false);
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
        }),
      );

      await addShippingOrPickupInfo(logisticInfo, [
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

      // valida se o clientProfileData contem os campos minimos para seguir para o pagamento
      if (!isValidMinimalProfileData({ ...orderForm.clientProfileData })) {
        navigation.navigate('EditProfile', { isRegister: true });
        setLoading(false);

        return;
      }

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
            }),
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
            const { items } = orderForm;
            if (items.length) {
              try {
                const newItems = items.map((item) => ({
                  price: item?.price / 100 ?? 0,
                  item_id: item?.productId,
                  quantity: item?.quantity,
                  item_name: item?.name,
                  item_variant: item?.skuName,
                  item_category: 'product',
                }));

                EventProvider.logEvent('page_view', {
                  wbrand: defaultBrand.picapau,
                });

                EventProvider.logEvent('add_shipping_info', {
                  coupon: '',
                  currency: 'BRL',
                  items: newItems,
                  wbrand: getBrands(items),
                });
              } catch (e) {
                ExceptionProvider.captureException(e);
              }
            }

            navigation.navigate('Checkout');
          } else {
            Alert.alert(
              'Ocorreu um problema',
              'Problema ao atualizar o pedido',
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
          }),
        );

        const data = await addShippingOrPickupInfo(logisticInfo, [
          selectedAddress,
        ]);

        setLoading(false);

        if (data) {
          const { items } = orderForm;
          if (items.length) {
            try {
              const newItems = items.map((item) => ({
                price: item?.price / 100 ?? 0,
                item_id: item?.productId,
                quantity: item?.quantity,
                item_name: item?.name,
                item_variant: item?.skuName,
                item_category: 'product',
              }));

              EventProvider.logEvent('add_shipping_info', {
                coupon: '',
                currency: 'BRL',
                items: newItems,
                wbrand: getBrands(items),
              });
            } catch (e) {
              ExceptionProvider.captureException(e);
            }
          }

          navigation.navigate('Checkout');
        } else {
          Alert.alert('Ocorreu um problema', 'Problema ao atualizar o pedido');
        }
      }
    }
  };

  useEffect(() => {
    const defaultDelivery = orderForm?.shippingData?.logisticsInfo?.find(
      (delivery) => {
        const defaultSlaExists = delivery.slas?.find(
          (sla) => sla.id === 'Padrão',
        );

        if (defaultSlaExists) {
          return true;
        }

        return false;
      },
    );
    const typeOfDeliveries = defaultDelivery
      ? defaultDelivery.slas?.filter((x) => {
        if (x.deliveryChannel === 'delivery') return true;
        return false;
      })
      : orderForm?.shippingData?.logisticsInfo?.[0]?.slas?.filter((x) => {
        if (x.deliveryChannel === 'delivery') return true;
        return false;
      });

    const valueShipping = orderForm?.shippingData?.logisticsInfo?.map(
      (item: any) => {
        const valuePrice = item?.slas?.find((sla: any) => {
          if (sla.id === 'Padrão') {
            return sla;
          }
        });
        const value = valuePrice || item?.slas[0];
        return value?.price;
      },
    );

    const shippingPrice = valueShipping?.reduce((a: any, b: any) => a + b, 0);

    setShippingValue(shippingPrice);

    const pickupPoint = orderForm?.shippingData?.logisticsInfo?.[0]?.slas.filter(
      (x) => {
        if (x.deliveryChannel === 'pickup-in-point') return true;
        return false;
      },
    );

    // loja mais próxima
    if (pickupPoint) {
      const closer = pickupPoint.reduce(
        (prev: any, curr: any) => (prev.pickupDistance <= curr.pickupDistance ? prev : curr),
        0,
      );
      const businessHours = orderForm?.shippingData?.pickupPoints?.find(
        (x) => x.id === closer?.pickupPointId,
      );
      setPickupPoint(closer);
      setBusinessHours(businessHours?.businessHours);
    }
    setTypeOfDelivery(typeOfDeliveries);

    if (typeOfDeliveries) {
      setSelectedDelivery(typeOfDeliveries[0]);
    }
  }, [orderForm]);

  const updateAddresses = () => {
    if (!selectMethodDelivery) {
      const availableAddressesOrderForm = orderForm
        && orderForm?.shippingData
        && orderForm?.shippingData?.availableAddresses?.map((a) => ({
          ...a,
          country: 'BRA',
        }));

      const selectedAddressOrderFom = orderForm
        && orderForm?.shippingData
        && orderForm?.shippingData?.selectedAddresses?.[0];

      if (
        availableAddressesOrderForm
        && availableAddressesOrderForm?.length > 0
      ) {
        const addresses = availableAddressesOrderForm?.filter(
          (x) => x.addressType != 'search',
        );

        if (selectedAddressOrderFom?.addressType === 'search') {
          selectShippingAddress(addresses[0]);
        }

        const sortAddresses = addresses?.sort((a, b) => {
          if (a.receiverName < b.receiverName) {
            return -1;
          }
          if (a.receiverName > b.receiverName) {
            return 1;
          }
          return 0;
        });

        setAddresses(sortAddresses);
        setSelectedAddress(selectedAddressOrderFom);
      } else {
        setAddresses([]);
        setSelectedAddress(null);
      }
    }
  };

  useEffect(() => {
    updateAddresses();
  }, [orderForm]);

  const handlePressBackButton = () => {
    if (comeFrom === 'Login') {
      navigation.navigate('BagScreen', {});

      return;
    }

    navigation.goBack();
  };

  const feedbackErrorAlert = () => Alert.alert('Erro', 'Não foi possível incluir endereço\n Tente Novamente');

  const createPayload = async (payload: any) => {
    setLoading(true);

    try {
      const receiverName = payload?.receiverName
        ? payload?.receiverName
        : `${profile?.firstName} ${profile?.lastName}`;

      // salvar endereço do usuário no orderform
      if (profile?.authCookie) {
        const { data: dataProfileAddress } = await profileAddress({
          variables: {
            input: {
              ...payload,
              receiverName,
            },
          },
        });

        if (!dataProfileAddress) {
          feedbackErrorAlert();
        }

        await identifyCustomer();

        orderform();
      }
    } catch (e) {
      feedbackErrorAlert();
    } finally {
      navigation.goBack();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loading, startLoadingTime, onFinishLoad]);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton
        backButtonPress={handlePressBackButton}
        showShadow
        loading={loading}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <Box paddingX="xxxs" pt="xxxs" pb="xxs">
          <Box testID="com.usereserva:id/delivery_title">
            <Typography
              color="preto"
              fontFamily="reservaSerifRegular"
              fontSize={28}
              style={{ lineHeight: 32 }}
            >
              Entrega
            </Typography>
          </Box>

          <Box marginTop="nano" marginBottom="xxxs" flexDirection="row">
            <Box>
              <Typography
                color="preto"
                fontFamily="nunitoRegular"
                fontSize={15}
                style={{ lineHeight: 18 }}
              >
                Escolha abaixo se você prefere receber o produto no conforto do
                seu lar ou retirar em uma de nossas lojas
                <Typography
                  color="verdeSucesso"
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  style={{ lineHeight: 18 }}
                >
                  {' gratuitamente.'}
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Box flex={1}>
              <Button
                testID="com.usereserva:id/delivery_button_receive_home"
                onPress={() => {
                  setSelectMethodDelivery(false);
                }}
                flexDirection="row"
                borderColor="preto"
                borderWidth="hairline"
                inline
                height={50}
                bg={!selectMethodDelivery ? 'preto' : 'white'}
              >
                <Typography
                  color={!selectMethodDelivery ? 'white' : 'preto'}
                  fontFamily="nunitoRegular"
                  fontSize={11}
                  style={{ lineHeight: 24, letterSpacing: 1.6 }}
                >
                  RECEBER EM CASA
                </Typography>
              </Button>
            </Box>

            <Box flex={1}>
              <Button
                testID="com.usereserva:id/delivery_button_pick_up_in_store"
                marginLeft="nano"
                borderColor="preto"
                borderWidth="hairline"
                flexDirection="row"
                inline
                height={50}
                onPress={() => {
                  setSelectMethodDelivery(true);
                }}
                bg={selectMethodDelivery ? 'preto' : 'white'}
              >
                <Box testID="com.usereserva:id/select_method_delivery">
                  <Typography
                    color={selectMethodDelivery ? 'white' : 'preto'}
                    fontFamily="nunitoRegular"
                    fontSize={11}
                    style={{ lineHeight: 14, letterSpacing: 1.6 }}
                  >
                    RETIRAR NA LOJA
                  </Typography>
                  <Typography
                    color="verdeSucesso"
                    fontFamily="nunitoRegular"
                    fontSize={11}
                    style={{ textAlign: 'center', lineHeight: 14, letterSpacing: 1.6 }}
                  >
                    (GRÁTIS)
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>

          {selectMethodDelivery ? (
            <Store
              data={pickupPoint}
              storeDetail={businessHours}
              mapPermission={mapPermission}
            />
          ) : (
            !selectMethodDelivery && (
              <ReceiveHome
                loading={loading}
                typeOfDelivery={typeOfDelivery}
                shippingValue={shippingValue}
                selectedDelivery={selectedDelivery}
                addresses={addresses}
                selectedAddress={selectedAddress}
                onDeliveryChosen={onDeliveryChosen}
                onAddressChosen={onAddressChosen}
              />
            )
          )}
        </Box>
        {profile?.authCookie != null && !selectMethodDelivery && (
          <Box
            testID="com.usereserva:id/delivery_add_adress"
            justifyContent="flex-end"
            alignItems="center"
            mt="xxxs"
          >
            <Button
              onPress={() => navigation.navigate('NewAddress', {
                executeCallback: createPayload,
              })}
              testID="com.usereserva:id/delivery_button_add_address"
              height={50}
              width={configDeviceSizes.DEVICE_WIDTH * 0.8}
              inline
              fontFamily="nunitoRegular"
              fontSize={13}
              lineHeight={24}
              letterSpacing={1.6}
              title="ADICIONAR ENDEREÇO"
              variant="primarioEstreitoOutline"
            />
          </Box>
        )}
        <Box
          flex={1}
          justifyContent="flex-start"
          mb="xs"
          mt="xl"
        >
          <Button
            disabled={
              !selectMethodDelivery
                ? loading || !selectedAddress || !selectedDelivery
                : pickupPoint === 0
            }
            onPress={onGoToPayment}
            title="FORMA DE PAGAMENTO"
            variant="primarioEstreito"
            testID="com.usereserva:id/delivery_button_method_payment"
            inline
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export const DeliveryScreen = Delivery;
