export const postalCodeMask = (value: string) => {
  if (value.length <= 8) {
    const newValue = value.replace(/(\d{5})(\d{3})/, '$1-$2');

    return newValue;
  }

  return '';
};
