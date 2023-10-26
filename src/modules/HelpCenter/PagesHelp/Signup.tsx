import React from "react";

import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Box, Typography } from "@usereservaapp/reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import Toast from "react-native-toast-message";

export const Signup: React.FC<{}> = () => {
  const screenWidth = Dimensions.get("window").width * 0.9;

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
            <Typography variant="tituloSessoes">Cadastro</Typography>
          </Box>
          <Box mb="xs" mt="micro" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Como cancelar o envio de e-mails promocionais?
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Para suspender os envios das nossas comunicações, basta clicar
                em descadastre-se localizado ao topo do e-mail que você recebeu
                e confirmar o cancelamento.
              </Typography>
              <Image
                source={require("../../../../assets/help/signup1.png")}
                style={{ width: screenWidth }}
                resizeMode="contain"
              />
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Caso o contato tenha sido através do WhatsApp, basta responder à
                mensagem recebida pedindo para suspender os contatos através
                deste canal.
              </Typography>
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Como se cadastrar no site?
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Para se cadastrar no site basta clicar no boneco na parte
                superior direita do site e selecionar a opção CADASTRE-SE.
              </Typography>
              <Image
                source={require("../../../../assets/help/signup2.png")}
                style={{ width: screenWidth }}
                resizeMode="contain"
              />
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Insira um E-mail que ainda não tenha um cadastro no site da
                Reserva, crie uma nova senha, complete as informações
                solicitadas, e pronto! Já pode aproveitar sua conta da Reserva.
              </Typography>
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Como excluir meu cadastro?
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Caso deseje cancelar o recebimento das nossas comunicações pelo
                whatsapp, e-mail ou SMS, basta entrar em contato conosco através
                da nossa{" "}
                <Typography
                  onPress={() => openLink(urlWhatsapp)}
                  style={{ textDecorationLine: "underline", color: "#000" }}
                >
                  central de relacionamento
                </Typography>{" "}
                (whatsApp - (21) 3609-2555) e nos informe os seguintes dados
                para que possamos inativar seu cadastro:
              </Typography>
              <Box mb="micro" mt="micro">
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  Nome Completo:
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  E-mail:
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  Telefone:
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  CPF:
                </Typography>
              </Box>
              <Box>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  Também precisaremos saber de quais canais você deseja o
                  descadastro:
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  (A) E-mail (Promoções e informações){" "}
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  (B) Telefone (SMS){" "}
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  (C) Contatos de loja{" "}
                </Typography>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  (D) Todos
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Esqueci minha senha, como proceder?
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Para solicitar uma nova senha, basta acessar "Minha conta" do
                site, clicar em "Autenticação" e clicar no botão “Redefinir
                Senha”.
              </Typography>
              <Image
                source={require("../../../../assets/help/signup3.png")}
                style={{ width: screenWidth }}
                resizeMode="contain"
              />
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Caso não consiga acessar sua conta, pode clicar em "Entrar com
                e-mail e senha" e selecionar a opção "Esqueci a minha Senha".
                serva.
              </Typography>
              <Image
                source={require("../../../../assets/help/signup4.png")}
                style={{ width: screenWidth }}
                resizeMode="contain"
              />
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Como alterar meu cadastro?
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Caso você queira alterar algum dado no seu cadastro, basta
                clicar no bonequinho no canto superior direito do site, fazer
                seu login, clicar em Dados Pessoais e Editar.
              </Typography>
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Não consigo acessar a minha conta, o que devo fazer?
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Caso você tenha esquecido a sua senha, ou seu e-mail, basta
                clicar no bonequinho no canto superior direito no site, e na
                sequência, clicar em esqueci meu e-mail, ou esqueci minha senha.
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Seu e-mail aparecerá na tela depois que você informar seu CPF e
                a data de nascimento, e caso você tenha esquecido a senha, ela
                será enviada para seu e-mail de cadastro.
              </Typography>
              <Image
                source={require("../../../../assets/help/signup5.png")}
                style={{ width: screenWidth }}
                resizeMode="contain"
              />
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
            <Box mb="nano">
              <Typography fontFamily="nunitoBold" fontSize={16}>
                Como alterar o endereço de entrega
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Durante o processo de finalização do pedido, você pode alterar o
                seu endereço clicando em “editar”, logo abaixo do endereço já
                cadastrado.
              </Typography>
            </Box>
            <Box mb="nano">
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Caso o pedido já tenha sido finalizado, é necessário entrar em
                nossa central de atendimento para solicitar a troca. Neste caso,
                só é possível mudar o endereço de entrega para outro dentro da
                mesma cidade.
              </Typography>
            </Box>
          </Box>
          <Box mb="xs" alignSelf="flex-start">
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
};
