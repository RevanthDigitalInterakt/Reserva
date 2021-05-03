import React, { useState, } from "react";
import { SafeAreaView, ScrollView, Platform } from "react-native";
import {
    Typography,
    Box,
    Button,
    Image,
    Divider
} from 'reserva-ui';
import { images } from "../../../assets";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import MapView from 'react-native-maps';
import { height } from "styled-system";

export const MapScreen = () => {
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
                    <Box marginBottom={"xxs"}>
                        <Typography fontFamily={"reservaSerifRegular"} fontSize={20}>
                            Retirar na loja
                        </Typography>
                    </Box>
                    <Box height={500} width={360}>
                        <MapView
                            style={{ flex: 1, }}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05
                            }}
                        />
                    </Box>

                    <ItemStoresAddress
                        local={'Shopping Praia Grande'}
                        address={'Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260'}
                    />

                    <ItemStoresAddress
                        local={'Shopping Praia Grande'}
                        address={'Av. Dr. Olivio Lira, 353 | Loja 302 \nK/L - Vila Velha / ES 29101-260'}
                    />

                </Box>
            </ScrollView>

        </SafeAreaView >
    );
};

interface IItemStoresAddress {
    local: string;
    address: string;
}
const ItemStoresAddress = ({ local, address }: IItemStoresAddress) => {
    return (
        <>
            <Box
                width={"100%"}
                backgroundColor={"white"}
                my={'micro'}
            >
                <Box
                    borderColor={"backgroundMenuOpened"}
                >
                    <Box flexDirection="row">
                        <Box>
                            <Image height={40} source={images.localReserva} resizeMode={"contain"} />
                        </Box>
                        <Box>
                            <Box mb={'quarck'}>
                                <Typography fontFamily="reservaSerifRegular" fontSize={16}>{local}</Typography>
                            </Box>
                            <Typography fontFamily="nunitoRegular" fontSize={14}>
                                {address}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider variant={"fullWidth"} />
        </>
    );
}