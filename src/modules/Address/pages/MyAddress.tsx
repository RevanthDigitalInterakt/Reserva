import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, Button, Alert } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
const MyAddress = () => {
  //TODO : change the first icon from trash to Check.
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [sucessModal, setSucessModal] = React.useState(false);
  return (
    <>
      <Alert
        isVisible={deleteModal}
        title={"Excluir endereço"}
        subtitle={"Tem certeza que deseja excluir o endereço salvo?"}
        confirmText={"SIM"}
        cancelText={"NÃO"}
        onConfirm={() => {
          setSucessModal(true);
          setDeleteModal(false);
        }}
        onCancel={() => {
          setDeleteModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />

      <Alert
        isVisible={sucessModal}
        title={"Seu endereço foi excluido com sucesso."}
        confirmText={"OK"}
        onConfirm={() => {
          setSucessModal(false);
        }}
        onClose={() => {
          setDeleteModal(false);
        }}
      />
      <SafeAreaView flex={1} backgroundColor={"white"}>
        <TopBarBackButton showShadow />

        <Box
          overflow={"hidden"}
          height={"75%"}
          paddingHorizontal={20}
          justifyContent="flex-start"
          paddingTop={49}
        >
          <Box alignSelf={"flex-start"} marginBottom={18}>
            <Typography
              fontSize={20}
              fontFamily="reservaSerifRegular"
              fontSize={20}
            >
              Meus endereços
            </Typography>
          </Box>

          <ScrollView showsVerticalScrollIndicator={false}>
            <AddressSelector
              address={
                "R. Tomas antonio gonzaga, 123, Apto 101, Cristovao colombo, Vila velha - ES"
              }
              title={"Casa"}
              zipcode={"29.123-456"}
              deleteAddress={() => {
                setDeleteModal(true);
              }}
              edit={() => {
                console.log("editar endereço");
              }}
              selected={true}
            />
          </ScrollView>
        </Box>
        <Button
          title={"ADICIONAR ENDEREÇO"}
          variant="primarioEstreitoOutline"
        />
      </SafeAreaView>
    </>
  );
};

export default MyAddress;
