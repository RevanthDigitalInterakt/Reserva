import React from "react";

import { Linking, SafeAreaView, ScrollView } from "react-native";

import Toast from "react-native-toast-message";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { Box } from "../../../components/Box/Box";
import { Typography } from "../../../components/Typography/Typography";
import { Divider } from "../../../components/Divider/Divider";
import { ExpansePanel } from "../../../components/ExpansePanel/ExpansePanel";

export function FrequentDoubts() {
  useEffect(() => {}, []);

  const data = [
    {
      title: "Parcerias",
      content:
        "Caso você queira fazer algum tipo de parceria entre em contato com nosso time através do e-mail contato.marketing@usereserva.com enviando sua proposta detalhada e o material.",
    },
    {
      title: "Promoção para aniversariante",
      content:
        "No seu mês de aniversário, você tem desconto de 10% em todas as lojas e no site. Basta efetuar login e realizar a compra normalmente. O desconto será exibido no momento de finalizar o pedido." +
        "\n\nO desconto não é cumulativo com outras promoções, Marcas parceiras e na compra de cartão presente.",
    },
    {
      title: "Como faço para ser um revendedor Reserva?",
      content:
        "Adoramos saber que você acredita em nossa família e tem interesse em fazer parte dela!" +
        "\n\nSe você tem loja física e CNPJ, pode se tornar um parceiro revendedor da família Reserva!" +
        "\n\nPra ser um revendedor, você pode enviar uma mensagem pra nossa galera do atacado pelo link abaixo, enviando as seguintes informações:" +
        "\n\nhttps://wa.me/5521992638524\n" +
        "\n- Marca de seu interesse de revenda (Mini, Reserva, Eva)" +
        "\n- Fotos de sua loja." +
        "\n- CNPJ",
    },
    {
      title: "Como entrar em contato com as Lojas Físicas?",
      content:
        "Para falar com nossas Lojas Físicas, escolha a loja mais próxima da sua residência e ligue para o telefone disponível nessa lista:" +
        "\n\nhttps://www.usereserva.com/usereserva/page/lojas" +
        "\n\nSerá um prazer conversar com você!",
    },
    {
      title: "Qual o horário de atendimento das lojas?",
      content:
        "Aqui o link com os endereços, telefones e horário de todas as nossas lojas:" +
        "\nhttps://www.usereserva.com/lojas",
    },
    {
      title: "Quer trabalhar conosco?",
      content:
        "Ficamos muito felizes em saber que você quer trabalhar com a gente!" +
        "\n\nPara consultar as vagas disponíveis, basta acessar o site https://trabalheconosco.vagas.com.br/grupo-reserva/ e cadastrar o seu currículo.",
    },
  ];

  const urlWhatsapp =
    "https://api.whatsapp.com/send/?phone=552136092555&text&type=phone_number&app_absent=0";

  const urlContact = "https://usereserva.zendesk.com/hc/pt-br/requests/new";

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Toast.show({
        type: "error",
        text1: "Algo deu errado",
        text2: "Tente novamente",
      });
    }
  };

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: "space-between" }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} pt="xs" paddingX="xxxs">
          <Box mb="nano" alignSelf="flex-start">
            <Typography variant="tituloSessoes">Dúvidas frequentes</Typography>
          </Box>

          {data.map((item) => (
            <Box key={item.title}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
          <Box mb="xs" mt="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Ficou com alguma dúvida? 😉
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Um de nossos encantadores pode te ajudar, basta acessar um dos
                links abaixo:
              </Typography>
            </Box>
            <Box mb={"nano"}>
              <Typography
                fontFamily="nunitoRegular"
                fontSize={14}
                onPress={() => openLink(urlWhatsapp)}
                style={{
                  textDecorationLine: "underline",
                  paddingVertical: 4,
                }}
              >
                Whatsapp
              </Typography>
            </Box>
            <Typography
              fontFamily="nunitoRegular"
              fontSize={14}
              onPress={() => openLink(urlContact)}
              style={{ textDecorationLine: "underline", paddingVertical: 4 }}
            >
              Fale conosco
            </Typography>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
