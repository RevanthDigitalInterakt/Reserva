import React, { useState, useRef } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, TextField, Typography } from "reserva-ui";
import { CepResponse } from "../../../config/brasilApi";
import { useCart } from "../../../context/CartContext";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { CepVerify } from "../../../services/vtexService";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";

import * as Yup from "yup";
import { Formik } from "formik";
import { FormikTextInput } from "../../../shared/components/FormikTextInput";

interface CreateCartProfileProfile
  extends StackScreenProps<RootStackParamList, "CreateCartProfile"> { }

export const CreateCartProfile: React.FC<CreateCartProfileProfile> = ({
  navigation,
  route,
}) => {
  const { addCustomer, addShippingData, getCepData } = useCart();
  const formRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [showCepDescrption, setShowCepDescrption] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    documentType: "cpf",
    document: "",
    phone: "",
    postalCode: "",
    neighborhood: "",
    state: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    addressType: "residential",
    country: "BR",
    receiverName: "",
  });

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const validation = Yup.object().shape({
    firstName: Yup.string()
      .required("Insira seu nome.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Apenas alfabetos são permitidos para este campo."
      ),
    lastName: Yup.string()
      .required("Insira seu sobrenome.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Apenas alfabetos são permitidos para este campo."
      ),
    birthDate: Yup.string(),
    document: Yup.string().required("Por favor, insira o seu cpf"),
    phone: Yup.string().required("Por favor, insira o seu telefone"),
  });

  const cepHandler = async (postalCode: string) => {
    const isValidPostalCode = postalCode.length == 8;

    if (isValidPostalCode) {
      setLoading(true);
      const { street, neighborhood, city, state, cep, errors } =
        await CepVerify(postalCode);
      setShowCepDescrption(!!cep);
      setFields({
        ...fields,
        postalCode,
        street,
        neighborhood,
        city,
        state,
        receiverName: fields.firstName,
      });
      setLoading(false);
    } else {
      setShowCepDescrption(false);
    }
  };

  const saveCustomer = async (
    firstName: string,
    lastName: string,
    documentType: string,
    document: string,
    phone: string
  ) => {
    setLoading(true);
    // const { firstName, lastName, birthDate, document, documentType, phone,  } = fields;

    const isCustomerSave = await addCustomer({
      firstName,
      lastName,
      document,
      documentType,
      phone,
    });

    if (isCustomerSave) {
      // save address
      const receiverName = `${firstName} ${lastName}`;
      const {
        postalCode,
        state,
        number,
        neighborhood,
        complement,
        city,
        street,
      } = fields;

      const isAddressSaved = await addShippingData({
        postalCode,
        state,
        number,
        receiverName,
        neighborhood,
        addressType: "residential",
        country: "BRA",
        complement,
        city,
        street,
      });
      setLoading(false);

      if (isAddressSaved) {
        navigation.navigate("DeliveryScreen");
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }} flex={1}>
      <TopBarDefaultBackButton loading={loading} />
      <ScrollView>
        <Box mx={20}>
          <Box mt={49}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Informe seus dados para continuar
            </Typography>
          </Box>
          <Box mt={20}>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Insira os dados do destinatario
            </Typography>
          </Box>

          <Formik
            initialValues={fields}
            validationSchema={validation}
            innerRef={formRef}
            onSubmit={(values) => {
              const {
                firstName,
                lastName,
                birthDate,
                document,
                documentType,
                phone,
                postalCode,
                neighborhood,
                state,
                number,
                complement,
              } = values;
              saveCustomer(
                firstName,
                lastName,
                document.replace(/[^\d]+/g,''),
                documentType,
                phone,
                postalCode,
                neighborhood,
                state,
                number,
                complement
              );
            }}
          >
            {() => (
              <>
                <Box mt={10} flexDirection="row" justifyContent="space-between">
                  <Box flex={1} marginRight="micro">
                    <FormikTextInput placeholder="Nome" field={"firstName"} />
                  </Box>

                  <Box flex={1}>
                    <FormikTextInput
                      placeholder="Sobrenome"
                      field={"lastName"}
                    />
                  </Box>
                </Box>
                <Box mt={15}>
                  <FormikTextInput
                    maskType="datetime"
                    placeholder="Data de Nascimento"
                    maskOptions={{
                      format: "DD/MM/YYYY",
                    }}
                    field={"birthDate"}
                    keyboardType="number-pad"
                  />
                </Box>
                <Box mt={15}>
                  <FormikTextInput
                    field={"document"}
                    maskType="cpf"
                    keyboardType="number-pad"
                    placeholder="CPF"
                  />
                </Box>
                <Box mt={15}>
                  <FormikTextInput
                    field={"phone"}
                    maskType="cel-phone"
                    keyboardType="number-pad"
                    placeholder="Telefone"
                  />
                </Box>

                <Box mt={20}>
                  <Typography fontFamily="nunitoRegular" fontSize={15}>
                    Insira o endereço do destinatário:
                  </Typography>
                </Box>

                <Box mt={15}>
                  <TextField
                    value={fields.postalCode}
                    keyboardType='number-pad'
                    onChangeText={(text) => {
                      setFields({ ...fields, postalCode: text });
                      cepHandler(text);
                    }}
                    placeholder="CEP"
                  />
                </Box>
                <Box>
                  <Typography fontFamily="nunitoRegular" fontSize={13}>
                    {showCepDescrption
                      ? `${fields.street} - ${fields.neighborhood}, ${fields.city} - ${fields.state}`
                      : ""}
                  </Typography>
                </Box>
                <Box mt={15} flexDirection="row" justifyContent="space-between">
                  <Box flex={1} marginRight="micro">
                    <TextField
                      editable={false}
                      value={fields.neighborhood}
                      onChangeText={(text) =>
                        setFields({ ...fields, neighborhood: text })
                      }
                      placeholder="Bairro"
                    />
                  </Box>
                  <Box flex={1}>
                    <TextField
                      editable={false}
                      value={fields.state}
                      onChangeText={(text) =>
                        setFields({ ...fields, state: text })
                      }
                      placeholder="Estado"
                    />
                  </Box>
                </Box>
                <Box mt={15}>
                  <TextField
                    value={fields.number}
                    keyboardType='number-pad'
                    onChangeText={(text) =>
                      setFields({ ...fields, number: text })
                    }
                    placeholder="Numero"
                  />
                </Box>
                <Box mt={15} marginBottom={35}>
                  <TextField
                    value={fields.complement}
                    onChangeText={(text) =>
                      setFields({ ...fields, complement: text })
                    }
                    placeholder="Complemento"
                  />
                </Box>
              </>
            )}
          </Formik>
        </Box>
      </ScrollView>

      <Button
        variant="primarioEstreito"
        onPress={handleSubmit}
        title="ESCOLHER TIPO DE ENTREGA"
        inline
        disabled={loading}
      />
    </SafeAreaView>
  );
};
