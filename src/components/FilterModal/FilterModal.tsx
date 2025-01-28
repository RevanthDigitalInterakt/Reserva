import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import { SafeAreaView } from 'react-native-safe-area-context';
import configDeviceSizes from '../../utils/configDeviceSizes';
import useSearchStore from '../../zustand/useSearchStore';
import FilterCategories from './components/FilterCategories';
import { type SearchFacetOutput, type SearchProductFacetInput, useSearchFacetsLazyQuery } from '../../base/graphql/generated';
import FilterColors from './components/FilterColors';
import FilterSizes from './components/FilterSizes';
import FilterPrices from './components/FilterPrices';
import { COLORS } from '../../base/styles/colors';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { Box } from '../Box/Box';
import { theme } from '../../base/usereservappLegacy/theme';
import { Typography } from '../Typography/Typography';
import { Divider } from '../Divider/Divider';
import { Button } from '../Button';

function getFacetValue(values: Set<{ value: string; hex?: string; }>) {
  return new Set(Array.from(values).map((item) => item.hex || item.value));
}

export interface IFilterModal {
  onClose: () => void;
  visible: boolean;
  defaultFacets?: SearchProductFacetInput[];
}

function FilterModal({ onClose, visible, defaultFacets }: IFilterModal) {
  const { parameters, onSearch, filters } = useSearchStore(['parameters', 'onSearch', 'filters']);

  const [selectedCategories, setSelectedCategories] = useState(getFacetValue(filters.categories));
  const [selectedColors, setSelectedColors] = useState(getFacetValue(filters.colors));
  const [selectedSizes, setSelectedSizes] = useState(getFacetValue(filters.sizes));
  const [selectedPriceRange, setSelectedPriceRange] = useState(filters.price);

  const [facets, setFacets] = useState<SearchFacetOutput>();

  const [doLoadFacetsData, { loading }] = useSearchFacetsLazyQuery({
    notifyOnNetworkStatusChange: true,
    context: { clientName: 'gateway' },
  });

  const onGetFacetsData = useCallback(async () => {
    try {
      const { data } = await doLoadFacetsData({
        variables: {
          input: { q: parameters.q, facets: defaultFacets || [] },
        },
      });

      if (!data?.searchFacets) return;

      setFacets(data?.searchFacets);
    } catch (err) {
      ExceptionProvider.captureException(err, "onGetFacetsData - FilterModal.tsx", {q: parameters.q || ""});
    }
  }, [defaultFacets, doLoadFacetsData, parameters.q]);

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

  const onApplyFilters = useCallback(() => {
    try {
      if (!facets) return;

      const categories = facets.categories.filter((item) => selectedCategories.has(item.value));
      const colors = facets.colors.filter((item) => selectedColors.has(item.hex));
      const sizes = facets.sizes.filter((item) => selectedSizes.has(item.value.toUpperCase()));
      const priceRange = selectedPriceRange
        ? { from: selectedPriceRange?.from, to: selectedPriceRange.to }
        : undefined;

      onSearch(
        {
          page: 1,
          priceRange,
          facets: [
            ...(defaultFacets || []),
            ...categories,
            ...colors,
            ...sizes].map(({ key, value }) => ({ key, value })),
        },
        {
          categories: new Set(categories),
          sizes: new Set(sizes),
          colors: new Set(colors),
          price: priceRange,
        },
      ).then(() => onClose());
    } catch (err) {
      Alert.alert(
        '',
        'Ocorreu um erro ao filtrar os produtos',
        [{
          onPress: onClose,
          text: 'OK',
        }],
      );
    }
  }, [facets,
    selectedPriceRange,
    onSearch,
    defaultFacets,
    selectedCategories,
    selectedColors,
    selectedSizes,
    onClose]);

  useEffect(() => {
    onGetFacetsData();
  }, [parameters.q]);

  return (
    <Box>
      <Modal
        testID="com.usereserva:id/filter_modal_content"
        style={{ margin: 0 }}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        avoidKeyboard
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropColor={theme.colors.modalBackDropColor}
        isVisible={visible}
      >
        {loading ? (
          <Box bg="white" marginY="nano" justifyContent="center">
            <ActivityIndicator size="small" color={COLORS.BLACK} />
          </Box>
        ) : (
          <Box height={configDeviceSizes.DEVICE_HEIGHT} marginLeft="xl" marginY="micro" bg="white">
            <SafeAreaView flex={1}>
              <ScrollView>
                <Box
                  paddingX="micro"
                  paddingTop="xs"
                  paddingBottom="nano"
                  flexDirection="row"
                  justifyContent="space-between"
                  testID="com.usereserva:id/filter_modal_content_filter_by"
                >
                  <Typography fontFamily="reservaSerifRegular" fontSize="24px">
                    Filtrar Por:
                  </Typography>
                </Box>

                <FilterCategories
                  data={facets?.categories || []}
                  selectedItems={selectedCategories}
                  onUpdate={setSelectedCategories}
                />

                <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />

                <FilterColors
                  data={facets?.colors || []}
                  selectedItems={selectedColors}
                  onUpdate={setSelectedColors}
                />

                <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />

                <FilterSizes
                  data={facets?.sizes || []}
                  selectedItems={selectedSizes}
                  onUpdate={setSelectedSizes}
                />

                <Divider variant="fullWidth" marginBottom="nano" marginTop="nano" />

                {!!(facets?.prices) && (
                  <FilterPrices
                    data={facets.prices}
                    selectedPriceRange={selectedPriceRange}
                    onUpdatePriceRange={setSelectedPriceRange}
                  />
                )}

                <Box paddingTop="micro" flexDirection="row" mb="micro" justifyContent="center">
                  <Box width={1 / 2}>
                    <Button
                      testID="com.usereserva:id/button_back_filter_modal"
                      onPress={() => onClose()}
                      marginLeft="micro"
                      marginRight="nano"
                      title="VOLTAR"
                      variant="primarioEstreitoOutline"
                      inline
                    />
                  </Box>

                  <Box width={1 / 2}>
                    <Button
                      testID="com.usereserva:id/button_aply_filter_modal"
                      onPress={onApplyFilters}
                      marginRight="micro"
                      marginLeft="nano"
                      title="APLICAR"
                      variant="primarioEstreito"
                      inline
                    />
                  </Box>
                </Box>

                <Button
                  testID="com.usereserva:id/button_cleanFilters_filter_modal"
                  onPress={onClearFilters}
                >
                  <Typography
                    color="progressTextColor"
                    variant="precoAntigo3"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    Limpar filtros
                  </Typography>
                </Button>
              </ScrollView>
            </SafeAreaView>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

export default FilterModal;
