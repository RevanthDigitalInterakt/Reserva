import { ClientProfileData } from 'context/CartContext';

/**
 * @name isValidMinimalProfileData
 * @description Valida se o oderForm.clienteProfileData contem todos os campos minimos nescessarios para prosseguir
 * para o payment, assim evitando possiveis bugs futuros e telas sem renderizacao.
 * @param param ClientProfileData
 * @returns boolean
 */
const isValidMinimalProfileData = ({
  document,
  email,
  firstName,
  lastName,
  phone,
}: ClientProfileData): boolean => {
  if (!document || !email || !firstName || !phone || !lastName) return false;

  return true;
};

export { isValidMinimalProfileData };