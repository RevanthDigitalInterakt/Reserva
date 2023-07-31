import React from 'react';
import { ScrollView } from 'react-native';
import MostSearchedWords from '../MostSearchedWords';
import { News } from '../../../../modules/Search/components/News';
import useSearchStore from '../../../../zustand/useSearchStore';

function SearchInitialPage() {
  const { onSearch } = useSearchStore(['onSearch']);

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
