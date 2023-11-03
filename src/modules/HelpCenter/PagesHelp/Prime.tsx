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
    title: 'Afinal, o que é o Reserva Prime?',
    content: `É o novo clube de vantagens para o cliente reserva. Onde vamos concentrar benefícios exclusivos, como: 
    \n• Descontos nas nossas marcas;\n• Frete grátis para compras online;\n• Parcerias com marcas iradas pro dia a dia do cliente.`,
    id: 1,
  },
  {
    title: 'E quanto custa para ter acesso a isso?',
    content: `Para ter acesso a tudo isso, o valor é 12 x de R$25,00. E detalhe! O valor da mensalidade volta INTEIRO em cashback, todo mês, pra poder aproveitar e garantir novidades sempre.
  `,
    id: 2,
  },
  {
    title: 'O que ganho fazendo parte deste programa?',
    content:
      '• 20% off nas compras acima de R$499;\n\n'
      + '• Frete grátis sem mínimo para toda compra digital;\n\n'
      + '• R$25 reais de cashback mensal - a mensalidade todinha de volta!\n\n'
      + '• Participação nos eventos exclusivos (dias prime, experiências...);\n\n'
      + '• Parcerias com marcas exclusivas;\n\n'
      + '• Atendimento exclusivo.',
    id: 3,
  },
  {
    title:
      'Pode usar na loja e no site? Só na Reserva ou para outras marcas também?',
    content:
      'É possível usar na loja, no site e no app. Vale para as marcas Mini, Go, Reversa e Reserva',
    id: 4,
  },
  {
    title: 'Se eu quiser comprar o Prime de presente, é possível?',
    content:
      'Claro! Aliás, é um presentão, né? Mas um ponto importante: o benefício fica vinculado ao CPF da compra, então para presentear é importante ter em mãos CPF e nome daquele que será beneficiado com esse presente.',
    id: 5,
  },
  {
    title: 'Como funciona o cashback do Prime?',
    content:
      'Ao assinar o nosso serviço Prime por 12x de R$25,00, você terá direito a receber um cashback no valor de R$25,00 no primeiro dia útil, todo mês. No entanto, é importante esclarecer que esse cashback não é acumulativo, ou seja, ele não se acumula de um mês para o outro (sendo válido por 30 dias).\n\nO cashback é uma forma de recompensá-lo pelo uso contínuo do nosso serviço Prime. A cada mês que você estiver utilizando o Prime, seu cashback será renovado e você poderá utilizá-lo em compras no nosso site. Para utilizar o cashback, basta seguir os passos abaixo:\n\n'
      + '• Faça login no nosso site;\n'
      + '• Navegue pelo site e adicione os produtos desejados ao seu carrinho de compras;\n'
      + '• Durante o processo de finalização da compra, você terá a opção de usar o cashback disponível. Selecione essa opção e o valor do cashback será deduzido do total da sua compra.',
    id: 6,
  },
  {
    title: 'Exemplo de uso do Cashback',
    content:
      'Independente da forma utilizada para o pagamento do pedido, o acúmulo de cashback (que são gerados pelas compras feitas no site e no app) é sobre o valor pago pelo cliente.\n\nQuando houver utilização de vale para pagamento da compra, o valor do vale será deduzido ou seja: Cliente fez uma compra de R$100,00 e usou R$20 de vale, gift card ou cashback, o acúmulo de cashback incidirá nos R$80 restantes.',
    id: 7,
  },
];

export function Prime() {
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
            <Typography variant="tituloSessoes">Prime</Typography>
          </Box>
          <Box>
            {data.map((item) => (
              <Box key={item.id}>
                <ExpansePanel information={{ ...item }} />
                <Divider mt="xxxs" variant="fullWidth" />
              </Box>
            ))}
          </Box>
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
