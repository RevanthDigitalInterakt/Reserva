import { useMutation } from "@apollo/client"
import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import React, { useEffect } from "react"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Typography } from "reserva-ui"
import { images } from "../../../assets"
import { useAuth } from "../../../context/AuthContext"
import { accessKeySignInMutation } from "../../../graphql/login/loginMutations"
import { RootStackParamList } from "../../../routes/StackNavigator"
import CodeInput from "../../Login/components/CodeInput"
import HeaderBanner from "../componet/HeaderBanner"

export interface ForgotAccessCodeProps extends StackScreenProps<RootStackParamList, "ForgotAccessCode"> { };


export const ForgotAccessCode: React.FC<ForgotAccessCodeProps> = ({ navigation, route }) => {
  const { cookie, setCookie } = useAuth();
  const { email } = route.params
  const [showError, setShowError] = useState(false);
  const [code, setCode] = useState('')
  const [loginWithCode, { data, loading }] = useMutation(
    accessKeySignInMutation
  );

  const handleReset = () => {
    if (code.length < 6) {
      setShowError(true)
    } else {
      setShowError(false)
    }
    loginWithCode({
      variables: {
        email: email,
        code: `${code}`,
      },
    });
  };

    
  useEffect(() => {
    if (!loading && data?.cookie) {
      setShowError(false);
      navigation.navigate('ForgotNewPassword', { email, code });
    }
    if(data?.accessKeySignIn === "WrongCredentials"){
      setShowError(true);
    }
  }, [data]);


    return <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
        <ScrollView>
            <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { navigation.goBack() }} />
            <Box mx={20} mt={13}>
                <Typography fontFamily='reservaSerifRegular' fontSize={22} >Atualize sua senha</Typography>
                <Box mt={27} >
                  <Typography fontFamily='nunitoRegular' fontSize={15} >Para alterar a senha, digite o código enviado para o e-mail abaixo:</Typography>
                  {email && (<Typography fontFamily='nunitoRegular' fontSize={15} color='neutroFrio2' >{email}</Typography>)}
                </Box>
                <Box mt={17} >
                  <CodeInput code={code} onChageCode={setCode} showError={showError} />
                </Box>
                <Button 
                  mt={28} 
                  variant='primarioEstreito' 
                  title='CONTINUAR' 
                  disabled={code.length < 6} 
                  onPress={() => { 
                    handleReset()
                    // navigation.navigate('ForgotNewPassword', { email, code }) 
                  }} 
                  inline
                />

            </Box>
        </ScrollView>
    </SafeAreaView>
}