export enum NearbyStoresTypes {
  LOAD_REQUEST = '@nearbyStores/LOAD_REQUEST',
  LOAD_SUCCESS = '@nearbyStores/LOAD_SUCCESS',
  LOAD_FAILURE = '@nearbyStores/LOGIN_FAILURE',
}

export interface NearbyStores {
  storeID: string;
  storeName: string;
  takeOutInStore: boolean;
  shippingTimeInDays: number;
  latitude: string;
  longitude: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  telephoneNumber1: string;
  emailAddress: string;
  brand: string;
}

export interface NearbyStoresResponse {
  stores: NearbyStores[];
}

export interface NearbyStoresState {
  data: NearbyStoresResponse;
  loading: boolean;
  error: boolean;
}
