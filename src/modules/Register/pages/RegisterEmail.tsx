import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Typography, Box, Button } from "reserva-ui";
import { images } from "../../../assets";
import { useAuth } from "../../../context/AuthContext";
import { sendEmailVerificationMutation } from "../../../graphql/login/loginMutations";
import { RootStackParamList } from "../../../routes/StackNavigator";
import UnderlineInput from "../../Login/components/UnderlineInput";
import HeaderBanner from "../../Forgot/componet/HeaderBanner";

export interface RegisterEmailProps extends StackScreenProps<RootStackParamList, "RegisterEmail"> { };

export const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
    const { cookie, setCookie } = useAuth();

    const [email, setEmail] = useState('')

    const [sendEmailVerification, { data, loading }] = useMutation(sendEmailVerificationMutation)

    const handleEmailAccess = () => {
        sendEmailVerification({
            variables: {
                email
            }
        }).then(x => {
            setCookie(x?.data?.cookie);
            AsyncStorage.setItem('@RNAuth:cookie', x?.data?.cookie);
            navigation.navigate('ConfirmAccessCode', { email })
        }
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: "white" }} flex={1}>
            <HeaderBanner imageHeader={images.headerLogin} onClickGoBack={() => { navigation.goBack() }} />
            <Box mx={20} mt={13}>
                <Typography fontFamily='reservaSerifRegular' fontSize={22} >Cadastre seu e-mail</Typography>
                <Box mt={27} >
                    <Typography fontFamily='nunitoRegular' fontSize={15} >Lorem ipsum:</Typography>
                </Box>
                <Box mt={33}>
                    <UnderlineInput onChangeText={(text) => { setEmail(text) }} placeholder='abcdefg@gmail.com' />
                </Box>
                <Button mt={55} variant='primarioEstreito' title='CADASTRAR E-MAIL' onPress={handleEmailAccess} disabled={email.length <= 0} inline />

            </Box>
        </SafeAreaView >
    );
};
