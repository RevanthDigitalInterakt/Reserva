import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Box } from '@danilomsou/reserva-ui';
import { useAuth } from '../../../context/AuthContext';
import AddressSelector from '../../Address/Components/AddressSelector';
import DeliverySelector from '../components/DeliverySelector';
import { FlatList } from 'react-native-gesture-handler';

interface IReceiveHome {
  typeOfDelivery: any[];
  selectedDelivery: any;
  addresses: any[];
  selectedAddress: any;
  onDeliveryChosen: (item: any) => void;
  onAddressChosen: (item: any) => void;
  loading: boolean;
}

const ReceiveHome = ({
  typeOfDelivery,
  selectedDelivery,
  addresses,
  selectedAddress,
  onDeliveryChosen,
  onAddressChosen,
  loading,
}: IReceiveHome) => {
  const { cookie, setCookie } = useAuth();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    if (selectedAddress) {
      console.log('updateAddresses1234 - addressId', selectedAddress.addressId);
      setSelectedId(selectedAddress.addressId);
    }
  }, [selectedAddress])

  return (
    <>
      <Box mt="xs">
        <Typography color="preto" fontFamily="reservaSansBold" fontSize={12}>
          ESCOLHA SEU ENDEREÇO
        </Typography>
      </Box>

      <Box pt={'micro'}>
        {addresses && addresses.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.addressId}
            data={addresses}
            renderItem={
              ({ item }) => {

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
                // if (cookie != null) {
                //   if (selectedAddress) {
                //     selected = addressId === selectedAddress.addressId;
                //   }
                // } else {
                //   if (selectedAddress) {
                //     selected = addressId === selectedAddress.addressId && item;
                //   }
                // }bcdop5f8nu

                return (
                  <AddressSelector
                    addressData={{
                      address: `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`,
                      title: street,
                      zipcode: postalCode,
                    }}
                    disabled={addressId === selectedAddress.addressId}
                    selected={selectedId === addressId}
                    select={() => onAddressChosen(item)}
                  />
                );
              }
            }
          />
        ) : (
          <Typography fontFamily="reservaSerifRegular" fontSize={16}>
            Você ainda não tem endereços cadastrados, clique em Novo Endereço e
            cadastre
          </Typography>
        )}
      </Box>

      <Box mt="xs" mb="nano">
        <Typography color="preto" fontFamily="reservaSansBold" fontSize={12}>
          SELECIONE O TIPO DE ENTREGA
        </Typography>
      </Box>
      {typeOfDelivery && typeOfDelivery.length > 0
        ? typeOfDelivery.map((item: any) => {
          let selected;
          const { id, name, shippingEstimate, price } = item;

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
              disabled={(selected = id === selectedDelivery.id)}
              select={() => {
                onDeliveryChosen(item);
              }}
            />
          );
        })
        : null}
    </>
  );
};

export default ReceiveHome;
