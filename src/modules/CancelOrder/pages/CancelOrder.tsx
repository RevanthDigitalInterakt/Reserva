import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useState } from 'react'
import { Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, Button, Divider, Icon, Typography } from '@danilomsou/reserva-ui'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton'

type Props = StackScreenProps<RootStackParamList, 'CancelOrder'>

export const CancelOrder: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false)
  return (
    <SafeAreaView flex={1} backgroundColor='white'>
      <TopBarBackButton
        loading={loading}
        showShadow
        backButtonPress={() => navigation.goBack()} //#8A8C8E #38A238
      />
      <Box mx={20} mt='sm'>
        <Typography variant='tituloSessoes'>Cancelar pedidos</Typography>
        <Box mt='xxxs'>
          <Typography variant='tituloSessao'>
            Entre em contato conosco por telefone que nós providenciaremos a
            devolução.
            {'\n\n'}
            Você precisará informar o seu CPF, o número do pedido e o produto a
            ser devolvido.
          </Typography>
        </Box>
        <Box mt='xxxs' mb='xxs'>
          <Typography
            fontFamily='nunitoRegular'
            fontSize={12}
            color='neutroFrio2'>
            Obs: De acordo com o CDC (Código de Defesa do Consumidor), a
            solicitação de cancelamento de compras virtuais deve ser feita em
            até 7 dias úteis/corridos após a data de recebimento.
          </Typography>
        </Box>
      </Box>
      <Divider variant='fullWidth' />
      <Box
        my='xxxs'
        px='xxs'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <Typography variant='tituloSessao'>Whatsapp:</Typography>
        <Button
          onPress={() => {
            Linking.openURL('whatsapp://send?phone=55212108-4990')
          }}>
          <Box
            borderWidth='hairline'
            borderRadius='nano'
            borderColor='neutroFrio1'
            px='micro'
            py={10}
            flexDirection='row'>
            <Icon name='WhatsappBg' color='verdeSucesso' size={20} mr='nano' />
            <Typography>(21) 2108-4990</Typography>
          </Box>
        </Button>
      </Box>
      <Divider variant='fullWidth' />
      <Box
        my='xxxs'
        px='xxs'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <Box>
          <Typography variant='tituloSessao'>Ligação:</Typography>
          <Typography fontFamily='nunitoItalic' fontSize={12}>
            (Rio de Janeiro capital)
          </Typography>
        </Box>
        <Button
          onPress={() => {
            Linking.openURL('tel:552121084990')
          }}>
          <Box
            borderWidth='hairline'
            borderRadius='nano'
            borderColor='neutroFrio1'
            px='micro'
            py={10}
            flexDirection='row'>
            <Icon name='PhoneBg' color='neutroFrio2' size={20} mr='nano' />
            <Typography>(21) 2108-4990</Typography>
          </Box>
        </Button>
      </Box>
      <Divider variant='fullWidth' />
      <Box
        my='xxxs'
        px='xxs'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'>
        <Box>
          <Typography variant='tituloSessao'>Ligação:</Typography>
          <Typography fontFamily='nunitoItalic' fontSize={12}>
            (Demais localidades)
          </Typography>
        </Box>
        <Button
          onPress={() => {
            Linking.openURL('tel:551123888280')
          }}>
          <Box
            borderWidth='hairline'
            borderRadius='nano'
            borderColor='neutroFrio1'
            px='micro'
            py={10}
            flexDirection='row'>
            <Icon name='PhoneBg' color='neutroFrio2' size={20} mr='nano' />
            <Typography>(11) 2388-8280</Typography>
          </Box>
        </Button>
      </Box>
      <Divider variant='fullWidth' />
      <Button
        onPress={() => {
          navigation.goBack()
        }}
        variant='primarioEstreitoOutline'
        title='RETORNAR AO PEDIDO'
        inline
        mx={52}
        mt='xxs'
      />
    </SafeAreaView>
  )
}
