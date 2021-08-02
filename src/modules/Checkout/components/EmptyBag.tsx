import React from "react";
import {
    Typography,
    Box,
    Button,
} from "reserva-ui";

interface IEmptyBag {
    onPress?: () => void
}

export const EmptyBag = ({ onPress }: IEmptyBag) => {
    return (
        <Box
            bg="white"
            alignItems="center"
            justifyContent="center"
            flex={1}
            px="micro"
        >
            <Box mb="xxs">
                <Typography
                    fontFamily="reservaSerifRegular"
                    fontSize={24}
                >
                    Sua sacola está vazia :(
                </Typography>
            </Box>
            <Box mb="xs">
                <Typography
                    textAlign="center"
                    fontFamily="nunitoRegular"
                    fontSize={14}
                >
                    Navegue pelo nosso app e descubra produtos que são sua cara!
                </Typography>
            </Box>

            <Box width="100%">
                <Button
                    onPress={onPress}
                    marginX="md"
                    inline
                    title='IR ÀS COMPRAS'
                    variant='primarioEstreito'
                />
            </Box>
        </Box>

    );
}
