import React, { useEffect, useRef, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Dimensions,
  Modal,
  Platform,
  Vibration,
  ScrollView,
} from 'react-native';
import LocationEnabler from 'react-native-location-enabler';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  LatLng,
} from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Typography, Image } from 'reserva-ui';

import { CorreReservaStackParamList } from '../..';
import { images } from '../../../../assets';
import { Counter } from '../../components/Counter';
import SwipeButton from '../../components/SwipeButton';
import { useCorre } from '../../context';
import { useChronometer } from '../../hooks/useChronometer';

import { KM_15, KM_10, KM_5, KM_2 } from './polyline';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export interface RaceDetailProps { }

type RaceDetailNavigator = StackNavigationProp<
  CorreReservaStackParamList,
  'RaceDetail'
>;

export const RaceDetail: React.FC = () => {
  const mapWidth = DEVICE_WIDTH - 48 * 2;
  const mapHeight = (302 / 263) * mapWidth;

  const { selectedModality, selectedKit, setRaceResume } = useCorre();
  const navigation = useNavigation<RaceDetailNavigator>();
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>();
  const [travelledDistance, setTravelledDistance] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [center, setCenter] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const { currentValue, start, stop } = useChronometer({ initial: '00:00:00' });
  const [count, setCount] = useState<number>(3);
  const [visibility, setVisibility] = useState(false);
  const [pace, setPace] = useState<string>('0:0');
  const [hasStarted, setHasStarted] = useState(false);
  const [forceToggle, setForceToggle] = useState<boolean>();
  const [totalVibration, setTotalVibration] = useState(0);
  const mapRef = useRef<MapView>(null);
  const ONE_SECOND_IN_MS = 1000;

  const {
    useLocationSettings,
    PRIORITIES: { HIGH_ACCURACY },
  } = LocationEnabler;

  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */
  );

  useEffect(() => {
    let km = 0;
    if (Math.floor(totalDistance) !== 0) {
      km = Math.floor(totalDistance);
      if (km != totalVibration) {
        setTotalVibration(Math.floor(totalDistance));
      }
    }
  }, [totalDistance]);

  useEffect(() => {
    if (totalVibration != 0) {
      Vibration.vibrate(ONE_SECOND_IN_MS);
    }
  }, [totalVibration]);

  useEffect(() => {
    console.log('totalVibration', totalVibration);
  }, [totalVibration]);

  useEffect(() => {
    if (visibility) {
      setCount(3);
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          }
          setVisibility(false);
          clearInterval(interval);
          return prevCount;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [visibility]);

  // Pega a posição do usuário
  useEffect(() => {
    requestResolution();
    Geolocation.getCurrentPosition((pos) => {
      const { coords } = pos;
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    });
  }, []);

  const startGeolocation = async () => {
    // pega nova posicão do usuário quando ele andar
    const watchID = Geolocation.watchPosition(
      (pos) => {
        const { coords } = pos;
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        if (mapRef.current) {
          mapRef.current?.animateCamera({
            latitude: coords?.latitude,
            longitude: coords?.longitude,
          });
        }
        setTravelledDistance((value) => [
          ...value,
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
        ]);
      },
      (suss) => {
        console.log('suss', suss);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 2,
      }
    );
    return () => {
      Geolocation.clearWatch(watchID);
    };
  };

  const handleOnPress = (isToggled: boolean) => {
    console.log('isToggled', isToggled);
    console.log('hasStarted', hasStarted);
    console.log('aaaaaa', totalDistance);
    setRaceResume({
      distance: totalDistance.toString(),
      duration: currentValue,
      foodPlate: Math.round(Number(totalDistance) + 10).toString(),
      pace,
    });

    if (hasStarted) {
      stop();
      if (selectedModality === 'presential') {
        navigation.navigate('QrCodeScanner', { isFinalizingRace: true });
      } else {
        navigation.navigate('RaceFinalized');
      }
    } else {
      startGeolocation();
      setVisibility(true);
      setHasStarted(true);
      setTimeout(() => {
        start();
        setForceToggle(false);
        setForceToggle(undefined);
      }, 3050);
    }
  };

  const getDistanceFromLatLonInKm = () => {
    let d = 0;
    if (travelledDistance.length > 1) {
      for (let i = 0; i < travelledDistance.length - 1; i++) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(
          travelledDistance[i + 1].latitude - travelledDistance[i].latitude
        ); // deg2rad below
        const dLon = deg2rad(
          travelledDistance[i + 1].longitude - travelledDistance[i].longitude
        );
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(travelledDistance[i].latitude)) *
          Math.cos(deg2rad(travelledDistance[i + 1].latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d += R * c;
      }
    }
    setTotalDistance(d.toFixed(2));
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const calculatePace = (dist: any, timer: any) => {
    let [hrs, mins, secs]: any = timer.split(':');
    dist = parseFloat(dist);
    hrs = parseFloat(hrs);
    mins = parseFloat(mins);
    secs = parseFloat(secs);
    let pace;
    let timeElapsed = 0;
    timeElapsed += hrs * 60 * 60;
    timeElapsed += mins * 60;
    timeElapsed += secs;
    const calculatedPace = Math.floor(timeElapsed / dist);
    // console.log(calculatedPace);
    const paceMins = Math.floor(calculatedPace / 60) | 0;
    const paceSecs = (calculatedPace - paceMins * 60) | 0;
    pace = `${paceMins}:${paceSecs}`;
    setPace(pace);
  };

  const generateCoordinates = (selectedKitKm: number): LatLng[] => {
    let coordinates: LatLng[] = [];
    if (selectedKitKm === 15) {
      coordinates = [...coordinates, ...KM_15];
    }
    if (selectedKitKm >= 10) {
      coordinates = [...coordinates, ...KM_10];
    }
    if (selectedKitKm >= 5) {
      coordinates = [...coordinates, ...KM_5];
    }
    if (selectedKitKm >= 2) {
      coordinates = [...coordinates, ...KM_2];
    }

    return coordinates;
  };

  const getKmMarker = (selectedKitKm: number) => {
    // eslint-disable-next-line default-case
    switch (selectedKitKm) {
      case 15: {
        return (
          <Marker coordinate={{ latitude: -22.97527, longitude: -43.21713 }}>
            <Typography>15 Km</Typography>
            <Image
              height={40}
              source={images.localReserva}
              resizeMode="contain"
            />
          </Marker>
        );
      }
      case 10: {
        return (
          <Marker
            coordinate={{
              latitude: -22.981829,
              longitude: -43.189591,
            }}
          >
            <Typography>10 Km</Typography>
            <Image
              height={40}
              source={images.localReserva}
              resizeMode="contain"
            />
          </Marker>
        );
      }
      case 5: {
        return (
          <Marker
            coordinate={{
              latitude: -22.947746,
              longitude: -43.181345,
            }}
          >
            <Typography>5 Km</Typography>
            <Image
              height={40}
              source={images.localReserva}
              resizeMode="contain"
            />
          </Marker>
        );
      }
      case 2: {
        return (
          <Marker
            coordinate={{
              latitude: -22.93532,
              longitude: -43.172099,
            }}
          >
            <Typography>2 Km</Typography>
            <Image
              height={40}
              source={images.localReserva}
              resizeMode="contain"
            />
          </Marker>
        );
      }
    }
  };

  useEffect(() => {
    calculatePace(totalDistance, currentValue);
  }, [totalDistance]);

  useEffect(() => {
    getDistanceFromLatLonInKm();
  }, [travelledDistance]);

  useEffect(() => {
    // console.log('totalDistance', totalDistance)
  }, [totalDistance]);
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 111,
        flex: 1,
      }}
    >
      <RegressiveCount isVisible={visibility} count={count} />
      {/* <HeaderCorreReserva /> */}
      <Box
        backgroundColor="#0F1113"
        zIndex={0}
        position="absolute"
        width="100%"
        height={DEVICE_HEIGHT / 2}
        mx="micro"
      />
      <ScrollView>
        <Box width={DEVICE_WIDTH} alignItems="center">
          <Counter
            timer={currentValue}
            isPlate
            distance={totalDistance.toString()}
            rhythm={pace}
            plates="00"
          />
          <Box
            mt="sm"
            borderRadius="sm"
            marginBottom={39}
            width={mapWidth}
            height={mapHeight}
            boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
            style={{ elevation: 10, overflow: 'hidden' }}
            bg="white"
          >
            {position && (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 2 }}
                initialRegion={position}
                ref={mapRef}
              >
                {selectedModality === 'presential' && (
                  <>
                    <Polyline
                      coordinates={generateCoordinates(
                        selectedKit && selectedKit.km ? selectedKit.km : 15
                      )}
                      strokeColor="#EF1E1E" // fallback for when `strokeColors` is not supported by the map-provider
                      strokeWidth={6}
                    />
                    {selectedKit &&
                      selectedKit.km &&
                      getKmMarker(selectedKit.km)}

                    <Marker
                      coordinate={{
                        latitude: -22.919588,
                        longitude: -43.168051,
                      }}
                    >
                      <Typography>Chegada</Typography>
                      <Image
                        height={40}
                        source={images.localReserva}
                        resizeMode="contain"
                      />
                    </Marker>
                  </>
                )}
                <Marker
                  coordinate={{
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                  }}
                >
                  <Box
                    width={15}
                    height={15}
                    borderRadius="infinity"
                    bg="vermelhoAlerta"
                  />
                </Marker>
              </MapView>
            )}
          </Box>

          <SwipeButton
            onToggle={handleOnPress}
            forceToggle={forceToggle}
            swipeText={`DESLIZE PARA ${!hasStarted ? 'INICIAR' : 'FINALIZAR'}`}
          />

          {/* <TouchableOpacity onPress={handleOnPress}>
          <Box
            mt="xs"
            height={40}
            width="100%"
            paddingLeft={40}
            paddingRight={40}
            bg={hasStarted ? '#F4F4F4' : '#29C94E'}
            borderRadius="infinity"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              color={hasStarted ? 'preto' : 'white'}
              letterSpacing={1.6}
              fontFamily="nunitoBold"
            >
              CLIQUE PRA {hasStarted ? 'FINALIZAR' : 'INICIAR'}
            </Typography>
          </Box>
        </TouchableOpacity> */}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const RegressiveCount: React.FC<{
  isVisible?: boolean;
  count?: number;
}> = ({ isVisible, count }) => (
  <Modal visible={isVisible} transparent>
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#000"
      opacity={0.85}
      zIndex={5}
    >
      <Typography color="white" fontFamily="reservaSerifBold" fontSize={200}>
        {count}
      </Typography>
    </Box>
  </Modal>
);
