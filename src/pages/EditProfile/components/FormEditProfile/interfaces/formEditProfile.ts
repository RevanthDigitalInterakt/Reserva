import type { IFile } from '../../ModalChangeFile/ChangeFileModal';
import type { TGender } from '../components/GenderInput/GenderInput';

interface IFormEditProfileSchema {
  userId: string
  profileImage: IFile,
  name: string,
  email: string,
  document: string,
  gender: TGender | null,
  birthDate: string,
  cellPhone: string,
  newsLetter: boolean,
}

export type { IFormEditProfileSchema };
