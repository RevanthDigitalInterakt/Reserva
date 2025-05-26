interface IAddress {
  id: string;
  receiverName?: string | null,
  complement?: string | null,
  neighborhood?: string | null,
  country?: string | null,
  state?: string | null,
  number?: string | null,
  street?: string | null,
  postalCode?: string | null,
  city?: string | null,
  reference?: string | null,
  addressName?: string | null,
  addressType?: string | null
}

export interface IAddressData extends IAddress {
  selected: boolean;
}
