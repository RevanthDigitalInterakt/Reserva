import * as React from "react";
import { SafeAreaView, ScrollView, FlatList } from "react-native";

import { Typography, Box, Button, Alert } from "reserva-ui";
// import AddressSelector, { Address } from '../Components/AddressSelector';
import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadAddress,
  deleteAddress,
  createDefaultAddress,
  deleteDefautAddress,
} from "../../../store/ducks/address/actions";
import { Address } from "../../../store/ducks/address/types";

type Props = StackScreenProps<RootStackParamList, "AddressList">;

const AddressList: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const {
    address: { data: addresses, loading, error, defaultAddress },
  } = useSelector((state: ApplicationState) => state);

  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [addressId, setAddressId] = React.useState("");
  const [successModal, setSuccessModal] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [idAddress, setIdAddress] = React.useState<string | undefined>("");
  const modalRef = React.useRef(false);
  const { isCheckout } = route.params;

  React.useEffect(() => {
    dispatch(loadAddress());
  }, []);

  React.useEffect(() => {
    if (defaultAddress) {
      setIdAddress(defaultAddress?.address?.id);
    } else {
      setIdAddress("");
    }
  }, [defaultAddress]);
  //verifica se tem o primeiro endereço, se tiver, então salva como padrão
  React.useEffect(() => {
    if (addresses?.length === 1) {
      const {
        address1,
        address2,
        address3,
        city,
        postalCode,
        state,
        firstName,
        phoneNumber,
        jobTitle,
        id,
      } = addresses[0].address;
      dispatch(
        createDefaultAddress({
          address: {
            country: "BR",
            address3: address3,
            address2: address2,
            city: city,
            address1: address1,
            postalCode: postalCode,
            state: state,
            firstName: firstName,
            phoneNumber: phoneNumber,
            jobTitle: jobTitle,
            id: id,
          },
        })
      );
    }
  }, [addresses]);

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
        onConfirm={() => {
          modalRef.current = true;
          dispatch(deleteAddress(addressId));
          if (addressId === defaultAddress?.address?.id) {
            dispatch(deleteDefautAddress());
          }

          setDeleteModal(false);
        }}
        onCancel={() => {
          setDeleteModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />
      {error ? (
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
          title={"Seu endereço foi excluido com sucesso."}
          confirmText={"OK"}
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
          overflow={"hidden"}
          height={"80%"}
          paddingHorizontal={20}
          justifyContent="flex-start"
          pt={"md"}
        >
          <Box alignSelf={"flex-start"} mb={"xxxs"}>
            <Typography variant="tituloSessoes">Meus endereços</Typography>
          </Box>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={addresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const {
                address1,
                address2,
                address3,
                city,
                state,
                postalCode,
                id,
                firstName,
                phoneNumber,
                jobTitle,
              } = item.address;
              const numberAndComplement: string[] | undefined = address2?.split(
                "|"
              );
              return (
                <AddressSelector
                  addressData={{
                    address: `${address1}, ${
                      numberAndComplement && numberAndComplement[0]
                    }, ${
                      numberAndComplement && numberAndComplement[1]
                    }, ${address3}, ${city} - ${state}`,
                    title: address1,
                    zipcode: postalCode,
                  }}
                  deleteAddress={() => {
                    setDeleteModal(true);
                    setAddressId(id ? id : "");
                  }}
                  edit={() => {
                    navigation.navigate("NewAddress", {
                      edit: true,
                      editAddress: {
                        id: id,
                        postalCode: postalCode,
                        state: state,
                        city: city,
                        street: address1,
                        district: address3,
                        numberAndComplement: address2?.split("|"),
                        firstName: firstName,
                        phoneNumber: phoneNumber,
                        jobTitle: jobTitle,
                      },
                    });
                  }}
                  selected={idAddress === id ? true : false}
                  select={() => {
                    if (isCheckout) {
                      navigation.navigate("PaymentMethodScreen");
                      return;
                    }
                    setSelected(selected);
                    setIdAddress(id);
                    dispatch(
                      createDefaultAddress({
                        address: {
                          country: "BR",
                          address3: address3,
                          address2: address2,
                          city: city,
                          address1: address1,
                          postalCode: postalCode,
                          state: state,
                          firstName: firstName,
                          phoneNumber: phoneNumber,
                          jobTitle: jobTitle,
                          id: id,
                        },
                      })
                    );
                    // navigation.navigate('NewAddress', {
                    //   isCheckout,
                    //   id: null,
                    // });
                  }}
                />
              );
            }}
          />
          <Box marginX={"md"}>
            <Button
              mt="xs"
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
        </Box>
        {isCheckout && (
          <Box justifyContent="flex-end" flex={1}>
            <Button
              onPress={() => navigation.navigate("PaymentMethodScreen")}
              title="FORMA DE PAGAMENTO"
              variant="primarioEstreito"
              inline={true}
            />
          </Box>
        )}
      </SafeAreaView>
    </>
  );
};

export default AddressList;
