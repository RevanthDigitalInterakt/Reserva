import React, { useState } from 'react';
import {
    TextInput
} from 'react-native';
import {
    Box,
    Button,
    Icon,
    Typography,
    theme
} from '@usereservaapp/reserva-ui';

interface iPrimeNewsletter {
    prime: any;
    onPress: () => void;
    value: string;
    onValueChange: (value: string) => void;
}
export const PrimeNewsletter = ({
    prime,
    onPress,
    value,
    onValueChange
}: iPrimeNewsletter) => {
    return (
        <Box alignItems='center' marginX={15}>
            <Box>
                <Typography
                    fontFamily='reservaSansBold'
                    fontSize={27}
                >
                    Titulo do Newsletter
                </Typography>
            </Box>
            <Box mt='quarck' mb='xxxs'>
                <Typography
                    fontFamily='reservaSansLight'
                    fontSize={17}
                    textAlign='center'
                >
                    Subtítulo da newsletter explicando alguma coisa ou simplesmente um texto de apoio lorem ipsum Reserva.
                </Typography>
            </Box>

            <Box flexDirection='row' flex={1}>
                <TextInput
                    placeholder={'seunome@email.com.br'}
                    returnKeyType="send"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    onChangeText={(text) => {
                        onValueChange && onValueChange(text);
                    }}
                    value={value}
                    style={{

                        color: theme.colors.neutroQuente2,
                        fontFamily: theme.fonts.reservaSansLight,
                        textAlign: 'center',
                        fontSize: 20,
                        height: 55,
                        flex: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        borderColor: theme.colors.neutroQuente2,
                        borderBottomLeftRadius: 8,
                        borderTopLeftRadius: 8
                    }}
                />
                <Box>
                    <Button
                        onPress={onPress}
                        style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
                        bg='#BC090D'
                        borderWidth={1}
                        borderColor='neutroQuente2'
                    >
                        <Box
                            marginX='xxxs'
                            alignItems='center'
                            flexDirection='row'
                            flex={1}
                        >
                            <Box>
                                <Typography
                                    fontFamily='nunitoBold'
                                    fontSize={14}
                                    color='white'
                                >
                                    ENVIAR
                                </Typography>
                            </Box>
                            <Icon
                                marginLeft='micro'
                                name={'Send'}
                                size={18}
                                color='white'
                            />
                        </Box>
                    </Button>
                </Box>
            </Box>
        </Box >
    );
}