const isValidCPF = (currentCPF: string): boolean => {
  const strippedCPF = currentCPF.replace(/\D/g, '');

  if (!/^\d{11}$/.test(strippedCPF)) return false;

  const checkDigits = strippedCPF.substring(9);
  let checkSum = 0;
  for (let i = 0; i < 9; i += 1) {
    checkSum += parseInt(strippedCPF.charAt(i), 10) * (10 - i);
  }

  let checkFirstDigit = checkSum % 11;
  checkFirstDigit = checkFirstDigit < 2 ? 0 : 11 - checkFirstDigit;
  if (checkFirstDigit !== parseInt(checkDigits.charAt(0), 10)) return false;

  checkSum = 0;
  for (let i = 0; i < 10; i += 1) {
    checkSum += parseInt(strippedCPF.charAt(i), 10) * (11 - i);
  }

  let checkSecoundDigit = checkSum % 11;
  checkSecoundDigit = checkSecoundDigit < 2 ? 0 : 11 - checkSecoundDigit;
  if (checkSecoundDigit !== parseInt(checkDigits.charAt(1), 10)) return false;

  return true;
};

export default isValidCPF;
