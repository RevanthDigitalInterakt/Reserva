import React, { Fragment, useState } from "react";
import { TextInput, Dimensions, ScrollView } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";

import CodeInput from "../../../../modules/Login/components/CodeInput";
const deviceWidth = Dimensions.get('window').width;
export const RegisterPhoneNumberView = () => {
    const [phone, setPhone] = React.useState('')
    const [openConfirmCodeSection, setOpenConfirmCodeSection] = React.useState(false)
    // const [code, setCode] = React.useState(['', '', '', '', '', ''])
    const [code, setCode] = useState("");
    const [showError, setShowError] = useState(false);
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

    const phoneFormmated = React.useMemo(() => {
        console.log(phone)
        if (phone.length === 11) {
            return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.slice(-4)}`
        } else {
            return phone
        }
    }, [phone])

    return (
        <Fragment>
            <ScrollView>
                <Box mx="xxs" mt='xxs' mb='xxl'>
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

                            <Box mb="xxs">
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
                            <Box
                                mb="xxs"
                                flexDirection={'row'}
                                // flex={1}

                                justifyContent='space-between'
                            // bg='pink'
                            >



                                {/* {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                    <Box bg='red' height={45} width={((deviceWidth - 48) - 75) / 6} >
                                        <TextField
                                            height={45}
                                            textAlign='center'
                                            value={code[index]}
                                            onChangeText={(code) => handleChangeCode(code, index)}
                                            keyboardType='number-pad'
                                            returnKeyType={index === 5 ? 'done' : 'next'}
                                            textContentType='oneTimeCode'
                                            backgroundColor='backgoundInput'
                                            style={{
                                                color: '#8d8d8d',
                                                fontStyle: 'italic',
                                                fontSize: 15
                                            }}
                                        />
                                    </Box>
                                ))} */}
                            </Box>

                            <Button
                                onPress={() => setOpenConfirmCodeSection(true)}
                                title="CONFIRMAR"
                                height={50}
                                inline
                                color='white'
                                // disabled={code.filter(elem => elem === '').length > 0}
                                bg='verdeSucesso'
                            />

                            <Box mt="nano" alignSelf='center'>
                                <Typography fontFamily="nunitoRegular" fontSize={13} opacity={0.5}>
                                    REENVIAR CÓDIGO EM 0:59s
                                </Typography>
                            </Box>
                        </>
                    }
                </Box>
            </ScrollView>
        </Fragment>
    );
}