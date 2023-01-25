import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import { useFocusEffect } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, Dimensions, SafeAreaView, ScrollView,
} from 'react-native';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import ReceiveHome from '../components/ReceiveHome';
import Store from '../components/Store';
import Sentry from '../../../config/sentryConfig';
import { isValidMinimalProfileData } from '../../../utils/clientProfileData';
import EventProvider from '../../../utils/EventProvider';
import { saveAddressMutation } from '../../../graphql/address/addressMutations';

type Props = StackScreenProps<RootStackParamList, 'DeliveryScreen'>;

const DEVICE_WIDTH = Dimensions.get('window').width;

const Delivery: React.FC<Props> = ({ route, navigation }) => {
  const { comeFrom } = route.params;

  const {
    orderForm, addShippingOrPickupInfo, orderform, addShippingData,
  } = useCart();

  const { cookie, setCookie } = useAuth();
  const [Permission, setPermission] = useState(false);
  const [mapPermission, setMapPermission] = useState(false);
  const [shippingValue, setShippingValue] = useState(0);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [typeOfDelivery, setTypeOfDelivery] = useState<any>([]);
  const [pickupPoint, setPickupPoint] = useState<any>();
  const [businessHours, setBusinessHours] = useState<any>([]);
  const [selectMethodDelivery, setSelectMethodDelivery] = useState(false);
  const [loading, setLoading] = useState(false);

  const [saveAddress] = useMutation(saveAddressMutation);

  const [{ data, loadingProfile, refetch }, setProfileData] = useState({
    refetch: () => { },
    data: {} as any,
    loadingProfile: true,
  });

  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    getProfile().then((response) => setProfileData({
      refetch: response.refetch,
      data: response.data,
      loadingProfile: false,
    }));
  }, []);

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('DeliveryScreen'));
  }, []);

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        setProfile(profile);

        Sentry.setUser({
          address: profile?.addresses,
        });
      }
      orderform();
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      if (data) {
        refetch();
      }
    }, [data]),
  );

  // permissão para acessar o mapa
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

  // permissão para acessar o mapa
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
                  item_category: Object.values(item?.productCategories).join('|') ?? '',
                }));

                EventProvider.logEvent('add_shipping_info', {
                  coupon: '',
                  currency: 'BRL',
                  items: newItems,
                });
              } catch (e) {
                EventProvider.captureException(e);
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
                item_category: Object.values(item?.productCategories).join('|') ?? '',
              }));

              EventProvider.logEvent('add_shipping_info', {
                coupon: '',
                currency: 'BRL',
                items: newItems,
              });
            } catch (e) {
              EventProvider.captureException(e);
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
      : orderForm?.shippingData?.logisticsInfo[0].slas?.filter((x) => {
        if (x.deliveryChannel === 'delivery') return true;
        return false;
      });

    const valueShipping = orderForm?.shippingData?.logisticsInfo.map(
      (item: any) => {
        const valuePrice = item.slas?.find((sla: any) => {
          if (sla.id === 'Padrão') {
            return sla;
          }
        });
        const value = valuePrice || item.slas[0];
        return value?.price;
      },
    );

    const shippingPrice = valueShipping?.reduce((a: any, b: any) => a + b, 0);

    setShippingValue(shippingPrice);

    const pickupPoint = orderForm?.shippingData?.logisticsInfo[0].slas.filter(
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
      const businessHours = orderForm?.shippingData?.pickupPoints.find(
        (x) => x.id === closer.pickupPointId,
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
        && orderForm?.shippingData.availableAddresses.map((a) => ({
          ...a,
          country: 'BRA',
        }));

      const selectedAddressOrderFom = orderForm
        && orderForm?.shippingData
        && orderForm?.shippingData.selectedAddresses[0];

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
      }
    }
  };

  useEffect(() => {
    updateAddresses();
  }, [profile, orderForm]);

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
        ? payload.receiverName
        : `${profile?.firstName} ${profile?.lastName}`;

      const {
        postalCode,
        state,
        number,
        neighborhood,
        complement,
        city,
        street,
      } = payload;

      // salvar endereço do usuário no orderform
      const isAddressSaved = await addShippingData({
        receiverName,
        postalCode,
        state,
        number,
        neighborhood,
        complement,
        city,
        street,
        addressType: 'residential',
        country: 'BRA',
      });

      await saveAddress({
        variables: {
          fields: {
            ...payload,
            receiverName,
          },
        },
      });

      if (!isAddressSaved) {
        feedbackErrorAlert();
      } else {
        orderform();
      }
    } catch (e) {
      feedbackErrorAlert();
    } finally {
      navigation.goBack();
      setLoading(false);
    }
  };

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton
        backButtonPress={handlePressBackButton}
        showShadow
        loading={loadingProfile || loading}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
      >
        <Box paddingX="xxxs" pt="xxxs" pb="xxs">
          <Box>
            <Typography
              color="preto"
              fontFamily="reservaSerifRegular"
              fontSize={28}
              lineHeight={32}
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
                lineHeight={18}
              >
                Escolha abaixo se você prefere receber o produto no conforto do
                seu lar ou retirar em uma de nossas lojas
                <Typography
                  color="verdeSucesso"
                  fontFamily="nunitoRegular"
                  fontSize={15}
                  lineHeight={18}
                >
                  {' gratuitamente.'}
                </Typography>
              </Typography>
            </Box>
          </Box>

          <Box flexDirection="row" justifyContent="space-between">
            <Box flex={1}>
              <Button
                onPress={() => {
                  setSelectMethodDelivery(false);
                }}
                flexDirection="row"
                borderColor="preto"
                borderWidth="hairline"
                inline
                height={50}
                testID="delivery_button_receive_home"
                bg={!selectMethodDelivery ? 'preto' : 'white'}
              >
                <Typography
                  color={!selectMethodDelivery ? 'white' : 'preto'}
                  fontFamily="nunitoRegular"
                  fontSize={11}
                  letterSpacing={1.6}
                  lineHeight={24}
                >
                  RECEBER EM CASA
                </Typography>
              </Button>
            </Box>

            <Box flex={1}>
              <Button
                marginLeft="nano"
                borderColor="preto"
                borderWidth="hairline"
                flexDirection="row"
                inline
                height={50}
                onPress={() => {
                  setSelectMethodDelivery(true);
                }}
                testID="delivery_button_pick_up_in_store"
                bg={selectMethodDelivery ? 'preto' : 'white'}
              >
                <Box>
                  <Typography
                    color={selectMethodDelivery ? 'white' : 'preto'}
                    fontFamily="nunitoRegular"
                    fontSize={11}
                    letterSpacing={1.6}
                    lineHeight={14}
                  >
                    RETIRAR NA LOJA
                  </Typography>
                  <Typography
                    color="verdeSucesso"
                    fontFamily="nunitoRegular"
                    fontSize={11}
                    style={{ textAlign: 'center' }}
                    letterSpacing={1.6}
                    lineHeight={14}
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
            !selectMethodDelivery
            && profile && (
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
        {cookie != null && !selectMethodDelivery && (
          <Box justifyContent="flex-end" alignItems="center" mt="xxxs">
            <Button
              onPress={() => navigation.navigate('NewAddress', {
                executeCallback: createPayload,
              })}
              height={50}
              width={DEVICE_WIDTH * 0.8}
              inline
              fontFamily="nunitoRegular"
              fontSize={13}
              lineHeight={24}
              letterSpacing={1.6}
              title="ADICIONAR ENDEREÇO"
              testID="delivery_button_add_address"
              variant="primarioEstreitoOutline"
            />
          </Box>
        )}
        <Box
          flex={1}
          justifyContent="flex-start"
          mb="xs"
          mt="xl"
        // bg="verdeSucesso"
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
            testID="delivery_button_method_payment"
            inline
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export const DeliveryScreen = Delivery;
