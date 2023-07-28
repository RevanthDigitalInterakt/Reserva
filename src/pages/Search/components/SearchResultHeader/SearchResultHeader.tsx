import React, { useState } from 'react';
import { View } from 'react-native';
import { Box, Picker, Typography } from '@usereservaapp/reserva-ui';
import { Button } from '../../../../components/Button';
import useSearchStore from '../../../../zustand/useSearchStore';
import FilterModal from '../FilterModal';
import { orderByTypes } from './SearchResultHeader.helper';
import type { SearchOrderByEnum } from '../../../../base/graphql/generated';

const SHOW_FILTER_BUTTON = false;

function SearchResultHeader() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const { onSearch, parameters } = useSearchStore(['onSearch', 'parameters']);

  return (
    <View>
      <Box paddingY="micro" flexDirection="row" justifyContent="center">
        {!!SHOW_FILTER_BUTTON && (
          <Box width={1 / 2}>
            <Button
              onPress={() => {
                if (parameters.facets.length) {
                  return;
                }

                setFilterVisible(true);
              }}
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
                {parameters.facets.length ? 'Limpar Filtros' : 'Filtrar'}
              </Typography>
            </Button>
          </Box>
        )}

        <Box width={SHOW_FILTER_BUTTON ? 1 / 2 : 1}>
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
        onUpdateFacets={console.log}
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        // setFilterRequestList={setFilterRequestList}
        // filterList={filterList}
        // setFilterList={setFilterList}
        // isVisible={filterVisible}
        // colors={colorsfilters}
        // sizes={sizefilters}
        // categories={categoryfilters}
        // priceRange={priceRangefilters}
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
