import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { useEffect } from "react";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  theme,
  Image,
  ProductVerticalListCard,
  Button,
  Typography,
  Icon,
  Picker,
  SearchBar,
  Pill,
} from "reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { ApplicationState } from "../../../store";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";
import { FilterModal } from "../../ProductCatalog/modals/FilterModal";
import * as Animatable from "react-native-animatable";

const windowWidth = Dimensions.get("window").width;

type Props = StackScreenProps<RootStackParamList, "SearchScreen">;

export const SearchScreen: React.FC<Props> = ({ route, navigation }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);
  const [
    autoCompleteValues,
    setAutoCompleteValues,
  ] = React.useState<Array<string> | null>([]);

  const dispatch = useDispatch();

  const [filterVisible, setFilterVisible] = React.useState(false);
  const [sorterVisible, setSorterVisible] = React.useState(false);
  const [filterList, setFilterList] = React.useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      setAutoCompleteValues([
        "Calça De Elastano",
        "Calça de Elástico",
        "Calça Jeans Reserva",
      ]);
    }
  }, [searchTerm]);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const fetchResults = () => {
    setShowResults(true);
    setAutoCompleteValues(null);
  };

  return (
    <Box backgroundColor="white" flex={1}>
      <TopBarDefault />
      <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
        <SearchBar
          onClickAutocomplete={(item) => {
            setSearchTerm(item);
            fetchResults(item);
          }}
          autocomplete={autoCompleteValues}
          onValueChange={(text) => {
            setSearchTerm(text);
          }}
          height={36}
          placeholder="Buscar"
        />
      </Box>

      <FilterModal
        filterList={filterList}
        setFilterList={setFilterList}
        isVisible={filterVisible}
        onConfirm={() => {}}
        onCancel={() => setFilterVisible(false)}
        onClose={() => setFilterVisible(false)}
        title="Excluir endereço"
        confirmText={"Ok"}
        subtitle="Tem certeza que deseja excluir o endereço salvo?"
      />
      <Picker
        onSelect={() => {
          setSorterVisible(false);
        }}
        isVisible={sorterVisible}
        items={[
          {
            text: "Menor Preço",
          },
          {
            text: "Maior Preço",
          },
          {
            text: "Mais Recentes",
          },
          {
            text: "Mais Antigos",
          },
          {
            text: "Relevante",
          },
        ]}
        onConfirm={() => {
          setSorterVisible(false);
        }}
        onClose={() => {
          setSorterVisible(false);
        }}
        onBackDropPress={() => setSorterVisible(false)}
        title="Ordenar Por"
      />
      {showResults && (
        <Animatable.View animation="fadeIn" style={{ height: "100%" }}>
          <ScrollView>
            <Box
              variant="container"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Box width={1 / 1}>
                <Image source={images.bannerCatalog} width={1 / 1} />
                <Box bg="dropDownBorderColor">
                  <Button p="nano">
                    <Box flexDirection="row">
                      <Icon name="Whatsapp" size={16} color="preto"></Icon>
                      <Box marginX="nano">
                        <Typography
                          color="preto"
                          fontFamily="nunitoSemiBold"
                          fontSize={11}
                        >
                          Chama no Whats! Seja atendido sem sair de casa.{" "}
                          <Typography
                            style={{ textDecorationLine: "underline" }}
                          >
                            Clique aqui!
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Button>
                </Box>
                <Box
                  paddingY="micro"
                  flexDirection="row"
                  justifyContent="center"
                >
                  <Box width={1 / 2}>
                    <Button
                      onPress={() => setFilterVisible(true)}
                      marginRight="nano"
                      marginLeft="micro"
                      borderRadius="nano"
                      borderColor="dropDownBorderColor"
                      borderWidth="hairline"
                      flexDirection="row"
                      inline={true}
                      height={40}
                    >
                      <Typography
                        color="preto"
                        fontFamily="nunitoSemiBold"
                        fontSize="14px"
                      >
                        Filtrar
                      </Typography>
                    </Button>
                  </Box>

                  <Box width={1 / 2}>
                    <Button
                      marginRight="micro"
                      marginLeft="nano"
                      borderRadius="nano"
                      borderColor="dropDownBorderColor"
                      borderWidth="hairline"
                      flexDirection="row"
                      inline={true}
                      height={40}
                      onPress={() => {
                        setSorterVisible(true);
                      }}
                    >
                      <Typography
                        color="preto"
                        fontFamily="nunitoSemiBold"
                        fontSize="14px"
                      >
                        Ordenar
                      </Typography>
                    </Button>
                  </Box>
                </Box>
                <Box
                  paddingX="micro"
                  paddingY="quarck"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography fontFamily="nunitoRegular" fontSize="13px">
                    127 produtos encontrados
                  </Typography>
                  {filterList.length > 0 && (
                    <Button onPress={() => setFilterList([])}>
                      <Typography
                        color="progressTextColor"
                        variant="precoAntigo3"
                        style={{ textDecorationLine: "underline" }}
                      >
                        Limpar tudo
                      </Typography>
                    </Button>
                  )}
                </Box>
                {filterList.length > 0 && (
                  <Box
                    px="micro"
                    flexDirection="row"
                    py="quarck"
                    flexWrap="wrap"
                  >
                    {filterList.map((item) => (
                      <Pill
                        key={item}
                        pillText={item}
                        onPress={() => {
                          const updateList = filterList.filter(
                            (tag) => tag !== item
                          );
                          setFilterList(updateList);
                        }}
                      />
                    ))}
                  </Box>
                )}
                <Box
                  p="micro"
                  flexDirection="row"
                  flex={1}
                  justifyContent="space-between"
                >
                  <ProductVerticalListCard
                    currency="R$"
                    discountTag={18}
                    imageSource={images.shirt3}
                    productTitle="CAMISETA BÁSICA RESERVA"
                    installmentsNumber={3}
                    installmentsPrice={99.9}
                    price={345.0}
                    priceWithDiscount={297.0}
                    isFavorited={true}
                    onClickImage={() => {
                      navigation.navigate("ProductDetail");
                    }}
                  />
                  <ProductVerticalListCard
                    currency="R$"
                    imageSource={images.shirt1}
                    productTitle="CAMISETA BÁSICA RESERVA"
                    installmentsNumber={3}
                    installmentsPrice={99.9}
                    price={345.0}
                    isFavorited={false}
                    onClickImage={() => {
                      navigation.navigate("ProductDetail");
                    }}
                  />
                </Box>
                <Box
                  p="micro"
                  flexDirection="row"
                  flex={1}
                  justifyContent="space-between"
                >
                  <ProductVerticalListCard
                    currency="R$"
                    discountTag={18}
                    imageSource={images.shirt4}
                    productTitle="CAMISETA BÁSICA RESERVA"
                    installmentsNumber={3}
                    installmentsPrice={99.9}
                    price={345.0}
                    priceWithDiscount={297.0}
                    isFavorited={true}
                    onClickImage={() => {
                      navigation.navigate("ProductDetail");
                    }}
                  />
                  <ProductVerticalListCard
                    currency="R$"
                    imageSource={images.shirt2}
                    productTitle="CAMISETA BÁSICA RESERVA"
                    installmentsNumber={3}
                    installmentsPrice={99.9}
                    price={345.0}
                    isFavorited={false}
                    onClickImage={() => {
                      navigation.navigate("ProductDetail");
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </ScrollView>
        </Animatable.View>
      )}
    </Box>
  );
};
