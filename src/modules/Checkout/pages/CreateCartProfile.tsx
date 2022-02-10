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

  // State labels
  const [labelNeighborhood, setLabelNeighborhood] = useState(null);
  const [labelPostalCode, setLabelPostalCode] = useState(null);
  const [labelState, setLabelState] = useState(null);
  const [labelCity, setLabelCity] = useState(null);
  const [labelNumber, setLabelNumber] = useState(null);
  const [labelStreet, setLabelStreet] = useState(null);
  const [labelComplement, setLabelComplement] = useState(null);

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
    birthDate: Yup.string()
      .required('Insira a data de nascimento')
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        'Digite uma data válida.'
      ),
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

  useEffect(() => {
    console.log('FIELDS::::::::>', fields);
  }, [fields]);

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
              validateOnChange={true}
              validateOnBlur={true}
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
                      label={labelPostalCode}
                      value={fields.postalCode}
                      keyboardType="number-pad"
                      maskType="zip-code"
                      onChangeText={(text) => {
                        setFields({ ...fields, postalCode: text });
                        cepHandler(text.replace('-', ''));

                        if (!text) {
                          setLabelPostalCode(null);
                        } else {
                          setLabelPostalCode('CEP');
                        }
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
                      label={labelStreet}
                      value={fields.street}
                      onChangeText={(text) => {
                        setFields({ ...fields, street: text });

                        if (!text) {
                          setValidateStreet(true);
                          setLabelStreet(null);
                        } else {
                          setValidateStreet(false);
                          setLabelStreet('Endereço');
                        }
                      }}
                      placeholder="Endereço"
                      error="Por favor, insira o endereço."
                      touched={validateStreet}
                    />
                  </Box>

                  <Box mt={15}>
                    <TextField
                      label={labelNeighborhood}
                      editable={true}
                      value={fields.neighborhood}
                      onChangeText={(text) => {
                        setFields({ ...fields, neighborhood: text });

                        if (!text) {
                          setValidateNeighborhood(true);
                          setLabelNeighborhood(null);
                        } else {
                          setValidateNeighborhood(false);
                          setLabelNeighborhood('Bairro');
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
                        onChangeText={(text) => {
                          setFields({ ...fields, number: text });

                          if (!text) {
                            setLabelNumber(null);
                          } else {
                            setLabelNumber('Número');
                          }
                        }}
                        label={labelNumber}
                        placeholder="Número"
                      />
                    </Box>

                    <Box flex={1}>
                      <TextField
                        value={fields.complement}
                        onChangeText={(text) => {
                          setFields({ ...fields, complement: text });
                          if (!text) {
                            setLabelComplement(null);
                          } else {
                            setLabelComplement('Complemento');
                          }
                        }}
                        label={labelComplement}
                        placeholder="Complemento"
                      />
                    </Box>
                  </Box>

                  <Box mt={15}>
                    <TextField
                      value={fields.city}
                      keyboardType="number-pad"
                      onChangeText={(text) => {
                        setFields({ ...fields, city: text });
                        if (!text) {
                          setLabelCity(null);
                        } else {
                          setLabelCity('Cidade');
                        }
                      }}
                      label={labelCity}
                      placeholder="Cidade"
                    />
                  </Box>

                  <Box mt={15} marginBottom={35}>
                    <TextField
                      editable={true}
                      value={fields.state}
                      onChangeText={(text) => {
                        setFields({ ...fields, state: text });
                        if (!text) {
                          setLabelState(null);
                        } else {
                          setLabelState('Estado');
                        }
                      }}
                      label={labelState}
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
