import React, { FC, useEffect, useState, useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { Box, Typography, Button, Icon } from 'reserva-ui';
import { StatusBar, Platform, Alert, Linking } from 'react-native';

interface ModalPush {
    closeModal: () => void;
    handleNavigation: () => void;
    data: any;
}

export const ModalPush = ({ closeModal, handleNavigation, data }: ModalPush) => {
    const viewRef = useRef(null);
    return (
        <Box>
            {data &&
                <Animatable.View
                    ref={viewRef}
                    animation="slideInDown"
                    style={{
                        elevation: 10,
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        zIndex: 2,
                    }}
                >
                    <Button
                        onPress={handleNavigation}
                        minHeight={60}
                        bg="white"
                        mt="xs"
                        paddingLeft="xxxs"
                        py="micro"
                        flexDirection="row"
                        alignItems="center"
                        paddingRight="xxxs"
                        boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
                        style={{ elevation: 10 }}
                    >
                        <Box flex={1}>
                            <Typography
                                fontFamily="nunitoBold"
                                fontSize={15}
                                color="preto"
                            >
                                {data.notification?.title}
                            </Typography>

                            <Typography
                                fontFamily="nunitoRegular"
                                fontSize={13}
                                color="preto"
                            >
                                {data.notification?.body}
                            </Typography>
                        </Box>

                        <Button flex={1}
                            onPress={closeModal}
                        >
                            <Icon name="Close" size={15} color="preto" ml="xxxs" />
                        </Button>
                    </Button>
                </Animatable.View>
            }
        </Box>
    );
}