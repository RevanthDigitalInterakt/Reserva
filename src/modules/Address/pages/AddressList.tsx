import * as React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Typography, Box, Button, Alert } from 'reserva-ui';
import AddressSelector, { Address } from '../Components/AddressSelector';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../store";
import { loadAddress } from "../../../store/ducks/address/actions";
// import { Address } from "../../../store/ducks/address/types";


type Props = StackScreenProps<RootStackParamList, 'AddressList'>;

const AddressList: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const {
    address
  } = useSelector((state: ApplicationState) => state);
  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const modalRef = React.useRef(false);
  const { isCheckout } = route.params;
  // const [addressess, setAddressess] = React.useState<Address[]>([]);
  // const { products } = useSelector((state: ApplicationState) => state);
  React.useEffect(() => {
    dispatch(loadAddress());
  }, []);

  React.useEffect(() => {
    address.data.map((item) => {
      console.log(item.address.address1)
    })
  }, [address]);


  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      address:
        'R. Tomas antonio gonzaga, 123, Apto 101, Cristovao colombo, Vila velha - ES',
      title: 'Casa',
      zipcode: '29.123-456',
    },
  ]);

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

          setDeleteModal(false);
          setAddresses([]);
        }}
        onCancel={() => {
          setDeleteModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />

      <Alert
        isVisible={successModal}
        title={'Seu endereço foi excluido com sucesso.'}
        confirmText={'OK'}
        onConfirm={() => {
          setSuccessModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />
      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton
          loading={address.loading}
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

          <ScrollView showsVerticalScrollIndicator={false}>
            {address.data.map((addressItem) => {
              // const { address, title, zipcode } = addressItem;
              const { address1, address2, address3, city, state, postalCode, id } = addressItem.address
              return (
                <AddressSelector
                  key={id.toString()}
                  addressData={{
                    address: `${address1}, ${address2}, ${address3}, ${city} - ${state}`,
                    title: address1,
                    zipcode: postalCode,
                  }}
                  deleteAddress={() => {
                    setDeleteModal(true);
                  }}
                  edit={() => {
                    navigation.navigate('NewAddress', { edit: true });
                  }}
                  selected={true}
                  select={() => {
                    if (isCheckout) {
                      navigation.navigate('PaymentMethodScreen');
                      return;
                    }

                    navigation.navigate('NewAddress', {
                      isCheckout,
                      id: null,
                    });
                  }}
                />
              );
            })}
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
          </ScrollView>
        </Box>
        {isCheckout && (
          <Box justifyContent="flex-end" flex={1}>
            <Button
              onPress={() => navigation.navigate('PaymentMethodScreen')}
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
