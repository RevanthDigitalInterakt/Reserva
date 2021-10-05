import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box, Button, Icon, Divider, Image } from "reserva-ui";
import { images } from '../../../assets';
import Modal from "react-native-modal";

interface IStore {
    storeDetail: any[];
    data: {
        pickupDistance: number;
        pickupStoreInfo: {
            additionalInfo: string;
            address: {
                addressId: string;
                addressType: string;
                city: string;
                complement: string;
                country: string;
                geoCoordinates: number[];
                isDisposable: boolean;
                neighborhood: string;
                number: string;
                postalCode: string;
                receiverName: null;
                reference: null;
                state: string;
                street: string;
            }
            friendlyName: string;
        }
        shippingEstimate: string;
    };
}

const Store = ({ storeDetail, data }: IStore) => {
    const [showModalStore, setShowModalStore] = useState(false)
    const [pickupPoints, setPickupPoints] = useState([])
    const diasDaSemana = [
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
        'Domingo',
    ]
    return (
        <Box>
            <Box mt="xxs">
                <Typography
                    fontFamily="reservaSansBold"
                    fontSize={12}
                    color="neutroFrio2"
                >
                    LOJA MAIS PRÓXIMA
                </Typography>
                <Box
                    flex={1}
                    backgroundColor={'white'}
                    my={'micro'}
                    borderWidth="hairline"
                    borderColor="divider"
                    pt="micro"
                    pb="xxxs"
                    px="nano"
                >
                    {pickupPoints ?
                        <Box borderColor={'backgroundMenuOpened'}>
                            <Box flexDirection="row">
                                <Box alignItems="center">
                                    <Image
                                        height={40}
                                        source={images.localReserva}
                                        resizeMode={'contain'}
                                    />
                                    <Typography
                                        fontFamily="reservaSansMedium"
                                        fontSize={12}
                                    >
                                        {+data.pickupDistance.toFixed(1)} km
                                    </Typography>
                                </Box>
                                <Box flex={1}>
                                    <Box mb={'quarck'}>
                                        <Typography
                                            fontFamily="reservaSansBold"
                                            fontSize={14}
                                        >
                                            {data.pickupStoreInfo.friendlyName}

                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontFamily="reservaSansRegular" fontSize={13}>
                                            AV DOUTOR OLIVIO LIRA 353, LOJA 302 K/L PRAIA DA COSTA - VILA VELHA - ES.
                                            {/* {`${item.address.street}, ${item.address.number}
                     ${item.address.complement} - ${item.address.neighborhood} - ${item.address.state}, ${item.address.postalCode}`} */}
                                        </Typography>
                                    </Box>
                                    <Box flexDirection="row" mb="nano">
                                        <Box mr="xxs">
                                            <Typography
                                                fontFamily="reservaSansMedium"
                                                fontSize={12}
                                                color="verdeSucesso"
                                            >
                                                Grátis
                                            </Typography>
                                        </Box>
                                        <Typography
                                            fontFamily="reservaSansMedium"
                                            fontSize={12}
                                            color="verdeSucesso"
                                        >
                                            Pronto em até {data.shippingEstimate?.split('bd')[0]} dias
                                        </Typography>
                                    </Box>
                                    <Button
                                        flex={1}
                                        alignSelf="flex-start"
                                        onPress={() => setShowModalStore(true)}
                                    >
                                        <Box
                                            flex={1}
                                            alignSelf="flex-start"
                                        >
                                            <Typography
                                                style={{ textDecorationLine: "underline" }}
                                                fontFamily="nunitoRegular"
                                                fontSize={12}>
                                                Detalhes da loja
                                            </Typography>
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Box> : null}
                </Box>
                <Modal
                    isVisible={showModalStore}
                >
                    <Box
                        bg='white'
                        p="xxxs"
                    >
                        <Box
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Typography
                                    fontFamily="reservaSerifRegular"
                                    fontSize={20}
                                >
                                    Detalhes da Loja
                                </Typography>
                            </Box>
                            <Button
                                hitSlop={{
                                    top: 30,
                                    bottom: 30,
                                    right: 30,
                                    left: 30,
                                }}
                                onPress={() => setShowModalStore(false)}
                                variant='icone'
                                icon={
                                    <Icon size={12} name='Close' />
                                }
                            />
                        </Box>
                        <Box mt="xxs" mb="micro">
                            <Typography fontFamily="reservaSansMedium" fontSize={14}>
                                Horários de funcionamento
                            </Typography>
                        </Box>
                        {storeDetail &&
                            storeDetail.map((item) => (
                                <>
                                    <Box
                                        py="nano"
                                        flexDirection="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography fontFamily="reservaSansLight" fontSize={14}>
                                            {diasDaSemana[item.DayOfWeek]}
                                        </Typography>
                                        <Typography fontFamily="reservaSansRegular" fontSize={14}>
                                            {item.OpeningTime} às {item.ClosingTime}
                                        </Typography>
                                    </Box>
                                    <Divider variant="fullWidth" />
                                </>
                            ))
                        }
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}
export default Store;