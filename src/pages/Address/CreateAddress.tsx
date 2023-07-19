import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';

interface IAddressData {
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
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={goBack}
      />
      <View style={{ padding: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <Text>Adicionar endereço</Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text>Os campos a seguir são obrigatórios então lembre-se de preencher todos eles.</Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <View style={{ borderWidth: 1, borderColor: '#656565', borderRadius: 5 }}>
            <TextInput
              placeholder="*Digite um apelido para este endereço"
              style={{ marginHorizontal: 10 }}
              onChangeText={(text: string) => setAddressData({
                ...addressData,
                addressSurname: text,
              })}
              value={addressData.addressSurname}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
