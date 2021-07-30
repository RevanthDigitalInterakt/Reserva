import React, { useEffect, useRef, useState } from 'react'
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Typography, Box, Button, Image } from "reserva-ui";
import { images } from "../../assets";


interface IuseCheckConnection {
    refetch?: () => void
}

export const useCheckConnection = ({ refetch }: IuseCheckConnection) => {
    const [showScreen, setShowScreen] = React.useState<boolean>(false);
    const netInfo = useNetInfo();

    useEffect(() => {
        checkConnectivity();
    }, [netInfo])

    const checkConnectivity = () => {
        if (netInfo.isConnected) {
            setShowScreen(false);
            if (refetch) refetch()
        } else {
            setShowScreen(true);
        }
    }

    const WithoutInternet = () => {
        if (!showScreen) {
            return (
                <></>
            )
        }
        return (
            <Box
                bg="white"
                height="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Box marginRight="micro">
                    <Image
                        source={images.withoutInternet}
                        resizeMode={'contain'}
                    />
                </Box>
                <Box mt="xxxs" mb="nano">
                    <Typography
                        fontFamily="nunitoBold"
                        fontSize={16}
                    >
                        Sem comunicação com a Internet
                    </Typography>
                </Box>
                <Box>
                    <Typography fontFamily="nunitoRegular" fontSize={13}>
                        Por favor, verifique a sua conexão para continuar navegando.
                    </Typography>
                </Box>
                <Box mt="md" width="100%">
                    <Button
                        onPress={() => checkConnectivity()}
                        marginX="micro"
                        inline
                        title='TENTAR NOVAMENTE'
                        variant='primarioEstreito'
                    />
                </Box>
            </Box>
        );
    };

    return {
        showScreen,
        WithoutInternet
    }
}
