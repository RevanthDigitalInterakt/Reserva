import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";
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
  RadioButtonsFilter,
  SelectColorFilter,
  CheckboxListFilter,
} from "reserva-ui";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAnimatableComponent } from "react-native-animatable";
import {
  ColorsToHexEnum,
  HexToColorsEnum,
} from "../../../graphql/product/colorsToHexEnum";
import { useEffect } from "react";
import { ProductUtils } from "../../../shared/utils/productUtils";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const BoxAnimation = createAnimatableComponent(Box);

export interface FilterModalProps {
  setFilterRequestList;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  onAndroidBackButtonPress?: () => void;
  setFilterList: Function;
  filterList: string[];
  colors: string[];
  sizes: string[];
  priceRange: any[];
  categories: string[];
  categoryId?: string;
  title: string;
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
                ? { transform: [{ rotate: "-90deg" }] }
                : { transform: [{ translateY: 4 }] }
            }
            name={showMore ? "ChevronRight" : "ArrowDown"}
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
  setFilterRequestList,
  isVisible,
  onConfirm,
  onCancel,
  onClose,
  onAndroidBackButtonPress,
  setFilterList,
  filterList,
  categoryId,
  colors,
  sizes,
  categories,
  priceRange,
  ...props
}: odalProps) => {
  const [selectedColors, setSelectedColors] = useState<any[]>([]);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showColors, setShowColors] = React.useState(false);
  const [showSizes, setShowSizes] = React.useState(false);
  const [showPrices, setShowPrices] = React.useState(false);
  const [selectedSize, setSelectedSize] = useState<any>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<any[]>([]);

  sizes = sizes.map((size: any) => ({
    ...size,
    value: size.value.toUpperCase()
  }))
  console.log('priceRange', priceRange.length)
  const loadMoreProducts = () => {
    const colors = selectedColors
      .map((color) => ({
        key: "cor",
        value: HexToColorsEnum[color],
      }))
      .filter(({ value }) => value !== undefined);

    const sizes = selectedSize && [].concat(selectedSize);

    const filterRequestList = [
      // selectedSize && [selectedSize].flat(),
      sizes.map((item: any) => {
        if (item) {
          return {
            key: 'tamanho',
            value: item
          }
        }
      }).filter((item: any) => item),
      [...new Set(colors)],
      filterList,
      selectedPriceRange.map(({ key, range }) => ({
        key,
        value: `${range.from} TO ${range.to}`,
      })),
    ];

    // setFilterRequestList(filterRequestList.flat());
    setFilterRequestList([].concat(...filterRequestList));

    onClose();
  };

  const androidCloseButton = () => {
    if (Platform.OS !== "android") return;
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
      return;
    }
  };

  const getMaxPrice = () => {
    if (priceRange.length > 0) {
      const biggestPrice = priceRange
        .map(({ range }) => range.to)
        .sort((p, n) => n - p)[0]; // desc
      return biggestPrice;
    }
  };

  const getMinPrice = () => {
    if (priceRange.length > 0) {
      const smallestPrice = priceRange
        .map(({ range }) => range.to)
        .sort((p, n) => p - n)[0];

      return smallestPrice;
    }
  };

  const cleanFilters = () => {
    setSelectedColors([]);
    setSelectedPriceRange([]);
    setSelectedSize([]);
    setFilterList([]);
  };

  useEffect(() => {
    console.log(selectedColors)
  }, [selectedColors])

  return (
    <Box>
      <Modal
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
          // marginRight={-20}
          marginLeft="xl"
          marginY="micro"
          bg="white"
        >
          <SafeAreaView flex={1}>
            <ScrollView>
              <Box
                paddingX="micro"
                paddingTop={"xs"}
                paddingBottom={"nano"}
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
                      (color) => color
                    );
                    console.log('mappedSelectedColor', mappedSelectedColor)
                    if (mappedSelectedColor.includes(color)) {
                      const newColors = selectedColors.filter(
                        (value) => value !== color
                      );
                      console.log('newColors', newColors)
                      setSelectedColors(newColors);
                    } else {
                      setSelectedColors((preview) => {
                        return [...preview, color];
                      });
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
                //defaultSelectedItem={"M"}
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
                      max={getMaxPrice()}
                      mdxType="Range"
                      min={getMinPrice()}
                      onValuesChange={(prices: number[]) => {
                        const minPrice = prices[0];
                        const maxPrice = prices[1];

                        setSelectedPriceRange([
                          {
                            key: "priceRange",
                            range: { from: minPrice, to: maxPrice },
                          },
                        ]);
                      }}
                      originalType={() => { }}
                      prefix="R$ "
                      value={[getMinPrice(), getMaxPrice()]}
                      width={deviceWidth - 100}
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
                    title={"VOLTAR"}
                    variant="primarioEstreitoOutline"
                    inline={true}
                  />
                </Box>

                <Box width={1 / 2}>
                  <Button
                    onPress={() => loadMoreProducts()}
                    marginRight="micro"
                    marginLeft="nano"
                    title={"APLICAR"}
                    variant="primarioEstreito"
                    inline={true}
                  />
                </Box>
              </Box>
              <Button onPress={cleanFilters}>
                <Typography
                  color="progressTextColor"
                  variant="precoAntigo3"
                  style={{ textDecorationLine: "underline" }}
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
};
