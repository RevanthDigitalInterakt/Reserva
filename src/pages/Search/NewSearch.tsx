import React, { useEffect } from 'react';
import SearchInitialPage from './components/SearchInitialPage';
import SearchSuggestionsPage from './components/SearchSuggestionsPage';
import SearchResults from './components/SearchResultsPage';
import useSearchStore, { SearchStatusEnum } from '../../zustand/useSearchStore';
import SearchWrapper from './components/SearchWrapper';

function NewSearch() {
  const { status, initialized, onInit } = useSearchStore(['status', 'onInit', 'initialized']);

  useEffect(() => {
    onInit();

    return () => {
      onInit();
    };
  }, [onInit]);

  return initialized ? (
    <SearchWrapper>
      {status === SearchStatusEnum.INITIAL && (
        <SearchInitialPage />
      )}

      {status === SearchStatusEnum.SUGGESTIONS && (
        <SearchSuggestionsPage />
      )}

      {status === SearchStatusEnum.RESULT && (
        <SearchResults />
      )}
    </SearchWrapper>
  ) : null;
}

export default NewSearch;
