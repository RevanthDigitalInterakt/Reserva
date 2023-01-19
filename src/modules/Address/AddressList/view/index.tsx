import {
  Alert, Box, Button, Typography,
} from '@usereservaapp/reserva-ui';
import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import AddressSelector from '../../Components/AddressSelector';
import type { IEditAddress } from '../../interface';
import useController from '../controller/useController';

const AddressList = () => {
  const controller = useController();

  const renderModal = React.useMemo(() => {
    if (controller.isVisibleDeleteModal) {
      return (
        <Alert
          isVisible={controller.isVisibleDeleteModal}
          title="Excluir endereço"
          subtitle="Tem certeza que deseja excluir o endereço salvo?"
          confirmText="SIM"
          cancelText="NÃO"
          onConfirm={controller.doDeleteAddress}
          onCancel={controller.closeDeleteModal}
          onClose={controller.closeDeleteModal}
        />
      );
    }

    if (controller.isVisibleSuccessModal) {
      return (
        <Alert
          isVisible={controller.isVisibleSuccessModal}
          title="Seu endereço foi excluído com sucesso."
          confirmText="OK"
          onConfirm={controller.closeSuccessModal}
          onClose={() => {
            controller.closeSuccessModal();
            controller.closeDeleteModal();
          }}
        />
      );
    }

    if (controller.hasDeleteAddressError) {
      return (
        <Alert
          isVisible={controller.hasDeleteAddressError}
          title="Não foi possível excluir o endereço"
          confirmText="OK"
          onConfirm={controller.closeErrorModal}
          onClose={controller.closeErrorModal}
        />
      );
    }
    return null;
  }, [
    controller.hasDeleteAddressError,
    controller.isVisibleDeleteModal,
    controller.isVisibleSuccessModal,
  ]);

  return (

    <>
      {renderModal}

      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <TopBarBackButton
          loading={controller.loadingStatusBar}
          showShadow
          backButtonPress={controller.goBack}
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

          <FlatList
            style={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
            data={controller.profileData?.addresses}
            keyExtractor={(item, index) => `${item?.id}-${index}`}
            renderItem={({ item }: { item: IEditAddress }) => {
              const {
                receiverName: title,
                postalCode: zipcode,
                id,
              } = item;

              const selected = controller.checkSelectedAddress(item);
              const address = controller.formatAddress(item);

              return (
                <AddressSelector
                  addressData={{ address, title, zipcode }}
                  deleteAddress={() => {
                    controller.openModalDeleteAddress(id);
                  }}
                  editAndDelete
                  edit={() => {
                    controller.navigateToEditAddress(item);
                  }}
                  selected={!!selected}
                  select={() => {
                    controller.onAddressChosen(item);
                  }}
                />
              );
            }}
            ListEmptyComponent={controller.loadingStatusBar
              ? <ActivityIndicator />
              : (
                <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                  Você ainda não tem endereços cadastrados, clique em Novo Endereço
                  e cadastre
                </Typography>
              )}
          />
        </Box>
        <Box>
          <Box marginX="md" justifyContent="flex-end" mb="xxxs">
            <Button
              onPress={controller.navigateToNewAddress}
              title="NOVO ENDEREÇO"
              variant="primarioEstreitoOutline"
              padding="xl"
            />
          </Box>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default AddressList;
