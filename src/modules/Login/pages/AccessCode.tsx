import React from "react"
import { useRef } from "react"
import { useState } from "react"
import { Pressable, TextInput } from "react-native"
import { ScrollView, } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Typography } from "reserva-ui"
import { images } from "../../../assets"
import HeaderBanner from "../../Forgot/componet/HeaderBanner"
import CodeInput from "../components/CodeInput"

export interface AccessCodeProps {

}

const AccessCode: React.FC<AccessCodeProps> = ({ }) => {
    const [accessCode, setAccessCode] = useState('')
    const [showError, setShowError] = useState(false)


    return (
        <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
            <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { }} />
            <ScrollView>
                <Box px={20} pt='md'>
                    <Typography variant='tituloSessao'>
                        Digite abaixo o código de acesso:
                    </Typography>
                    <Box mt={25} mb={16}>
                        <CodeInput code={accessCode} onChageCode={setAccessCode} showError={showError} />
                    </Box>
                    <Button title='ENTRAR' variant='primarioEstreito' inline />
                    <Button mt='xs'>
                        <Typography fontSize={14} fontFamily='nunitoRegular' style={{ textDecorationLine: 'underline' }}>
                            Reenviar código
                        </Typography>
                    </Button>
                </Box>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AccessCode

