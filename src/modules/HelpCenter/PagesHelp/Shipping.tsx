import React from "react";

import { Image, Linking, SafeAreaView, ScrollView } from "react-native";

import Toast from "react-native-toast-message";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { Box } from "../../../components/Box/Box";
import { Typography } from "../../../components/Typography/Typography";
import { Divider } from "../../../components/Divider/Divider";
import { ExpansePanel } from "../../../components/ExpansePanel/ExpansePanel";

export const Shipping: React.FC<{}> = () => {
  const data = [
    {
      title: "Posso pedir prioridade na minha entrega?",
      content:
        "Nossos prazos estão adequados ao nosso tempo de produção, separação, e tempo de entrega da transportadora, por isso, ele pode variar de acordo com a sua região e o produto comprado." +
        "\n\nCaso deseje solicitar a prioridade para algum pedido, você pode entrar em contato com o nosso time de Encantadores, mas não podemos garantir que será entregue na data desejada.",
    },
    {
      title: "Em caso de ausência no local de entrega, o que acontece?",
      content:
        "Caso ninguém possa receber o pedido no momento da entrega, uma nova tentativa é feita no dia seguinte. Caso essa nova tentativa também falhe, o pedido retorna para o nosso Centro de Distribuição.",
    },
    {
      title: "O que verificar no ato da entrega?",
      content:
        "Ao receber o pedido, confira se a embalagem não está violada e se os produtos correspondem ao que foi solicitado em nosso site.",
    },
    {
      title: "A Reserva entrega em todo Brasil?",
      content:
        "Os produtos da Reserva são entregues em todo o Brasil. Você pode simular o valor do frete e o prazo de entrega no ato da compra.",
    },
    {
      title: "Posso agendar a entrega?",
      content:
        "Não é possível agendar a data e/ou horário para entrega de pedidos.",
    },
    {
      title: "A Reserva entrega nos fins de semana e feriados?",
      content:
        "Nossa logística não funciona nos domingos e feriados. Caso sua encomenda já tenha saído do nosso Centro de Distribuição, a entrega poderá ocorrer de segunda a sábado, exceto nos feriados.",
    },
    {
      title: "Qual o horário de entrega?",
      content:
        "Nossas entregas acontecem dentro do horário comercial entre 9h e 18h de segunda a sábado, exceto feriados.",
    },
    {
      title: "Meu pedido está atrasado. Como proceder?",
      content:
        "Você pode conferir se o seu pedido realmente está fora do prazo de entrega através do e-mail de confirmação do seu pedido, lembrando que o prazo começa a contar a partir da aprovação do pagamento do pedido." +
        "\n\nSe o prazo informado para entrega, após a confirmação do pagamento, estiver expirado, por favor nos informe. Nós devolveremos o valor pago no frete e agilizaremos o seu pedido da melhor forma.",
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
            <Box mb={"nano"}>
              <Typography variant="tituloSessoes">Entrega</Typography>
            </Box>
          </Box>
          <Box mb="xxs">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Como acompanhar a minha entrega?
              </Typography>
            </Box>
            <Box>
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Para acompanhar a entrega do seu pedido, basta clicar em 'Minha
                conta' no canto superior direito do nosso site, fazer login e
                clicar em 'Meus pedidos'.
              </Typography>
              <Image
                source={require("../../../../assets/help/shipping1.png")}
                style={{ width: "100%" }}
                resizeMode="contain"
              />
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Selecione seu pedido que apresentará um dos seguintes status:
              </Typography>
              <Image
                source={require("../../../../assets/help/shipping2.png")}
                style={{ width: "100%" }}
                resizeMode="contain"
              />
              <Box mb="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  <Typography fontFamily="nunitoBold">Realizada -</Typography>{" "}
                  Quer dizer que seu pedido foi realizado mas o pagamento ainda
                  não foi autorizado pelo seu cartão de crédito.
                </Typography>
              </Box>
              <Box mb="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  <Typography fontFamily="nunitoBold">Autorizada -</Typography>{" "}
                  Quer dizer que o pagamento já foi autorizado e que seu pedido
                  está sendo separado ou produzido.
                </Typography>
              </Box>
              <Box mb="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  <Typography fontFamily="nunitoBold">Faturada -</Typography>{" "}
                  Quer dizer que seu pedido está pronto e está em processo de
                  expedição.
                </Typography>
              </Box>
              <Box mb="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  <Typography fontFamily="nunitoBold">Enviada -</Typography>{" "}
                  Significa que seu pedido foi enviado. Agora basta clicar na
                  parte de baixo da tela em RASTREAR PEDIDO e acompanhar a sua
                  entrega.
                </Typography>
              </Box>
              <Box mb="nano">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  <Typography fontFamily="nunitoBold">Entregue -</Typography>{" "}
                  Significa que seu pedido foi entregue no local que você
                  escolheu.
                </Typography>
              </Box>
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                <Typography fontFamily="nunitoBold">Observação:</Typography>{" "}
                Caso seu pedido esteja com o status de realizado, autorizado ou
                faturado você ainda não conseguirá clicar em rastrear pedido, já
                que o mesmo ainda está em processo de expedição no nosso centro
                de distribuição.
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
