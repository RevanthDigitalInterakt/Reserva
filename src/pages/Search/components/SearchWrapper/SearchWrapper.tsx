import React, { useEffect, useState } from 'react';

import { TextInput, View } from 'react-native';
import { Box } from '../../../../components/Box/Box';
import { SearchBar } from '../../../../components/SearchBar/SearchBar';
import { TopBarDefaultBackButton } from '../../../../modules/Menu/components/TopBarDefaultBackButton';
import useSearchStore, { SearchStatusEnum } from '../../../../zustand/useSearchStore';
import { COLORS } from '../../../../base/styles';

interface ISearchWrapper {
  children?: React.ReactNode;
}

export function isValidInput(input: string): boolean {
  return input.trim().length > 0;
}

export function formatInput(input: string): string {
  return input.trimStart();
}

function SearchWrapper({ children }: ISearchWrapper) {
  const {
    setQ,
    loading,
    onSearch,
    parameters,
    setStatus,
    status,
  } = useSearchStore(['loading', 'onSearch', 'parameters', 'setQ', 'setStatus', 'status']);

  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchTerm(term: string): null {
    if (isValidInput(term)) {
      if (status !== SearchStatusEnum.RESULT && term) {
        setStatus(SearchStatusEnum.SUGGESTIONS);
      }

      setQ(formatInput(term));
    }
    setSearchTerm(formatInput(term));
    return null;
  }

  function handleClickIcon(): null {
    if (isValidInput(searchTerm)) {
      onSearch({ q: searchTerm || '', facets: [], page: 1 });
    }
    return null;
  }

  useEffect(() => {
    setSearchTerm(parameters.q!);
  }, [parameters.q, status]);

  return (
    <Box backgroundColor="white" flex={1}>
      <TopBarDefaultBackButton loading={loading} />

      <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
        <SearchBar
          value={searchTerm}
          onValueChange={handleSearchTerm!}
          onClickIcon={handleClickIcon!}
          height={36}
          placeholder="Buscar"
        />
      </Box>

      {children}
    </Box>
  );
}

export default SearchWrapper;
