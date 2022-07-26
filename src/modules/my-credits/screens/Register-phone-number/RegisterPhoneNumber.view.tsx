import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import CodeInput from "../../../../shared/components/CodeInput";
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import firestore from '@react-native-firebase/firestore';
import { differenceInMonths } from 'date-fns';
interface RegisterPhoneNumberViewProps {
    profile: ProfileVars;
    isChangeNumber?: boolean;
}

export const RegisterPhoneNumberView = (
    {
        profile,
        isChangeNumber = false,
    }: RegisterPhoneNumberViewProps
) => {
    const route = useRoute();
    const navigation = useNavigation();
    const [phone, setPhone] = React.useState('');
    const [openConfirmCodeSection, setOpenConfirmCodeSection] = React.useState(false);
    const [code, setCode] = useState("");
    const [showError, setShowError] = useState(false);
    const [changePhoneNumber, setChangePhoneNumber] = useState(false);
    const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(false);

    useEffect(() => {
        console.log('route1::::>', isChangeNumber)
    }, [isChangeNumber]);

    useEffect(() => {
        console.log('profile::::>', profile)
    }, [profile]);


    const handleChangePhone = (newPhone: string) => {
        if (!openConfirmCodeSection && newPhone.length < 16) {
            setPhone(newPhone)
        }
    }

    const handleChangeCode = (newCode: string, index: number) => {
        let codeCopy = [...code]
        codeCopy[index] = newCode
        // setCode(codeCopy);
    }

    const handleConfirmCodeSection = () => {
        // const timeFirebase = firestore.Timestamp.now().toDate();
        // const result = differenceInMonths(timeFirebase, new Date('2022-04-30T14:24:57.558Z'))
        navigation.navigate('numberRegisteredSuccessfully', {
            costumerDocument: profile?.document
        });
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                enabled
                keyboardVerticalOffset={15}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView>
                    <TopBarBackButton
                        loading={false}
                        showShadow
                    // backButtonPress={}
                    />
                    <Box mx="xxs" mt='xxs'>
                        {isChangeNumber ?
                            <Box>
                                <Box mb="nano">
                                    <Typography variant="tituloSessoes">
                                        Atualizar telefone
                                    </Typography>
                                </Box>

                                <Box mb="xxs">
                                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                                        Digite seu número novo abaixo e continue para gerar seu QR Code.
                                    </Typography>
                                </Box>

                            </Box>
                            :
                            <Box>
                                <Box mb="nano">
                                    <Typography variant="tituloSessoes">
                                        Cashback em Lojas
                                    </Typography>
                                </Box>

                                <Box mb="xxs">
                                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                                        Para utilizar o cashback em loja precisamos que mantenha o número de telefone atualizado.
                                    </Typography>
                                </Box>

                                <Box mb="xxs">
                                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                                        Digite seu número abaixo e continue para gerar seu QR Code.
                                    </Typography>
                                </Box>
                            </Box>
                        }


                        <Box justifyContent="center" mb="xxs">
                            <TextField
                                maskType="cel-phone"
                                value={phone}
                                onChangeText={(newPhone) => handleChangePhone(newPhone)}
                                keyboardType='number-pad'
                                placeholder="(00) 00000-0000"
                                returnKeyType='done'
                                textContentType='oneTimeCode'
                                style={{
                                    fontFamily: theme.fonts.nunitoItalic,
                                    backgroundColor: '#f0f0f0',
                                    height: 51,
                                    width: '100%',
                                    textAlign: 'center',
                                    fontSize: 15
                                }}
                            />
                        </Box>
                        <Box mb="xs">
                            <Button
                                onPress={() => setOpenConfirmCodeSection(true)}
                                title="CADASTRAR"
                                variant="primarioEstreito"
                                inline
                                disabled={phone.length < 15}
                            />
                        </Box>


                        {openConfirmCodeSection &&
                            <>
                                {!isChangeNumber &&
                                    <Box mb="nano">
                                        <Typography variant="tituloSessoes">
                                            Confirme seu código
                                        </Typography>
                                    </Box>
                                }

                                <Box mb="nano">
                                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                                        Digite abaixo o código que acabamos de enviar para
                                        o número informado:
                                    </Typography>
                                </Box>
                                <CodeInput
                                    code={code}
                                    onChageCode={setCode}
                                    showError={showError}
                                />
                                <Box mt={20}>
                                    <Button
                                        onPress={handleConfirmCodeSection}
                                        title="CONFIRMAR"
                                        height={50}
                                        inline
                                        color='white'
                                        disabled={code.length < 6}
                                        bg='verdeSucesso'
                                    />

                                    <Box mt="nano" alignSelf='center'>
                                        <Typography fontFamily="nunitoRegular" fontSize={13} opacity={0.5}>
                                            REENVIAR CÓDIGO EM 0:59s
                                        </Typography>
                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}