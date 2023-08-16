import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import MostSearchedWords from '../MostSearchedWords';
import { News } from '../../../../modules/Search/components/News';
import useSearchStore from '../../../../zustand/useSearchStore';
import { usePageLoadingStore } from '../../../../zustand/usePageLoadingStore/usePageLoadingStore';

function SearchInitialPage() {
  const { onSearch, loading } = useSearchStore(['onSearch', 'loading']);
  const { onFinishLoad } = usePageLoadingStore(['onFinishLoad']);

  useEffect(() => {
    if (!loading) {
      onFinishLoad();
    }
  }, [loading, onFinishLoad]);

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
