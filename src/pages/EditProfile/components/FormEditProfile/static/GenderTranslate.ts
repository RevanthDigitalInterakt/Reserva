import type { TGender } from '../components/GenderInput/GenderInput';

export type TGenderEngKeys = 'male' | 'female' | 'genderqueer' | 'other';
export type TGenderPTKeys = 'Homem' | 'Mulher' | 'Não binário' | 'Outro';
const genderEngToPt: Record<TGenderEngKeys, TGender> = {
  male: 'Homem',
  female: 'Mulher',
  genderqueer: 'Não binário',
  other: 'Outro',
} as const;

const genderPtToEng: Record<TGenderPTKeys, TGenderEngKeys> = {
  'Não binário': 'genderqueer',
  Homem: 'male',
  Outro: 'other',
  Mulher: 'female',
};
export { genderEngToPt, genderPtToEng };
