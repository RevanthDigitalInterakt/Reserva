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

export const Cashback: React.FC<{}> = () => {
  const data = [
    {
      title: "Todas as compras recebem cashback?",
      content:
        "Sim. Todas as compras realizadas em lojas Reserva, Mini, Go e Reversa, além de site e app, receberão o % vigente de cashback.",
    },
    {
      title: "Qual é o valor do cashback?",
      content:
        "O valor de cashback aplicado está em 20% para todas as compras, podendo sofrer alterações para mais ou menos, mediante mudanças de políticas comerciais. O % estará sempre disponível para consulta.",
    },
    {
      title:
        "O cashback é gerado com base no valor do pedido com ou sem desconto?",
      content:
        "Independente da forma de pagamento, o acúmulo de cashback é gerado conforme o valor pago pelo cliente.\n\nQuando houver utilização de vale para pagamento da compra, o valor do vale será deduzido ou seja: Cliente fez uma compra de R$100,00 e usou R$20 de vale, gift card ou cashback, o acúmulo de cashback incidirá nos R$80 restantes.",
    },
    {
      title:
        "Os valores de cashback têm percentuais iguais ou diferentes entre os produtos?",
      content:
        "Eles podem variar caso haja alguma campanha específica em produtos, marcas ou linhas especiais.",
    },
    {
      title: "Quanto tempo o cashback demora pra ficar disponível?",
      content:
        "O cashback será liberado para uso em até 48h após aprovação da compra.",
    },
    {
      title: "O que é cashback pendente?",
      content:
        "É o status que ele consta dentro do período de até 48h que é considerado para entrada do benefício.",
    },
    {
      title: "Como fico sabendo que meu cashback está disponível?",
      content:
        "Você receberá um SMS avisando. Além disso, pode sempre consultar em sua carteira, dentro do seu perfil no site ou aplicativo Reserva, através do seguinte caminho:\n" +
        "\nSITE: Clicar no boneco no canto superior direito -> Minha carteira" +
        "\nAPP: Clicar em perfil -> Meus Cashbacks -> Ver minha carteira",
    },
    {
      title:
        "Depois que o cashback ficar disponível, qual é o prazo de utilização?",
      content:
        "A validade do cashback, tanto adquirido em loja quanto no site e app, é de 30 dias corridos após liberação.",
    },
    {
      title: "O que acontece se eu devolver ou cancelar minha compra?",
      content:
        "O cashback voltará para a sua carteira dentro do prazo de até 48 horas.",
    },
    {
      title:
        "Se eu tiver saldo suficiente, posso pagar o pedido integralmente com cashback?",
      content: "Não, o teto de utilização é até 25% do valor total do pedido.",
    },
    {
      title:
        "Existe algo que não pode ser comprado com cashback no site e app?",
      content:
        "Apenas a Assinatura Prime e Cartão Presente não podem ser pagos com o cashback.",
    },
    {
      title: "Posso usar o cashback para pagar o frete dos meus pedidos?",
      content: "Não, o frete não é contabilizado para utilização do cashback.",
    },
    {
      title: "O cashback é válido com outras promoções e ações com cupom?",
      content:
        "Depende. Isso pode variar de acordo com a regra comercial de cada ação/campanha. O direcionamento é sempre ler o regulamento.",
    },
    {
      title:
        "O saldo do cashback pode ser utilizado junto com o valor do vale compras?",
      content:
        "Sim, ambos entram na sua carteira e podem ser somados para que você utilize em outra compra.",
    },
    {
      title: "Posso transferir meu cashback para outra pessoa?",
      content:
        "Não, além de pessoal e intransferível, é importante ressaltar que o CPF é sua chave para vincular o cashback à sua conta.",
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
              <Typography variant="tituloSessoes">Cashback</Typography>
            </Box>
          </Box>
          <Box mb="xxs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={20}>
                Novas regras do cashback
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Nas compras Reserva você irá receber um total de 20% do valor do
                pedido em forma de cashback. Ao realizar uma nova compra você
                poderá utilizar o cashback para pagar até 25% do valor do novo
                pedido. O cashback ficará disponível até 48 horas após a compra
                e poderá ser utilizado até 30 dias após a disponibilidade. Ele
                pode ser utilizado em compras na loja, site e aplicativo.
              </Typography>
            </Box>
          </Box>
          <Box mb="xxs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Regra para acúmulo do cashback:
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Independente da forma de pagamento, o acúmulo de cashback é
                gerado conforme o valor pago pelo cliente.
              </Typography>
              <Box mt="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  Quando houver utilização de vale para pagamento da compra, o
                  valor do vale será deduzido ou seja: Cliente fez uma compra de
                  R$100,00 e usou R$20 de vale, gift card ou cashback, o acúmulo
                  de cashback incidirá nos R$80 restantes.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mb="xxs" alignSelf="flex-start">
            <Box>
              <Typography fontFamily="nunitoBold" fontSize={20}>
                Dúvidas sobre o cashback
              </Typography>
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
