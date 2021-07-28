import React, { useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Typography, Box, Button, Alert, Icon, Image } from "reserva-ui";
import { images } from "../../assets";

interface IWithoutInternet {
    onPress?: () => void
}

const WithoutInternet = ({ onPress }: IWithoutInternet) => {
    return (
        <Box
            bg="pink"
            flex={1}
            alignItems="center"
            justifyContent="center">

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
                    onPress={onPress}
                    marginX="micro"
                    inline
                    title='TENTAR NOVAMENTE'
                    variant='primarioEstreito'
                />
            </Box>
        </Box>
    );
};
export default WithoutInternet;