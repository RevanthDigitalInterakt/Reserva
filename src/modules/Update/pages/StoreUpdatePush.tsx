import { useNavigation } from "@react-navigation/core"
import { useLinkTo } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Linking, NativeModules, Platform } from 'react-native'
import { Box, Typography } from 'reserva-ui';

interface StoreUpdatePushProps {
}

export const StoreUpdatePush = () => {
    const linkTo = useLinkTo()

    const update = () => {
        Linking.openURL(
            Platform.OS === 'ios' ?
                // com.globalsys.reserva
                'itms-apps://itunes.apple.com/app/apple-store/com.globalsys.reserva'
                :
                'market://details?id=com.usereserva')
        // Linking.openURL('itms-apps://itunes.apple.com/app/apple-store/id1566861458')
    }
    return (
        update()
        // <Box>
        //     <Typography>ta funcionando</Typography>
        // </Box>
    );
}
