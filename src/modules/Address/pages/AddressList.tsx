import * as React from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Typography, Box, Button, Alert } from "reserva-ui";
import AddressSelector from "../Components/AddressSelector";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "AddressList">;

const AddressList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [sucessModal, setSucessModal] = React.useState(false);

  const { isCheckout } = route.params;

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
      <SafeAreaView flex={1} backgroundColor="white">
        <TopBarBackButton
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
                navigation.navigate("NewAddress", { id: 1 });
              }}
              selected={true}
              select={() => navigation.navigate("PaymentMethodScreen")}
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
                title={"ADICIONAR ENDEREÇO"}
                variant="primarioEstreitoOutline"
                padding="xl"
              />
            </Box>
          </ScrollView>
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
