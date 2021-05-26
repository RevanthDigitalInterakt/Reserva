export enum ShippingMethodTypes {
  LOAD_REQUEST = '@shippingMethod/LOAD_REQUEST',
  LOAD_SUCCESS = '@shippingMethod/LOAD_SUCCESS',
  LOAD_FAILURE = '@shippingMethod/LOGIN_FAILURE',
}

export interface ShippingMethod {
  shippingCost: number;
  shippingTax: string;
  shippingTotal: number;
  internationalDutiesTaxesFees: string;
  eligibleForProductWithSurcharges: boolean;
  deliveryDays: number;
  estimatedDeliveryDateGuaranteed: boolean;
  estimatedDeliveryDate: Date;
  displayName: string;
  carrierId: string;
  taxcode: string;
  currency: string;
}

export interface ShippingMethodResponse {
  quoteId: string;
  shippingMethods: ShippingMethod[];
}

export interface ShippingMethodState {
  data: ShippingMethodResponse;
  loading: boolean;
  error: boolean;
}
