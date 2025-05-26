import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import MostSearchedWords from '../MostSearchedWords';
import { News } from '../../../../modules/Search/components/News';
import useSearchStore from '../../../../zustand/useSearchStore';
import { usePageLoadingStore } from '../../../../zustand/usePageLoadingStore/usePageLoadingStore';

function SearchInitialPage() {
  const { onSearch, loading } = useSearchStore(['onSearch', 'loading']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loading, onFinishLoad, startLoadingTime]);

  return (
    <ScrollView>
      <MostSearchedWords
        onSelectTerm={(term) => {
          onSearch({ q: term, page: 1, facets: [] });
        }}
      />

      <News />
    </ScrollView>
  );
}

export default SearchInitialPage;
