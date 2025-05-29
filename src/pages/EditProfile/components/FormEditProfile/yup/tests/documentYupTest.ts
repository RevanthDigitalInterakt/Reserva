import { TestConfig, TestContext } from 'yup';
import { AnyObject } from 'yup/lib/types';
import isValidCPF from '../../../../../../utils/CPFValidator';
import EditProfileDefaultErros from '../errors/defaultErrors';

const DOCUMENTTEST: TestConfig = {
  name: 'isValidDocument',
  test(currentDocument, context: TestContext<AnyObject>) {
    if (!currentDocument) return true;
    if (!isValidCPF(currentDocument as string)) {
      return context.createError({ message: EditProfileDefaultErros.customErros.document });
    }

    return true;
  },
};

export default DOCUMENTTEST;
