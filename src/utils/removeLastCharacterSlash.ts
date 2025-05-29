export const removeLastCharacterSlash = (value: string) => {
  if (value[value.length - 1] === '/') {
    return value.slice(0, -1);
  }
  return value;
};
