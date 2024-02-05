import React from 'react';
import {
  View, FlatList, Text, Image, TouchableOpacity,
} from 'react-native';
import { trackClickSmartHintStore } from '../../../../zustand/useTrackClickSmartHint/useTrackClickSmartHint';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';

interface IData {
  id: string;
  image: string;
  name: string;
  price: number;
}

export function HomeShowcase() {
  const data: IData[] = [
    {
      id: '1',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '2',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '3',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '4',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '5',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
    {
      id: '6',
      image: 'https://lojausereserva.vtexassets.com/arquivos/ids/8409628-400-600',
      name: 'Camisa Reserva Linho',
      price: 84,
    },
  ];

  const renderItem = (item: IData) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={
        () => trackClickSmartHintStore.getState().onSendTrackClick(item.id, TrackPageTypeEnum.Home)
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
