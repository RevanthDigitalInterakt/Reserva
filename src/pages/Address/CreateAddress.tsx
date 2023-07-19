/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import InputForm from './components/InputForm';

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
} from './utils/inputValidations';

export interface IAddressData {
  addressSurname: string;
  fullname: string;
  postalCode: string;
  street: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;
  addressState: string;
  city: string
}

//  TODO
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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const [addressData, setAddressData] = useState<IAddressData>({
    addressSurname: '',
    fullname: '',
    postalCode: '',
    street: '',
    neighborhood: '',
    addressNumber: '',
    complement: '',
    addressState: '',
    city: '',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={goBack}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <Text>Adicionar endereço</Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text>Os campos a seguir são obrigatórios então lembre-se de preencher todos eles.</Text>
        </View>

        <Formik
          initialValues={addressData}
          onSubmit={(values) => console.log('values', values)}
          validationSchema={createAddressSchema}
        >
          {({ handleChange, handleSubmit, values, errors, touched, setFieldTouched }) => (
            <>
              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="*Digite um apelido para este endereço"
                  onTextChange={handleChange('addressSurname')}
                  inputValue={values.addressSurname}
                  inputRef={inputSurnameRef}
                  nextInputRef={inputFullnameRef}
                  inputName="addressSurname"
                  fieldTouched={() => setFieldTouched('addressSurname')}
                  error={errors.addressSurname}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="*Digite seu nome completo"
                  onTextChange={handleChange('fullname')}
                  inputValue={values.fullname}
                  inputRef={inputFullnameRef}
                  nextInputRef={inputCEPRef}
                  inputName="fullname"
                  fieldTouched={() => setFieldTouched('fullname')}
                  error={errors.fullname}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="*Digite seu CEP"
                  onTextChange={handleChange('postalCode')}
                  inputValue={values.postalCode}
                  inputRef={inputCEPRef}
                  nextInputRef={inputAddressRef}
                  inputName="postalCode"
                  fieldTouched={() => setFieldTouched('postalCode')}
                  error={errors.postalCode}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="*Digite sua Rua"
                  onTextChange={handleChange('street')}
                  inputValue={values.street}
                  inputRef={inputAddressRef}
                  nextInputRef={inputNeighborRef}
                  inputName="street"
                  fieldTouched={() => setFieldTouched('street')}
                  error={errors.street}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="*Digite seu bairro"
                  onTextChange={handleChange('neighborhood')}
                  inputValue={values.neighborhood}
                  inputRef={inputNeighborRef}
                  nextInputRef={inputNumberRef}
                  inputName="neighborhood"
                  fieldTouched={() => setFieldTouched('neighborhood')}
                  error={errors.neighborhood}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="*Número"
                  onTextChange={handleChange('addressNumber')}
                  inputValue={values.addressNumber}
                  inputRef={inputNumberRef}
                  nextInputRef={inputComplementRef}
                  inputName="addressNumber"
                  fieldTouched={() => setFieldTouched('addressNumber')}
                  error={errors.addressNumber}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <InputForm
                  placeholder="Complemento"
                  onTextChange={handleChange('complement')}
                  inputValue={values.complement}
                  inputRef={inputComplementRef}
                  nextInputRef={inputComplementRef}
                  inputName="complement"
                  fieldTouched={() => {}}
                  error={errors.complement}
                />
              </View>

              <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#656565', fontWeight: '700' }}>Tornar este o meu endereço padrão</Text>

                  <Switch
                    trackColor={{ false: '#767577', true: '#31B94F' }}
                    thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>

              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: '#333333',
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: '#ffffff', textTransform: 'uppercase' }}>salvar endereço</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginVertical: 10 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffffff',
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    borderColor: '#333333',
                  }}
                >
                  <Text style={{ color: '#333333', textTransform: 'uppercase', fontWeight: '700' }}>cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        {/* <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Para preencher o Estado, digite o CEP acima"
            onTextChange={() => {}}
            inputValue=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Para preencher a Cidade, digite o CEP acima"
            onTextChange={() => {}}
            inputValue=""
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
