export type IParamsComponent = {
  onClose(): void;
  isVisible: boolean;
  onModalHide?: () => void;
};
