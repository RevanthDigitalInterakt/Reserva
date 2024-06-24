import React from 'react';

import { SafeAreaView, ScrollView } from 'react-native';

import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Divider } from '../../../components/Divider/Divider';
import { ExpansePanel } from '../../../components/ExpansePanel/ExpansePanel';
import useOpenLink from '../../../hooks/useOpenLink';

const data = [
  {
    title: 'Como saber o tamanho do meu produto?',
    content:
      'Basta clicar em uma das seguintes opções dentro da tela do produto escolhido.'
      + '\n\nClicando na tabela de medidas, você verá o tamanho do produto em centímetros.'
      + '\n\nClicando em descubra o seu tamanho, você conseguirá saber o tamanho ideal do seu produto de acordo com suas medidas e peso atual.',
    id: 1,
  },
  {
    title: 'Como realizar uma compra no site?',
    content:
      '1 - Escolha o produto de sua preferência e adicione ao carrinho;\n'
      + '2 - Clique em fechar o pedido no seu carrinho de compras;\n'
      + '3 - Na próxima tela insira seu CPF ou E-mail e clique em fechar pedido;\n'
      + '4 - Insira seus dados, uma nova senha e o endereço para entrega;\n'
      + '5 - Selecione e preencha os dados para pagamento, e clique em finalizar o pagamento;\n'
      + '\nPronto, seu pedido será separado e enviado para o endereço que você escolheu!',
    id: 2,
  },
  {
    title: 'Como excluir um item da sacola',
    content:
      'Ao clicar em Minha Sacola no canto superior direito da tela, é possível ter acesso a todos os itens selecionados.'
      + '\n\nÀ direita de cada item existe um X que, ao clicar, a peça será excluída da sacola.',
    id: 3,
  },
  {
    title: 'Como funciona o desconto na primeira compra?',
    content:
      'Escolha os produtos de sua preferência, selecione a cor, o tamanho e adicione-os à sacola.'
      + '\n\nÉ necessário que você insira seu e-mail de cadastro, caso o site identifique que é um novo cadastro o desconto é liberado. O desconto é automático e apenas válido para compras acima do valor de R$150,00.'
      + '\n\nOBS: Não cumulativo com outras promoções, peças com desconto e compras de marcas parceiras.'
      + '\n\nOBS 2: Caso o desconto não entre de forma automática, tente utilizar o cupom RSVAPP50.',
    id: 4,
  },
];

export function Purchase() {
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
              <Typography variant="tituloSessoes">Compra</Typography>
            </Box>
          </Box>
          {data.map((item) => (
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
