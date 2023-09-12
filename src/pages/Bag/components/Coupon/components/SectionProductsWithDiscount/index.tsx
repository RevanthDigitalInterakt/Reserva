import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useBagCouponItemsWithDiscount } from '../../../../../../zustand/useBagCouponItemsWithDiscount/useBagCouponItemsWithDiscount';

type TProductData = {
  id: string;
  productName: string;
};

export default function SectionProductsWithDiscount() {
  const { setShowModalItems, productItems } = useBagCouponItemsWithDiscount(['setShowModalItems', 'productItems']);

  const newArr: TProductData[] = productItems.slice(0, 2);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontFamily: 'ReservaSans-Regular', fontSize: 16 }}>O desconto </Text>
        <Text style={{ fontFamily: 'ReservaSans-Regular', fontWeight: 'bold', fontSize: 14 }}>foi aplicado </Text>
        <Text style={{ fontFamily: 'ReservaSans-Regular', fontSize: 16 }}>aos seguintes itens:</Text>
      </View>

      {newArr.map((item, index) => (
        <View key={item.id}>
          <View
            style={{
              borderWidth: 1,
              borderColor: index > 0 ? '#bbbbbb' : '#D7D7D7',
              paddingHorizontal: 15,
              marginVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: index > 0 ? 0.6 : 1,
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 1,
                backgroundColor: index > 0 ? '#bbbbbb' : '#e5e5e5',
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
        </View>
      ))}

      <LinearGradient
        colors={['rgba(255, 255, 255, 0.5)', '#fff', '#fff']}
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          top: 115,
          width: '100%',
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setShowModalItems(true)}>
          <Text style={{ textDecorationLine: 'underline' }}>Veja Mais</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
