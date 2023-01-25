export const stringToReal = (value: string | undefined | null) => {
  if (!value) {
    return '';
  }
  const valueWithDot = `${value?.slice(0, value.length - 2)}.${value?.slice(-2)}`;
  const number = Number(valueWithDot).toFixed(2).split('.');
  number[0] = `R$ ${number[0]?.split(/(?=(?:...)*$)/).join('.')}`;

  const formatted = number.join(',');

  if (formatted === 'R$ NaN') {
    return '';
  }

  return number.join(',');
};
