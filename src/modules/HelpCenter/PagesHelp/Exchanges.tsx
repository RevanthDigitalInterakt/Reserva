import React from "react";
import { useEffect } from "react";
import {SafeAreaView, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { Typography, Box, ExpansePanel, Divider } from "reserva-ui";
import { loadRequest } from "../../../store/ducks/repositories/actions";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const Exchanges = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRequest());
  }, []);

  const data = [
    {
      title: "Como realizar uma Troca ou Devolução?",
      content: `TROCA E DEVOLUÇÃO ATENÇÃO 23/03/2020: Estamos de olho nos impactos que o momento atual trás, com isso o prazo de troca e devolução foi ampliado para 60 dias. Seguimos juntos! 
                      \n\nO prazo para a troca ser solicitada é de até 60 dias corridos após o recebimento do produto. Caso você prefira devolver o produto o prazo é de até 60 dias corridos após o recebimento. Nos casos de defeito o prazo é de 120 dias após o recebimento do produto. 
                      \n\nPara solicitar, basta clicar conforme a foto abaixo em Troca grátis, localizada no canto direito inferior do site e em seguida em Realizar troca, fazer login, e selecionar o produto a ser trocado ou devolvido. Você também conseguirá trocar indo direto em 'minha conta' e clicando na opção Trocas de devoluções ou em Meus pedidos.`,
    },
    {
      title: "Como trocar produtos comprados em lojas Multimarcas?",
      content: ""
    },
    {
      title: "Como cancelar o pedido?",
      content: ""
    },
    {
      title: "É possível alterar o pedido após finalizado?",
      content: ""
    },
    {
      title: "Recebi um produto diferente do que eu comprei. Como proceder?",
      content: ""
    }
  ]

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} pt={"xs"} paddingX={"xxxs"}>
          <Box mb={"nano"} alignSelf={"flex-start"}>
            <Typography variant={"tituloSessoes"}>
              Trocas e devoluções
            </Typography>
          </Box>

          {data.map((item, key) => {
            return (
              <Box key={key}>
                <ExpansePanel information={{...item}}/>
                <Divider mt={"xxxs"} variant={"fullWidth"} />
              </Box>
            )
          })}

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
