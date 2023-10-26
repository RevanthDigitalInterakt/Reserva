import React, { useEffect, useState } from 'react';

import { Box } from '../../../../components/Box/Box';
import { SearchBar } from '../../../../components/SearchBar/SearchBar';
import useDebounce from '../../../../hooks/useDebounce';
import { TopBarDefaultBackButton } from '../../../../modules/Menu/components/TopBarDefaultBackButton';
import useSearchStore, { SearchStatusEnum } from '../../../../zustand/useSearchStore';

interface ISearchWrapper {
  children: React.ReactNode;
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

  const debouncedValue = useDebounce({ value: searchTerm, delay: 400 });

  useEffect(() => {
    if (status !== SearchStatusEnum.RESULT && debouncedValue) {
      setStatus(SearchStatusEnum.SUGGESTIONS);
    }

    setQ(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setSearchTerm(parameters.q);
  }, [parameters.q, status]);

  return (
    <Box backgroundColor="white" flex={1}>
      <TopBarDefaultBackButton loading={loading} />

      <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
        <SearchBar
          value={searchTerm}
          onValueChange={setSearchTerm}
          onClickIcon={() => {
            onSearch({ q: debouncedValue || '', facets: [], page: 1 });
            return null;
          }}
          height={36}
          placeholder="Buscar"
        />
      </Box>

      {children}
    </Box>
  );
}

export default SearchWrapper;
