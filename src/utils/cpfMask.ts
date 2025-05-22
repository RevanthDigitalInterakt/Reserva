export const cpfMask = (value: string) => {
  if (value.length <= 14) {
    const newValue = value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2');
    return newValue;
  }

  return '';
};
