import type { IFile } from '../../ModalChangeFile/ChangeFileModal';
import type { TGender } from '../components/GenderInput/GenderInput';

interface IFormEditProfileSchema {
  id: string
  profileImage: IFile,
  name: string,
  document: string,
  gender: TGender | null,
  birthDate: string,
  cellPhone: string,
  newsLetter: boolean,
}

export type { IFormEditProfileSchema };
