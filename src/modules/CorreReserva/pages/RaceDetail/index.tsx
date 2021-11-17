import React, { useEffect, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { Dimensions, Modal, Platform, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Typography, Image } from 'reserva-ui';

import { CorreReservaStackParamList } from '../..';
import { images } from '../../../../assets';
import { Counter, } from '../../components/Counter';
// import SwipeButton from '../../components/SwipeButton';
import { useChronometer } from '../../hooks/useChronometer';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');


export interface RaceDetailProps { }

type RaceDetailNavigator = StackNavigationProp<
  CorreReservaStackParamList,
  'RaceDetail'
>;

export const RaceDetail: React.FC = () => {
  const mapWidth = DEVICE_WIDTH - 48 * 2;
  const mapHeight = (302 / 263) * mapWidth;

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
  const [totalDistance, setTotalDistance] = useState(0);
  const { currentValue, start, stop } = useChronometer({ initial: '00:00:00' });
  const [count, setCount] = useState<number>(3);
  const [visibility, setVisibility] = useState(false);
  const [pace, setPace] = useState<string>('0:0');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
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
  }, [visibility]);

  // useEffect(() => {
  //   console.log('visibility', visibility)
  //   if (hasStarted) {
  //     start()
  //   } else {
  //     stop()
  //   }
  // }, [hasStarted])

  const handleOnPress = () => {
    if (hasStarted) {
      stop();
      navigation.navigate('RaceFinalized');
    } else {
      setVisibility(true);
      setHasStarted(true);
      setTimeout(() => {
        start();
      }, 3050);
    }
  };

  // Pega a posição do usuário
  useEffect(() => {
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

  // pega nova posicão do usuário quando ele andar
  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      (pos) => {
        const { coords } = pos;
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

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
  }, []);

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
      <Box width={DEVICE_WIDTH - 48 * 2} alignItems="center">
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
            >
              <Marker
                coordinate={{
                  latitude: position?.latitude,
                  longitude: position?.longitude,
                }}
              >
                <Typography>15 Km</Typography>
                <Image
                  height={40}
                  source={images.localReserva}
                  resizeMode="contain"
                />
              </Marker>
            </MapView>
          )}
        </Box>

        {/* <SwipeButton onToggle={() => { }} /> */}

        <TouchableOpacity onPress={handleOnPress}>
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
        </TouchableOpacity>
      </Box>
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
