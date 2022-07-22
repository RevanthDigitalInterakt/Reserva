import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import CodeInput from "../../../../shared/components/CodeInput";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
interface ChangePhoneNumberProps {
    homePhone: ProfileVars;
}

export const ChangePhoneNumber = (
    {
        homePhone
    }: ChangePhoneNumberProps
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
                    // backButtonPress={}
                    />
                    <Box mx="xxs" mt='xxs'>
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

                        <Box justifyContent="center" mb="xxs">
                            <Box alignItems='center'>
                                <Typography
                                    fontFamily='reservaSerifBold'
                                    fontSize={22}
                                    color='preto'
                                >
                                    {homePhone.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, "($1)*****-$3")}
                                </Typography>
                            </Box>
                        </Box>
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
                    </Box>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}