import * as Yup from 'yup';

export const isValidPassword = (text: string) => Yup.string()
  .required()
  .matches(/^(?=.{8,})/) // 8 caracteres
  .matches(/^(?=.*[A-Z])/) // pelo menos uma maiuscula
  .matches(/^(?=.*[a-z])/) // pelo menos uma minuscula
  .matches(/^(?=.*[0-9])/) // pelo menos um nuemro
  .isValidSync(text);

export const isValidEmail = (text: string) => Yup.string()
  .required().email().isValidSync(text.trim());
