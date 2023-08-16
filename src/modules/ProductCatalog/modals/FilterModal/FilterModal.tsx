/* eslint-disable @typescript-eslint/no-use-before-define */
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView } from 'react-native';
import { createAnimatableComponent } from 'react-native-animatable';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../../../../base/usereservappLegacy/theme';
import { Box, type BoxProps } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Divider } from '../../../../components/Divider/Divider';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import {
  HexToColorsEnum,
} from '../../../../graphql/product/colorsToHexEnum';
import type { IFacet } from '../../../../utils/generateFacets';
import { getInitialFilterPriceValues } from './helpers/getInitialFilterPriceValues';
import { getMaxPrice } from './helpers/getMaxPrice';
import { getMinPrice } from './helpers/getMinPrice';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const BoxAnimation = createAnimatableComponent(Box);

export type TFilterType = string | null | number | IFacet;
export interface IFilterModalProps {
  setFilterRequestList: (val: TFilterType[]) => void;
  isVisible: boolean;
  onCancel: () => void;
  onClose: () => void;
  onAndroidBackButtonPress?: () => void;
  setFilterList: (val: TFilterType[]) => void;
  filterList: TFilterType[];
  colors: string[];
  sizes: string[];
  priceRange: any[];
  categories: string[];
  title: string;
}

export const TitleFilter: React.FC<{
  title: string;
  showMore: boolean;
  setShowMore: (val: boolean) => void;
}> = ({ title, showMore, setShowMore }) => (
  <Box
    paddingX="micro"
    paddingY="micro"
    justifyContent="space-between"
    flexDirection="row"
    testID="com.usereserva:id/title_filter_modal_container"
  >
    <Typography
      testID="com.usereserva:id/filter_modal_title"
      fontFamily="reservaSerifRegular"
      fontSize="16px"
    >
      {title}
    </Typography>

    <Button
      testID="com.usereserva:id/title_filter_modal_button_ceeMore"
      onPress={() => setShowMore(!showMore)}
      hitSlop={{ left: 50, top: 15, bottom: 15 }}
    >
      <BoxAnimation
        testID="com.usereserva:id/title_animation_filter_modal"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontFamily="nunitoRegular" fontSize="12px">
          Ver mais
        </Typography>

        <IconLegacy
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

export function FilterModal({
  setFilterRequestList,
  isVisible,
  onCancel,
  onClose,
  onAndroidBackButtonPress,
  setFilterList,
  filterList,
  colors,
  sizes,
  categories,
  priceRange,
}: IFilterModalProps) {
  const [selectedColors, setSelectedColors] = useState<any[]>([]);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showColors, setShowColors] = React.useState(false);
  const [showSizes, setShowSizes] = React.useState(false);
  const [showPrices, setShowPrices] = React.useState(false);
  const [selectedSize, setSelectedSize] = useState<any>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<any[]>([]);

  sizes = sizes.map((size: any) => ({
    ...size,
    value: size.value.toUpperCase(),
  }));

  const loadMoreProducts = () => {
    const colors = selectedColors
      .map((color) => ({
        key: 'cor',
        value: HexToColorsEnum[color],
      }))
      .filter(({ value }) => value !== undefined);

    const sizes = selectedSize && [].concat(selectedSize);

    const filterRequestList = [
      sizes.map((item: any) => {
        if (item) {
          return {
            key: 'tamanho',
            value: item,
          };
        }
      }).filter((item: any) => item),
      [...new Set(colors)],
      filterList,
      selectedPriceRange.map(({ key, range }) => ({
        key,
        value: `${range.from} TO ${range.to}`,
      })),
    ];

    setFilterRequestList([].concat(...filterRequestList));

    onClose();
  };

  const androidCloseButton = () => {
    if (Platform.OS !== 'android') return;
    if (onAndroidBackButtonPress) {
      onAndroidBackButtonPress();
      return;
    }

    if (!onAndroidBackButtonPress && !!onClose) {
      onClose();
      return;
    }

    if (!onAndroidBackButtonPress && !onClose && onCancel) {
      onCancel();
    }
  };

  const cleanFilters = () => {
    setSelectedColors([]);
    setSelectedPriceRange([]);
    setSelectedSize([]);
    setFilterList([]);
  };

  return (
    <Box>
      <Modal
        testID="com.usereserva:id/filter_modal_content"
        style={{ margin: 0 }}
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
          marginLeft="xl"
          marginY="micro"
          bg="white"
        >
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

              <TitleFilter
                showMore={showCategories}
                setShowMore={setShowCategories}
                title="Categorias"
              />

              <BoxAnimation animation="fadeIn" paddingX="micro">
                <CheckboxListFilter
                  optionsList={
                    showCategories ? categories : categories.slice(0, 6)
                  }
                  selectedList={filterList}
                  color="dropDownBorderColor"
                  selectedColor="preto"
                  onCheckChange={(checkBoxList) => {
                    setFilterList(checkBoxList);
                  }}
                />
              </BoxAnimation>

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

              <BoxAnimation animation="fadeIn" paddingX="micro">
                <SelectColorFilter
                  listColors={showColors ? colors : colors.slice(0, 6)}
                  onPress={(color) => {
                    const mappedSelectedColor = selectedColors.map(
                      (color) => color,
                    );

                    if (mappedSelectedColor.includes(color)) {
                      const newColors = selectedColors.filter(
                        (value) => value !== color,
                      );

                      setSelectedColors(newColors);
                    } else {
                      setSelectedColors((preview) => [...preview, color]);
                    }
                  }}
                  selectedColors={selectedColors}
                  size={23}
                />
              </BoxAnimation>

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

              <BoxAnimation
                animation="fadeIn"
                paddingY="micro"
                paddingX="micro"
              >
                <RadioButtonsFilter
                  onSelectedChange={(size) => {
                    setSelectedSize(size);
                  }}
                  optionsList={showSizes ? sizes : sizes.slice(0, 6)}
                />
              </BoxAnimation>

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

              {
                priceRange.length > 1 && (
                  <BoxAnimation
                    animation="fadeIn"
                    paddingX="micro"
                    alignSelf="center"
                  >
                    <Range
                      max={getMaxPrice(priceRange)}
                      mdxType="Range"
                      min={getMinPrice(priceRange)}
                      onValuesChange={(prices: number[]) => {
                        const minPrice = prices[0];
                        const maxPrice = prices[1];

                        if (minPrice === maxPrice) {
                          return setSelectedPriceRange([
                            {
                              key: 'priceRange',
                              range: { from: minPrice, to: maxPrice + 1 },
                            },
                          ]);
                        }

                        setSelectedPriceRange([
                          {
                            key: 'priceRange',
                            range: { from: minPrice, to: maxPrice },
                          },
                        ]);
                      }}
                      originalType={() => { }}
                      prefix="R$ "
                      value={getInitialFilterPriceValues(priceRange, filterList)}
                      width={deviceWidth - 100}
                    />
                  </BoxAnimation>
                )
}

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
                    onPress={() => loadMoreProducts()}
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
                onPress={cleanFilters}
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

interface RadioButtonsFilterProps {
  optionsList: any[];
  disbledOptions: string[];
  defaultSelectedItem: any;
  color?: keyof typeof theme.colors;
  onSelectedChange: (item: any) => void;
  size: number | string;
  fontSize: string | number;
}

export const RadioButtonsFilter = ({
  optionsList,
  disbledOptions,
  defaultSelectedItem,
  color = 'preto',
  onSelectedChange,
  size = '34px',
  fontSize = '10px',
  ...props
}: RadioButtonsFilterProps) => {
  const [selectedItems, setSelectedItem] = useState<any[]>([defaultSelectedItem]);

  if (!optionsList || optionsList.length == 0) return null;

  useEffect(() => {
    orderSizes(optionsList.map((x) => x.value));
  }, []);

  useEffect(() => {
    onSelectedChange(selectedItems);
  }, [selectedItems]);

  const orderSizes = (sizes: string[]) => sizes.sort((itemA, itemB) => {
    if (parseInt(itemA) > 0) return itemA > itemB ? -1 : 1;

    if (itemA.charAt(0) === itemB.charAt(0)) {
      if (itemA.length > itemB.length) return -1;
      if (itemA.length < itemB.length) return 1;
      return 0;
    }
    return itemA < itemB ? -1 : 1;
  });

  return (
    <Box alignItems="flex-start" flexWrap="wrap" flexDirection="row" {...props}>
      {optionsList.map(({ key, value }: any, index: number) => {
        const isSelected = !!selectedItems.includes(value);
        return (
          <Box
            key={`option-${key}`}
            height={size}
            width={size}
            alignSelf="flex-start"
            bg={isSelected ? color : 'white'}
            alignItems="center"
            marginRight={index < optionsList.length ? 'micro' : null}
            marginBottom={index < optionsList.length ? 'nano' : null}
            borderRadius="pico"
            borderWidth="hairline"
            borderColor="divider"
          >
            <Button
              disabled={disbledOptions?.includes(`${value}`)}
              height={size}
              onPress={() => {
                if (isSelected) {
                  setSelectedItem(orderSizes(selectedItems.filter((x) => x !== value)));
                } else {
                  setSelectedItem(orderSizes([...selectedItems, value]));
                }
              }}
            >
              <Typography
                color={isSelected ? 'white' : color}
                fontFamily="nunitoBold"
                fontSize={fontSize}
              >
                {value}
              </Typography>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

interface SelectColorFilterProps extends ColorProps<typeof theme> {
  listColors: any[];
  disabledColors?: any[];
  selectedColors?: any[];
  onPress: (item: any) => void;
  size?: number;
}

export const SelectColorFilter = ({
  listColors,
  selectedColors,
  disabledColors,
  onPress,
  size = 25,
}: SelectColorFilterProps) => {
  const renderOptions = () => {
    const listItems = listColors.map(({ value }) => (
      <Box key={`filter-options-${value}`}>
        <Button disabled={disabledColors?.includes(value)} onPress={() => onPress(value)}>
          <Box
            height={size + 5}
            width={size + 5}
            bg={
                selectedColors?.includes(value) || selectedColors === value
                  ? 'white'
                  : null
              }
            borderRadius="infinity"
            borderWidth={
                selectedColors?.includes(value) || selectedColors === value
                  ? 'hairline'
                  : null
              }
            borderColor={
                selectedColors?.includes(value) || selectedColors === value
                  ? 'neutroFrio2'
                  : null
              }
            justifyContent="center"
            alignItems="center"
            marginLeft="nano"
            marginRight="nano"
            marginTop="nano"
            marginBottom="nano"
          >
            <Box
              height={size}
              width={size}
              borderRadius="infinity"
              bg={value}
            />
          </Box>
        </Button>
      </Box>
    ));
    return listItems;
  };

  return (
    <Box flexWrap="wrap" flexDirection="row">
      {renderOptions()}
    </Box>
  );
};

export interface CheckboxFilterProps extends BoxProps {
  optionName: string;
  checked?: boolean;
  color?: keyof typeof theme.colors;
  selectedColor?: keyof typeof theme.colors;
  onCheck?: () => void;
  fontSize?: number;
  fontFamily?: keyof typeof theme.fonts;
}

export const CheckboxFilter = ({
  checked,
  optionName,
  onCheck,
  fontSize = '12px',
  fontFamily = 'nunitoRegular',
  color = 'dropDownBorderColor',
  selectedColor = 'preto',
  width = '50%',
  alignItems = 'center',
  ...props
}: CheckboxFilterProps) => (
  <Box flexDirection="row" width={width} alignItems={alignItems} {...props}>
    <Button
      hitSlop={{
        top: 10, left: 10, bottom: 10, right: 10,
      }}
      onPress={() => {
        if (onCheck) {
          onCheck();
        }
      }}
    >
      <IconLegacy
        name={checked ? 'CheckboxChecked' : 'CheckboxUnchecked'}
        color={
            color ? (selectedColor && checked ? selectedColor : color) : 'preto'
          }
        size={15}
      />
    </Button>
    <Box ml="nano">
      <Typography
        fontSize={fontSize}
        fontFamily={fontFamily}
        variant="botaoFiltrarEOrdenarProdutos"
      >
        {optionName}
      </Typography>
    </Box>
  </Box>
);

export interface CheckboxListFilterProps {
  optionsList: any[];
  selectedList: any[];
  color?: keyof typeof theme.colors;
  selectedColor?: keyof typeof theme.colors;
  onCheckChange: (cheboxList: string[]) => void;
}

export const CheckboxListFilter = ({
  optionsList,
  selectedList,
  onCheckChange,
  color,
  selectedColor,
}: CheckboxListFilterProps) => {
  const isChecked = (option: any) => selectedList.filter(
    ({ value }) => value === option.value,
  ).length > 0;

  return (
    <Box flexDirection="row" flexWrap="wrap">
      {optionsList.map(({ key, value }: any, index) => (
        <CheckboxFilter
          key={`option-${key}-${value}`}
          paddingY="nano"
          optionName={value.charAt(0).toUpperCase() + value.slice(1)}
          checked={isChecked({ key, value: value.toLowerCase() })}
          color={color || 'preto'}
          selectedColor={selectedColor || 'preto'}
          onCheck={() => {
            if (isChecked({ key, value: value.toLowerCase() })) {
              onCheckChange(selectedList.filter(({ value: val }: any) => val !== value));
            } else onCheckChange([...selectedList, { key, value }]);
          }}
        />
      ))}
    </Box>
  );
};

interface RangeProps {
  width: number
  min: number
  max: number
  value: number[]
  prefix?: string,
  colorMarker: keyof typeof theme.colors,
  colorLine: keyof typeof theme.colors,
  colorText: keyof typeof theme.colors,
  onValuesChange?: Function,
}

export const Range = ({
  width = 150,
  min = 0,
  max = 0,
  prefix,
  value = [0, 0],
  colorMarker = 'preto',
  colorLine = 'preto',
  colorText = 'preto',
  onValuesChange,
}: RangeProps) => {
  const [sliderValue, setSliderValue] = React.useState(value);

  return (
    <Box flexDirection="column">
      <MultiSlider
        selectedStyle={{
          backgroundColor: theme.colors[colorLine],
          height: 3,
          marginTop: -1.5,
        }}
        unselectedStyle={{
          backgroundColor: theme.colors[colorLine],
          height: 1,
        }}
        values={sliderValue}
        sliderLength={width}
        onValuesChange={(values) => {
          setSliderValue(values);
        }}
        onValuesChangeFinish={(values) => {
          if (typeof onValuesChange === 'function') {
            onValuesChange(values);
          }
        }}
        min={min}
        max={max}
        step={1}
        allowOverlap
        snapped
        isMarkersSeparated
        customMarkerLeft={() => <RangeMarker bg={colorMarker} />}
        customMarkerRight={() => <RangeMarker bg={colorMarker} />}
      />
      <Box width={width} mt={-12} flexDirection="row" justifyContent="space-between">
        <Box alignSelf="flex-start">
          <Typography fontFamily="nunitoSemiBold" fontSize={14} color={colorText}>
            {prefix}
            {sliderValue[0]}
          </Typography>
        </Box>

        {sliderValue[1] !== undefined && (
          <Box alignSelf="flex-end">
            <Typography fontFamily="nunitoSemiBold" fontSize={14} color={colorText}>
              {prefix}
              {sliderValue[1]}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface RangeMarkerProps extends BoxProps {}

export const RangeMarker = (props: RangeMarkerProps) => (
  <Button hitSlop={{
    top: 30, left: 30, bottom: 30, right: 30,
  }}
  >
    <Box borderRadius="infinity" width={20} height={20} {...props} />
  </Button>
);
