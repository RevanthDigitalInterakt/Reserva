import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import NewSearch from '../../../pages/Search';
import { SearchScreen } from './Search';
import { useIsTester } from '../../../hooks/useIsTester';

type Props = StackScreenProps<RootStackParamList, 'SearchScreen'>;

export const SearchABTest: React.FC<Props> = (props) => {
  const { getBoolean } = useRemoteConfig();
  const isTester = useIsTester();

  const showNewSearch = useMemo(() => (
    getBoolean(isTester ? 'show_new_search_tester' : 'show_new_search')
  ), [getBoolean, isTester]);

  return (
    showNewSearch ? <NewSearch {...props} /> : <SearchScreen {...props} />
  );
};
