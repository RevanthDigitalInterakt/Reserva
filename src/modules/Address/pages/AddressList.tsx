import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Typography, Box, Button, Alert } from 'reserva-ui';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

import AddressSelector from '../Components/AddressSelector';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { deleteAddress } from '../../../graphql/address/addressMutations';
import { useCart } from '../../../context/CartContext';
import { profileQuery } from '../../../store/ducks/profile/types';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'AddressList'>;

const AddressList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addressId, setAddressId] = React.useState('');
  const [successModal, setSuccessModal] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const modalRef = useRef(false);
  const { isCheckout } = route.params;
  const [addressDelete, { error: deleteAddressError }] =
    useMutation(deleteAddress);
  const [loading, setLoading] = useState(false);
  const { orderForm, addShippingData } = useCart();
  const { loading: loadingProfile, data, refetch } = useQuery(profileQuery);
  const [profile, setProfile] = useState<any>({});

  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        setProfile(profile);
      }
    }
  }, [data]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      refetch();
    });
    refetch();
  }, [navigation]);

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
        onConfirm={async () => {
          modalRef.current = true;
          const { data } = await addressDelete({
            variables: {
              id: addressId,
            },
          });

          console.log(data);
          setDeleteModal(false);
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
            refetch();
          }}
          onClose={() => {
            setDeleteModal(false);
            refetch();
          }}
        />
      )}

      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton
          loading={loading || loadingProfile}
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
            data={profile.addresses}
            keyExtractor={(item, index) => index.toString()}
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
              } = item;
              return (
                <AddressSelector
                  addressData={{
                    address: `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`,
                    title: street,
                    zipcode: postalCode,
                  }}
                  deleteAddress={() => {
                    setDeleteModal(true);
                    setAddressId(id);
                  }}
                  edit={() => {
                    navigation.navigate('NewAddress', {
                      edit: true,
                      editAddress: {
                        id,
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
