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
} from "reserva-ui";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAnimatableComponent } from "react-native-animatable";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
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
  dispatch: Function;
  colors: string[];
  sizes: string[];
  priceRange: { from: number; to: number; };
  categories: string[];
  categoryId?: string;
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
  dispatch,
  categoryId,
  colors,
  sizes,
  categories,
  priceRange,
  ...props
}: FilterModalProps) => {
  const [selectedMinprice, setSelectedMinprice] = React.useState<
    number | undefined
  >(undefined);
  const [selectedMaxprice, setSelectedMaxPrice] = React.useState<
    number | undefined
  >(undefined);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showColors, setShowColors] = React.useState(false);
  const [showSizes, setShowSizes] = React.useState(false);
  const [showPrices, setShowPrices] = React.useState(false);

  const [filter, setFilter] = useState({
    categories: [
      'Bermuda',
      'Casacos',
      'Calças',
      'Cuecas',
      'Camisas',
      'Polos',
      'Camisetas',
      'Sungas'
    ],
    colors: [
      '#FFF001',
      '#18479F',
      '#F1492E',
      '#E5E1C4',
      '#E363A2',
      '#663054',
      '#30B349',
      '#947E57'
    ],
    sizes: [
      'PP',
      'p',
      'G',
      'GG',
      '3G'
    ],
    priceRange: {
      maxPrice: 1500,
      minPrice: 300
    }
  })

  //const { filter } = useSelector((state: ApplicationState) => state);

  const [selectedSize, setSelectedSize] = useState<string | null>();

  // const dispatch = useDispatch();

  const loadMoreProducts = () => {
    console.log("Set from filter");
    setFilterRequestList({
      ...(selectedMinprice > 0 && { minPrice: selectedMinprice }),
      ...(selectedMaxprice > 0 && { maxPrice: selectedMaxprice }),
      ...(selectedSize && { size: [selectedSize] }),
      ...(selectedColors.length > 0 && { colors: selectedColors }),
    });
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
                <CheckboxList
                  optionsList={
                    showCategories
                      ? categories
                      : categories.slice(0, 6)
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
                <SelectColor
                  listColors={
                    showColors
                      ? colors
                      : colors.slice(0, 6)
                  }
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
                <RadioButtons
                  onSelectedChange={(size) => {
                    setSelectedSize(size);
                  }}
                  optionsList={
                    showSizes
                      ? sizes
                      : sizes.slice(0, 6)
                  }
                  defaultSelectedItem={"M"}
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

              {showPrices && (
                <BoxAnimation
                  animation="fadeIn"
                  paddingX="micro"
                  alignSelf="center"
                >
                  <Range
                    max={priceRange.to}
                    mdxType="Range"
                    min={priceRange.from}
                    onValuesChange={(prices: string[]) => {
                      setSelectedMinprice(prices[0]);
                      setSelectedMaxPrice(prices[1]);
                    }}
                    originalType={() => { }}
                    prefix="R$ "
                    value={[priceRange.from, priceRange.to]}
                    width={deviceWidth - 95}
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
            </ScrollView>
          </SafeAreaView>
        </Box>
      </Modal>
    </Box>
  );
};
