import React, {
  useState, useEffect, useRef,
} from 'react';
import { Typography, Box, Alert } from '@usereservaapp/reserva-ui';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useAuth } from '../../../context/AuthContext';
import DeliverySelector from './DeliverySelector';
import { useCart } from '../../../context/CartContext';
import { deleteAddress } from '../../../graphql/address/addressMutations';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import AddressSelector from '../../Address/components/AddressSelector';

interface IReceiveHome {
  typeOfDelivery: any[];
  selectedDelivery: any;
  addresses: any[];
  selectedAddress: any;
  shippingValue: number;
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
  shippingValue,
  loading,
}: IReceiveHome) => {
  const { cookie, setCookie, email } = useAuth();
  const [selectedId, setSelectedId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [addressId, setAddressId] = useState('');
  const navigation = useNavigation();
  const [editAndDelete, setEditAndDelete] = useState<boolean>(false);
  const { identifyCustomer, orderForm } = useCart();
  const modalRef = useRef(false);
  const [successModal, setSuccessModal] = useState(false);
  const [
    addressDelete,
    { error: deleteAddressError, loading: loadingAddressDelete },
  ] = useMutation(deleteAddress);

  const [{ data, loadingProfile }, setDataProfile] = useState({
    data: null,
    loadingProfile: true,
  });
  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (selectedAddress) {
      setSelectedId(selectedAddress.addressId);
    }
  }, [selectedAddress]);

  const refetch = async () => {
    setDataProfile({
      loadingProfile: true,
      data: null,
    });

    await getProfile().then((res) => {
      setDataProfile({
        loadingProfile: false,
        data: res.data,
      });
    });
  };

  return (
    <>
      <Alert
        onModalHide={() => {
          modalRef.current && setSuccessModal(true);
        }}
        isVisible={deleteModal}
        title="Excluir endereço"
        subtitle="Tem certeza que deseja excluir este endereço da sua conta?"
        confirmText="SIM"
        cancelText="NÃO"
        onConfirm={async () => {
          modalRef.current = true;
          const data = await addressDelete({
            variables: {
              id: addressId,
            },
          });
          setDeleteModal(false);

          // reset shippingData of orderform
          if (data) {
            if (email) {
              await identifyCustomer(email);
            }
          }
        }}
        onCancel={() => {
          setDeleteModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />
      {deleteAddressError ? (
        <Alert
          isVisible={successModal}
          title="Não foi possível excluir o endereço"
          confirmText="OK"
          onConfirm={() => {
            setSuccessModal(false);
          }}
          onClose={() => {
            setDeleteModal(false);
          }}
        />
      ) : (
        <Alert
          isVisible={successModal}
          title="Seu endereço foi excluído com sucesso."
          confirmText="OK"
          onConfirm={() => {
            modalRef.current = false;
            setSuccessModal(false);
            refetch();
          }}
          onClose={() => {
            modalRef.current = false;
            setSuccessModal(false);
            setDeleteModal(false);
            refetch();
          }}
        />
      )}

      <Box mt="xxs">
        <Typography
          color="preto"
          fontFamily="reservaSerifRegular"
          fontSize={20}
          lineHeight={28}
          letterSpacing={0.2}
        >
          Selecione um endereço:
        </Typography>
      </Box>

      <Box>
        {addresses && addresses.length > 0 ? (
          <FlatList
            inverted
            keyExtractor={(item) => item.addressId}
            data={addresses}
            renderItem={({ item }) => {
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
                receiverName,
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
                    address: `${street}, ${number}, ${complement},
${neighborhood}, ${city} - ${state}`,
                    title: receiverName,
                    zipcode: postalCode,
                  }}
                  disabled={addressId === selectedAddress.addressId}
                  selected={selectedId === addressId}
                  select={() => onAddressChosen(item)}
                  deleteAddress={() => {
                    setDeleteModal(true);
                    setAddressId(id || addressId);
                  }}
                  editAndDelete
                  edit={() => {
                    navigation.navigate('NewAddress', {
                      edit: true,
                      receiveHome: true,
                      editAddress: {
                        id: addressId,
                        postalCode,
                        state,
                        city,
                        street,
                        neighborhood,
                        number,
                        complement,
                        receiverName,
                      },
                    });
                  }}
                />
              );
            }}
          />
        ) : (
          <Box style={{ marginBottom: 160 }} mt="micro">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Você ainda não tem endereços cadastrados, clique em Adicionar
              Endereço e cadastre.
            </Typography>
          </Box>
        )}
      </Box>

      <Box mb="xxxs" mt="xs">
        {typeOfDelivery && typeOfDelivery.length > 0 ? (
          <Typography
            color="preto"
            fontFamily="reservaSerifRegular"
            fontSize={20}
            lineHeight={28}
            letterSpacing={0.2}
          >
            Selecione o tipo de entrega:
          </Typography>
        ) : null}
      </Box>
      {typeOfDelivery && typeOfDelivery.length > 0
        ? typeOfDelivery.map((item: any, index:number) => {
          let selected;
          const {
            id, name, shippingEstimate, price,
          } = item;

          if (cookie != null) {
            if (selectedDelivery) {
              selected = id === selectedDelivery.id && item;
            }
          } else if (selectedDelivery) {
            selected = id === selectedDelivery.id && item;
          }

          return (
            <DeliverySelector
              key={`delivery-${index}`}
              deliveryData={{
                name,
                price: shippingValue,
                shippingEstimate,
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
