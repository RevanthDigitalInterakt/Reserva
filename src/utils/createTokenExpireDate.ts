export function createTokenExpireDate() {
  const date = new Date();
  date.setHours(date.getHours() + 12);

  return date.getTime();
}
