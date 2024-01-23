import React, {
  useCallback, useEffect, useState,
} from 'react';
import { View } from 'react-native';

import { useProductDetailStore } from '../../../../../../zustand/useProductDetail/useProductDetail';

import ItemsCard, { type ISelectedItem } from '../ItemsCard';

function ItemsCardWrapper() {
  const [selectedItems, setSelectedItems] = useState<ISelectedItem[]>([]);
  const { kit } = useProductDetailStore(['kit']);

  const onSetInitialItems = useCallback(() => {
    const tempArr: ISelectedItem[] = [];

    kit?.map((item) => {
      const [color] = item.colors;
      const [size] = color?.sizes || [];

      tempArr.push({
        checked: false,
        productId: item.productId,
        colorId: color?.colorId || '',
        itemId: size?.itemId || '',
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
