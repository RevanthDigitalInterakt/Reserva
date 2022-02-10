import React, { useState, useRef, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { Formik } from 'formik';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Button, TextField, Typography, theme } from 'reserva-ui';
import * as Yup from 'yup';

import { useCart } from '../../../context/CartContext';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { CepVerify } from '../../../services/vtexService';
import { FormikTextInput } from '../../../shared/components/FormikTextInput';
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';

interface CreateCartProfileProfile
  extends StackScreenProps<RootStackParamList, 'CreateCartProfile'> {}

export const CreateCartProfile: React.FC<CreateCartProfileProfile> = ({
  navigation,
}) => {
  const { addCustomer, addShippingData } = useCart();
  const formRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [showCepDescription, setShowCepDescription] = useState(false);
  const [validateNeighborhood, setValidateNeighborhood] = useState(false);
  const [validateStreet, setValidateStreet] = useState(false);
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    documentType: 'cpf',
    document: '',
    phone: '',
    postalCode: '',
    neighborhood: '',
    state: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    addressType: 'residential',
    country: 'BR',
    receiverName: '',
  });

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const validation = Yup.object().shape({
    firstName: Yup.string()
      .required('Insira seu nome.')
      .matches(
        /^[aA-zZ\s]+$/,
        'Apenas alfabetos são permitidos para este campo.'
      ),
    lastName: Yup.string()
      .required('Insira seu sobrenome.')
      .matches(
        /^[aA-zZ\s]+$/,
        'Apenas alfabetos são permitidos para este campo.'
      ),
    birthDate: Yup.string(),
    document: Yup.string().required('Por favor, insira o seu cpf'),
    phone: Yup.string().required('Por favor, insira o seu telefone'),
  });

  const cepHandler = async (postalCode: string) => {
    const isValidPostalCode = postalCode.length === 8;

    if (isValidPostalCode) {
      setLoading(true);
      const { street, neighborhood, city, state, cep, errors } =
        await CepVerify(postalCode);
      setShowCepDescription(!!cep);
      setFields({
        ...fields,
        postalCode,
        street,
        neighborhood,
        city,
        state,
        receiverName: fields.firstName,
      });

      if (!neighborhood) {
        setValidateNeighborhood(true);
      } else {
        setValidateNeighborhood(false);
      }

      if (!street) {
        setValidateStreet(true);
      } else {
        setValidateStreet(false);
      }

      setLoading(false);
    } else {
      setShowCepDescription(false);
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
      phone: phone.replace(/[^\d\+]+/g, ''),
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
        addressType: 'residential',
        country: 'BRA',
        complement,
        city,
        street,
      });
      setLoading(false);

      if (isAddressSaved) {
        navigation.navigate('DeliveryScreen');
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#ffffff' }} flex={1}>
      <TopBarDefaultBackButton loading={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Box mx={20}>
            <Box mt={49}>
              <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                Informe seus dados para continuar
              </Typography>
            </Box>
            <Box mt={20}>
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                Insira os dados do destinatário:
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
                  documentType,
                  document.replace(/[^\d]+/g, ''),
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
                  <Box
                    mt={10}
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box flex={1} marginRight="micro">
                      <FormikTextInput
                        label="Nome"
                        placeholder="Nome"
                        field="firstName"
                      />
                    </Box>

                    <Box flex={1}>
                      <FormikTextInput
                        label="Sobrenome"
                        placeholder="Sobrenome"
                        field="lastName"
                      />
                    </Box>
                  </Box>

                  <Box mt={15}>
                    <FormikTextInput
                      label="Data de Nascimento"
                      maskType="datetime"
                      placeholder="Data de Nascimento"
                      maskOptions={{
                        format: 'DD/MM/YYYY',
                      }}
                      field="birthDate"
                      keyboardType="number-pad"
                    />
                  </Box>

                  <Box mt={15}>
                    <FormikTextInput
                      label="CPF"
                      field="document"
                      maskType="cpf"
                      keyboardType="number-pad"
                      placeholder="CPF"
                    />
                  </Box>

                  <Box mt={15}>
                    <FormikTextInput
                      label="Telefone"
                      field="phone"
                      maskType="custom"
                      maskOptions={{
                        mask: '+55 (99) 9 9999-9999',
                      }}
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
                      label="CEP"
                      value={fields.postalCode}
                      keyboardType="number-pad"
                      maskType="zip-code"
                      onChangeText={(text) => {
                        setFields({ ...fields, postalCode: text });
                        cepHandler(text.replace('-', ''));
                      }}
                      placeholder="CEP"
                    />
                  </Box>
                  {/* <Box>
                    <Typography fontFamily="nunitoRegular" fontSize={13}>
                      {showCepDescription
                        ? `${fields.street} - ${fields.neighborhood}, ${fields.city} - ${fields.state}`
                        : ''}
                    </Typography>
                  </Box> */}

                  <Box mt={15}>
                    <TextField
                      label="Endereço"
                      value={fields.street}
                      onChangeText={(text) => {
                        setFields({ ...fields, street: text });

                        if (!text) {
                          setValidateStreet(true);
                        } else {
                          setValidateStreet(false);
                        }
                      }}
                      placeholder="Endereço"
                      error="Por favor, insira o endereço."
                      touched={validateStreet}
                    />
                  </Box>

                  <Box mt={15}>
                    <TextField
                      label="Bairro"
                      editable={true}
                      value={fields.neighborhood}
                      onChangeText={(text) => {
                        setFields({ ...fields, neighborhood: text });

                        if (!text) {
                          setValidateNeighborhood(true);
                        } else {
                          setValidateNeighborhood(false);
                        }
                      }}
                      placeholder="Bairro"
                      error=" Por favor, insira o bairro."
                      touched={validateNeighborhood}
                    />
                  </Box>

                  <Box
                    mt={15}
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box flex={1} marginRight="micro">
                      <TextField
                        value={fields.number}
                        keyboardType="number-pad"
                        onChangeText={(text) =>
                          setFields({ ...fields, number: text })
                        }
                        label="Número"
                        placeholder="Número"
                      />
                    </Box>

                    <Box flex={1}>
                      <TextField
                        value={fields.complement}
                        onChangeText={(text) =>
                          setFields({ ...fields, complement: text })
                        }
                        label="Complemento"
                        placeholder="Complemento"
                      />
                    </Box>
                  </Box>

                  <Box mt={15}>
                    <TextField
                      value={fields.city}
                      keyboardType="number-pad"
                      onChangeText={(text) =>
                        setFields({ ...fields, city: text })
                      }
                      label="Cidade"
                      placeholder="Cidade"
                    />
                  </Box>

                  <Box mt={15} marginBottom={35}>
                    <TextField
                      editable={false}
                      value={fields.state}
                      onChangeText={(text) =>
                        setFields({ ...fields, state: text })
                      }
                      label="Estado"
                      placeholder="Estado"
                    />
                  </Box>
                </>
              )}
            </Formik>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>

      <Button
        variant="primarioEstreito"
        onPress={handleSubmit}
        title="ESCOLHER TIPO DE ENTREGA"
        inline
        disabled={loading || validateNeighborhood || validateStreet}
      />
    </SafeAreaView>
  );
};
