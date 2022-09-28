import { useLazyQuery } from '@apollo/client';
import { Box, Button, Typography } from '@danilomsou/reserva-ui';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import { RootStackParamList } from 'routes/StackNavigator';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import ReceiveHome from '../components/ReceiveHome';
import Store from '../components/Store';
import Sentry from '../../../config/sentryConfig';

type Props = StackScreenProps<RootStackParamList, 'DeliveryScreen'>;

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Delivery: React.FC<Props> = ({ route, navigation }) => {
  const { comeFrom } = route.params;

  const { orderForm, addShippingOrPickupInfo, orderform } = useCart();
  const { cookie, setCookie, email } = useAuth();
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
  const [addressId, setAddressId] = React.useState('');
  const [loading, setLoading] = useState(false);

  const [{ data, loadingProfile, refetch }, setProfileData] = useState({
    refetch: () => {},
    data: {} as any,
    loadingProfile: true,
  });

  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    getProfile().then((response) =>
      setProfileData({
        refetch: response.refetch,
        data: response.data,
        loadingProfile: false,
      })
    );
  }, []);

  useEffect(() => {
    Sentry.configureScope((scope) =>
      scope.setTransactionName('DeliveryScreen')
    );
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

    const valueShipping = orderForm?.shippingData?.logisticsInfo.map(
      (item: any) => {
        const valuePrice = item.slas.find((sla: any) => {
          if (sla.id === 'Padrão') {
            return sla;
          }
        });
        return valuePrice.price;
      }
    );

    const shippingPrice = valueShipping?.reduce((a: any, b: any) => {
      return a + b;
    }, 0);

    setShippingValue(shippingPrice);

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
          prev.pickupDistance <= curr.pickupDistance ? prev : curr,
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

  const updateAddresses = () => {
    if (!selectMethodDelivery) {
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
                  {` gratuitamente.`}
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
                    color={'verdeSucesso'}
                    fontFamily="nunitoRegular"
                    fontSize={11}
                    style={{ textAlign: 'center' }}
                    letterSpacing={1.6}
                    lineHeight={14}
                  >
                    {`(GRÁTIS)`}
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
            !selectMethodDelivery &&
            profile && (
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
              onPress={() =>
                navigation.navigate('NewAddress', {
                  isCheckout: true,
                  receiveHome: true,
                  id: undefined,
                  onAddAddressCallBack: async () => await orderform(),
                })
              }
              height={50}
              width={DEVICE_WIDTH * 0.8}
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
        {/* {selectMethodDelivery && (
          <Box flex={1} paddingX="xxxs" pt="micro" pb="xxxs">
            <Button
              onPress={() =>
                mapPermission
                  ? navigation.navigate('MapScreen', {
                      geolocation: '',
                      locationPermission: mapPermission,
                    })
                  : navigation.navigate('WithdrawInStore', { isCheckout: true })
              }
              inline
              title="VER MAIS LOJAS PRÓXIMAS"
              variant="primarioEstreitoOutline"
              fontFamily="nunitoRegular"
              fontSize={13}
              height={50}
            />
          </Box>
        )} */}

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
            inline
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
export const DeliveryScreen = Delivery;
