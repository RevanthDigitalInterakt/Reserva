
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
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

export interface RaceDetailProps {

}

type RaceDetailNavigator = StackNavigationProp<CorreReservaStackParamList, 'RaceDetail'>

export const RaceDetail: React.FC = () => {
  const navigation = useNavigation<RaceDetailNavigator>()
  const [position, setPosition] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>();
  const [newPosition, setNewPosition] = useState<any>();
  const [travelledDistance, setTravelledDistance] = useState<{ latitude: number, longitude: number }[]>([]);
  const [totalDistance, setTotalDistance] = useState(0)

  useEffect(() => {
    const watchID = Geolocation.watchPosition((pos) => {
      // console.log('possss', pos)
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
        distanceFilter: 2
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
    // if (Math.trunc(d) > 0) {
    //   setTotalDistance(d.toFixed(2))
    // } else {
    //   setTotalDistance(d.toFixed(2) * 1000)
    // }
    // console.log('d', d)
    // console.log('dm', d.toFixed(2))
    setTotalDistance(d.toFixed(2))
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  useEffect(() => {
    getDistanceFromLatLonInKm()
  }, [travelledDistance])

  useEffect(() => {
    console.log('totalDistance', totalDistance)
  }, [totalDistance])
  return (
    <SafeAreaView
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 111,
        flex: 1
      }}
    >

      <RegressiveCount isVisible={true} />
      {/* <HeaderCorreReserva /> */}
      <Box backgroundColor='#0F1113' zIndex={0} position='absolute' width='100%' height={DEVICE_HEIGHT / 2} mx="micro" />
      <Box width={DEVICE_WIDTH - 96} alignItems="center" >

        <Counter
          hours="0"
          minutes="00"
          seconds="00"
          distance="00.0"
          rhythm="0.0"
          plates="00"
        />
        {/* <Box marginTop={34} >
          <Typography
            fontFamily='reservaSerifRegular'
            fontSize={52}
            color='white'
            textAlign='center'
          >
            <Typography fontFamily='reservaSerifBold' color='white'>0</Typography>
            <Typography fontFamily='reservaSerifLight' color="#808080" >h </Typography>
            <Typography fontFamily='reservaSerifBold' color='white'>00</Typography>
            <Typography fontFamily='reservaSerifLight' color="#808080" >m </Typography>
            <Typography fontFamily='reservaSerifBold' color='white'>00</Typography>
            <Typography fontFamily='reservaSerifLight' color="#808080" >s</Typography>
          </Typography>
        </Box> */}
        {/* <Box px="micro" width="100%" >
          <Box flexDirection="row" justifyContent="space-evenly">
            <Box flexDirection="row"  >
              <Box mt="quarck">
                <IconDistance />
              </Box>
              <Box marginLeft="quarck">
                <Typography fontFamily='reservaSerifBold' fontSize={27} color='white' >00.0</Typography>
                <Typography fontFamily='reservaSerifLight' fontSize={11} color='white'>Distância</Typography>
              </Box>
            </Box>
            <Box flexDirection="row" >
              <Box mt="quarck">
                <IconRhythm />
              </Box>
              <Box marginLeft="quarck">
                <Typography fontFamily='reservaSerifBold' fontSize={27} color='white' >0.0</Typography>
                <Typography fontFamily='reservaSerifLight' fontSize={11} color='white'>Ritmo</Typography>
              </Box>
            </Box>
            <Box flexDirection="row" >
              <Box mt="quarck">
                <IconDish />
              </Box>
              <Box marginLeft="quarck">
                <Typography fontFamily='reservaSerifBold' fontSize={27} color='white' >+00</Typography>
                <Typography fontFamily='reservaSerifLight' fontSize={11} color='white'>Pratos</Typography>
              </Box>
            </Box>
          </Box>
        </Box> */}
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

        <Box
          mt="xs"
          height={40}
          width="100%"
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

      </Box>
    </SafeAreaView >
  )
}


const RegressiveCount: React.FC<{ isVisible?: boolean }> = ({ isVisible }) => {

  const [count, setCount] = useState<number>(3)
  const [visibility, setVisibility] = useState(true)

  // useEffect(() => {
  //   setVisibility(!!isVisible ? isVisible : false)
  // }, [isVisible])

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

  // useEffect(() => {
  //   if (count < 3) {
  //     setTimeout(setCount(count + 1), 1000)
  //   }
  // }, [count])

  return (
    <Modal visible={visibility} transparent>
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