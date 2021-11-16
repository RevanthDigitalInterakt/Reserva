
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types"
import React, { useState, useEffect } from "react"
import { Modal, Platform, ScrollView } from 'react-native';
import { Dimensions, ImageBackground, InteractionManager, TouchableOpacity } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import { View } from "react-native-animatable"
import { TouchableHighlight } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Icon, Image, Typography } from "reserva-ui"
import { height } from "styled-system"
import { CorreReservaStackParamList } from "../.."
import { Counter } from "../../components/Counter"
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text } from "react-native-svg";
import { useChronometer } from "../../hooks/useChronometer";
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

export interface RaceDetailProps {

}

type RaceDetailNavigator = StackNavigationProp<CorreReservaStackParamList, 'RaceDetail'>

export const RaceDetail: React.FC = () => {
  const navigation = useNavigation<RaceDetailNavigator>()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>();
  const [newPosition, setNewPosition] = useState<any>();
  const [travelledDistance, setTravelledDistance] = useState<{ latitude: number, longitude: number }[]>([]);
  const [totalDistance, setTotalDistance] = useState(0)
  const { currentValue, start, stop } = useChronometer({ initial: "00:00:00", })
  const [count, setCount] = useState<number>(3)
  const [visibility, setVisibility] = useState(true)
  const [pace, setPace] = useState<string>("0:0")

  useEffect(() => {
    setCount(3)
    const interval = setInterval(() => {

      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1
        }
        setVisibility(false)
        clearInterval(interval)
        return prevCount
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    console.log('visibility', visibility)
    if (!visibility) {
      start()
    } else {
      stop()
    }
  }, [visibility])

  useEffect(() => {
    const watchID = Geolocation.watchPosition((pos) => {
      const coords = pos.coords;
      setPosition({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setTravelledDistance([
        ...travelledDistance,
        {
          latitude: coords.latitude, longitude: coords.longitude,
        }
      ])
    }, (suss) => {
      console.log('suss', suss)

    },
      {
        enableHighAccuracy: true,
        distanceFilter: 1
      });
    return () => {
      Geolocation.clearWatch(watchID)
    }
  }, []);

  function getDistanceFromLatLonInKm() {
    var d = 0;
    if (travelledDistance.length > 1) {
      for (let i = 0; i < travelledDistance.length - 1; i++) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(travelledDistance[i + 1].latitude - travelledDistance[i].latitude);  // deg2rad below
        var dLon = deg2rad(travelledDistance[i + 1].longitude - travelledDistance[i].longitude);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(travelledDistance[i].latitude)) * Math.cos(deg2rad(travelledDistance[i + 1].latitude)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d += R * c
      }
    }
    setTotalDistance(d.toFixed(3))
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  function calculatePace(dist: any, timer: any) {
    //console.log(dist, hrs, mins, secs);
    console.log('timer', timer)
    let [hrs, mins, secs]: any = timer.split(":")
    dist = parseFloat(dist);
    hrs = parseFloat(hrs);
    mins = parseFloat(mins);
    secs = parseFloat(secs);
    //console.log(dist);
    console.log('hrs', hrs)
    console.log('mins', mins)
    console.log('secs', secs)
    let pace;
    let timeElapsed = 0;
    timeElapsed += hrs * 60 * 60;
    timeElapsed += mins * 60;
    timeElapsed += secs;
    let calculatedPace = Math.floor(timeElapsed / dist);
    //console.log(calculatedPace);
    let paceMins = Math.floor(calculatedPace / 60) | 0;
    let paceSecs = calculatedPace - (paceMins * 60) | 0;
    pace = paceMins + ":" + paceSecs;
    setPace(pace)
  }

  useEffect(() => {
    calculatePace(totalDistance, currentValue)
  }, [totalDistance])

  useEffect(() => {
    getDistanceFromLatLonInKm()
  }, [travelledDistance])

  useEffect(() => {
    // console.log('totalDistance', totalDistance)
  }, [totalDistance])
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        paddingTop: 111,
        flex: 1
      }}
    >

      <RegressiveCount
        isVisible={visibility}
        count={count}
      />
      {/* <HeaderCorreReserva /> */}
      <Box backgroundColor='#0F1113' zIndex={0} position='absolute' width='100%' height={DEVICE_HEIGHT / 2} mx="micro" />
      <Box width={DEVICE_WIDTH - 96} alignItems="center" >

        <Counter
          timer={currentValue}
          isPlate
          distance={totalDistance.toString()}
          rhythm={pace}
          plates="00"
        />
        <Box
          mt={"sm"}
          borderRadius="sm"
          width={263}
          height={302}
          boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
          style={{ elevation: 10, overflow: "hidden" }}
          bg="pink"
        >
          <MapView

            provider={PROVIDER_GOOGLE}
            style={{ flex: 2 }}
            initialRegion={position}
          >
          </MapView>
        </Box>

        <TouchableOpacity

          onPress={() => setIsVisible(true)}
        >
          <Box
            mt="xs"
            height={40}
            width="100%"
            paddingLeft={40}
            paddingRight={40}
            bg="#29C94E"
            borderRadius="infinity"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              color="white"
            >
              DESLIZE PRA INICIAR
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>
    </SafeAreaView >
  )
}

const RegressiveCount: React.FC<{
  isVisible?: boolean;
  count?: number;
}> = ({ isVisible, count }) => {

  return (
    <Modal visible={isVisible} transparent>
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor={'#000'}
        opacity={.85}
        zIndex={5}
      >
        <Typography
          color='white'
          fontFamily='reservaSerifBold'
          fontSize={200}
        >
          {count}
        </Typography>
      </Box>
    </Modal>
  )
}