import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
    Typography,
    Box,
    Button,
    Icon,
    Divider
} from 'reserva-ui';
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";

export const DeliveryScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            flex={1}
            backgroundColor={"white"}
        >
            <TopBarBackButton showShadow />
            <ScrollView>
                <Box
                    paddingX={"xxxs"}
                    paddingY={"sm"}
                >
                    <Box>
                        <Typography variant={"tituloSessoes"}>
                            Entrega
                        </Typography>
                    </Box>

                    <Box marginTop={"xs"} marginBottom={"xxxs"}>
                        <Typography variant={"subtituloSessoes"}>
                            Escolha a forma de envio
                        </Typography>
                    </Box>

                    <Button flexDirection={"row"}>
                        <Box
                            flexDirection={"row"}
                            alignItems={"center"}
                            flex={1}
                            justifyContent={"space-between"}
                        >
                            <Box>
                                <Typography variant={"tituloSessao"}>Retirar na loja</Typography>
                                <Typography
                                    fontFamily={"nunitoSemiBold"}
                                    fontSize={13}
                                    color={"verdeSucesso"}
                                >
                                    Segunda-feira, 05 de abril de 2021
                                </Typography>
                            </Box>
                            <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
                        </Box>
                    </Button>

                    <Divider
                        variant={"fullWidth"}
                        marginY={"micro"}
                    />

                    <Button
                        flexDirection={"row"}
                        onPress={() => navigation.navigate('GiftVoucherScreen')}
                    >
                        <Box
                            flexDirection={"row"}
                            alignItems={"center"}
                            flex={1}
                            justifyContent={"space-between"}
                        >
                            <Box>
                                <Typography variant={"tituloSessao"}>Receber em casa</Typography>
                                <Typography
                                    fontFamily={"nunitoSemiBold"}
                                    fontSize={13}
                                    color={"verdeSucesso"}
                                >
                                    Segunda-feira, 15 de abril de 2021
                                </Typography>
                            </Box>
                            <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
                        </Box>
                    </Button>

                </Box>

            </ScrollView>
        </SafeAreaView >
    );
};
