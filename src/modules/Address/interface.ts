export interface IAddress {
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  postalCode: string;
  receiverName: string;
  state: string;
  street: string;
  addressType?: string;
  country: string;
}

export interface IEditAddress extends IAddress {
  id: string;
  receiverName: string;

}

export interface IProfileData {
  addresses: IAddress[];
  birthDate: null;
  customFields: Object[][];
  document: string;
  email: string;
  firstName: string
  gender: string,
  homePhone: string
  lastName: string
  payments: null,
  userId: string
}
