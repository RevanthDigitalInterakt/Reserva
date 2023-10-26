import React from "react";

import { Linking, SafeAreaView, ScrollView } from "react-native";

import Toast from "react-native-toast-message";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { Box } from "../../../components/Box/Box";
import { Typography } from "../../../components/Typography/Typography";
import { Divider } from "../../../components/Divider/Divider";
import { ExpansePanel } from "../../../components/ExpansePanel/ExpansePanel";

export const PrivacyPolicy: React.FC<{}> = () => {
  const data = [
    {
      title: "Minha compra online é segura?",
      content:
        "A Reserva assegura o compromisso com a privacidade e a segurança de seus clientes durante todo o processo de navegação e compra no site. Os dados cadastrais dos clientes não são vendidos, trocados ou divulgados para terceiros, exceto quando essas informações são necessárias para o processo de entrega ou para cobrança. Seus dados pessoais são peça fundamental para que seu pedido chegue em segurança." +
        "\n\nOs dados de cartão de crédito são protegidos por tecnologia de segurança internacional e as informações são armazenadas e compartilhadas de forma criptografada.",
    },
    {
      title: "Política de Privacidade",
      content:
        "Aqui na Reserva, temos uma equipe de segurança dedicada 24hs a proteger nosso site de ataques e invasões, bem como os dados privados de cada um de nossos clientes." +
        "\n\nTodos os nossos bancos de dados são protegidos e temos como compromisso com nossos clientes, não deixar vazar qualquer tipo de informações pessoais como: endereço, CPF, senhas etc. Os e-mails e dados cadastrados serão utilizados apenas pela Reserva para informar a você sobre as nossas promoções e novidades. E o mais importante: somente com a sua autorização." +
        "\n\nO compartilhamento de informações pessoais dos nossos clientes só pode acontecer, única e exclusivamente sob ordens judiciais a título de investigações, bem como a pedido do próprio cliente." +
        "\n\nAh! É sempre bom lembrar que, para preservar seus dados de invasões de terceiros, aconselhamos que nossos clientes alterem suas senhas com relativa freqüência e evitem utilizar combinações óbvias! Portanto, esqueça a sua data de aniversário, use a criatividade e invista numa senha segura." +
        "\n\nA Reserva utiliza Cookies durante sua navegação de forma que toda vez que você fizer seu login, suas informações de navegações anteriores fiquem gravadas e tornem sua usabilidade cada vez melhor. Os cookies são pequenos arquivos, não maliciosos, que são guardados no seu computador e nos ajudam a tornar sua navegação mais legal! Aconselhamos que, para ter melhores experiências com nosso eCommerce, ative a opção de armazenamento de Cookies no seu navegador.",
    },
    {
      title: "Política de Segurança",
      content:
        "Toda a tecnologia do nosso e Commerce é focada, além da boa funcionalidade, na segurança dos dados dos usuários, incluindo informações pessoais e de pagamento." +
        "\n\nAqui, você pode inserir seus dados de cartão com a segurança de que eles não vão ser utilizados de forma indevida." +
        "\n\nTodas as informações de pagamento e cartões de crédito utilizam o formato SSL (Navegação Segura) onde seus dados são criptografados de uma forma única, fazendo assim com que só o sistema possa interpretar seus dados e protegendo-os da invasão de invasores mal intencionados." +
        "\n\nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar na cartinha localizada em contatos do lado esquerdo desta página.",
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
              <Typography variant="tituloSessoes">
                Política de privacidade e Termos de uso
              </Typography>
            </Box>
          </Box>
          {data.slice(0, 1).map((item, key) => (
            <Box key={key}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
          <Box mt="xxs">
            <Typography fontFamily="nunitoBold" fontSize={16}>
              Termos de uso
            </Typography>
            {data.slice(1).map((item, key) => (
              <Box key={key}>
                <ExpansePanel information={{ ...item }} />
                <Divider mt="xxxs" variant="fullWidth" />
              </Box>
            ))}
          </Box>
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
