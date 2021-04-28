import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from "react-native";
import {
    Typography,
    Box,
} from 'reserva-ui';
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";

export const DeliveryScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={{ justifyContent: "space-between", flex: 1, backgroundColor: "#FFF" }}
        >
            <ScrollView>
                <TopBarBackButton showShadow />
                <Box
                    bg={"white"}
                    paddingX={"xxxs"}
                    paddingY={"xxs"}
                >
                    <Box variant={"container"}>
                        <Box flexDirection="row">
                            <Typography
                                fontFamily={"nunitoSemiBold"}
                                fontSize={13}
                            >
                                Faltam apenas R$29,90 para ganharss
                            </Typography>
                            <Typography> </Typography>
                            <Typography
                                variant={"precoPromocional2"}
                                color={"vermelhoFechadoRSV"}
                            >
                                frete grátis
                            </Typography>
                        </Box>
                    </Box>

                </Box>

            </ScrollView>
        </SafeAreaView >
    );
};
