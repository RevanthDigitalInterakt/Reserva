import { useNavigation } from "@react-navigation/core"
import { useLinkTo } from "@react-navigation/native"
import React, { useEffect } from "react"
import { Linking, NativeModules, Platform } from 'react-native'
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Image, Typography } from "reserva-ui"
import { images } from "../../../assets"
import Modal from 'react-native-modal'
import { padding } from "styled-system"
// import { getAppstoreAppMetadata } from 'react-native-appstore-version-checker'

var { getAppstoreAppVersion } = require('react-native-appstore-version-checker')

interface StoreUpdateProps {
  isVisible: boolean
}

export const StoreUpdate: React.FC<StoreUpdateProps> = ({ isVisible }) => {
  const linkTo = useLinkTo()
  const navigation = useNavigation()


  const hasNewVersion = async () => {
    const id = Platform.OS == 'ios' ? '1566861458' : 'com.usereserva'
    const data = await getAppstoreAppVersion(id, {
      jquerySelector: "[itemprop='softwareVersion']",
      country: 'br',
      typeOfId: "id"
    })
    console.log('store data: ', data)
  }

  // useEffect(() => {
  //   getAppStoreVersion()
  // }, [])

  return <Modal isVisible={isVisible} style={{ margin: 0 }}
  >
    <Box
      bg="white"
      height='100%'
      alignItems="center"
    >
      <Box
        mt="40%"
        px="micro"
        marginRight="micro">
        <Image
          source={images.update}
          resizeMode={'contain'}
        />
      </Box>

      <Box mt={38}>
        <Typography
          fontFamily='reservaSerifMedium'
          fontSize={20}
        >
          Hora de atualizar!
        </Typography>
      </Box>
      <Box mt={15} mx={27}>
        <Typography
          fontFamily='nunitoSemiBold'
          fontSize={13}
          textAlign='center'
        >
          Está disponível uma nova versão do App, realizamos melhorias para tornar sua experiência a mais tranquila possível.
        </Typography>
      </Box>

      <Box mt={19} width='100%' px={20} alignItems='center'>
        <Box width="100%">
          <Button
            onPress={() => {
              Linking.openURL('market://details?id=com.usereserva')
            }}
            inline
            title='ATUALIZAR'
            variant='primarioEstreito'
          />
        </Box>

        <Box
          justifyContent='center'
          my={29}
        >
          <Typography
            fontFamily='nunitoRegular'
            fontSize={15}
          >
            OU
          </Typography>
        </Box>
        <Box width="100%">
          <Button
            onPress={() => {
              hasNewVersion()
              // navigation.navigate('')
            }}
            inline
            title='CONTINUAR'
            variant='primarioEstreitoOutline'
          />
        </Box>
      </Box>
    </Box>
  </Modal >
}
