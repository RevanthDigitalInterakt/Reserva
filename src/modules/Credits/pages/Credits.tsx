import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Box, Divider, Typography, Icon, Button } from 'reserva-ui'
import { RootStackParamList } from '../../../routes/StackNavigator'
import { FetchCredit } from '../../../services/unicoService'
import { useQuery } from "@apollo/client";
import { profileQuery, ProfileVars } from "../../../graphql/profile/profileQuery";
import { PriceCustom } from '../../Checkout/components/PriceCustom'
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton'
import { useAuth } from '../../../context/AuthContext'

type Props = StackScreenProps<RootStackParamList, 'Credits'>

export const Credits: React.FC<Props> = ({ navigation, route }) => {
    const { loading, error, data, refetch } = useQuery(profileQuery);
    const [loadingCredit, setLoadingCredit] = useState(false)
    const [profile, setProfile] = useState<ProfileVars>();
    const [credit, SetCredit] = useState(0);
    const { cleanEmailAndCookie } = useAuth()

    useEffect(() => {
        if (data) {
            const { profile } = data;
            if (profile) {
                const { profile } = data;
                setProfile(profile);
            } else {
                if (!loading) {
                    cleanEmailAndCookie()
                }
            }
        }
    }, [data]);

    const fetchCredit = async () => {
        setLoadingCredit(true)
        if (profile) {
            const { data } = await FetchCredit(profile.document)
            SetCredit(data.SaldoMonetario)
        }
        setLoadingCredit(false)
    }

    useEffect(() => {
        fetchCredit()
    }, [profile])

    return (
        <SafeAreaView flex={1} backgroundColor='white'>
            <TopBarBackButton
                loading={loading || loadingCredit}
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
                            num={credit}
                            sizeDecimal={13}
                            sizeInterger={20}
                        />
                    </Box>
                    <Divider variant='fullWidth' />
                    {/* <Box flexDirection="row" mt="xxs">
                        <Button flexDirection="row" onPress={() => { navigation.navigate('Cashback', { credits: credit }) }}>
                            <>
                                <Icon name="Cashback" size={20} color="preto" mr="xxxs" />

                                <Typography
                                    fontFamily='nunitoBold'
                                    fontSize={16}
                                >
                                    Cashback em Lojas
                                </Typography>
                            </>
                        </Button>
                    </Box> */}
                </Box>
            </Box>
        </SafeAreaView>
    )
}
