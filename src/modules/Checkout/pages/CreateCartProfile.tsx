import React, { useState, useRef, useEffect } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import { Formik, useFormik, useFormikContext } from 'formik';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Box,
  Button,
  TextField,
  Typography,
  theme,
} from '@danilomsou/reserva-ui';
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
  const [labelDocument, setLabelDocument] = useState(null);

  const [cpfInvalid, setCpfInvalid] = useState(false);
  const [validateNumber, setValidateNumber] = useState(true);

  const handleSubmit = () => {
    if (formRef.current) {
      const cpf = fields.document;

      cpfValid(cpf);
      if (!cpfInvalid && cpf.length > 0) {
        formRef.current.handleSubmit();
      }
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
      .required('Insira a data de nascimento.')
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        'Verifique a data de nascimento.'
      ),
    // document: Yup.string().required('Por favor, insira o seu cpf'),
    phone: Yup.string()
      .required('Por favor, insira o seu telefone')
      .matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9 \d|[2-9])\d{3})\-?(\d{4}))$/,
        'Verifique o número de telefone digitado.'
      ),
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

      if (!postalCode) {
        setLabelPostalCode(null);
      } else {
        ('CEP');
      }

      if (!street) {
        setValidateStreet(true);
        setLabelStreet(null);
      } else {
        setValidateStreet(false);
        setLabelStreet('Endereço');
      }

      if (!neighborhood) {
        setValidateNeighborhood(true);
        setLabelNeighborhood(null);
      } else {
        setValidateNeighborhood(false);
        setLabelNeighborhood('Bairro');
      }

      if (!city) {
        setLabelCity(null);
      } else {
        setLabelCity('Cidade');
      }

      if (!state) {
        setLabelState(null);
      } else {
        setLabelState('Estado');
      }

      setValidateNumber(false);

      setLoading(false);
    } else {
      setShowCepDescription(false);
    }
  };

  const cpfValid = async (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return setCpfInvalid(true);

    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return setCpfInvalid(true);
    let add = 0;
    let i = 0;
    let rev = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return setCpfInvalid(true);

    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return setCpfInvalid(true);

    return setCpfInvalid(false);
  };

  const saveCustomer = async (
    firstName: string,
    lastName: string,
    documentType: string,
    phone: string
  ) => {
    setLoading(true);

    // const { firstName, lastName, birthDate, document, documentType, phone,  } = fields;
    const { document } = fields;
    const isCustomerSave = await addCustomer({
      firstName,
      lastName,
      document: document,
      documentType,
      phone: phone,
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
                  phone,
                  document.replace(/[^\d]+/g, ''),
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
                    {/* <FormikTextInput
                      label="CPF"
                      field="document"
                      maskType="cpf"
                      keyboardType="number-pad"
                      placeholder="CPF"
                      style={{
                        borderColor: cpfInvalid
                          ? theme.colors.vermelhoAlerta
                          : theme.colors.transparente,
                        borderWidth: 0.8,
                      }}
                    />
                    {cpfInvalid && (
                      <Typography
                        fontFamily="nunitoRegular"
                        fontSize="13px"
                        color="vermelhoAlerta"
                      >
                        Verifique o CPF digitado.
                      </Typography>
                    )} */}
                    <TextField
                      label={labelDocument}
                      value={fields.document}
                      keyboardType="number-pad"
                      maskType="cpf"
                      onChangeText={(text) => {
                        setFields({ ...fields, document: text });

                        cpfValid(text);

                        if (!text) {
                          setLabelDocument(null);
                        } else {
                          setLabelDocument('CPF');
                        }
                      }}
                      placeholder="CPF"
                      error="Verifique o CPF digitado."
                      touched={cpfInvalid}
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
                            setValidateNumber(false);
                          } else {
                            setLabelNumber('Número');
                            setValidateNumber(true);
                          }
                        }}
                        label={labelNumber}
                        placeholder="Número"
                        touched={!validateNumber}
                        error="Por favor, insira o número."
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
                      editable={false}
                    />
                  </Box>

                  <Box mt={15} marginBottom={35}>
                    <TextField
                      editable={false}
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
        disabled={
          loading || validateNeighborhood || validateStreet || !validateNumber
        }
      />
    </SafeAreaView>
  );
};
