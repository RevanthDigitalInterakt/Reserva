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
  Keyboard,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import type { StackScreenProps } from '@react-navigation/stack';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import InputForm from '../../../components/InputForm';
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

import type { ICreateAddress } from './interface/ICreateAddress';
import { useCepLazyQuery, useProfileAddressMutation } from '../../../base/graphql/generated';
import type { TCheckPostalCodeFn } from '../../../components/InputForm/interface/IInputForm';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { COLORS } from '../../../base/styles/colors';
import { postalCodeMask } from '../../../utils/postalCodeMask';
import testProps from '../../../utils/testProps';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';

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
  { navigation, route }: TCreateAddressProps,
): JSX.Element {
  const { profile } = useAuthStore(['profile']);

  const mainAddress = profile?.customFields?.find((item) => item?.cacheId === 'mainAddressId')?.value;
  const addressData = profile?.addresses.find((address) => address?.id === route.params?.id);

  const inputSurnameRef = useRef<TextInput>(null);
  const inputFullnameRef = useRef<TextInput>(null);
  const inputCEPRef = useRef<TextInput>(null);
  const inputAddressRef = useRef<TextInput>(null);
  const inputNeighborRef = useRef<TextInput>(null);
  const inputNumberRef = useRef<TextInput>(null);
  const inputComplementRef = useRef<TextInput>(null);
  const inputStateRef = useRef<TextInput>(null);
  const inputCityRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);
  const [isMainAddress, setIsMainAddress] = useState(mainAddress === route.params?.id || false);
  const [modalVisible, setModalVisible] = useState(false);

  const switchMainAddress = () => setIsMainAddress(!isMainAddress);

  const { actions } = useBagStore(['actions']);

  const [profileAddress] = useProfileAddressMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const [getCep] = useCepLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const checkPostalCode = useCallback<TCheckPostalCodeFn>(async (value, setFieldValue) => {
    if (value.length < 8) return;

    const newValue = postalCodeMask(value);

    setFieldValue('postalCode', newValue);

    try {
      const {
        data,
      } = await getCep({
        variables: {
          input: {
            cep: value,
          },
        },
      });

      if (data) {
        setFieldValue('city', data?.cep?.city);
        setFieldValue('neighborhood', data?.cep?.neighborhood);
        setFieldValue('addressState', data?.cep?.state);
        setFieldValue('street', data?.cep?.street);
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "checkPostalCode - CreateAddress.tsx");
    }
  }, [getCep]);

  const verifyAddressNameField = useCallback((addressSurname: string): boolean => {
    const addressExists = profile?.addresses.find(
      (address) => address?.addressName === addressSurname,
    );

    if (addressExists) {
      Alert.alert('Erro', 'Já existe um endereço com o apelido digitado.');
      return true;
    }

    return false;
  }, []);

  const handleCreateAddress = useCallback(async (addressValues: ICreateAddress) => {
    try {
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

      if (loading) return;

      Keyboard.dismiss();
      const response = verifyAddressNameField(addressSurname);

      if (response) return;

      setLoading(true);

      await profileAddress(
        {
          variables: {
            input: {
              ...(route.params?.id ? { addressId: route.params?.id } : {}),
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
      await actions.REFRESH_ORDER_FORM();
      await actions.REFETCH_ORDER_FORM();
    } catch (error) {
      ExceptionProvider.captureException(
        error, 
        "handleCreateAddress - CreateAddress.tsx", 
        {
          id: route.params?.id || "",
          isMainAddress: (JSON.stringify(isMainAddress) || ""),
        });
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  }, [loading, route.params?.id, profileAddress, isMainAddress, navigation]);

  const modalController = useCallback((actionType?: string) => {
    if (actionType && actionType === 'cancel') {
      setModalVisible(!modalVisible);
      navigation.goBack();
      return;
    }

    setModalVisible(!modalVisible);
  }, [navigation, modalVisible]);

  const checkFilledInput = useCallback((values: ICreateAddress) => {
    const valuesExists = Object.values(values).some((value) => value !== '');

    if (valuesExists) {
      modalController();
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
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>Adicionar endereço</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Os campos a seguir são obrigatórios então lembre-se de preencher todos eles.
          </Text>
        </View>

        <Formik
          initialValues={{
            addressSurname: addressData?.addressName || '',
            fullname: addressData?.receiverName || '',
            postalCode: addressData?.postalCode || '',
            street: addressData?.street || '',
            neighborhood: addressData?.neighborhood || '',
            addressNumber: addressData?.number || '',
            complement: addressData?.complement || '',
            addressState: addressData?.state || '',
            city: addressData?.city || '',
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
                  inputID={testProps('com.usereserva:id/create_address_input_surname')}
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
                  inputID={testProps('com.usereserva:id/create_address_input_fullname')}
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
                  inputID={testProps('com.usereserva:id/create_address_input_postal_code')}
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
                  inputID={testProps('com.usereserva:id/create_address_input_street')}
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
                  inputID={testProps('com.usereserva:id/create_address_input_neighborhood')}
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
                  textInputType="default"
                  inputID={testProps('com.usereserva:id/create_address_input_address_number')}
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
                  fieldTouched={() => { }}
                  error={errors.complement}
                  isEditable
                  textInputType="default"
                  inputID={testProps('com.usereserva:id/create_address_input_complement')}
                />
              </View>

              <View style={styles.content}>
                <InputForm
                  placeholder="*Para preencher o Estado, digite o CEP acima"
                  onTextChange={handleChange('addressState')}
                  inputValue={values.addressState}
                  fieldTouched={() => setFieldTouched('addressState')}
                  error={errors.addressState}
                  inputRef={inputStateRef}
                  nextInputRef={inputCityRef}
                  inputName="addressState"
                  isEditable={values.postalCode !== '' && values.addressState === ''}
                  textInputType="default"
                  inputID={testProps('com.usereserva:id/create_address_input_address_state')}
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
                  inputRef={inputCityRef}
                  inputName="city"
                  isEditable={values.postalCode !== '' && values.city === ''}
                  textInputType="default"
                  inputID={testProps('com.usereserva:id/create_address_input_city')}
                  touched={touched.city}
                />
              </View>

              <View style={styles.content}>
                <View style={styles.contentRow}>
                  <Text style={styles.labelMainAddress}>Tornar este o meu endereço padrão</Text>

                  <Switch
                    trackColor={{ false: COLORS.SWITCH_INACTIVE, true: COLORS.SWITCH_ACTIVE }}
                    thumbColor={
                      isMainAddress ? COLORS.SWITCH_THUMB_ACTIVE : COLORS.SWITCH_THUMB_INACTIVE
                    }
                    ios_backgroundColor={COLORS.SWITCH_BACKGROUND_COLOR_IOS}
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
                    <ActivityIndicator size="small" color={COLORS.WHITE} />
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
              {modalVisible && (
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
