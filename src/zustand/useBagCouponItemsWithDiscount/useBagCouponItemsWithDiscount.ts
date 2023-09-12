import { create } from 'zustand';
import { createZustandStoreWithSelectors } from '../../utils/createZustandStoreWithSelectors';

type TProductData = {
  id: string;
  productName: string;
};

interface IBagCouponItemsWithDiscount {
  showModalItems: boolean;
  setShowModalItems: (state: boolean) => void;
  productItems: TProductData[];
}

export const bagCouponItemsWithDiscount = create<IBagCouponItemsWithDiscount>((_set) => ({
  showModalItems: false,
  productItems: [
    {
      id: '0',
      productName: 'Camiseta Notificação Reserva',
    },
    {
      id: '1',
      productName: 'Camiseta Reserva Mini Brasa Pica-Pau Bordado',
    },
    {
      id: '2',
      productName: 'Camiseta Indigo com Bolso',
    },
    {
      id: '3',
      productName: 'Camiseta Pica Pau Bordado Neon',
    },
    {
      id: '4',
      productName: 'Camiseta Masculino Dia dos Pais',
    },
    {
      id: '5',
      productName: 'Camiseta Maneira',
    },
    {
      id: '6',
      productName: 'Camiseta Bem Legal',
    },
  ],
  setShowModalItems: (state) => {
    _set({ showModalItems: state });
  },
}));

export const
  useBagCouponItemsWithDiscount = createZustandStoreWithSelectors(bagCouponItemsWithDiscount);
