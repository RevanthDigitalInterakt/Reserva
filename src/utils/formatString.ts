interface IAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

const address = ({
  street,
  number,
  complement,
  neighborhood,
  city,
  state,
}: IAddress): string => {
  if (!complement) {
    return `${street}, ${number}, ${neighborhood}, ${city} - ${state}`;
  }
  return `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`;
};

export default { address };
