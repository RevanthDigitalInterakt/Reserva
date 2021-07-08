import { useMutation } from "@apollo/client"
import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { Pressable, TextInput } from "react-native"
import { ScrollView, } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Typography } from "reserva-ui"
import { images } from "../../../assets"
import { useAuth } from "../../../context/AuthContext"
import { accessKeySignInMutation } from "../../../graphql/login/loginMutations"
import { RootStackParamList } from "../../../routes/StackNavigator"
import HeaderBanner from "../../Forgot/componet/HeaderBanner"
import CodeInput from "../components/CodeInput"
import AsyncStorage from "@react-native-community/async-storage";

export interface AccessCodeProps extends StackScreenProps<RootStackParamList, "AccessCode"> {

}

const AccessCode: React.FC<AccessCodeProps> = ({ navigation, route }) => {
    const { cookie, setCookie } = useAuth();
    const { email } = route.params;
    const [accessCode, setAccessCode] = useState('')
    const [showError, setShowError] = useState(false)

    const [loginWithCode, { data, loading }] = useMutation(accessKeySignInMutation)

    const handleLogin = () => {
        loginWithCode({
            variables: {
                email: email,
                code: accessCode
            }
        })
    }
    

  useEffect(() => {
    if (!loading && data?.cookie) {
      setCookie(data?.cookie);
      AsyncStorage.setItem("@RNAuth:cookie", data?.cookie).then(() => {
        navigation.navigate("Home");
      });
    }
  }, [data]);

    return (
        <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
            <ScrollView>
                <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { navigation.goBack() }} />
                <Box px={20} pt='md'>
                    <Typography variant='tituloSessao'>
                        Digite aqui o código enviado para o e-mail:
                    </Typography>
                    <Box mt={25} mb={16}>
                        <CodeInput code={accessCode} onChageCode={setAccessCode} showError={showError} />
                    </Box>
                    <Button title='ENTRAR' variant='primarioEstreito' onPress={() => handleLogin()} inline />
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

