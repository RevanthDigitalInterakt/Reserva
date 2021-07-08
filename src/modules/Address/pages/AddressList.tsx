import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Typography, Box, Button, Alert } from 'reserva-ui';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

import AddressSelector from '../Components/AddressSelector';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useMutation } from '@apollo/client';
import { deleteAddress } from '../../../graphql/address/addressMutations';
import { useCart } from '../../../context/CartContext';

type Props = StackScreenProps<RootStackParamList, 'AddressList'>;

const AddressList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addressId, setAddressId] = React.useState('');
  const [successModal, setSuccessModal] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [, setIdAddress] = React.useState('');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const modalRef = React.useRef(false);
  const { isCheckout } = route.params;
  const [addressDelete] = useMutation(deleteAddress);
  const [loading, setLoading] = useState(false);
  const { orderForm, addShippingData } = useCart();

  useEffect(() => {
    if (!!orderForm?.shippingData) {
      setIdAddress(orderForm?.shippingData.selectedAddresses[0].addressId);
    }
  }, []);

  const onAddressChosen = (item: any) => {
    setSelected(true);

    setSelectedAddress(item);
  };

  const onGoToPayment = async () => {
    setLoading(true);
    if (
      orderForm &&
      orderForm.shippingData.selectedAddresses[0].addressId !==
      selectedAddress.addressId
    ) {
      await addShippingData(selectedAddress);
      setLoading(false);
    }

    navigation.navigate('Checkout');
  };

  return (
    <>
      <Alert
        onModalHide={() => {
          modalRef.current && setSuccessModal(true);
        }}
        isVisible={deleteModal}
        title={'Excluir endereço'}
        subtitle={'Tem certeza que deseja excluir o endereço salvo?'}
        confirmText={'SIM'}
        cancelText={'NÃO'}
        onConfirm={() => {
          modalRef.current = true;
          addressDelete({
            variables: {
              id: addressId,
            },
          });
          setDeleteModal(false);
        }}
        onCancel={() => {
          setDeleteModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />
      {true ? (
        <Alert
          isVisible={successModal}
          title={'Não foi possível excluir o endereço'}
          confirmText={'OK'}
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
          title={'Seu endereço foi excluído com sucesso.'}
          confirmText={'OK'}
          onConfirm={() => {
            setSuccessModal(false);
          }}
          onClose={() => {
            setDeleteModal(false);
          }}
        />
      )}

      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton
          loading={loading}
          showShadow
          backButtonPress={() => navigation.goBack()}
        />

        <Box
          overflow={'hidden'}
          height={'80%'}
          paddingHorizontal={20}
          justifyContent="flex-start"
          pt={'md'}
        >
          <Box alignSelf={'flex-start'} mb={'xxxs'}>
            <Typography variant="tituloSessoes">Meus endereços</Typography>
          </Box>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={orderForm?.shippingData?.availableAddresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const {
                addressId,
                city,
                complement,
                number,
                postalCode,
                state,
                street,
                neighborhood,
              } = item;

              return (
                <AddressSelector
                  addressData={{
                    address: `${street}, ${number && complement}, ${number && complement
                      }, ${neighborhood}, ${city} - ${state}`,
                    title: street,
                    zipcode: postalCode,
                  }}
                  deleteAddress={() => {
                    setDeleteModal(true);
                    setAddressId(addressId);
                  }}
                  edit={() => {
                    navigation.navigate('NewAddress', {
                      edit: true,
                      editAddress: {
                        addressId,
                        postalCode,
                        state,
                        city,
                        street,
                        neighborhood,
                        number,
                        complement,
                      },
                    });
                  }}
                  selected={selected}
                  select={() => {
                    onAddressChosen(item);
                  }}
                />
              );
            }}
          />
        </Box>

        {isCheckout ? (
          <Box justifyContent="flex-end" flex={1}>
            <Button
              disabled={loading}
              onPress={onGoToPayment}
              title="FORMA DE PAGAMENTO"
              variant="primarioEstreito"
              inline={true}
            />
          </Box>
        ) : (
          <Box marginX={'md'}>
            <Button
              mt="xs"
              onPress={() =>
                navigation.navigate('NewAddress', {
                  isCheckout,
                  id: null,
                })
              }
              title={'NOVO ENDEREÇO'}
              variant="primarioEstreitoOutline"
              padding="xl"
            />
          </Box>
        )}
      </SafeAreaView>
    </>
  );
};

export default AddressList;
