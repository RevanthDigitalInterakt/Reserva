import React from "react";
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Box, Button, theme, Typography, TextField } from "@danilomsou/reserva-ui";
import { useNavigation } from "@react-navigation/native";
import { MyCreditsScreensRoutes } from "../../navigation/MyCreditsNavigator";

interface ConfirmPhoneNumberViewProps {
    phone: string;
}

export const ConfirmPhoneNumberView = (
    {
        phone
    }: ConfirmPhoneNumberViewProps
) => {
    const navigation = useNavigation()

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                enabled
                keyboardVerticalOffset={15}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView>
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
                                    {phone.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, "($1)*****-$3")}
                                </Typography>
                            </Box>
                        </Box>

                        <Box mb="xs">
                            <Button
                                onPress={() => navigation.goBack()}
                                title="CONFIRMAR"
                                height={50}
                                inline
                                color='white'
                                bg='verdeSucesso'
                            />

                            <Button
                                mt={12}
                                onPress={() => navigation.navigate(MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER, { handleConfirmRegister: navigation.goBack() })}
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
