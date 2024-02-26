import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { trackClickStore, type IData } from '../../../../zustand/useTrackClickStore/useTrackClickStore';
import { TrackPageTypeEnum } from '../../../../base/graphql/generated';
import { Drawer } from '../../../../components/Drawer';
import { useShelfStore } from '../../../../zustand/useShelfStore/useShelfStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface IMockData {
  id: string;
  image: string;
  name: string;
  price: number;
  productId: string;
  identifier: string;
}

export function HomeShowcase() {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemRender, setItemRender] = useState<IMockData>({
    id: '',
    identifier: '',
    image: '',
    name: '',
    price: 0,
    productId: '',
  });

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

  const modalController = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const handleClickItem = useCallback((item: IMockData) => {
    modalController();
    setItemRender(item);
  }, [modalVisible]);

  const renderItem = (item: IMockData) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={
        () => handleClickItem(item)
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
      <Modal visible={modalVisible} transparent animationType="fade">
        <View
          onPress={() => modalController}
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0 , 0.6)' }}
        >
          <View style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 250,
            padding: 20,
          }}
          >
            <Text>{itemRender.name}</Text>
            <Text>ola mundo</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
