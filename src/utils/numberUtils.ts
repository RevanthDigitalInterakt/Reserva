export const integerPart = (num: number) => Math.floor(num);

export const decimalPart = (num: number) => (`${num?.toFixed(2)}`).split('.')[1] || '';
