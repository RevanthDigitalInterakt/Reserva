import type { Dispatch, SetStateAction } from 'react';

export type IParamsComponent = {
  onClose(): void;
  isVisible: boolean;
  loadingAddCart: boolean;
  setAnimationBag: Dispatch<SetStateAction<boolean>>;
  setLoadingAddCart: Dispatch<SetStateAction<boolean>>;
};
