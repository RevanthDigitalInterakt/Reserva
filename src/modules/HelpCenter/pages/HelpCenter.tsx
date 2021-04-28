import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import ItemListHelp from "../Components/ItemListHelp";

export const HelpCenter: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const data = [
    {
      title: 'Guia de Tamanhos', navigate: 'SizeGuide'
    },
    { title: 'Cuidados com a roupa' },
    { title: 'Trocas e devoluções' },
    { title: 'Pedidos e entregas' },
    { title: 'Formas de pagamento' },
    { title: 'Dúvidas Frequentes' },
    { title: 'Política de privacidade' },
    { title: 'Termos de Uso' },
    { title: 'Meu Cartão Presente' },
    { title: 'Fale Conosco' },
  ];

  const [filter, setFilter] = useState(data);

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

        <Box flex={1} alignContent={"flex-start"} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={'micro'} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>Central de ajuda</Typography>
          </Box>

          <Box mb={"micro"} mt={"xxxs"}>
            <TextField
              label={"Buscar"}
              value={search}
              onChangeText={(text) => {
                setSearch(text);
                const newFilter = data.filter((item) => {
                  return item.title.indexOf(text) > -1;
                });
                setFilter(newFilter);
              }}
              iconRight={
                <Box ml="nano">
                  <Icon color="neutroFrio2" name="Search" size={25} />
                </Box>
              }
              placeholder={"Buscar" }
            />
          </Box>

          <ScrollView>
            <Box mb={"micro"} flex={1}>
              {filter.map((item, key) => {
                return <ItemListHelp key={key} title={item.title} onPress={() => {
                  navigation.navigate(item.navigate);
                }} />
              })}              
            </Box>
          </ScrollView>
        </Box>
    </SafeAreaView>
  );
};
