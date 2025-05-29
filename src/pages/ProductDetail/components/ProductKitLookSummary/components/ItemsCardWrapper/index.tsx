import React, {
  useCallback, useEffect, useState,
} from 'react';
import { View } from 'react-native';

import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';

import ItemsCard, { type ISelectedItem } from '../ItemsCard';
import { useBagStore } from '../../../../../../zustand/useBagStore/useBagStore';

function ItemsCardWrapper() {
  const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
  const { kit, setSelectedKitItems } = useProductDetailStore(['kit', 'setSelectedKitItems']);
  const { orderFormId } = useBagStore(['orderFormId']);

  const onSetInitialItems = useCallback(() => {
    const tempArr: ISelectedItem[] = [];

    kit?.map((item, index) => {
      const [color] = item.colors;
      const [size] = color?.sizes || [];

      tempArr.push({
        checked: false,
        productId: item.productId,
        colorId: color?.colorId || '',
        itemId: size?.itemId || '',
        size: size?.size || '',
        seller: size?.seller || '',
        price: size?.currentPrice || 0,
        index,
      });

      return item;
    });

    setSelectedItems(tempArr);
  }, [kit]);

  useEffect(() => {
    if (kit?.length) {
      onSetInitialItems();
    }
  }, [kit]);

  const updatedSelectedKitItems = useCallback(async () => {
    const itemsSelected = selectedItems.filter((item) => item.checked);

    const itemsTotalizer = itemsSelected.reduce((acc, value) => acc + value.price, 0);

    const orderItems = itemsSelected.map((newItemSelected) => ({
      id: newItemSelected.itemId,
      seller: newItemSelected.seller,
      quantity: 1,
    }));

    setSelectedKitItems({
      orderFormId,
      orderItems,
    }, itemsTotalizer);
  }, [selectedItems, orderFormId]);

  useEffect(() => { updatedSelectedKitItems(); }, [selectedItems]);

  return (
    <View>
      {kit?.map((item, i) => {
        if (!selectedItems[i]) {
          return null;
        }

        return (
          <ItemsCard
            key={item.productId}
            item={item}
            selectedItem={selectedItems[i]!}
            onSelectItem={(updatedItem) => {
              const tempArr = [...selectedItems];
              tempArr[i] = updatedItem;
              setSelectedItems(tempArr);
            }}
          />
        );
      })}
    </View>
  );
}

export default ItemsCardWrapper;
