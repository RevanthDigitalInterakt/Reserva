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
import type { StackScreenProps } from '@react-navigation/stack';
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
import type { RootStackParamList } from '../../../routes/StackNavigator';

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

type TCreateAddressProps = StackScreenProps<RootStackParamList, 'CreateAddress'>;

export default function CreateAddress(
  { navigation }: TCreateAddressProps,
): JSX.Element {
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

      navigation.goBack();
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setLoading(false);
    }
  }, [profileAddress, isMainAddress, navigation]);

  const modalController = useCallback((actionType: string) => {
    if (actionType === 'cancel') {
      setModalVisible(!modalVisible);
      navigation.goBack();
      return;
    }

    setModalVisible(!modalVisible);
  }, [navigation, modalVisible]);

  const checkFilledInput = useCallback((values: IAddressData) => {
    const valuesExists = Object.values(values).some((value) => value !== '');

    if (valuesExists) {
      modalController('open');
      return;
    }

    navigation.goBack();
  }, [navigation, modalController]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigation.goBack}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.content}>
          <Text style={{ fontFamily: 'ReservaSerif-Regular', fontSize: 24, color: '#000000' }}>Adicionar endereço</Text>
        </View>

        <View style={styles.content}>
          <Text style={{ fontFamily: 'ReservaSans-Regular', fontSize: 14 }}>Os campos a seguir são obrigatórios então lembre-se de preencher todos eles.</Text>
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
            touched,
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
                  inputID="com.usereserva:id/create_address_input_surname"
                  touched={touched.addressSurname}
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
                  inputID="com.usereserva:id/create_address_input_fullname"
                  touched={touched.fullname}
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
                  inputID="com.usereserva:id/create_address_input_postal_code"
                  touched={touched.postalCode}
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
                  inputID="com.usereserva:id/create_address_input_street"
                  touched={touched.street}
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
                  inputID="com.usereserva:id/create_address_input_neighborhood"
                  touched={touched.neighborhood}
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
                  inputID="com.usereserva:id/create_address_input_address_number"
                  touched={touched.addressNumber}
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
                  inputID="com.usereserva:id/create_address_input_complement"
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
                  inputID="com.usereserva:id/create_address_input_address_state"
                  touched={touched.addressState}
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
                  inputID="com.usereserva:id/create_address_input_city"
                  touched={touched.city}
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
                  testID="com.usereserva:id/create_address_button_submit"
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
                  testID="com.usereserva:id/create_address_button_cancel"
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
