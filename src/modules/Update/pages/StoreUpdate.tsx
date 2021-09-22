import { useNavigation } from "@react-navigation/core"
import { useLinkTo } from "@react-navigation/native"
import React from "react"
import { Linking } from 'react-native'
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Image, Typography } from "reserva-ui"
import { images } from "../../../assets"

export const StoreUpdate: React.FC<any> = () => {
  const linkTo = useLinkTo()
  return <SafeAreaView>
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
            onPress={() => setUpdateConfirmed(true)}
            inline
            title='CONTINUAR'
            variant='primarioEstreitoOutline'
          />
        </Box>
      </Box>
    </Box>
  </SafeAreaView>
}