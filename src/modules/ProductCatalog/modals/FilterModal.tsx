import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Platform,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Box,
  Button,
  CheckboxList,
  Divider,
  Icon,
  RadioButtons,
  Range,
  SelectColor,
  theme,
  Typography,
} from 'reserva-ui';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAnimatableComponent } from 'react-native-animatable';
const deviceHeight = Dimensions.get('window').height;
const BoxAnimation = createAnimatableComponent(Box);
export interface FilterModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  onAndroidBackButtonPress?: () => void;
  setFilterList: Dispatch<SetStateAction<string[]>>;
  filterList: string[];
}

export const TitleFilter: React.FC<{
  title: string;
  showMore: boolean;
  setShowMore: (val: boolean) => void;
}> = ({ title, showMore, setShowMore }) => {
  return (
    <Box
      paddingX="micro"
      paddingY="micro"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Typography fontFamily="reservaSerifRegular" fontSize="16px">
        {title}
      </Typography>

      <Button
        onPress={() => setShowMore(!showMore)}
        hitSlop={{ left: 50, top: 15, bottom: 15 }}
      >
        <BoxAnimation
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontFamily="nunitoRegular" fontSize="12px">
            Ver mais
          </Typography>

          <Icon
            style={
              showMore
                ? { transform: [{ rotate: '-90deg' }] }
                : { transform: [{ translateY: 4 }] }
            }
            name={showMore ? 'ChevronRight' : 'ArrowDown'}
            color="preto"
            marginY="quarck"
            marginX="nano"
            size={12}
          />
        </BoxAnimation>
      </Button>
    </Box>
  );
};

export const FilterModal = ({
  isVisible,
  subtitle,
  onConfirm,
  onCancel,
  onClose,
  onAndroidBackButtonPress,
  setFilterList,
  filterList,
  ...props
}: FilterModalProps) => {
  const colors = [
    '#F2F2F2',
    '#1E1E1E',
    '#C0C0C0',
    '#325477',
    '#D33A2A',
    '#31B44A',
    '#FFF001',
    '#E5E1C4',
    '#947E57',
    '#E362A2',
    '#EEECDF',
    '#663054',
  ];

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showColors, setShowColors] = React.useState(false);
  const [showSizes, setShowSizes] = React.useState(false);
  const [showPrices, setShowPrices] = React.useState(false);

  const androidCloseButton = () => {
    if (Platform.OS !== 'android') return;
    if (onAndroidBackButtonPress) {
      onAndroidBackButtonPress();
      return;
    }

    if (!onAndroidBackButtonPress && onClose) {
      onClose();
      return;
    }

    if (!onAndroidBackButtonPress && !onClose && onCancel) {
      onCancel();
      return;
    }
  };
  return (
    <Box>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackButtonPress={() => {
          androidCloseButton();
        }}
        avoidKeyboard
        onBackdropPress={() => {
          onClose();
        }}
        backdropColor={theme.colors.modalBackDropColor}
        isVisible={isVisible}
      >
        <Box
          height={deviceHeight}
          marginRight={-20}
          marginLeft="sm"
          marginY="micro"
          bg="white"
        >
          <SafeAreaView flex={1}>
            <ScrollView>
              <Box
                paddingX="micro"
                paddingTop={'xs'}
                paddingBottom={'nano'}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography fontFamily="reservaSerifRegular" fontSize="24px">
                  Filtrar Por:
                </Typography>
              </Box>

              <TitleFilter
                showMore={showCategories}
                setShowMore={setShowCategories}
                title="Categorias"
              />

              {showCategories && (
                <BoxAnimation animation="fadeIn" paddingX="micro">
                  <CheckboxList
                    optionsList={[
                      'Bermudas',
                      'Casacos',
                      'Calças',
                      'Cuecas',
                      'Camisas',
                      'Polos',
                      'Camisetas',
                      'Sungas',
                    ]}
                    selectedList={filterList}
                    color="dropDownBorderColor"
                    selectedColor="preto"
                    onCheckChange={(checkBoxList) => {
                      setFilterList(checkBoxList);
                    }}
                  />
                </BoxAnimation>
              )}
              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />

              <TitleFilter
                showMore={showColors}
                setShowMore={setShowColors}
                title="Cores"
              />

              {showColors && (
                <BoxAnimation animation="fadeIn" paddingX="micro">
                  <SelectColor
                    listColors={colors}
                    onPress={(color) => {
                      if (selectedColors.includes(color)) {
                        const newColors = selectedColors.filter(
                          (colorItem) => colorItem !== color
                        );
                        setSelectedColors(newColors);
                        return;
                      }
                      setSelectedColors((preview) => {
                        return [...preview, color];
                      });
                    }}
                    selectedColors={selectedColors}
                    size={23}
                  />
                </BoxAnimation>
              )}

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />

              <TitleFilter
                title="Tamanho"
                showMore={showSizes}
                setShowMore={setShowSizes}
              />

              {showSizes && (
                <BoxAnimation
                  animation="fadeIn"
                  paddingY="micro"
                  paddingX="micro"
                >
                  <RadioButtons
                    onSelectedChange={(color) => {
                      console.log(color);
                    }}
                    optionsList={['PP', 'P', 'M', 'G', 'GG', '3G', 'XG']}
                    defaultSelectedItem={'G'}
                  />
                </BoxAnimation>
              )}

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginY="micro"
              />

              <TitleFilter
                title="Preços"
                showMore={showPrices}
                setShowMore={setShowPrices}
              />

              {showPrices && (
                <BoxAnimation
                  animation="fadeIn"
                  paddingX="micro"
                  alignSelf="center"
                >
                  <Range
                    max={1000}
                    mdxType="Range"
                    min={1}
                    onValuesChange={() => {}}
                    originalType={() => {}}
                    prefix="R$ "
                    value={[100, 400]}
                    width={300}
                  />
                </BoxAnimation>
              )}

              <Box
                paddingTop="micro"
                flexDirection="row"
                mb="micro"
                justifyContent="center"
              >
                <Box width={1 / 2}>
                  <Button
                    onPress={() => onClose()}
                    marginLeft="micro"
                    marginRight="nano"
                    title={'VOLTAR'}
                    variant="primarioEstreitoOutline"
                    inline={true}
                  />
                </Box>

                <Box width={1 / 2}>
                  <Button
                    onPress={() => onConfirm()}
                    marginRight="micro"
                    marginLeft="nano"
                    title={'APLICAR'}
                    variant="primarioEstreito"
                    inline={true}
                  />
                </Box>
              </Box>
            </ScrollView>
          </SafeAreaView>
        </Box>
      </Modal>
    </Box>
  );
};
