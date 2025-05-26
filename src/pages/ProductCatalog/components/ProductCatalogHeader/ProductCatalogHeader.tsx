import React, { useCallback, useState } from 'react';
import { View, Linking } from 'react-native';
import type { SearchOrderByEnum, SearchProductFacetInput } from '../../../../base/graphql/generated';
import { orderByTypes } from '../../../Search/components/SearchResultHeader/SearchResultHeader.helper';
import EventProvider from '../../../../utils/EventProvider';
import FilterModal from '../../../../components/FilterModal/FilterModal';
import useSearchStore from '../../../../zustand/useSearchStore';

import testProps from '../../../../utils/testProps';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Typography } from '../../../../components/Typography/Typography';
import { Picker } from '../../../../components/Picker/Picker';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { styles } from './styles';

const SHOW_FILTER_BUTTON = true;

interface ProductCatalogHeaderProps {
  defaultFacets: SearchProductFacetInput[];
  showWhatsappButton?: boolean;
}

function ProductCatalogHeader(
  { defaultFacets, showWhatsappButton = true }: ProductCatalogHeaderProps,
) {
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const { resultCount } = useSearchStore(['resultCount', 'filters']);
  const {
    onSearch,
    parameters,
  } = useSearchStore(['onSearch', 'parameters']);

  const onClearFilters = useCallback(() => {
    onSearch(
      {
        page: 1,
        priceRange: undefined,
        facets: defaultFacets || [],
      },
      {
        categories: new Set(),
        sizes: new Set(),
        colors: new Set(),
        price: undefined,
      },
    );
  }, [defaultFacets, onSearch]);

  const onClickWhatsappButton = useCallback(async () => {
    EventProvider.logEvent('whatsapp_bar_click', {});
    await Linking.openURL('https://whts.co/reserva');
  }, []);

  const onClickFilterButton = useCallback(() => {
    setFilterVisible(true);
    EventProvider.logEvent('filter_button_click', {});
  }, []);

  const onClickSortButton = useCallback(() => {
    setSortVisible(true);
    EventProvider.logEvent('sort_button_click', {});
  }, []);

  return (
    <View style={styles.container}>
      {showWhatsappButton && (
        <Box bg="dropDownBorderColor">
          <Button
            p="nano"
            onPress={onClickWhatsappButton}
            {...testProps('com.usereserva:id/whatssapp_button_product_catalog')}
          >
            <Box flexDirection="row">
              <IconLegacy name="Whatsapp" size={16} color="preto" />
              <Box marginX="nano">
                <Typography
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontSize={11}
                >
                  Chama no Whats! Seja atendido sem sair de casa.
                  {' '}
                  <Typography style={{ textDecorationLine: 'underline' }}>
                    Clique aqui!
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Button>
        </Box>
      )}
      <Box paddingY="micro" flexDirection="row" justifyContent="center">
        <Box width={1 / 2}>
          <Button
            onPress={() => onClickFilterButton()}
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
            onPress={() => onClickSortButton()}
          >
            <Typography color="preto" fontFamily="nunitoSemiBold" fontSize="14px">
              Ordenar
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        paddingX="micro"
        paddingTop="quarck"
        paddingBottom="xxxs"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography fontFamily="nunitoRegular" fontSize="13px">
          {resultCount}
          {' '}
          produtos encontrados
        </Typography>
        {parameters.facets !== defaultFacets && (
          <Button
            {...testProps('com.usereserva:id/button_clear_product_catalog')}
            onPress={onClearFilters}
          >
            <Typography
              color="progressTextColor"
              variant="precoAntigo3"
              style={{ textDecorationLine: 'underline' }}
            >
              Limpar tudo
            </Typography>
          </Button>
        )}
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

export default ProductCatalogHeader;
