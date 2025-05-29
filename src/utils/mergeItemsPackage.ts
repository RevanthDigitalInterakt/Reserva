import type { IBagStore } from '../zustand/useBagStore/types/bagStore';

export const mergeItemsPackage = (packageItems: IBagStore['packageItems']) => packageItems.map((subPackage) => subPackage.items.map((item) => item)).flat();
