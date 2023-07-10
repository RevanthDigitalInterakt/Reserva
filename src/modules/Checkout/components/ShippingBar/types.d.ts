export interface IPropsShippingBar {
  loading: boolean;
  totalDelivery: number;
  totalOrder: number;
  sumPriceShipping: number;
}

export interface IPropsShippingMessage {
  freeShippingValue: number;
  sumPriceShipping: number;
  sumPrice: number;
}
