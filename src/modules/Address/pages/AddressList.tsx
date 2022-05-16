import { useLazyQuery, useMutation } from '@apollo/client';
import { Alert, Box, Button, Typography } from '@danilomsou/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, FlatList, SafeAreaView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { deleteAddress } from '../../../graphql/address/addressMutations';
import { profileQuery } from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import AddressSelector from '../Components/AddressSelector';



type Props = StackScreenProps<RootStackParamList, 'AddressList'>;

const AddressList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { identifyCustomer } = useCart();
  const { cookie, email } = useAuth();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addressId, setAddressId] = React.useState('');
  const [successModal, setSuccessModal] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const modalRef = useRef(false);
  const { isCheckout, comeFrom } = route.params;
  const [
    addressDelete,
    { error: deleteAddressError, loading: loadingAddressDelete },
  ] = useMutation(deleteAddress);
  const [loading, setLoading] = useState(false);
  const { orderForm, addShippingData, addShippingOrPickupInfo } = useCart();
  const [{ data, loadingProfile }, setDataProfile] = useState({
    data: null,
    loadingProfile: true,
  });
  const [getProfile, {
    refetch,
  }] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });
  const [profile, setProfile] = useState<any>({});
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editAndDelete, setEditAndDelete] = useState<boolean>(false);

  useEffect(() => {
    getProfile().then((response) => {
      setDataProfile({
        data: response.data,
        loadingProfile: false,
      })
    })
  }, []);

  useEffect(() => {
    if (comeFrom === 'Home') {
      setEditAndDelete(true);
    } else {
      setEditAndDelete(false);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  const onAddressChosen = (item: any) => {
    setSelectedAddress({ ...item, addressType: 'residential' });
  };

  const onGoToPayment = async () => {
    if (orderForm) {
      setLoading(true);

      const slas = orderForm.shippingData.logisticsInfo[0].slas[0];

      if (slas) {
        const { deliveryChannel, id } = slas;

        // save selected logistc info
        const logisticInfo = orderForm.shippingData.logisticsInfo.map(
          ({ itemIndex }) => ({
            itemIndex,
            selectedDeliveryChannel: deliveryChannel,
            selectedSla: id,
          })
        );
        let addressId;
        if (selectedAddress.id) {
          addressId = selectedAddress.id;
          delete selectedAddress.id;
        } else {
          addressId = selectedAddress.addressId;
        }
        await addShippingOrPickupInfo(logisticInfo, [
          { ...selectedAddress, addressId },
        ]);
      }
      setLoading(false);
    }

    // if (
    //   orderForm &&
    //   orderForm.shippingData.selectedAddresses.length > 0 &&
    //   orderForm.shippingData.selectedAddresses[0].addressId !==
    //     selectedAddress.addressId
    // ) {
    //   setLoading(false);
    // } else {
    //   await addShippingData(selectedAddress);
    //   setLoading(false);
    // }

    navigation.navigate('Checkout');
  };

  useEffect(() => {
    const availableAddressesOrderForm =
      orderForm &&
      orderForm?.shippingData &&
      orderForm?.shippingData.availableAddresses.map((a) => ({
        ...a,
        country: 'BRA',
      }));

    // if (
    //   availableAddressesOrderForm &&
    //   availableAddressesOrderForm?.length > 0
    // ) {
    //   setAddresses(availableAddressesOrderForm);
    // } else {
    //   const { addresses } = profile;

    //   setAddresses(addresses);
    // }

    if (cookie != null) {
      const { addresses } = profile;
      setAddresses(addresses);
    } else if (
      availableAddressesOrderForm &&
      availableAddressesOrderForm?.length > 0
    ) {
      setAddresses(availableAddressesOrderForm);
    }
  }, [orderForm, profile]);

  useEffect(() => {
    if (data) {
      const { profile } = data;
      if (profile) {
        setProfile(profile);
      }
    }
  }, [data]);

  navigation.addListener('focus', () => {
    refetch();
  });

  return (
    <>
      <Alert
        onModalHide={() => {
          modalRef.current && setSuccessModal(true);
        }}
        isVisible={deleteModal}
        title="Excluir endereço"
        subtitle="Tem certeza que deseja excluir o endereço salvo?"
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
          loading={loading || loadingProfile || loadingAddressDelete}
          showShadow
          backButtonPress={() => navigation.goBack()}
        />

        <Box
          overflow="hidden"
          paddingHorizontal={20}
          flex={1}
          justifyContent="flex-start"
          pt="md"
        >
          <Box alignSelf="flex-start" mb="xxxs">
            <Typography variant="tituloSessoes">Meus endereços</Typography>
          </Box>

          {addresses && addresses.length > 0 ? (
            <FlatList
              style={{ marginBottom: 20 }}
              showsVerticalScrollIndicator={false}
              data={addresses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
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

                if (cookie) {
                  if (selectedAddress) {
                    selected = id === selectedAddress.id && item;
                  }
                } else if (selectedAddress) {
                  selected = addressId === selectedAddress.addressId && item;
                }

                return (
                  <AddressSelector
                    addressData={{
                      address: `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`,
                      title: street,
                      zipcode: postalCode,
                    }}
                    deleteAddress={() => {
                      setDeleteModal(true);
                      setAddressId(id || addressId);
                    }}
                    editAndDelete={editAndDelete}
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
          ) : (
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              Você ainda não tem endereços cadastrados, clique em Novo Endereço
              e cadastre
            </Typography>
          )}
        </Box>

        <Box>
          {cookie && (
            <Box marginX="md" justifyContent="flex-end" mb="xxxs">
              <Button
                onPress={() =>
                  navigation.navigate('NewAddress', {
                    isCheckout,
                    id: null,
                  })
                }
                title="NOVO ENDEREÇO"
                variant="primarioEstreitoOutline"
                padding="xl"
              />
            </Box>
          )}

          {isCheckout && addresses ? (
            <Box justifyContent="flex-end">
              <Button
                disabled={loading || !selectedAddress}
                onPress={onGoToPayment}
                title="FORMA DE PAGAMENTO"
                variant="primarioEstreito"
                inline
              />
            </Box>
          ) : null}
        </Box>
      </SafeAreaView>
    </>
  );
};

export default AddressList;
