import React, { useEffect } from 'react';
import SearchInitialPage from './components/SearchInitialPage';
import SearchSuggestionsPage from './components/SearchSuggestionsPage';
import SearchResults from './components/SearchResultsPage';
import useSearchStore, { SearchStatusEnum, SearchType } from '../../zustand/useSearchStore';
import SearchWrapper from './components/SearchWrapper';
import EventProvider from '../../utils/EventProvider';

function NewSearch() {
  const {
    status,
    initialized,
    onInit,
  } = useSearchStore(['status', 'onInit', 'initialized']);

  useEffect(() => {
    EventProvider.logScreenViewEvent('/search');
    onInit(SearchType.SEARCH);

    return () => {
      onInit(SearchType.SEARCH);
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
