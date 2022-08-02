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
    confirmCodeSection: () => void;
}

export const RegisterPhoneNumberView = (
    {
        profile,
        isChangeNumber = false,
        confirmPhone = false,
        confirmCodeSection,
    }: RegisterPhoneNumberViewProps
) => {
    const [phone, setPhone] = React.useState('');
    const [openConfirmCodeSection, setOpenConfirmCodeSection] = React.useState(false);
    const [code, setCode] = useState("");
    const [showError, setShowError] = useState(false);
    const [timer, setTimer] = useState();

    const handleChangePhone = (newPhone: string) => {
        if (!openConfirmCodeSection && newPhone.length < 16) {
            setPhone(newPhone)
        }
    }

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

                                        <Box mb="xxs">
                                            <Typography fontFamily="nunitoRegular" fontSize={14}>
                                                Digite seu número abaixo e continue para gerar seu QR Code.
                                            </Typography>
                                        </Box>
                                    </Box>
                                }

                                <Box justifyContent="center">
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
                                <Box mb='xs' mt="xxs">
                                    <Button
                                        onPress={() => setOpenConfirmCodeSection(true)}
                                        title="CADASTRAR"
                                        variant="primarioEstreito"
                                        inline
                                        disabled={phone.length < 15}
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
                                                onPress={confirmCodeSection}
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


                                <Box mb="xxxs">
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
                                    code={code}
                                    onChageCode={setCode}
                                    showError={showError}
                                />
                                <Box mt={20}>
                                    <Button
                                        onPress={confirmCodeSection}
                                        title="CONFIRMAR"
                                        height={50}
                                        inline
                                        color='white'
                                        disabled={code.length < 6}
                                        bg='verdeSucesso'
                                    />

                                    <Box mt="nano" alignSelf='center'>
                                        <Typography fontFamily="nunitoRegular" fontSize={13} opacity={0.5}>
                                            REENVIAR CÓDIGO EM {timer}
                                        </Typography>
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
