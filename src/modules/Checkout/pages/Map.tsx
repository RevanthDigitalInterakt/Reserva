// TODO update
export function MapScreen() {
  return null;
}

/*

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {
  Typography, Box, Button, Divider, Icon,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import type { StackScreenProps } from '@react-navigation/stack';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useCart } from '../../../context/CartContext';
import IconComponent from '../../../components/IconComponent/IconComponent';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';

type Props = StackScreenProps<RootStackParamList, 'MapScreen'>;

export const MapScreen = ({ route }: Props) => {
  const { geolocation, locationPermission } = route?.params;
  const mapRef = useRef<MapView>(null);
  const {
    orderForm, addShippingOrPickupInfo, convertZipCode,
  } = useCart();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [position, setPosition] = useState<
  { latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number }
  >();

  const getGeolocation = async (value: string) => {
    setLoadingMap(true);

    try {
      const data = await convertZipCode(value);

      if (data) {
        const [longitude, latitude] = data?.geoCoordinates;

        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    } catch (e) {
      ExceptionProvider.captureException(e);
    } finally {
      setLoadingMap(false);
    }
  };

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

  useEffect(() => {
    fetchCurrentPosition();
  }, []);

  const onSelectPickupPoint = async (item: any) => {
    setLoading(true);
    if (orderForm) {
      const slas = orderForm.shippingData.logisticsInfo[0]?.slas.find(
        ({ pickupPointId }) => pickupPointId === item.id,
      );

      if (slas) {
        const { deliveryChannel, id } = slas;

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
      {orderForm && orderForm?.shippingData?.pickupPoints?.length > 0
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
                  <IconComponent
                    icon="pinYou"
                    width={90}
                  />
                </Marker>
                {orderForm?.shippingData.pickupPoints.map((coordinate) => {
                  const [longitude, latitude] = coordinate.address.geoCoordinates;
                  if (longitude && latitude) {
                    return (
                      <Marker
                        key={`${longitude}-${latitude}`}
                        coordinate={{ latitude, longitude }}
                      >
                        <IconComponent
                          icon="localReserva"
                          height={40}
                          width={40}
                        />
                      </Marker>
                    );
                  }
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
                              <IconComponent
                                icon="localReserva"
                                height={40}
                                width={40}
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
            <IconComponent
              icon="noStoresFound"
              height={100}
              width={100}
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

*/
