import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, Button, TextField, Icon, Image, ExpansePanel } from "reserva-ui";
import { images } from "../../../assets";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const Exchanges: React.FC<{}> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

      <ScrollView>
        <Box flex={1} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"micro"} alignSelf={"flex-start"}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
            Trocas e devoluções
            </Typography>
          </Box>


          <ExpansePanel information={{
            title: "Como realizar uma Troca ou Devolução?",
            content: `TROCA E DEVOLUÇÃO ATENÇÃO 23/03/2020: Estamos de olho nos impactos que o momento atual trás, com isso o prazo de troca e devolução foi ampliado para 60 dias. Seguimos juntos! 
                      \n\nO prazo para a troca ser solicitada é de até 60 dias corridos após o recebimento do produto. Caso você prefira devolver o produto o prazo é de até 60 dias corridos após o recebimento. Nos casos de defeito o prazo é de 120 dias após o recebimento do produto. 
                      \n\nPara solicitar, basta clicar conforme a foto abaixo em Troca grátis, localizada no canto direito inferior do site e em seguida em Realizar troca, fazer login, e selecionar o produto a ser trocado ou devolvido. Você também conseguirá trocar indo direto em 'minha conta' e clicando na opção Trocas de devoluções ou em Meus pedidos.`,
          }} />

          <ExpansePanel information={{
            title: "Como trocar produtos comprados em lojas Multimarcas?",
            content: ""
          }} />

          <ExpansePanel information={{
            title: "Como cancelar o pedido?",
            content: ""
          }} />

          <ExpansePanel information={{
            title: "É possível alterar o pedido após finalizado?",
            content: ""
          }} />

          <ExpansePanel information={{
            title: "Recebi um produto diferente do que eu comprei. Como proceder?",
            content: ""
          }} />

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
