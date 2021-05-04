import React, { createRef, useState } from "react";
import {
  Alert,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PickerItemProps,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Button,
  Divider,
  Icon,
  Picker,
  PickerItem,
  ProductDetailCard,
  SelectColor,
  Typography,
  OutlineInput,
  RadioButtons,
  ProductVerticalListCard,
  ProductVerticalListCardProps,
  TopBar,
  theme,
} from "reserva-ui";
import { Input } from "reserva-ui/src/components/TextField/TextField.styles";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";
import { ModalBag } from "../components/ModalBag";

const screenWidth = Dimensions.get("window").width;

let recomendedScroll = createRef<ScrollView>();

interface ProductDetailProps {
  recomendedProducts?: ProductVerticalListCardProps[];
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  recomendedProducts,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const colors = [
    "#F9F9ED",
    "#7494A5",
    "#2D4452",
    "#484C51",
    "#070707",
    "#484C50",
    "#BE6ED5",
    "#4A56A7",
    "#1ECB58",
  ];
  const [selectedColor, setSelectedColor] = useState("#F9F9ED");
  recomendedProducts = [
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
    {
      productTitle: "CAMISETA BÁSICA RESERVA",
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      imageSource:
        "https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png",
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [actualRecomendedindex, setActualRecomendedindex] = useState(0);

  const onChangeRecomended = (
    scrollEvent: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const actualItem = Math.ceil(
      scrollEvent.nativeEvent.contentOffset.x /
        scrollEvent.nativeEvent.layoutMeasurement.width
    );
    if (
      actualItem !== actualRecomendedindex &&
      recomendedProducts &&
      actualItem < Math.ceil(recomendedProducts.length / 2)
    ) {
      console.log(actualItem);
      setActualRecomendedindex(actualItem);
    }
  };

  return (
    <SafeAreaView>
      <Box bg="white">
        <ModalBag
          isVisible={isVisible}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        />
        <TopBarDefaultBackButton />
        <ScrollView>
          <ProductDetailCard
            installmentsNumber={3}
            installmentsPrice={99.9}
            title="Camiseta Básica Reserva"
            discountTag={18}
            price={345}
            priceWithDiscount={297}
            imagesWidth={screenWidth}
            images={[
              "https://media.discordapp.net/attachments/488490557320986636/837421567348441098/cara_de_frente.png",
              "https://media.discordapp.net/attachments/488490557320986636/837421564961882162/cara_de_costas.png",
            ]}
            isFavorited={isFavorited}
            onClickFavorite={(favoriteState: any) => {
              setIsFavorited(favoriteState);
            }}
            onClickShare={() => {
              Alert.alert("compartilhar!!");
            }}
          />

          <Box mt="xxxs">
            <Box px="xxxs">
              <Typography variant={"subtituloSessoes"}>Cores:</Typography>
            </Box>
            <Box>
              <ScrollView horizontal>
                <SelectColor
                  onPress={(color: any) => setSelectedColor(color)}
                  size={40}
                  listColors={colors}
                  selectedColor={selectedColor}
                />
              </ScrollView>
            </Box>
          </Box>
          <Box px="xxxs">
            <Box mt="xxxs">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant={"subtituloSessoes"}>Tamanhos:</Typography>
                <Button
                  title="Guia de medidas"
                  fontFamily="nunitoRegular"
                  fontSize={"10px"}
                  py="nano"
                  leftIcon={<Icon name="Ruler" size={26} />}
                />
              </Box>
              <Box alignItems="center" mt="xxxs">
                <RadioButtons
                  size={42}
                  fontSize={14}
                  onSelectedChange={() => {}}
                  optionsList={["PP", "P", "M", "G", "GG", "3G"]}
                  defaultSelectedItem={"G"}
                />
              </Box>
            </Box>

            <Button
              mt="xxxs"
              title="ADICIONAR À SACOLA"
              variant="primarioEstreito"
              onPress={() => {
                setIsVisible(true);
              }}
              inline
            />

            <Box mt="nano" flexDirection="row"></Box>
            <Divider variant="fullWidth" my="xs" />
            <Typography fontFamily="reservaSerifRegular" fontSize="16px">
              Consultar prazo e valor do frete
            </Typography>
            <Box flexDirection="row" mt="xxxs">
              <OutlineInput placeholder="Digite seu CEP" iconName="Search" />
            </Box>
            <Divider variant="fullWidth" my="xs" />
            <Box>
              <Typography>
                <Button>
                  <Box flexDirection="row" alignItems="center">
                    <Icon name="Add" size={15} color="preto" />
                    <Typography variant="subtituloSessoes">
                      Sobre este produto
                    </Typography>
                  </Box>
                </Button>
              </Typography>
            </Box>

            <Divider variant="fullWidth" my="xs" />
            <Typography fontFamily="reservaSerifRegular" fontSize="16px">
              Receba novidades e promoções
            </Typography>
            <Box flexDirection="column" mt="xxxs">
              <OutlineInput
                placeholder="Digite seu e-mail"
                iconName="ChevronRight"
              />
            </Box>
            <Box mt="xs" mb="xxl">
              <Box mb="xxxs">
                <Typography fontFamily="nunitoBold" fontSize={14}>
                  Seu produto combina com
                </Typography>
              </Box>
              <Box mb="md">
                <ScrollView
                  horizontal
                  pagingEnabled
                  ref={recomendedScroll}
                  showsHorizontalScrollIndicator={false}
                  onScroll={onChangeRecomended}
                >
                  {recomendedProducts.map((product, index) => (
                    <Box mr={"micro"} key={index} height={200}>
                      <ProductVerticalListCard
                        imageWidth={137}
                        small
                        {...product}
                      />
                    </Box>
                  ))}
                </ScrollView>
                <Box
                  paddingTop="nano"
                  flexDirection="row"
                  justifyContent="center"
                >
                  {recomendedProducts.map(
                    (i, k) =>
                      k % 2 == 0 && (
                        <Button
                          paddingX="quarck"
                          variant="icone"
                          onPress={() => {
                            let width = (137 + theme.space.micro) * 2;
                            console.log(`k/2: ${k / 2}`);
                            recomendedScroll.current?.scrollTo({
                              x: width * (k / 2),
                            });
                          }}
                          icon={
                            <Icon
                              name="Circle"
                              size={6}
                              color={
                                actualRecomendedindex == Math.ceil((k - 1) / 2)
                                  ? "preto"
                                  : "neutroFrio1"
                              }
                            />
                          }
                        />
                      )
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
