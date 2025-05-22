import type { IFormEditProfileSchema } from '../interfaces/formEditProfile';

const FormEditProfileInitialValues: IFormEditProfileSchema = {
  gender: null,
  userId: '',
  email: '',
  document: '',
  birthDate: '',
  cellPhone: '',
  name: '',
  profileImage: {
    uri: undefined,
    name: '',
    type: '',
    initialFilePath: undefined,
  },
  newsLetter: false,
};

export { FormEditProfileInitialValues };
