import type { TestConfig, TestContext } from 'yup';
import type { AnyObject } from 'yup/lib/types';
import EditProfileDefaultErros from '../errors/defaultErrors';

const REGEX_FOR_VALIDATION_BIRTH_DATE = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);

const BIRTHDATETEST: TestConfig = {
  name: 'isVAlidBirthDate',
  test(currentBirthDate, context: TestContext<AnyObject>) {
    if (!currentBirthDate) return true;

    if (!REGEX_FOR_VALIDATION_BIRTH_DATE.test(currentBirthDate as string)) {
      return context.createError({ message: EditProfileDefaultErros.customErros.birthDate });
    }

    return true;
  },
};

export default BIRTHDATETEST;
