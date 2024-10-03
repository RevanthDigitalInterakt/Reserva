import type { IRsvProduct } from '../pages/Home/components/HomeShowcase/HomeShowcase';

type ISliceData = {
  data: IRsvProduct[]
};

export const sliceData = (data: ISliceData['data'], sliceQuantity: number) => {
  const newArr = data.slice(0, sliceQuantity);

  return newArr;
};
