export function createTokenExpireDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  return date.getTime();
}
