import type { IBagStore } from '../zustand/useBagStore/types/bagStore';

export const getSelectedDelivery = (packageItems: IBagStore['packageItems']) => {
  const [deliveryOption] = packageItems.map((subPackage) => {
    if (!!subPackage.metadata?.friendlyName && subPackage.metadata?.friendlyName !== 'Receba em Casa') {
      return ({
        type: 'Retire em loja',
        store: subPackage.metadata?.friendlyName,
      });
    }
    return null;
  }).filter(Boolean);

  return {
    type: deliveryOption?.type || 'Receba em casa',
    store: deliveryOption?.store || '',
  };
};
