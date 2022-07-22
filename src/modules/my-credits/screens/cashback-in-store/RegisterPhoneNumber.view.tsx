import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import CodeInput from "../../../../shared/components/CodeInput";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
interface RegisterPhoneNumberViewProps {
    profile: ProfileVars;
}

export const RegisterPhoneNumberView = (
    {
        profile
    }: RegisterPhoneNumberViewProps
) => {
    const [phone, setPhone] = React.useState('');
    const [openConfirmCodeSection, setOpenConfirmCodeSection] = React.useState(false);
    const [code, setCode] = useState("");
    const [showError, setShowError] = useState(false);
    const [changePhoneNumber, setChangePhoneNumber] = useState(false);
    const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(false);

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
                            {profile.homePhone.length > 0 && !changePhoneNumber ?
                                <Box>
                                    <Box mb="nano">
                                        <Typography variant="tituloSessoes">
                                            Confirme seu telefone
                                        </Typography>
                                    </Box>

                                    <Box mb="xxs" mr={22}>
                                        <Typography fontFamily="nunitoRegular" fontSize={14}>
                                            Mantenha seu número de telefone sempre atualizado para garantir seu cashback e ter acesso as nossas novidades.
                                        </Typography>
                                    </Box>
                                </Box>
                                :
                                changePhoneNumber ?
                                    <Box>
                                        <Box mb="nano">
                                            <Typography variant="tituloSessoes">
                                                Atualizar telefone
                                            </Typography>
                                        </Box>

                                        <Box mb="xxs" mr={22}>
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
                                {profile.homePhone.length > 0 && !changePhoneNumber ?
                                    <Box alignItems='center'>
                                        <Typography
                                            fontFamily='reservaSerifBold'
                                            fontSize={22}
                                            color='preto'
                                        >
                                            {profile.homePhone.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, "($1)*****-$3")}
                                        </Typography>
                                    </Box>
                                    :
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
                                }
                            </Box>
                            {profile.homePhone.length > 0 && !changePhoneNumber ?
                                <Box mb="xs">
                                    <Button
                                        // onPress={() => setOpenConfirmCodeSection(true)}
                                        title="CONFIRMAR"
                                        height={50}
                                        inline
                                        color='white'
                                        bg='verdeSucesso'
                                    />

                                    <Button
                                        mt={12}
                                        onPress={() => setChangePhoneNumber(true)}
                                        title="ALTERAR NÚMERO"
                                        variant="primarioEstreitoOutline"
                                        inline
                                    />
                                </Box>
                                :
                                <Box mb="xs">
                                    <Button
                                        onPress={() => setOpenConfirmCodeSection(true)}
                                        title="CADASTRAR"
                                        variant="primarioEstreito"
                                        inline
                                        disabled={phone.length < 15}
                                    />
                                </Box>
                            }

                            {openConfirmCodeSection &&
                                <>
                                    {!changePhoneNumber &&
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
                                // onPress={() => setOpenConfirmCodeSection(true)}
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