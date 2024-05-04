import React from 'react';
import ItemAbandonedCart from '../ItemAbandonedCart';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

function ItemsCardWrapper() {
  const { packageItems } = useBagStore(['packageItems']);

  const data = packageItems.map((item) => item.items);

  return data?.map((item, index) => (
    <ItemAbandonedCart
      key={index?.toString()}
      items={item}
    />
  ));
}

export default ItemsCardWrapper;
