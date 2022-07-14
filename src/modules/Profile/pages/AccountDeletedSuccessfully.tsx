import React, { } from 'react';
import { SafeAreaView } from 'react-native';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import {
    Box,
    Typography,
    Button,
} from '@danilomsou/reserva-ui';

export const AccountDeletedSuccessfully = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>

            <TopBarBackButton
                loading={false}
                backButtonPress={() => {
                    navigation.navigate('Home');
                }}
            />
            <Box
                paddingTop={20}
                paddingX={20}
                bg='white'
                flex={1}
            >
                <Box mb={14} bg='white' mr='40%'>
                    <Typography
                        fontFamily='reservaSerifRegular'
                        fontSize={22}
                    >
                        Sua conta foi deletada com sucesso.
                    </Typography>
                </Box>

                <Box mr='30%'>
                    <Typography
                        fontFamily='nunitoRegular'
                        fontSize={15}
                    >
                        Sentimos muito por ver você partir. Esperamos ver você em breve.
                    </Typography>
                </Box>


            </Box>
            <Box paddingX={20} mb={24}>
                <Button
                    variant='primarioEstreitoOutline'
                    width="100%"
                    height={50}
                    onPress={() => { }}
                >
                    <Typography
                        letterSpacing={2}
                        color="preto"
                        fontFamily="nunitoRegular"
                        fontSize={13}
                    >
                        VOLTAR PARA HOME
                    </Typography>
                </Button>
            </Box>
        </SafeAreaView>
    );
}