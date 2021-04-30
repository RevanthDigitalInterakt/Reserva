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
                    <SelectOption
                        title={"Retirar na loja"}
                        subtitle={"Segunda-feira, 05 de abril de 2021"}
                        onPress={() => navigation.navigate('PaymentMethodScreen')}
                        divider
                    />
                    <SelectOption
                        title={"Receber em casa"}
                        subtitle={"Segunda-feira, 15 de abril de 2021"}
                        onPress={() => navigation.navigate('AddressList')}
                    />
                </Box>

            </ScrollView>
        </SafeAreaView >
    );
};

interface ISelectOption {
    title: string;
    subtitle: string;
    divider?: boolean;
    onPress?: () => void;
}
const SelectOption = ({
    title,
    subtitle,
    divider,
    onPress
}: ISelectOption) => {
    return (
        <>
            <Button flexDirection={"row"} onPress={onPress}>
                <Box
                    flexDirection={"row"}
                    alignItems={"center"}
                    flex={1}
                    justifyContent={"space-between"}
                >
                    <Box>
                        <Typography variant={"tituloSessao"}>{title}</Typography>
                        <Typography
                            fontFamily={"nunitoSemiBold"}
                            fontSize={13}
                            color={"verdeSucesso"}
                        >
                            {subtitle}
                        </Typography>
                    </Box>
                    <Icon name={"ArrowProcced"} color={"preto"} size={"20"} />
                </Box>
            </Button>
            {divider &&
                <Divider
                    variant={"fullWidth"}
                    marginY={"micro"}
                />
            }
        </>
    );
}