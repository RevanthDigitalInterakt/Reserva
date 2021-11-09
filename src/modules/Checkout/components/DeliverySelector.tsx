import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography, Box, Button, Icon } from 'reserva-ui';

export interface Delivery {
    id?: string;
    name?: string;
    price?: number;
    shippingEstimate?: string;
}
interface IDeliverySelector {
    select?: () => void;
    deliveryData: Delivery;
    selected: boolean;
    disabled?: boolean;
}

const DeliverySelector = ({
    selected,
    select,
    deliveryData,
    disabled
}: IDeliverySelector) => {
    const { name, price, shippingEstimate, id } = deliveryData;
    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                onPress={select}>
                <Box
                    bg="white"
                    borderWidth="hairline"
                    borderColor={'divider'}
                    width="100%"
                    height={100}
                    flexDirection="row"
                    p="nano"
                    mt={'nano'}
                    alignItems="center"
                >
                    <Box
                        height={50}
                        width={50}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box m={'nano'} alignItems="center">
                            <Box width="10%">
                                <Box
                                    height={20}
                                    width={20}
                                    borderRadius="infinity"
                                    borderWidth="thin"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {selected &&
                                        <Box
                                            height={10}
                                            width={10}
                                            borderRadius="nano"
                                            bg="preto"
                                        />
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        alignContent={"center"}
                        flex={1}
                        width="70%"
                        marginX="micro"
                        borderRightWidth="hairline"
                        borderColor="divider"
                    >
                        <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                            {name}
                        </Typography>
                        <Typography
                            style={{ flexWrap: 'wrap' }}
                            fontFamily="nunitoRegular"
                            fontSize={12}
                        >
                            Em até {shippingEstimate?.split('bd')[0]} dias úteis</Typography>
                    </Box>
                    {price && price > 0 ?
                        <Box width="20%" alignItems="center">
                            <Typography>
                                R$ {(price / 100).toFixed(2).replace(".", ",")}
                            </Typography>
                        </Box>
                        :
                        <Box
                            borderRadius="infinity"
                            bg="verdeSucesso"
                            borderColor="verdeSucesso"
                            px="micro"
                            py="nano"
                            alignItems="center"
                        >
                            <Typography
                                color="white"
                                fontFamily="reservaSansMedium"
                                fontSize={11}
                            >
                                GRÁTIS
                            </Typography>
                        </Box>
                    }
                </Box>
            </TouchableOpacity>
        </>
    );
};

export default DeliverySelector;
