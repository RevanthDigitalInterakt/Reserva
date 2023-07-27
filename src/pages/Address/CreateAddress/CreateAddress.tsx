import React, {
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import InputForm from '../components/InputForm';
import ModalCancelCreateAddress from '../components/ModalCancelCreateAddress';

import styles from './CreateAddress.styles';

import {
  addressNumberSchema,
  addressStateSchema,
  addressSurnameSchema,
  citySchema,
  complementSchema,
  fullNameSchema,
  neighborhoodSchema,
  postalCodeSchema,
  streetSchema,
} from '../utils/inputValidations';

import type { IAddressData } from './types/ICreateAddress';
import { useProfileAddressMutation } from '../../../base/graphql/generated';
import EventProvider from '../../../utils/EventProvider';
import { CepVerifyPostalCode } from '../../../services/vtexService';
import type { CheckPostalCodeFn } from '../components/InputForm/types/IInputForm';

const createAddressSchema = Yup.object().shape({
  addressSurname: addressSurnameSchema,
  fullname: fullNameSchema,
  addressNumber: addressNumberSchema,
  postalCode: postalCodeSchema,
  street: streetSchema,
  neighborhood: neighborhoodSchema,
  complement: complementSchema,
  addressState: addressStateSchema,
  city: citySchema,
});

export default function CreateAddress(): JSX.Element {
  const { goBack } = useNavigation();

  const inputSurnameRef = useRef<TextInput>(null);
  const inputFullnameRef = useRef<TextInput>(null);
  const inputCEPRef = useRef<TextInput>(null);
  const inputAddressRef = useRef<TextInput>(null);
  const inputNeighborRef = useRef<TextInput>(null);
  const inputNumberRef = useRef<TextInput>(null);
  const inputComplementRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);
  const [isMainAddress, setIsMainAddress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const switchMainAddress = () => setIsMainAddress(!isMainAddress);

  const [profileAddress] = useProfileAddressMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const checkPostalCode = useCallback<CheckPostalCodeFn>(async (value, setFieldValue) => {
    if (value.length < 8) return;

    try {
      const {
        city,
        neighborhood,
        state,
        street,
      } = await CepVerifyPostalCode(value);

      setFieldValue('city', city);
      setFieldValue('neighborhood', neighborhood);
      setFieldValue('addressState', state);
      setFieldValue('street', street);
    } catch (error) {
      EventProvider.captureException(error);
    }
  }, []);

  const handleCreateAddress = useCallback(async (addressValues: IAddressData) => {
    const {
      addressNumber,
      addressState,
      addressSurname,
      city,
      complement,
      fullname,
      neighborhood,
      postalCode,
      street,
    } = addressValues;

    setLoading(true);

    try {
      await profileAddress(
        {
          variables: {
            input: {
              city,
              country: 'Brasil',
              neighborhood,
              number: addressNumber,
              postalCode,
              receiverName: fullname,
              state: addressState,
              street,
              addressName: addressSurname,
              complement,
              mainAddress: isMainAddress,
            },
          },
        },
      );

      goBack();
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setLoading(false);
    }
  }, [goBack, isMainAddress, profileAddress]);

  const modalController = useCallback((actionType: string) => {
    if (actionType === 'cancel') {
      setModalVisible(!modalVisible);
      goBack();
      return;
    }

    setModalVisible(!modalVisible);
  }, [goBack, modalVisible]);

  const checkFilledInput = useCallback((values: IAddressData) => {
    const valuesExists = Object.keys(values).some((x) => values[x] !== '');

    if (valuesExists) {
      modalController('open');
      return;
    }

    goBack();
  }, [goBack, modalController]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={goBack}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.content}>
          <Text>Adicionar endereço</Text>
        </View>

        <View style={styles.content}>
          <Text>Os campos a seguir são obrigatórios então lembre-se de preencher todos eles.</Text>
        </View>

        <Formik
          initialValues={{
            addressSurname: '',
            fullname: '',
            postalCode: '',
            street: '',
            neighborhood: '',
            addressNumber: '',
            complement: '',
            addressState: '',
            city: '',
          }}
          onSubmit={(values) => handleCreateAddress(values)}
          validationSchema={createAddressSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldTouched,
            setFieldValue,
          }) => (
            <>
              <View style={styles.content}>
                <InputForm
                  placeholder="*Digite um apelido para este endereço"
                  onTextChange={handleChange('addressSurname')}
                  inputValue={values.addressSurname}
                  inputRef={inputSurnameRef}
                  nextInputRef={inputFullnameRef}
                  inputName="addressSurname"
                  fieldTouched={() => setFieldTouched('addressSurname')}
                  error={errors.addressSurname}
                  isEditable
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Digite seu nome completo"
                  onTextChange={handleChange('fullname')}
                  inputValue={values.fullname}
                  inputRef={inputFullnameRef}
                  nextInputRef={inputCEPRef}
                  inputName="fullname"
                  fieldTouched={() => setFieldTouched('fullname')}
                  error={errors.fullname}
                  isEditable
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Digite seu CEP"
                  onTextChange={handleChange('postalCode')}
                  inputValue={values.postalCode}
                  inputRef={inputCEPRef}
                  nextInputRef={inputAddressRef}
                  inputName="postalCode"
                  fieldTouched={() => setFieldTouched('postalCode')}
                  error={errors.postalCode}
                  isEditable
                  textInputType="number-pad"
                  checkPostalCode={checkPostalCode}
                  setFieldValue={setFieldValue}
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Digite sua Rua"
                  onTextChange={handleChange('street')}
                  inputValue={values.street}
                  inputRef={inputAddressRef}
                  nextInputRef={inputNeighborRef}
                  inputName="street"
                  fieldTouched={() => setFieldTouched('street')}
                  error={errors.street}
                  isEditable
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Digite seu bairro"
                  onTextChange={handleChange('neighborhood')}
                  inputValue={values.neighborhood}
                  inputRef={inputNeighborRef}
                  nextInputRef={inputNumberRef}
                  inputName="neighborhood"
                  fieldTouched={() => setFieldTouched('neighborhood')}
                  error={errors.neighborhood}
                  isEditable
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Número"
                  onTextChange={handleChange('addressNumber')}
                  inputValue={values.addressNumber}
                  inputRef={inputNumberRef}
                  nextInputRef={inputComplementRef}
                  inputName="addressNumber"
                  fieldTouched={() => setFieldTouched('addressNumber')}
                  error={errors.addressNumber}
                  isEditable
                  textInputType="number-pad"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="Complemento"
                  onTextChange={handleChange('complement')}
                  inputValue={values.complement}
                  inputRef={inputComplementRef}
                  nextInputRef={inputComplementRef}
                  inputName="complement"
                  fieldTouched={() => {}}
                  error={errors.complement}
                  isEditable
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Para preencher o Estado, digite o CEP acima"
                  onTextChange={handleChange('addressState')}
                  inputValue={values.addressState}
                  fieldTouched={() => setFieldTouched('addressState')}
                  error={errors.addressState}
                  inputRef={inputComplementRef}
                  nextInputRef={inputComplementRef}
                  inputName="addressState"
                  isEditable={false}
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Para preencher a Cidade, digite o CEP acima"
                  onTextChange={handleChange('city')}
                  inputValue={values.city}
                  fieldTouched={() => setFieldTouched('city')}
                  error={errors.city}
                  inputRef={inputComplementRef}
                  nextInputRef={inputComplementRef}
                  inputName="city"
                  isEditable={false}
                  textInputType="default"
                />
              </View>

              <View style={styles.content}>
                <View style={styles.contentRow}>
                  <Text style={styles.labelMainAddress}>Tornar este o meu endereço padrão</Text>

                  <Switch
                    trackColor={{ false: '#767577', true: '#31B94F' }}
                    thumbColor={isMainAddress ? '#ffffff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={switchMainAddress}
                    value={isMainAddress}
                  />
                </View>
              </View>

              <View style={styles.content}>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.actionButtonSubmit}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.textActionButtonSubmit}>salvar endereço</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.content}>
                <TouchableOpacity
                  onPress={() => checkFilledInput(values)}
                  style={styles.actionButtonCancel}
                >
                  <Text style={styles.textActionButtonCancel}>cancelar</Text>
                </TouchableOpacity>
              </View>
              { modalVisible && (
                <ModalCancelCreateAddress
                  showModal={modalVisible}
                  modalController={modalController}
                />
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}
