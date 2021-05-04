import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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

const deviceHeight = Dimensions.get("window").height;

export interface FilterModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  onAndroidBackButtonPress?: () => void;
}

export const TitleFilter: React.FC<{ title: string; showMore?: boolean }> = ({
  title,
  showMore,
}) => {
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
      {showMore && (
        <Box flexDirection="row" justifyContent="space-between">
          <Typography fontFamily="nunitoRegular" fontSize="12px">
            Ver mais
          </Typography>
          <Icon
            style={{ transform: [{ rotate: "90deg" }] }}
            name="ChevronRight"
            color="preto"
            marginY="quarck"
            marginX="nano"
            size={12}
          />
        </Box>
      )}
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
  ...props
}: FilterModalProps) => {
  const [colors, setColors] = useState([
    "#F2F2F2",
    "#1E1E1E",
    "#C0C0C0",
    "#325477",
    "#D33A2A",
    "#31B44A",
    "#FFF001",
    "#E5E1C4",
    "#947E57",
    "#E362A2",
    "#EEECDF",
    "#663054",
  ]);

  const [selectedColor, setSelectedColor] = useState(colors[3]);

  const androidCloseButton = () => {
    if (Platform.OS !== "android") return;
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
                paddingTop={"xs"}
                paddingBottom={"nano"}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Typography fontFamily="reservaSerifRegular" fontSize="24px">
                  Filtrar Por:
                </Typography>
              </Box>

              <TitleFilter showMore={true} title="Categorias"></TitleFilter>

              <Box paddingX="micro">
                <CheckboxList
                  optionsList={[
                    "Bermudas",
                    "Casacos",
                    "Calças",
                    "Cuecas",
                    "Camisas",
                    "Polos",
                    "Camisetas",
                    "Sungas",
                  ]}
                  selectedList={["Bermudas"]}
                  color="dropDownBorderColor"
                  selectedColor="preto"
                  onCheckChange={(checkBoxList) => {
                    console.log(checkBoxList);
                  }}
                />
              </Box>
              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />

              <TitleFilter showMore={true} title="Cores"></TitleFilter>

              <Box paddingX="micro">
                <SelectColor
                  listColors={colors}
                  onPress={(color) => {
                    setSelectedColor(color);
                  }}
                  selectedColor={selectedColor}
                  size={23}
                />
              </Box>

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginTop="nano"
              />

              <TitleFilter title="Tamanho"></TitleFilter>

              <Box paddingY="micro" paddingX="micro">
                <RadioButtons
                  onSelectedChange={(color) => {
                    console.log(color);
                  }}
                  optionsList={["PP", "P", "M", "G", "GG", "3G"]}
                  defaultSelectedItem={"G"}
                />
              </Box>

              <Divider
                variant="fullWidth"
                marginBottom="nano"
                marginY="micro"
              />

              <TitleFilter title="Preços"></TitleFilter>

              <Box paddingX="micro" alignSelf="center">
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
              </Box>

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
                    onPress={() => onConfirm()}
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
