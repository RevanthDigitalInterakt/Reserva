import { useNavigation } from "@react-navigation/core"
import { useLinkTo } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Linking, NativeModules, Platform } from 'react-native'
import { Box, Typography } from 'reserva-ui';

interface StoreUpdatePushProps {
}

export const StoreUpdatePush = () => {

    const navigation = useNavigation();
    const update = () => {
        Linking.openURL(
            Platform.OS === 'ios' ?
                // com.globalsys.reserva
                'itms-apps://itunes.apple.com/app/apple-store/com.globalsys.reserva'
                :
                'market://details?id=com.usereserva')
    }
    return (
        <>
            {update()}
            {navigation.navigate("HomeTabs")}
        </>
    );
}
