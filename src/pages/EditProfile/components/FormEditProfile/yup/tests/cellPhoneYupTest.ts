import { TestConfig, TestContext } from 'yup';
import { AnyObject } from 'yup/lib/types';
import EditProfileDefaultErros from '../errors/defaultErrors';

const RegexForValidationMaskCellPhone = new RegExp(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9 \d|[2-9])\d{3})\-?(\d{4}))$/);
const RegexForValidationCellPhone = new RegExp(/^(?:(?:\+|00)?(55)\s?)(\d{11})$/);

const maxLengthCellPhoneDontUseMask: number = 14 as const;

const CELLPHONETEST: TestConfig = {
  name: 'isValidCellPhone',
  test(currentCellPhone, context: TestContext<AnyObject>) {
    if (!currentCellPhone) return true;

    if ((currentCellPhone as string).length === maxLengthCellPhoneDontUseMask) {
      if (!RegexForValidationCellPhone.test((currentCellPhone as string))) {
        return context.createError({ message: EditProfileDefaultErros.customErros.cellPhone });
      } return true;
    }

    if (!(currentCellPhone as string).match(RegexForValidationMaskCellPhone)) {
      return context.createError({ message: EditProfileDefaultErros.customErros.cellPhone });
    }

    return true;
  },
};

export default CELLPHONETEST;
