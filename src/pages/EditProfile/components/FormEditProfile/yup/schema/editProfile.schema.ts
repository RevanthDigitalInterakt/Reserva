import * as Yup from 'yup';
import EditProfileDefaultErros from '../errors/defaultErrors';
import DOCUMENTTEST from '../tests/documentYupTest';
import NAMETEST from '../tests/nameYupTest';
import BIRTHDATETEST from '../tests/birthDateYupTest';
import CELLPHONETEST from '../tests/cellPhoneYupTest';

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().test({ ...NAMETEST }).required(EditProfileDefaultErros.NAME),
  birthDate: Yup.string().test({ ...BIRTHDATETEST }).required(EditProfileDefaultErros.BIRTHDATE),
  cellPhone: Yup.string().test({ ...CELLPHONETEST }).required(EditProfileDefaultErros.CELLPHONE),
  document: Yup.string().test({ ...DOCUMENTTEST }).required(EditProfileDefaultErros.DOCUMENT),
  gender: Yup.string().required(EditProfileDefaultErros.GENDER),
});

export default EditProfileSchema;
