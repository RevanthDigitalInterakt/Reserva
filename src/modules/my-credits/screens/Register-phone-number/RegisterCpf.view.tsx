import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Box, Button, TextField, Typography, theme } from "@danilomsou/reserva-ui";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';


export interface RegisterCpfViewProps {
    profile: ProfileVars;
    valueCpf: string;
    navigateToVerifyNumber: () => void;
    onChangeText: (value: string) => void;
}

export const RegisterCpfView = (
    {
        profile,
        valueCpf,
        navigateToVerifyNumber,
        onChangeText,
    }: RegisterCpfViewProps
) => {
    const [cpf, setCpf] = useState<string>('');

    const handleSaveCpf = (cpf: string) => {
        setCpf(cpf);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView
                    enabled
                    keyboardVerticalOffset={15}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <Box mx="xxs" mt='xxs'>
                        <Box>
                            <Box mb="nano" mr='22%'>
                                <Typography
                                    lineHeight={30}
                                    variant="tituloSessoes">
                                    Insira seu CPF e ative a sua carteira
                                </Typography>
                            </Box>

                            <Box mb="xxxs" mr={22}>
                                <Typography fontFamily="nunitoRegular" fontSize={14}>
                                    O cashback e sua carteira Reserva precisam ficar atrelada a um número de CPF para você ter direito a todos os benefícios.
                                </Typography>
                            </Box>
                        </Box>
                        <Box justifyContent="center" mb="xxs">
                            <TextField
                                maskType="cpf"
                                value={valueCpf}
                                onChangeText={onChangeText}
                                keyboardType='number-pad'
                                placeholder="Digite somente os números do CPF"
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
                                onPress={navigateToVerifyNumber}
                                title="CADASTRAR"
                                variant="primarioEstreito"
                                inline
                            // disabled={cpf.length < 14}
                            />
                        </Box>
                    </Box>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    );
}
