import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Box, Button, Typography, } from "@danilomsou/reserva-ui";

interface NumberRegisteredSuccessfullyViewProps {
    navigateToCashbackInStore: () => void;
}

export const NumberRegisteredSuccessfullyView = (
    {
        navigateToCashbackInStore
    }: NumberRegisteredSuccessfullyViewProps
) => {

    return (
        <SafeAreaView>
            <ScrollView>
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
                        onPress={navigateToCashbackInStore}
                        title="CONTINUAR"
                        height={50}
                        inline
                        color='white'
                        bg='verdeSucesso'
                    />
                </Box>
            </ScrollView>
        </SafeAreaView >
    );
}