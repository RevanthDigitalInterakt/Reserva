export function removeNonNumbers(str?: string) {
  return (str || '').replace(/[^0-9]/gi, '');
}
