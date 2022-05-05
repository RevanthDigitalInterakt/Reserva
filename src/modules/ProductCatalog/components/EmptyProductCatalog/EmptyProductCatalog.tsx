import React from 'react';

import { Typography, Box, Button, Image } from 'reserva-ui';

import { images } from '../../../../assets';

interface IEmptyBag {
    onPress?: () => void;
}

export const EmptyProductCatalog = ({ onPress }: IEmptyBag) => (
    <Box flex={1} alignItems="center" paddingTop={110}>
        <Image source={images.emptyProductCatalog} height={200} width={200} autoHeight />
        <Box mx={37} mt="md">
            <Typography fontFamily="reservaSerifRegular" fontSize={24}>
                Sua sacola está vazia
            </Typography>
        </Box>
        <Box mx={58} my={28}>
            <Typography fontFamily="nunitoRegular" fontSize={14} textAlign="center">
                Navegue pelo nosso app e descubra produtos que são sua cara!
            </Typography>
        </Box>
        <Box width="100%">
            <Button
                onPress={onPress}
                marginX="md"
                inline
                title="IR ÀS COMPRAS"
                variant="primarioEstreito"
            />
        </Box>
    </Box>
);
