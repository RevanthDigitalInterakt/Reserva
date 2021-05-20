import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  Button,
  TextField,
  Icon,
  SearchBar,
} from "reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import ItemListHelp from "../Components/ItemListHelp";

export const HelpCenter: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const data = [
    { title: "Guia de Tamanhos", navigate: "SizeGuide" },
    { title: "Cuidados com a roupa", navigate: "ClothingCare" },
    { title: "Trocas e devoluções", navigate: "Exchanges" },
    { title: "Pedidos e entregas", navigate: "" },
    { title: "Formas de pagamento", navigate: "" },
    { title: "Dúvidas Frequentes", navigate: "" },
    { title: "Política de privacidade", navigate: "" },
    { title: "Termos de Uso", navigate: "" },
    { title: "Meu Cartão Presente", navigate: "" },
    { title: "Fale Conosco", navigate: "ContactUs" },
  ];

  const [filter, setFilter] = useState(data);

  useEffect(() => {}, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
        <Box mb={"nano"} alignSelf={"flex-start"}>
          <Typography variant={"tituloSessoes"}>Central de ajuda</Typography>
        </Box>

        <Box mb={"micro"} mt={"xxxs"}>
          <SearchBar
            height={36}
            placeholder="Buscar"
            onValueChange={(text) => {
              setSearch(text);
              const newFilter = data.filter((item) => {
                return item.title.indexOf(text) > -1;
              });
              setFilter(newFilter);
            }}
          />
        </Box>

        <ScrollView>
          <Box mb={"micro"} flex={1}>
            {filter.map((item, key) => {
              return (
                <ItemListHelp
                  key={key}
                  title={item.title}
                  onPress={() => {
                    navigation.navigate(item.navigate);
                  }}
                />
              );
            })}
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};
