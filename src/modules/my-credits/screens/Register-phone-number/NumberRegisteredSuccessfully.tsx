import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { Box, Button, Typography, } from "@danilomsou/reserva-ui";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
interface NumberRegisteredSuccessfullyProps {
}

export const NumberRegisteredSuccessfully = (
    {

    }: NumberRegisteredSuccessfullyProps
) => {
    const route = useRoute();
    const navigation = useNavigation();
    const { costumerDocument } = route?.params;

    return (
        <SafeAreaView>
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
                        onPress={() => navigation.navigate('cashbackInStore', {
                            isLoyal: true,
                            costumerDocument: costumerDocument,
                        })}
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