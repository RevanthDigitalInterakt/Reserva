import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Typography, Box, Button, Alert } from "reserva-ui";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";

import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { deleteAddress } from "../../../graphql/address/addressMutations";
import { useCart } from "../../../context/CartContext";
import { profileQuery } from "../../../store/ducks/profile/types";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

type Props = StackScreenProps<RootStackParamList, "AddressList">;

const AddressList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addressId, setAddressId] = React.useState("");
  const [successModal, setSuccessModal] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const modalRef = useRef(false);
  const { isCheckout } = route.params;
  const [
    addressDelete,
    { error: deleteAddressError, loading: loadingAddressDelete },
  ] = useMutation(deleteAddress);
  const [loading, setLoading] = useState(false);
  const { orderForm, addShippingData } = useCart();
  const { loading: loadingProfile, data, refetch } = useQuery(profileQuery);
  const [profile, setProfile] = useState<any>({});
  const [addresses, setAddresses] = useState<any[]>([]);

  const onAddressChosen = (item: any) => {
    setSelectedAddress(item);
  };

  const onGoToPayment = async () => {
    setLoading(true);

    await addShippingData(selectedAddress);

    setLoading(false);

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

    navigation.navigate("Checkout");
  };

  useEffect(() => {
    const availableAddressesOrderForm =
      orderForm &&
      orderForm?.shippingData &&
      orderForm?.shippingData.availableAddresses
        .filter(({ geoCoordinates }) => geoCoordinates.length > 0)
        .map((a) => ({ ...a, country: "BRA" }));

    if (
      availableAddressesOrderForm &&
      availableAddressesOrderForm?.length > 0
    ) {
      setAddresses(availableAddressesOrderForm);
    } else {
      const { addresses } = profile;

      setAddresses(addresses);
    }
  }, [orderForm, profile]);

  useEffect(() => {
    console.log(data);
    if (data) {
      const { profile } = data;
      if (profile) {
        setProfile(profile);
      }
    }
  }, [data]);

  navigation.addListener("focus", () => {
    console.log("aqui");
    refetch();
  });
  // useEffect(() => {
  //   refetch();
  // }, [loadingAddressDelete]);

  return (
    <>
      <Alert
        onModalHide={() => {
          modalRef.current && setSuccessModal(true);
        }}
        isVisible={deleteModal}
        title={"Excluir endereço"}
        subtitle={"Tem certeza que deseja excluir o endereço salvo?"}
        confirmText={"SIM"}
        cancelText={"NÃO"}
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
          title={"Não foi possível excluir o endereço"}
          confirmText={"OK"}
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
          title={"Seu endereço foi excluído com sucesso."}
          confirmText={"OK"}
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
          overflow={"hidden"}
          height={"80%"}
          paddingHorizontal={20}
          justifyContent="flex-start"
          pt={"md"}
        >
          <Box alignSelf={"flex-start"} mb={"xxxs"}>
            <Typography variant="tituloSessoes">Meus endereços</Typography>
          </Box>

          {addresses && addresses.length > 0 ? (
            <FlatList
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

                if (selectedAddress) {
                  selected = id === selectedAddress.id && item;
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
                    edit={() => {
                      navigation.navigate("NewAddress", {
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

        {isCheckout && addresses ? (
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
          <Box marginX={"md"}>
            <Button
              onPress={() =>
                navigation.navigate("NewAddress", {
                  isCheckout,
                  id: null,
                })
              }
              title={"NOVO ENDEREÇO"}
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
