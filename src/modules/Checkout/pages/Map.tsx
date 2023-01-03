import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {
  Typography, Box, Button, Image, Divider, Icon,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import { StackScreenProps } from '@react-navigation/stack';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { images } from '../../../assets';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCart, PickupPoints } from '../../../context/CartContext';

type Props = StackScreenProps<RootStackParamList, 'MapScreen'>;
export const MapScreen = ({ route }: Props) => {
  const { geolocation, locationPermission } = route?.params;
  const mapRef = useRef<MapView>(null);
  const [pickupPoints, setPickupPoints] = useState<PickupPoints[] | undefined>([]);
  const {
    orderForm, addShippingOrPickupInfo, convertZipCode, pickupPoint,
  } = useCart();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [position, setPosition] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>();

  const fetchCurrentPosition = () => {
    if (locationPermission) {
      setLoadingMap(true);
      Geolocation.getCurrentPosition((pos) => {
        const { coords } = pos;
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        // verifica em qual posição o usuário estar
        if (mapRef.current) {
          mapRef.current?.animateCamera({
            center: {
              latitude: coords?.latitude,
              longitude: coords?.longitude,
            },
            zoom: 14,
          });
        }
      });
      setLoadingMap(false);
    } else {
      getGeolocation(geolocation);
    }
  };

  // Pega a posição do usuário
  useEffect(() => {
    fetchCurrentPosition();
  }, []);

  const getGeolocation = async (geolocation: string) => {
    setLoadingMap(true);
    const data = await convertZipCode(geolocation);
    if (data) {
      const [longitude, latitude] = data?.geoCoordinates;
      setPosition({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setLoadingMap(false);
    }
  };

  const onSelectPickupPoint = async (item: any) => {
    setLoading(true);
    if (orderForm) {
      const slas = orderForm.shippingData.logisticsInfo[0].slas.find(
        ({ pickupPointId }) => pickupPointId === item.id,
      );

      if (slas) {
        const { deliveryChannel, id } = slas;

        // save selected logistc info
        const logisticInfo = orderForm.shippingData.logisticsInfo.map(
          ({ itemIndex }) => ({
            itemIndex,
            selectedDeliveryChannel: deliveryChannel,
            selectedSla: id,
          }),
        );

        delete item.address.addressType;
        delete item.address.receiverName;

        const data = await addShippingOrPickupInfo(
          logisticInfo,
          [
            {
              addressType: 'search',
              receiverName: `${orderForm.clientProfileData.firstName} ${orderForm.clientProfileData.lastName}`,
              ...item?.address,
            },
          ],
        );

        setLoading(false);
        // case when update orderform has succeeded, must open payment webview
        if (data) {
          navigation.navigate('Checkout');
        } else {
          Alert.alert('Ocorreu um problema', 'Problema ao atualizar o pedido');
        }
      }
    }
  };

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton loading={loading || loadingMap} showShadow />
      {orderForm && orderForm?.shippingData.pickupPoints.length > 0
        ? (
          <>
            <Box flex={2}>
              {position
              && (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 2 }}
                initialRegion={position}
                ref={mapRef}
              >
                <Marker
                  coordinate={{ latitude: position?.latitude, longitude: position?.longitude }}
                >
                  {/* Posição do usuário */}
                  <Box>
                    <Image
                      height={40}
                      source={images.pinYou}
                      resizeMode="contain"
                    />
                  </Box>
                </Marker>
                {orderForm?.shippingData.pickupPoints.map((coordinate, index) => {
                  const [longitude, latitude] = coordinate.address.geoCoordinates;
                  return (
                    <Marker key={index} coordinate={{ latitude, longitude }}>
                      <Image
                        height={40}
                        source={images.localReserva}
                        resizeMode="contain"
                      />
                    </Marker>
                  );
                })}
              </MapView>
              )}
              <Box position="absolute" right={20} bottom={20}>
                <Button
                  height={40}
                  width={40}
                  bg="white"
                  borderRadius="infinity"
                  alignItems="center"
                  justifyContent="center"
                  onPress={() => { fetchCurrentPosition(); }}
                >
                  <Icon name="Crosshair" size={30} color="preto" />
                </Button>
              </Box>
            </Box>

            <Box flex={1}>
              <FlatList
                data={orderForm?.shippingData.pickupPoints}
                renderItem={({ item }) => (
                  <>
                    <Button
                      width="100%"
                      onPress={() => {
                        onSelectPickupPoint(item);
                      }}
                      disabled={loading}
                    >
                      <Box width="100%" backgroundColor="white" my="micro">
                        <Box borderColor="backgroundMenuOpened" paddingRight="nano">
                          <Box flexDirection="row">
                            <Box>
                              <Image
                                height={40}
                                source={images.localReserva}
                                resizeMode="contain"
                              />
                            </Box>
                            <Box flex={1}>
                              <Box mb="quarck">
                                <Typography
                                  fontFamily="reservaSerifRegular"
                                  fontSize={16}
                                >
                                  {item.friendlyName}
                                </Typography>
                              </Box>
                              <Typography fontFamily="nunitoRegular" fontSize={14}>
                                {`${item.address.street}, ${item.address.number}
${item.address.complement} - ${item.address.neighborhood} - ${item.address.state}, ${item.address.postalCode}`}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Button>
                    <Divider variant="fullWidth" />
                  </>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </Box>
          </>
        )
        : (
          <Box
            bg="white"
            alignItems="center"
            height="100%"
            px="micro"
            mt="xxl"
          >
            <Image
              source={images.noStoresFound}
              resizeMode="contain"
            />
            <Box mb="xxs" mt="md">
              <Typography
                fontFamily="reservaSerifRegular"
                fontSize={24}
              >
                Nenhuma loja encontrada
              </Typography>
            </Box>
            <Box mb="xs">
              <Typography
                textAlign="center"
                fontFamily="nunitoRegular"
                fontSize={14}
              >
                Desculpe, mas não encontramos lojas próximas a sua região.
              </Typography>
            </Box>

            <Box width="100%">
              <Button
                onPress={() => navigation.goBack()}
                marginX="md"
                inline
                title="VOLTAR"
                variant="primarioEstreito"
              />
            </Box>
          </Box>
        )}
    </SafeAreaView>
  );
};
