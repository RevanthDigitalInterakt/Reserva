import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import CodeInput from "../../../../shared/components/CodeInput";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
interface RegisterPhoneNumberProps {
    profile: ProfileVars;
}

export const RegisterPhoneNumber = (
    {
        profile
    }: RegisterPhoneNumberProps
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}