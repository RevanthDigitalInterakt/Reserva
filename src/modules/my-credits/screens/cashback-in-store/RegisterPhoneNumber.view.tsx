import React, { useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import { useNavigation } from "@react-navigation/native";
import CodeInput from "../../../../shared/components/CodeInput";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
interface RegisterPhoneNumberViewProps {
  handleConfirmRegister?: () => void
}

export const  RegisterPhoneNumberView = ({
  handleConfirmRegister
}: RegisterPhoneNumberViewProps) => {
    const navigation = useNavigation()

    const [phone, setPhone] = useState('');
    const [openConfirmCodeSection, setOpenConfirmCodeSection] = useState(false);
    const [code, setCode] = useState("");
    const [showError, setShowError] = useState(false);
    const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(false);

    const handleChangePhone = (newPhone: string) => {
        if (!openConfirmCodeSection && newPhone.length < 16) {
            setPhone(newPhone)
        }
    }

    const handleConfirmCodeSection = () => {
        setVerifiedPhoneNumber(true);
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
                        backButtonPress={() => {
                            if (changePhoneNumber) {
                                setChangePhoneNumber(false);
                            }
                        }}
                    />
                    {!verifiedPhoneNumber ?
                        <Box mx="xxs" mt='xxs'>
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
                                    <Box mb="nano">
                                        <Typography variant="tituloSessoes">
                                            Confirme seu código
                                        </Typography>
                                    </Box>

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
                                            onPress={() => handleConfirmCodeSection(true)}
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
                        :
                        <Box mx="xxs" mt='xxs'>
                            <Box mb="nano">
                                <Typography variant="tituloSessoes">
                                    Obrigado!
                                </Typography>
                            </Box>

                            <Box mb="xxs" mr={22}>
                                <Typography fontFamily="nunitoRegular" fontSize={14}>
                                    Seu número foi confirmado com sucesso.
                                    Aproveite o benefício!
                                </Typography>
                            </Box>

                            <Button
                                onPress={() => handleConfirmRegister ? handleConfirmRegister() : navigation.goBack()}
                                title="CONTINUAR"
                                height={50}
                                inline
                                color='white'
                                bg='verdeSucesso'
                            />
                        </Box>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}
