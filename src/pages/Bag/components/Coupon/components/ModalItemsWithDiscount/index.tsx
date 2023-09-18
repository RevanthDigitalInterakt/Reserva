import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TProductData, useBagCouponItemsWithDiscount } from '../../../../../../zustand/useBagCouponItemsWithDiscount/useBagCouponItemsWithDiscount';
import IconClose from '../../../../../../../assets/icons/IconClose';
import styles from './ModalItemsWIthDiscount.styles';

export default function ModalItemsWithDiscount() {
  const { showModalItems, setShowModalItems, productItems } = useBagCouponItemsWithDiscount(['showModalItems', 'setShowModalItems', 'productItems']);

  const renderItemList = (item: TProductData) => (
    <View style={styles.modalItemContainer}>
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
        style={styles.modalItemTitle}
      >
        {item.productName}
      </Text>
    </View>
  );

  return (
    <Modal animationType="slide" transparent visible={showModalItems}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Descontos do Pedido</Text>
            <TouchableOpacity onPress={() => setShowModalItems(false)}>
              <IconClose />
            </TouchableOpacity>
          </View>

          <View style={styles.modalRow}>
            <Text style={[styles.modalSubTitle, { fontSize: 16 }]}>O desconto </Text>
            <Text style={[styles.modalSubTitle, { fontWeight: 'bold', fontSize: 14 }]}>foi aplicado </Text>
            <Text style={[styles.modalSubTitle, { fontSize: 16 }]}>aos seguintes itens:</Text>
          </View>

          <View style={styles.modalDivider} />

          <FlatList
            data={productItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItemList(item)}
          />
        </View>
      </View>
    </Modal>
  );
}
