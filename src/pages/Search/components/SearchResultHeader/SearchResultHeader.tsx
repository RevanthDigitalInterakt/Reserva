import React, { useState } from 'react';
import { View } from 'react-native';

import type { SearchOrderByEnum, SearchProductFacetInput } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Picker } from '../../../../components/Picker/Picker';
import { Typography } from '../../../../components/Typography/Typography';
import useSearchStore from '../../../../zustand/useSearchStore';
import FilterModal from '../../../../components/FilterModal';
import { orderByTypes } from './SearchResultHeader.helper';

interface SearchResultHeaderProps {
  defaultFacets?: SearchProductFacetInput[];
}
function SearchResultHeader({ defaultFacets } : SearchResultHeaderProps) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const { onSearch } = useSearchStore(['onSearch', 'parameters']);

  return (
    <View>
      <Box paddingY="micro" flexDirection="row" justifyContent="center">
        <Box width={1 / 2}>
          <Button
            onPress={() => setFilterVisible(true)}
            marginRight="nano"
            marginLeft="micro"
            borderRadius="nano"
            borderColor="dropDownBorderColor"
            borderWidth="hairline"
            flexDirection="row"
            inline
            height={40}
          >
            <Typography color="preto" fontFamily="nunitoSemiBold" fontSize="14px">
              Filtrar
            </Typography>
          </Button>
        </Box>

        <Box width={1 / 2}>
          <Button
            marginRight="micro"
            marginLeft="nano"
            borderRadius="nano"
            borderColor="dropDownBorderColor"
            borderWidth="hairline"
            flexDirection="row"
            inline
            height={40}
            onPress={() => setSortVisible(true)}
          >
            <Typography color="preto" fontFamily="nunitoSemiBold" fontSize="14px">
              Ordenar
            </Typography>
          </Button>
        </Box>
      </Box>

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        defaultFacets={defaultFacets}
      />

      <Picker
        onSelect={(item: { value: SearchOrderByEnum }) => {
          setSortVisible(false);
          onSearch({ orderBy: item.value });
        }}
        isVisible={sortVisible}
        items={orderByTypes}
        onAndroidBackButtonPress={() => setSortVisible(false)}
        onClose={() => setSortVisible(false)}
        onBackDropPress={() => setSortVisible(false)}
        title="Ordenar Por"
      />
    </View>
  );
}

export default SearchResultHeader;
