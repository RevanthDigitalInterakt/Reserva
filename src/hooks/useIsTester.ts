import { useMemo } from 'react';

import { useRemoteConfig } from './useRemoteConfig';
import { useAuthStore } from '../zustand/useAuth/useAuthStore';

export function useIsTester() {
  const { getObject } = useRemoteConfig();
  const { profile } = useAuthStore(['profile']);

  const isTester = useMemo(() => {
    const testers = getObject('EMAIL_TESTERS');

    return testers.includes(profile?.email || '');
  }, [getObject, profile?.email]);

  return isTester;
}
