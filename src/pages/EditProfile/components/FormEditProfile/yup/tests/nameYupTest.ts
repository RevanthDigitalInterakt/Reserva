import type { TestConfig, TestContext } from 'yup';
import type { AnyObject } from 'yup/lib/types';
import EditProfileDefaultErros from '../errors/defaultErrors';

const REGEX_FOR_VALIDATION_NAME = new RegExp(/^[a-zA-ZÀ-ú]{2,}\s[a-zA-ZÀ-ú ']{2,}$/);

const NAMETEST: TestConfig = {
  name: 'isValidName',
  test(currentName, context: TestContext<AnyObject>) {
    if (!currentName) return true;
    if (!REGEX_FOR_VALIDATION_NAME.test(currentName as string)) {
      return context.createError({ message: EditProfileDefaultErros.customErros.name });
    }

    return true;
  },
};

export default NAMETEST;
