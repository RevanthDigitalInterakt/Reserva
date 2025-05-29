import type { IFormEditProfileSchema } from '../pages/EditProfile/components/FormEditProfile/interfaces/formEditProfile';
import { genderPtToEng } from '../pages/EditProfile/components/FormEditProfile/static/GenderTranslate';

export interface IUserDataUpload {
  firstName: string;
  lastName: string;
  document: string;
  birthDate: string;
  homePhone: string;
  gender: string;
}

const generatePayloadToUploadUserData = (
  userData: IFormEditProfileSchema,
): IUserDataUpload => {
  const splittedBirthDate = userData.birthDate?.split('/');
  const [firstName, ...rest] = userData.name?.trim()?.split(' ');

  return {
    firstName: firstName!,
    lastName: rest?.join(' '),
    document: userData?.document?.replace(/[^\d]+/g, '') || '',
    birthDate: splittedBirthDate?.reverse()?.join('-'),
    homePhone: userData?.cellPhone?.replace(/[^\d+]+/g, ''),
    gender: genderPtToEng[userData?.gender!] || '',
  };
};

interface ICustonFields {
  key: string;
  value: string
}

interface IGenerateCustonFieldsParans {
  subscribed: boolean,
  profileImage: string,
  userAcceptTerms: boolean
}

const generateCustonFieldsToPayloadUserData = ({
  userAcceptTerms,
  profileImage,
  subscribed,
}: IGenerateCustonFieldsParans): Array<ICustonFields> => [
  {
    key: 'isNewsletterOptIn',
    value: `${subscribed}`,
  },
  {
    key: 'documentType',
    value: 'cpf',
  },
  {
    key: 'profileImagePath',
    value: `${profileImage}`,
  },
  {
    key: 'userAcceptedTerms',
    value: `${userAcceptTerms}`,
  },
];

export { generatePayloadToUploadUserData, generateCustonFieldsToPayloadUserData };
