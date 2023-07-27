export type IAddressData = {
  addressSurname: string;
  fullname: string;
  postalCode: string;
  street: string;
  neighborhood: string;
  addressNumber: string;
  complement: string;
  addressState: string;
  city: string
};

export type AddressDataKeys = keyof IAddressData;
