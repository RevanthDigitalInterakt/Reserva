import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useBagCouponItemsWithDiscount } from '../../../../../../zustand/useBagCouponItemsWithDiscount/useBagCouponItemsWithDiscount';
import IconClose from '../../../../../../../assets/icons/IconClose';

export default function ModalItemsWithDiscount() {
  const { showModalItems, setShowModalItems, productItems } = useBagCouponItemsWithDiscount(['showModalItems', 'setShowModalItems', 'productItems']);

  return (
    <Modal animationType="slide" transparent visible={showModalItems}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            height: '60%',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: 'ReservaSerif-Bold', fontSize: 24 }}>Descontos do Pedido</Text>
            <TouchableOpacity onPress={() => setShowModalItems(false)}>
              <IconClose />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'ReservaSans-Regular', fontSize: 16 }}>O desconto </Text>
            <Text style={{ fontFamily: 'ReservaSans-Regular', fontWeight: 'bold', fontSize: 14 }}>foi aplicado </Text>
            <Text style={{ fontFamily: 'ReservaSans-Regular', fontSize: 16 }}>aos seguintes itens:</Text>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#d7d7d7', marginVertical: 20 }} />

          <FlatList
            data={productItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#D7D7D7',
                  paddingHorizontal: 15,
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 1,
                    backgroundColor: '#e5e5e5',
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#000000',
                    fontFamily: 'ReservaSans-Bold',
                    textTransform: 'uppercase',
                    margin: 10,
                    padding: 10,
                  }}
                >
                  {item.productName}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
