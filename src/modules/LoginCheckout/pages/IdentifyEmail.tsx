import { StackScreenProps } from "@react-navigation/stack"
import React from "react"
import { useState } from "react"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, TextField, Typography } from "reserva-ui"
import { RootStackParamList } from "../../../routes/StackNavigator"
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton"

export interface IdentifyEmailProps extends StackScreenProps<RootStackParamList, 'IdentifyEmail'> {

}

export const IdentifyEmail: React.FC<IdentifyEmailProps> = ({ navigation, route }) => {
    const [text, setText] = useState('')
    return <SafeAreaView>
        <TopBarDefaultBackButton loading={false} />
        <ScrollView>
            <Box mb={30} mx={20} mt={42}>
                <Box mb='xs'>
                    <Typography variant='subtituloSessoes'>
                        Informe seu e-mail para continuar:
                    </Typography>
                </Box>
                <TextField value={text} onChangeText={setText} placeholder='Digite seu e-mail' />
            </Box>
            <Button onPress={() => { navigation.navigate('AddressList', { isCheckout: true }) }}>
                <Box bg='preto' px={44} py={16}>
                    <Typography fontFamily='nunitoBold' fontSize={13} color='white'>CONTINUAR</Typography>
                </Box>
            </Button>
        </ScrollView>
    </SafeAreaView>
}