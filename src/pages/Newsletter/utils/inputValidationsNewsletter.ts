import * as Yup from 'yup';

enum FeedbackMessageEnum {
  MIN_INPUT_SIZE_2 = 'Minimo de 2 caracterers para esse campo',
  MIN_INPUT_SIZE_12 = 'O telefone deve ter mais ou igual a 11 números',
  MAX_INPUT_SIZE_30 = 'Máximo de 30 caracterers para esse campo',
  REQUIRED_FULL_NAME = 'Insira um nome',
  REQUIRED_EMAIL = 'Insira seu e-mail',
  VALID_EMAIL = 'Insira um e-mail válido',
  PHONE_NUMBER = 'Preencha seu telefone com: (DDD) telefone',
}

export const nameSchema = Yup.string()
  .min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_2)
  .max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30)
  .required(FeedbackMessageEnum.REQUIRED_FULL_NAME);

export const emailSchema = Yup.string()
  .email(FeedbackMessageEnum.VALID_EMAIL)
  .required(FeedbackMessageEnum.REQUIRED_EMAIL);

export const phoneNumberSchema = Yup.string()
  .min(11, FeedbackMessageEnum.MIN_INPUT_SIZE_12)
  .required(FeedbackMessageEnum.PHONE_NUMBER);
