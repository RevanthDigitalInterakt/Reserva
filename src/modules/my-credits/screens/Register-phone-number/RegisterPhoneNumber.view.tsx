import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import CodeInput from "../../../../shared/components/CodeInput";

export interface RegisterPhoneNumberViewProps {
    profile: ProfileVars;
    isChangeNumber?: boolean;
    confirmPhone?: boolean;
    openConfirmCodeSection?: boolean;
    showCodeError?: boolean;
    valuePhone?: string;
    valueCode?: string;
    timerCode: string;
    confirmCodeSection: () => void;
    registerPhoneNumber?: () => void;
    onChangeText?: (value: string) => void;
    onChageCode?: (value: string) => void;
    resendNewCode: () => void;
}

export const RegisterPhoneNumberView = (
    {
        profile,
        isChangeNumber = false,
        confirmPhone = false,
        showCodeError = false,
        valuePhone,
        openConfirmCodeSection,
        valueCode,
        timerCode,
        confirmCodeSection,
        registerPhoneNumber,
        onChangeText,
        onChageCode,
        resendNewCode
    }: RegisterPhoneNumberViewProps
) => {

    return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView
                    enabled
                    keyboardVerticalOffset={15}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <Box mx="xxs" mt='xxs'>
                        {!confirmPhone ?
                            <>
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

                                        <Box mb={13}>
                                            <Typography fontFamily="nunitoRegular" fontSize={14}>
                                                Para utilizar o cashback em loja precisamos que mantenha o número de telefone atualizado.
                                            </Typography>
                                        </Box>

                                        <Box mb={13}>
                                            <Typography fontFamily="nunitoRegular" fontSize={14}>
                                                Digite seu número abaixo e continue para gerar seu QR Code.
                                            </Typography>
                                        </Box>
                                    </Box>
                                }

                                <Box justifyContent="center">
                                    <TextField
                                        maskType="cel-phone"
                                        value={valuePhone}
                                        onChangeText={onChangeText}
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
                                <Box mb='xs' mt={16}>
                                    <Button
                                        onPress={registerPhoneNumber}
                                        title="CADASTRAR"
                                        variant="primarioEstreito"
                                        inline
                                        disabled={valuePhone?.length < 15}
                                    />
                                </Box>

                                {openConfirmCodeSection &&
                                    <Box>
                                        {!isChangeNumber &&
                                            <Box mb="nano">
                                                <Typography variant="tituloSessoes">
                                                    Confirme seu código
                                                </Typography>
                                            </Box>
                                        }

                                        <Box mb='nano'>
                                            <Typography fontFamily="nunitoRegular" fontSize={14}>
                                                Digite abaixo o código que acabamos de enviar para
                                                o número informado:
                                            </Typography>
                                        </Box>
                                        <CodeInput
                                            code={valueCode ? valueCode : ''}
                                            onChageCode={onChageCode}
                                            showError={showCodeError}
                                        />
                                        <Box mt={20}>
                                            <Button
                                                onPress={confirmCodeSection}
                                                title="CONFIRMAR"
                                                height={50}
                                                inline
                                                color='white'
                                                disabled={valueCode?.length < 6}
                                                bg='verdeSucesso'
                                            />

                                            <Box mt={19} alignSelf='center'>
                                                {
                                                    timerCode === '00:00' ?
                                                        <Button
                                                            onPress={resendNewCode}
                                                        >
                                                            <Typography
                                                                style={{ textDecorationLine: 'underline' }}
                                                                letterSpacing={1.6}
                                                                fontFamily="nunitoSemiBold"
                                                                fontSize={13}
                                                            >
                                                                REENVIAR NOVO CÓDIGO
                                                            </Typography>
                                                        </Button>
                                                        :
                                                        <Typography
                                                            letterSpacing={1.6}
                                                            fontFamily="nunitoSemiBold"
                                                            fontSize={13}
                                                            opacity={0.5}
                                                        >
                                                            REENVIAR CÓDIGO EM {timerCode}s
                                                        </Typography>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>

                                }
                            </>
                            :
                            <>
                                <Box mb="nano">
                                    <Typography variant="tituloSessoes">
                                        Confirmar telefone
                                    </Typography>
                                </Box>


                                <Box mb={19}>
                                    <Typography fontFamily="nunitoRegular" fontSize={14}>
                                        Digite abaixo o código que acabamos de enviar para seu telefone:
                                    </Typography>
                                </Box>
                                <Box justifyContent="center" mb="xxs">
                                    <Box alignItems='center'>
                                        <Typography
                                            testID="phoneNumber"
                                            fontFamily='reservaSerifBold'
                                            fontSize={22}
                                            color='preto'
                                        >
                                            {profile?.homePhone?.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, "($1)*****-$3")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <CodeInput
                                    code={valueCode ? valueCode : ''}
                                    onChageCode={onChageCode}
                                    showError={showCodeError}
                                />
                                <Box mt={20}>
                                    <Button
                                        onPress={confirmCodeSection}
                                        title="CONFIRMAR"
                                        height={50}
                                        inline
                                        color='white'
                                        disabled={valueCode?.length < 6}
                                        bg='verdeSucesso'
                                    />

                                    <Box mt={19} alignSelf='center'>
                                        {
                                            timerCode === '00:00' ?
                                                <Button
                                                    onPress={resendNewCode}
                                                >
                                                    <Typography
                                                        style={{ textDecorationLine: 'underline' }}
                                                        letterSpacing={1.6}
                                                        fontFamily="nunitoSemiBold"
                                                        fontSize={13}
                                                    >
                                                        REENVIAR NOVO CÓDIGO
                                                    </Typography>
                                                </Button>
                                                :

                                                <Typography
                                                    letterSpacing={1.6}
                                                    fontFamily="nunitoSemiBold"
                                                    fontSize={13}
                                                    opacity={0.5}
                                                >
                                                    REENVIAR CÓDIGO EM {timerCode}s
                                                </Typography>
                                        }
                                    </Box>
                                </Box>
                            </>
                        }
                    </Box>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    );
}
