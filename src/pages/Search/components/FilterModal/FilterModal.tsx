import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { SearchProductFacetInput, SearchProductPriceRangeInput } from '../../../../base/graphql/generated';
import { theme } from '../../../../base/usereservappLegacy/theme';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Divider } from '../../../../components/Divider/Divider';
import { Typography } from '../../../../components/Typography/Typography';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import type { IFacet } from '../../../../utils/generateFacets';

export type TFilterType = string | null | number | IFacet;

export interface IFilterModal {
  onClose: () => void;
  visible: boolean;
  onUpdateFacets: (facets: SearchProductFacetInput[], price: SearchProductPriceRangeInput) => void;
}

function FilterModal({ onClose, visible, onUpdateFacets }: IFilterModal) {
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

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginY="micro"
              />

              <Box
                paddingTop="micro"
                flexDirection="row"
                mb="micro"
                justifyContent="center"
              >
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
                    // onPress={() => loadMoreProducts()}
                    onPress={() => {}}
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
                onPress={() => {}}
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
      </Modal>
    </Box>
  );
}

export default FilterModal;
