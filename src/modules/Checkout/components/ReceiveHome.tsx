import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box, } from "reserva-ui";
import { useAuth } from "../../../context/AuthContext";
import AddressSelector from "../../Address/Components/AddressSelector";
import DeliverySelector from "../components/DeliverySelector";

interface IReceiveHome {
    typeOfDelivery: any[];
    selectedDelivery: any;
    addresses: any[];
    selectedAddress: any;
    onDeliveryChosen: (item: any) => void;
    onAddressChosen: (item: any) => void;
}

const ReceiveHome = ({
    typeOfDelivery,
    selectedDelivery,
    addresses,
    selectedAddress,
    onDeliveryChosen,
    onAddressChosen
}: IReceiveHome) => {
    const { cookie, setCookie } = useAuth();
    return (
        <>
            <Box mt="xs">
                <Typography
                    color="preto"
                    fontFamily="reservaSansBold"
                    fontSize={12}
                >
                    ESCOLHA SEU ENDEREÇO
                </Typography>
            </Box>

            <Box
                pt={"micro"}
                flex={1}
            >
                {addresses && addresses.length > 0 ? (
                    addresses.map((item) => {
                        let selected;
                        const {
                            id,
                            city,
                            complement,
                            number,
                            postalCode,
                            state,
                            street,
                            neighborhood,
                            addressId,
                        } = item;

                        if (cookie != null) {
                            if (selectedAddress) {
                                selected = id === selectedAddress.id && item;
                            }
                        } else {
                            if (selectedAddress) {
                                selected = addressId === selectedAddress.addressId && item;
                            }
                        }

                        return (
                            <AddressSelector
                                addressData={{
                                    address: `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`,
                                    title: street,
                                    zipcode: postalCode,
                                }}
                                selected={selected}
                                select={() => onAddressChosen(item)}
                            />
                        );
                    })
                ) : (
                    <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                        Você ainda não tem endereços cadastrados, clique em Novo Endereço
                        e cadastre
                    </Typography>
                )}

            </Box>

            <Box mt="xs" mb="nano">
                <Typography
                    color="preto"
                    fontFamily="reservaSansBold"
                    fontSize={12}
                >
                    SELECIONE O TIPO DE ENTREGA
                </Typography>
            </Box>

            {typeOfDelivery && typeOfDelivery.length > 0 ? (
                typeOfDelivery.map((item: any) => {
                    let selected;
                    const {
                        id,
                        name,
                        shippingEstimate,
                        price,
                    } = item;

                    if (cookie != null) {
                        if (selectedDelivery) {
                            selected = id === selectedDelivery.id && item;
                        }
                    } else {
                        if (selectedDelivery) {
                            selected = id === selectedDelivery.id && item;
                        }
                    }

                    return (
                        <DeliverySelector
                            deliveryData={{
                                name: name,
                                price: price,
                                shippingEstimate: shippingEstimate,
                            }}
                            selected={selected}
                            select={() => { onDeliveryChosen(item) }}
                        />
                    );
                })
            ) : null}
        </>
    )
}

export default ReceiveHome;