import { platformType } from './platformType';

type TGetBehaviorValue = 'padding' | 'height';
type TOS = 'ios' | 'android' | 'windows' | 'macos' | 'web';
export const getBehaviorValue = (platform: TOS): TGetBehaviorValue => {
  if (platform !== platformType.IOS) return 'height';
  return 'padding';
};
