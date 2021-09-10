import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Divider, Typography } from 'reserva-ui'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { ApplicationState } from '../../../store'
import {
    addCashback,
    setCashback,
    subCashback,
} from '../../../store/ducks/cashback/actions'
import { PriceCustom } from '../../Checkout/components/PriceCustom'
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton'

type Props = StackScreenProps<RootStackParamList, 'Credits'>

export const Credits: React.FC<Props> = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const { cashback } = useSelector((state: ApplicationState) => state)

    return (
        <SafeAreaView flex={1} backgroundColor='white'>
            <TopBarBackButton
                loading={loading}
                showShadow
                backButtonPress={() => navigation.goBack()}
            />
            <Box mx={20} mt='sm'>
                <Box mb='nano'>
                    <Typography variant='tituloSessoes'>Meus créditos</Typography>
                </Box>
                <Typography fontFamily='nunitoRegular' fontSize={14}>
                    Use o crédito na sua próxima compra. Ele aparecerá automaticamente no
                    ato do pagamento.
                </Typography>
                <Box mt={20}>
                    <Divider variant='fullWidth' />
                    <Box py={20} flexDirection='row' justifyContent='space-between'>
                        <Typography variant='subtituloSessoes'>
                            Créditos e cashback
                        </Typography>
                        <PriceCustom
                            fontFamily='nunitoBold'
                            num={cashback.value}
                            sizeDecimal={13}
                            sizeInterger={20}
                        />
                    </Box>
                    <Divider variant='fullWidth' />
                </Box>
            </Box>
        </SafeAreaView>
    )
}
