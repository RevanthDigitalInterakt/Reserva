import React, { useEffect, useMemo, useState } from 'react';
import DiscountCodeModal from '../../../../modules/Home/component/DiscountCodeModal';
import { useHomeStore } from '../../../../zustand/useHomeStore';

function HomeDiscountModal() {
  const { discountBar } = useHomeStore(['discountBar']);
  const [isVisible, setVisible] = useState(false);

  const showBar = useMemo(() => (
    discountBar?.titleBar
  ), [discountBar?.titleBar]);

  useEffect(() => {
    setVisible(!!showBar);
  }, [showBar]);

  if (!showBar) {
    return null;
  }

  return (
    <DiscountCodeModal
      data={{
        coupon: discountBar?.coupon || '',
        colorButton: discountBar?.colorButton || '',
        titleButton: discountBar?.titleButton || '',
        descriptionModal: discountBar?.descriptionModal || '',
        shareMessage: discountBar?.shareMessage || '',
        titleModal: discountBar?.titleModal || '',
        colorBar: discountBar?.colorBar || '',
        titleBar: discountBar?.titleBar || '',
      }}
      isVisible={isVisible}
      onClose={() => setVisible(false)}
    />
  );
}

export default HomeDiscountModal;
