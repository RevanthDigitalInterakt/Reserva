import React from 'react';

import { SafeAreaView, ScrollView } from 'react-native';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Divider } from '../../../components/Divider/Divider';
import { ExpansePanel } from '../../../components/ExpansePanel/ExpansePanel';
import useOpenLink from '../../../hooks/useOpenLink';

const data = [
  {
    title: 'Posso customizar minha camisa com quantas linhas?',
    content:
      'A quantidade das linhas vai depender do tamanho da fonte, o texto deverá caber na área de impressão.',
    id: 1,
  },
  {
    title: 'Posso alterar o tamanho e a fonte?',
    content:
      'Enquanto o pedido está sendo feito, sim. Na lateral direita temos ferramentas para formação do texto.',
    id: 2,
  },
  {
    title: 'Consigo acentuar palavras e escolher caracteres especiais?',
    content:
      'É possível acentuar as palavras e escolher alguns caracteres especiais presentes no teclado do computador, além disso, disponibilizamos na nossa ferramenta na aba Imagem, uma galeria de várias opções de imagens.',
    id: 3,
  },
  {
    title: 'Qual a quantidade de letras ou palavras que posso utilizar?',
    content:
      'Na tela de criação é possível testar a quantidade de letras e palavras que a camiseta suporta. Fique atento à quebra de palavra nas linhas. A estampa da sua camiseta virá exatamente igual ao que foi feito na tela de personalização.',
    id: 4,
  },
  {
    title: 'A camiseta tem a logo da Reserva?',
    content:
      'Não. Já que você vai usar uma imagem sua junto com um texto seu, nós entendemos que esse é um produto só seu! A Reserva aqui é apenas a ferramenta que possibilita você dar asas à sua imaginação e criar uma camiseta que é exclusivamente sua.',
    id: 5,
  },
  {
    title: 'Qual o prazo de entrega?',
    content:
      "Ainda no carrinho, após inserir o produto, é possível verificar o prazo da sua entrega, basta informar o CEP no campo 'Inserir CEP'. Após a confirmação de pagamento, o produto leva até 2 dias úteis para ser produzido. Assim que sai de nossa fábrica é enviado imediatamente pra você de acordo com o tipo de frete escolhido.",
    id: 6,
  },
  {
    title: 'Minha camiseta será vendida no site?',
    content:
      'Não. A sua camiseta será produzida exclusivamente para você. Porém, mensalmente faremos uma seleção das melhores estampas de camisetas para formar uma galeria de escolhas da Reserva que poderão ser vendidas. Se a sua camiseta for escolhida, nós entraremos em contato com você para combinar.',
    id: 7,
  },
  {
    title: 'Quais imagens eu posso usar?',
    content:
      'Você pode usar as fotos postadas no seu perfil do instagram ou nos álbuns do seu facebook. Se preferir, pode fazer upload de outra imagem que esteja no seu computador.'
      + '\n\nOBS:'
      + '\n• Não é permitido o uso de nomes de marcas ou logomarcas, incluindo a Reserva e o pica-pau.'
      + '\n• Não é permitido o uso de imagem ou nome de celebridades.'
      + '\n• Não é permitido conteúdo de carácter político, religioso, violento ou que contenha partes de músicas ou livros.',
    id: 8,
  },
  {
    title: 'Posso trocar um produto customizado?',
    content:
      'Não é possível trocar os produtos personalizados, por isso antes de fechar o pedido confira o tamanho escolhido, imagens ou informações digitadas e customizações inseridas. Você pode devolver em até 7 dias após o recebimento do mesmo.',
    id: 9,
  },
  {
    title: 'Quais são as cores da camiseta?',
    content:
      'Vermelha estonada, verde, preta estonada, preta, mescla, branca, azul estonada, azul marinho.',
    id: 10,
  },
  {
    title: 'Posso comprar mais de uma camiseta com a mesma estampa?',
    content:
      'Sim. Se a camiseta for exatamente igual a camiseta que você está customizando agora, basta aumentar a quantidade na tela do produto.'
      + '\n\nCaso queira alterar a cor, tamanho ou modelo você deve inserir a primeira camiseta pronta na sacola de compras e depois começar uma nova customização.',
    id: 11,
  },
  {
    title: 'Alguém pode me ajudar a criar minha camiseta?',
    content:
      'Sim. Você pode entrar em contato pelo nosso whatsapp.'
      + '\nSegunda a Sexta: 08h às 20h Sábados: 08h às 18h',
    id: 12,
  },
  {
    title: 'Qual o tamanho e resolução ideal para usar uma imagem?',
    content: 'As suas imagens devem ter, no mínimo, 120 dpi.',
    id: 13,
  },
  {
    title: 'Posso alterar o tamanho da fonte?',
    content:
      'Sim. Você pode alterar o tamanho da letra, arrastando a caixa de texto sobre a camiseta. O estilo e cor da letra, você pode editar nos ícones da tela de customização.'
      + '\n\nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar na cartinha localizada em contatos do lado esquerdo desta página.',
    id: 14,
  },
];

export function FacaVc() {
  const openLink = useOpenLink();

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} pt="xs" paddingX="xxxs">
          <Box mb="nano" alignSelf="flex-start">
            <Box mb="nano">
              <Typography variant="tituloSessoes">FAÇA VC</Typography>
            </Box>
          </Box>
          <Box mb="nano">
            <Typography fontFamily="nunitoBold" fontSize={16}>
              Dúvidas gerais
            </Typography>
          </Box>
          {data.slice(0, 5).map((item) => (
            <Box key={item.id}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
          <Box mb="nano" mt="xxs">
            <Typography fontFamily="nunitoBold" fontSize={16}>
              Como funciona a customização do produto Faça Você?
            </Typography>
          </Box>
          {data.slice(5).map((item) => (
            <Box key={item.id}>
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
                onPress={() => openLink('urlWhatsapp')}
                style={{
                  textDecorationLine: 'underline',
                  paddingVertical: 4,
                }}
              >
                Whatsapp
              </Typography>
            </Box>
            <Typography
              fontFamily="nunitoRegular"
              fontSize={14}
              onPress={() => openLink('urlContact')}
              style={{ textDecorationLine: 'underline', paddingVertical: 4 }}
            >
              Fale conosco
            </Typography>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
