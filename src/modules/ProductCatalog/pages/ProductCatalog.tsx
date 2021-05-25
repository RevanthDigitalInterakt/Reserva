import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Icon,
  Image,
  Picker,
  Pill,
  SearchBar,
  theme,
  Typography,
} from "reserva-ui";
import { images } from "../../../assets";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { ApplicationState } from "../../../store";
import {
  cleanProducts,
  loadProducts,
} from "../../../store/ducks/products/actions";
import { TopBarDefault } from "../../Menu/components/TopBarDefault";
import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton";
import { ListVerticalProducts } from "../components/ListVerticalProducts/ListVerticalProducts";
import { FilterModal } from "../modals/FilterModal";

type Props = StackScreenProps<RootStackParamList, "ProductCatalog">;

export const ProductCatalog: React.FC<Props> = ({ route, navigation }) => {
  const { safeArea, search, categoryId } = route.params;

  // Alert.alert(JSON.stringify(categoryId));

  const dispatch = useDispatch();

  const [filterVisible, setFilterVisible] = useState(false);
  const [sorterVisible, setSorterVisible] = useState(false);
  const [filterList, setFilterList] = useState<string[]>([]);
  // const [offset, setOffset] = useState(0)
  const products = useSelector((state: ApplicationState) => state.products);
  const loadMoreProducts = (offset: number) => {
    console.log("loading more");
    dispatch(
      loadProducts({
        categoryId: categoryId || "",
        limit: 10,
        offset: offset,
      })
    );
  };

  useEffect(() => {
    console.log("products", products);
    dispatch(cleanProducts());
    loadMoreProducts(0);
  }, []);

  useEffect(() => {
    console.log("products", products);
    dispatch(cleanProducts());
    loadMoreProducts(0);
  }, [categoryId]);

  const DynamicComponent = safeArea ? SafeAreaView : Box;
  return (
    <DynamicComponent style={{ backgroundColor: theme.colors.white }} flex={1}>
      {safeArea ? (
        <TopBarDefaultBackButton loading={products.loading} />
      ) : (
        <TopBarDefault loading={products.loading} />
      )}
      {search && (
        <Box paddingX="nano" paddingBottom="micro" paddingTop="micro">
          <SearchBar height={36} placeholder="Buscar" />
        </Box>
      )}
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

      <ListVerticalProducts
        loadMoreProducts={loadMoreProducts}
        products={products.dataOffer}
        listHeader={
          <>
            <Image
              source={
                safeArea || search ? images.bannerCatalog : images.bannerOffer
              }
              width={1 / 1}
            />
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
                      <Typography style={{ textDecorationLine: "underline" }}>
                        Clique aqui!
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Button>
            </Box>
            <Box paddingY="micro" flexDirection="row" justifyContent="center">
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
                {products?.dataOffer?.length} produtos encontrados
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
              <Box px="micro" flexDirection="row" py="quarck" flexWrap="wrap">
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
          </>
        }
      />
    </DynamicComponent>
  );
};
