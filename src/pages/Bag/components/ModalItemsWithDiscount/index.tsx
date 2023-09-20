import React, { useCallback } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useBagCouponItemsWithDiscount } from '../../../../zustand/useBagCouponItemsWithDiscount/useBagCouponItemsWithDiscount';
import IconClose from '../../../../../assets/icons/IconClose';
import styles from './ModalItemsWIthDiscount.styles';
import IconInfoFill from '../../../../../assets/icons/IconInfoFill';
import { COLORS } from '../../../../base/styles/colors';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

export type TItemData = {
  id: string;
  name: string;
  sellingPrice: number;
  itemColor: string;
  imageUrl?: string | null | undefined;
  imageSource: string;
};

export default function ModalItemsWithDiscount() {
  const { showModalItems, setShowModalItems } = useBagCouponItemsWithDiscount(['showModalItems', 'setShowModalItems']);

  const { marketingData, appTotalizers } = useBagStore(['marketingData', 'appTotalizers']);

  const splitDecimalNumber = (value: number) => (`${value?.toFixed(2)}`)?.split('.')[1];

  const splitIntegerNumber = (numInteger: number) => (numInteger <= 0
    ? Math.ceil(numInteger)
    : Math.floor(numInteger));

  const renderItemList = (item: TItemData) => (
    <View style={styles.modalItemContainer}>
      <Image
        style={styles.modalItemMedia}
        source={{ uri: item.imageSource }}
        resizeMode="contain"
      />
      <Text
        numberOfLines={1}
        style={styles.modalItemTitle}
      >
        {item.name}
      </Text>
    </View>
  );

  const totalPriceItemsWithDiscount = useCallback(() => {
    const newValue = marketingData?.itemsWithCouponDiscount
      .reduce((acc, cur) => acc + cur.sellingPrice, 0);

    if (newValue) {
      const formattValue = newValue / 100;

      const decimalNumber = splitDecimalNumber(formattValue);
      const integerNumber = splitIntegerNumber(formattValue);

      return {
        decimalNumber,
        integerNumber,
      };
    }

    return {
      decimalNumber: 0,
      integerNumber: 0,
    };
  }, [marketingData?.itemsWithCouponDiscount]);

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
            testID="com.usereserva:id/list_items_with_discount"
            data={marketingData?.itemsWithCouponDiscount}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItemList(item)}
          />

          <View style={styles.modalFooter}>
            <View style={styles.modalRow}>
              <IconInfoFill />
              <Text style={styles.modalFooterTextInfo}>
                Os demais itens do carrinho já possuem um desconto
                maior ou não são elegíveis para este desconto!
              </Text>
            </View>

            <View style={styles.modalDivider} />

            <View style={styles.modalFooterRow}>
              <View>
                <Text style={styles.modalFooterTitle}>
                  Produtos elegíveis
                </Text>
                <View style={styles.modalRow}>
                  <Text style={[styles.modalFooterLabel, {
                    textDecorationLine: 'line-through',
                  }]}
                  >
                    R$
                    {' '}
                    {totalPriceItemsWithDiscount().integerNumber}
                    ,
                  </Text>
                  <View style={{ alignSelf: 'flex-start' }}>
                    <Text
                      style={
                        [
                          styles.modalFooterLabel,
                          { fontSize: 10, textDecorationLine: 'line-through' },
                        ]
                      }
                    >
                      {totalPriceItemsWithDiscount().decimalNumber}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.modalFooterTitle}>
                  Descontos de cupom
                </Text>
                <View style={styles.modalFooterLabelAlignment}>
                  <View style={styles.modalRow}>
                    <Text style={[styles.modalFooterLabel, {
                      color: COLORS.SWITCH_ACTIVE,
                    }]}
                    >
                      R$
                      {' '}
                      {splitIntegerNumber(appTotalizers.discount).toString().replace('-', '')}
                      ,
                    </Text>
                    <View style={{ alignSelf: 'flex-start' }}>
                      <Text
                        style={
                          [
                            styles.modalFooterLabel,
                            { fontSize: 10, color: COLORS.SWITCH_ACTIVE },
                          ]
                        }
                      >
                        {splitDecimalNumber(appTotalizers.discount)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
