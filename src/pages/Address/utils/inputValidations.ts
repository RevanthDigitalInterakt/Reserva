import * as Yup from 'yup';

enum FeedbackMessageEnum {
  MIN_INPUT_SIZE_2 = 'Minimo de 2 caracterers para esse campo',
  MIN_INPUT_SIZE_4 = 'Minimo de 4 caracterers para esse campo',
  MIN_INPUT_SIZE_8 = 'Mínimo de 8 caracterers para esse campo',
  MAX_INPUT_SIZE_6 = 'Máximo de 6 caracterers para esse campo',
  MAX_INPUT_SIZE_8 = 'Máximo de 8 caracterers para esse campo',
  MAX_INPUT_SIZE_30 = 'Máximo de 30 caracterers para esse campo',
  MAX_INPUT_SIZE_100 = 'Máximo de 100 caracterers para esse campo',
  REQUIRED_ADDRESS_SURNAME = 'Insira um apelido',
  REQUIRED_FULLNAME = 'Insira um nome',
  REQUIRED_POSTALCODE = 'Insira um CEP',
  INVALID_POSTALCODE = 'CEP Inválido',
  REQUIRED_STREET = 'Insira uma Rua',
  REQUIRED_NEIGHBORHOOD = 'Insira um Bairro',
  REQUIRED_CITY = 'Insira um Cidade',
  REQUIRED_NUMBER = 'Insira um número',
  REQUIRED_STATE = 'Insira um Estado',
}

export const addressSurnameSchema = Yup.string()
  .min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4)
  .max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30)
  .required(FeedbackMessageEnum.REQUIRED_ADDRESS_SURNAME);

export const fullNameSchema = Yup.string()
  .min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4)
  .max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30)
  .required(FeedbackMessageEnum.REQUIRED_FULLNAME);

export const addressNumberSchema = Yup.number()
  .integer()
  .positive()
  .required(FeedbackMessageEnum.REQUIRED_NUMBER);

export const postalCodeSchema = Yup.string()
  .min(0, FeedbackMessageEnum.MIN_INPUT_SIZE_8)
  .max(99999999, FeedbackMessageEnum.MAX_INPUT_SIZE_8)
  .required(FeedbackMessageEnum.REQUIRED_POSTALCODE);

export const streetSchema = Yup.string()
  .min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4)
  .max(100, FeedbackMessageEnum.MAX_INPUT_SIZE_100)
  .required(FeedbackMessageEnum.REQUIRED_STREET);

export const neighborhoodSchema = Yup.string()
  .min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4)
  .max(100, FeedbackMessageEnum.MAX_INPUT_SIZE_100)
  .required(FeedbackMessageEnum.REQUIRED_NEIGHBORHOOD);

export const complementSchema = Yup.string()
  .max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30);

export const addressStateSchema = Yup.string()
  .min(2, FeedbackMessageEnum.MIN_INPUT_SIZE_2)
  .max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30)
  .required(FeedbackMessageEnum.REQUIRED_STATE);

export const citySchema = Yup.string()
  .min(2, FeedbackMessageEnum.MIN_INPUT_SIZE_2)
  .max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30)
  .required(FeedbackMessageEnum.REQUIRED_CITY);
