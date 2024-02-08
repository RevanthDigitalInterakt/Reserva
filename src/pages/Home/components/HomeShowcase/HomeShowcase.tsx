import React from 'react';
import {
  View, FlatList, Text, Image, TouchableOpacity,
} from 'react-native';
import { trackClickStore, type IData } from '../../../../zustand/useTrackClickStore/useTrackClickStore';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';

interface IMockData {
  id: string;
  image: string;
  name: string;
  price: number;
  productId: string;
  identifier: string;
}

export function HomeShowcase() {
  const data: IMockData[] = [
    {
      id: '1670215',
      productId: '1670215',
      image: 'https://lojausereservaqa.vteximg.com.br/arquivos/ids/782287-300-300/0081662040_03.jpg?v=638283167831030000',
      name: 'Camisa Reserva Linho',
      price: 84,
      identifier: 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p',
    },
    {
      id: '2',
      productId: '1670215',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
      identifier: 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p',
    },
    {
      id: '3',
      productId: '1670215',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
      identifier: 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p',
    },
    {
      id: '4',
      productId: '1670215',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
      identifier: 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p',
    },
    {
      id: '5',
      productId: '1670215',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      identifier: 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p',
      price: 84,
    },
    {
      id: '6',
      productId: '1670215',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
      identifier: 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p',
    },
  ];

  const newData: IData = {
    identifier: data[0]?.identifier || '',
    productId: data[0]?.productId || '',
  };

  const renderItem = (item: IMockData) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={
        () => trackClickStore.getState().onTrackClick(newData, 'lojausereservaqa.myvtex.com/termocolante-reserva-pl-090821-teste/p', TrackPageTypeEnum.Home)
      }
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 150,
          height: 200,
        }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        horizontal
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}
