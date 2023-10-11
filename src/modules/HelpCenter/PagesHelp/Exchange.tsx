import React from "react";

import { Linking, SafeAreaView, ScrollView } from "react-native";
import {
  Box,
  Divider,
  ExpansePanel,
  Typography,
} from "@usereservaapp/reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import Toast from "react-native-toast-message";

export const Exchange: React.FC<{}> = () => {
  const data = [
    {
      title: "Como realizar uma Troca ou Devolução?",
      content:
        "TROCA EM LOJA" +
        "\nPara a sua comodidade todos os produtos adquiridos em nosso site poderão ser trocados em nossas lojas físicas próprias dentro de até 7 dias corridos desde o recebimento do pedido, porém não devolvidos." +
        "\n\nLembramos que produtos comprados em lojas físicas não poderão ser trocados no site, é necessário ir até as lojas para realizar a troca." +
        "\n\n\nPROCESSO PELO SITE" +
        "\nO prazo para a troca e devolução serem solicitadas é de até 60 dias corridos após o recebimento do produto. Nos casos de defeito o prazo é de 120 dias após o recebimento." +
        "\n\nPara solicitar, basta clicar no link: https://lojausereserva.troquefacil.com.br/order, inserir o número completo do seu pedido e o e-mail utilizado para fazer a compra. " +
        "\n\nEntão basta selecionar o produto que deseja, selecionar a ação que deseja:" +
        "\n\nAção Trocar: É gerado um vale crédito, com validade de 12 meses, no valor pago pelo produto." +
        "\nAção Devolver: É solicitado o reembolso/estorno do valor pago, na mesma modalidade utilizada no pagamento do pedido." +
        "\n\nVocê receberá por e-mail uma autorização de postagem com as informações para envio. A postagem é por nossa conta, desde que seja realizada com a autorização que geramos para você. A postagem deve ser feita dentro do prazo informado na autorização." +
        "\n\nOs produtos deverão estar com a etiqueta fixada e deverão ser enviados com a nota fiscal." +
        "\n\nApós a postagem dos produtos nos correios, nós aguardamos a chegada em nosso centro de distribuição. A cada etapa do processo você receberá um e-mail com o status da sua solicitação." +
        "\n\nConfirmado o recebimento em nosso estoque, eles serão direcionados para a análise do nosso departamento de qualidade, que tem o prazo de 7 dias úteis para que o processo seja finalizado." +
        "\n\nCaso a análise do nosso departamento de qualidade seja aprovada, finalizamos o processo da forma que foi solicitado pelo cliente." +
        "\n\nNo caso de produtos devolvidos sem prévia comunicação, fora do prazo, com ausência ou divergência dos itens, sem a etiqueta ou nota fiscal, eles serão reenviados aos clientes." +
        "\n\n\nPONTOS IMPORTANTES" +
        "\n\nPeças íntimas: Para sua segurança, não realizamos troca de peças íntimas e máscaras de proteção." +
        "\n\nCosméticos: Somente aceitamos a troca de produtos que não tiverem a embalagem violada e estiverem dentro da validade." +
        "\n\nRelógios: Para troca por defeito, entre em contato com nossa central de atendimento informando os dados da compra e enviando uma foto da garantia do produto e da nota fiscal de compra. Iremos abrir uma solicitação junto à fabricante do relógio." +
        "\n\nProdutos comprados em multimarcas ou marketplaces: Para troca desses produtos é necessário entrar em contato com a loja/site onde o produto foi adquirido." +
        "Produtos personalizados pelo Faça Você: Como esses produtos são personalizados exclusivamente para você, eles não podem ser trocados. Essa informação está localizada no termo de uso da ferramenta e precisa ser aceita antes de começar a personalização.",
    },
    {
      title:
        "Posso trocar um produto Reserva comprado nas lojas AMERICANAS, SUBMARINO, SHOPTIME, NETSHOES, ZATTINI, AMAZON ou MERCADO LIVRE?",
      content:
        "Para compras feitas nos nossos parceiros de Marketplace, orientamos que entrem em contato pela plataforma da própria loja parceira, acesse a sua conta no site e solicite a troca/cancelamento." +
        "\n\nO prazo para a troca pode variar de acordo com o site que você realizou a compra.",
    },
    {
      title: "Recebi um produto diferente do que comprei, como proceder?",
      content:
        "No caso de receber um produto diferente do comprado, você deve solicitar a troca do pedido em loja ou através do link https://lojausereserva.troquefacil.com.br/order." +
        "\n\nEsse processo é similar ao de troca/devolução e você acompanha o andamento através das comunicações por e-mail.",
    },
    {
      title: "Meu produto veio com defeito/avaria. Como proceder?",
      content:
        "Caso você receba o produto com alguma forma de defeito ou avaria, deve solicitar a troca do produto através do link https://lojausereserva.troquefacil.com.br/order." +
        "\n\nExiste um prazo de até 120 dias para a troca ou devolução do produto defeituoso.",
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
        type1: "Algo deu errado",
        type2: "Tente novamente",
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
            <Box mb={"nano"}>
              <Typography variant="tituloSessoes">Troca e devolução</Typography>
            </Box>
          </Box>
          {data.map((item, key) => (
            <Box key={key}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
          <Box mb="xxs" mt="xxs" alignSelf="flex-start">
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
            <Box mb="nano">
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
};
