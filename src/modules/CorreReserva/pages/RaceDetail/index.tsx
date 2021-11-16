
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
  const mapWidth = DEVICE_WIDTH - (48 * 2)
  const mapHeight = (302 / 263) * mapWidth

  const navigation = useNavigation<RaceDetailNavigator>()
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>();
  const [newPosition, setNewPosition] = useState<any>();
  const [travelledDistance, setTravelledDistance] = useState<{ latitude: number, longitude: number }[]>([]);
  const [totalDistance, setTotalDistance] = useState(0)

  const [hasStarted, setHasStarted] = useState(false)

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
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 111,
        flex: 1
      }}
    >

      <RegressiveCount visibility={isVisible} setVisibility={(value) => setIsVisible(value)} />
      <Box backgroundColor='#0F1113' zIndex={0} position='absolute' width='100%' height={DEVICE_HEIGHT / 2} mx="micro" />
      <Box width={DEVICE_WIDTH - (48 * 2)} alignItems="center" >

        <Counter
          hours="0"
          minutes="00"
          seconds="00"
          distance="00.0"
          rhythm="0.0"
          plates="00"
        />

        <Box
          mt={"sm"}
          borderRadius="sm"
          width={mapWidth}
          height={mapHeight}
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
          onPress={() => {
            if (hasStarted)
              console.log('aaaa')
            else {
              setHasStarted(true)
              setIsVisible(true)
            }

          }}
        >
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
              color={hasStarted ? 'preto' : "white"}
              letterSpacing={1.6}
              fontFamily='nunitoBold'
            >
              CLIQUE PRA {hasStarted ? 'FINALIZAR' : 'INICIAR'}
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>
    </SafeAreaView >
  )
}


const RegressiveCount: React.FC<{ visibility?: boolean, setVisibility?: (value: boolean) => void }> = ({ visibility, setVisibility }) => {

  const [count, setCount] = useState<number>(3)
  // const [visibility, setVisibility] = useState(isVisible)

  useEffect(() => {
    if (visibility) {
      setCount(3)
      const interval = setInterval(() => {

        setCount((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1
          }
          setVisibility && setVisibility(false)
          clearInterval(interval)
          return prevCount
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [visibility])

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