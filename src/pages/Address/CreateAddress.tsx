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
import { useNavigation } from '@react-navigation/native';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import InputForm from './components/InputForm';

export interface IAddressData {
  addressSurname: string;
  fullname: string;
  cep: string;
  address: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;
  addressState: string;
  city: string
}

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
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [addressData, setAddressData] = useState<IAddressData>({
    addressSurname: '',
    fullname: '',
    cep: '',
    address: '',
    neighborhood: '',
    addressNumber: '',
    complement: '',
    addressState: '',
    city: '',
  });

  const getText = (value: string) => {
    setAddressData({
      ...addressData,
      addressSurname: value,
    });
  };

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

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Digite um apelido para este endereço"
            onTextChange={getText}
            inputValue={addressData.addressSurname}
            inputRef={inputSurnameRef}
            nextInputRef={inputFullnameRef}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Digite seu nome completo"
            onTextChange={() => {}}
            inputValue=""
            inputRef={inputFullnameRef}
            nextInputRef={inputCEPRef}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Digite seu CEP"
            onTextChange={() => {}}
            inputValue=""
            inputRef={inputCEPRef}
            nextInputRef={inputAddressRef}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Digite seu endereço"
            onTextChange={() => {}}
            inputValue=""
            inputRef={inputAddressRef}
            nextInputRef={inputNeighborRef}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Digite seu bairro"
            onTextChange={() => {}}
            inputValue=""
            inputRef={inputNeighborRef}
            nextInputRef={inputNumberRef}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Número"
            onTextChange={() => {}}
            inputValue=""
            inputRef={inputNumberRef}
            nextInputRef={inputComplementRef}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <InputForm
            placeholder="*Complemento"
            onTextChange={() => {}}
            inputValue=""
            inputRef={inputComplementRef}
            nextInputRef={inputComplementRef}
          />
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
