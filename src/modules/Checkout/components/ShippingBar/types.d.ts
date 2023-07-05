export interface IPropsShippingBar {
  loading: boolean;
  totalDelivery: number;
  totalOrder: number;
  sumPriceShipping: number;
  isPrime: boolean;
}

export interface IPropsShippingMessage {
  freeShippingValue: number;
  sumPriceShipping: number;
  sumPrice: number;
  isPrime: boolean;
}
