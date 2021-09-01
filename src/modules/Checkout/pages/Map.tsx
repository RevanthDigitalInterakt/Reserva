import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import { Typography, Box, Button, Image, Divider, Icon } from 'reserva-ui';
import { images } from '../../../assets';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCart, PickupPoints } from '../../../context/CartContext';

type Props = StackScreenProps<RootStackParamList, 'MapScreen'>;
export const MapScreen = ({ route }: Props) => {
  const { geolocation, locationPermission } = route?.params;
  const { orderForm, addShippingOrPickupInfo, convertZipCode } = useCart();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [position, setPosition] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>();

  //Pega a posição do usuário
  useEffect(() => {
    if (locationPermission) {
      setLoadingMap(true);
      Geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      });
      setLoadingMap(false);
    } else {
      getGeolocation(geolocation)
    }
  }, []);

  const getGeolocation = async (geolocation: string) => {
    setLoadingMap(true)
    const data = await convertZipCode(geolocation)
    if (data) {
      const [longitude, latitude] = data?.geoCoordinates
      setPosition({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setLoadingMap(false)
    }
  }

  const onSelectPickupPoint = async (item: any) => {
    setLoading(true);
    if (orderForm) {

      const slas = orderForm.shippingData.logisticsInfo[0].slas.find(
        ({ pickupPointId }) => pickupPointId === item.id
      );

      if (slas) {
        const { deliveryChannel, id } = slas;

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

        delete item.address.addressType;
        delete item.address.receiverName;

        const data = await addShippingOrPickupInfo(
          logisticInfo,
          [
            {
              addressType: 'search',
              receiverName: `${orderForm.clientProfileData.firstName} ${orderForm.clientProfileData.lastName}`,
              ...item?.address
            }
          ]
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
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <TopBarBackButton loading={loading || loadingMap} showShadow />

      <Box flex={2}>
        {position &&
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 2 }}
            initialRegion={position}
          >
            <Marker
              coordinate={{ latitude: position?.latitude, longitude: position?.longitude }}
            >
              {/* Posição do usuário */}
              <Box>
                <Image
                  height={40}
                  source={images.pinYou}
                  resizeMode={'contain'}
                />
              </Box>
            </Marker>
            {orderForm?.shippingData.pickupPoints.map((coordinate, index) => {
              const [longitude, latitude] = coordinate.address.geoCoordinates
              return (
                <Marker key={index} coordinate={{ latitude: latitude, longitude: longitude }}>
                  <Image
                    height={40}
                    source={images.localReserva}
                    resizeMode={'contain'}
                  />
                </Marker>
              )
            })}
          </MapView>
        }
        <Box position={'absolute'} right={20} bottom={20}>
          <Button
            height={40}
            width={40}
            bg="white"
            borderRadius={'infinity'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Icon name={'Crosshair'} size={30} color={'preto'} />
          </Button>
        </Box>
      </Box>

      <Box flex={1}>
        <FlatList
          data={orderForm?.shippingData.pickupPoints}
          renderItem={({ item }) => (
            <>
              <Button
                width={'100%'}
                onPress={() => {
                  onSelectPickupPoint(item);
                }}
                disabled={loading}
              >
                <Box width={'100%'} backgroundColor={'white'} my={'micro'}>
                  <Box borderColor={'backgroundMenuOpened'}>
                    <Box flexDirection="row">
                      <Box>
                        <Image
                          height={40}
                          source={images.localReserva}
                          resizeMode={'contain'}
                        />
                      </Box>
                      <Box>
                        <Box mb={'quarck'}>
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
              <Divider variant={'fullWidth'} />
            </>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Box>
    </SafeAreaView>
  );
};
