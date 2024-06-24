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
    title: 'Como comprar com crédito ou cashback?',
    content:
      'Seu Cashback ou crédito para troca aparecerá sempre na tela de pagamento do site.'
      + '\n\n5 passos para usar seu crédito/Cashback:\n'
      + '\n1 - Escolha o produto de sua preferência e adicione ao carrinho.'
      + '\n2 - Clique em fechar pedido no seu carrinho de compras.'
      + '\n3 - Caso você não esteja logado no site, insira seu CPF ou E-mail de cadastro para seguir para a tela de pagamento.'
      + '\n4 - A tela de pagamento já aplica automaticamente o crédito/Cashback disponível. Aparecerá na tela a mensagem: Crédito/Cashback Aplicado!'
      + '\n5 - Caso o valor do crédito seja superior ao valor do pedido é só clicar em finalizar pedido. Se o valor do crédito for menor que o valor do pedido basta selecionar a segunda forma de pagamento para completar o valor da compra e clicar em finalizar pedido.'
      + '\n\nOBS: Se o crédito/Cashback não se aplicar de forma automática, basta clicar na opção Ver Créditos e aplicar os valores disponíveis.',
    id: 1,
  },
  {
    title: 'Como faço para utilizar um cupom de desconto?',
    content:
      'Nossos cupons não são cumulativos a nenhuma outra promoção, peças com desconto, parcerias e peças de outras marcas. Em casos de exceção, estará descrito no cupom como ele pode ser usado.\n'
      + '\nSegue abaixo um passo a passo de como utilizar nossos cupons:\n'
      + '\n1 - Escolha o produto de sua preferência e adicione ao carrinho;'
      + '\n2 - Clique em fechar pedido no seu carrinho de compras;'
      + '\n3 - Insira na tela seguinte seu cupom e continue o processo de compra;\n'
      + '\nCaso seja um cupom fornecido por um vendedor você deverá inserir no campo Código do vendedor, caso seja um cupom de desconto você deve inserir no campo Cupom de desconto.',
    id: 2,
  },
  {
    title: 'O que é Nota Fiscal Eletrônica (NF-e)?',
    content:
      'A Nota Fiscal Eletrônica (NF-e) é um documento de existência apenas digital, emitido e armazenado eletronicamente, com o intuito de documentar, para fins fiscais, uma operação de circulação de mercadorias ou uma prestação de serviços, ocorrida entre as partes. Sua validade jurídica é garantida pela assinatura digital do remetente (garantia de autoria e de integridade) e a Autorização de uso fornecida pelo Fisco, antes da ocorrência do fato gerador.\n'
      + '\nA sua versão impressa, que acompanha a mercadoria, é a DANFE.\n'
      + 'Para mais informações, acesse o site da Secretaria da Fazenda: http://www.nfe.fazenda.gov.br/portal/principal.aspx',
    id: 3,
  },
  {
    title: 'Cartão presente',
    content:
      'O cartão presente é uma forma alternativa de pagamento com valor predeterminado. Ele pode ser utilizado tanto em nosso site e APP quanto em lojas físicas. O cartão presente possui validade de 12 meses.\n'
      + '\nSegue o passo a passo para uso do cartão presente no site:\n'
      + '\n1 - Escolha o produto de sua preferência e adicione ao carrinho;'
      + '\n2 - Clique em fechar pedido no seu carrinho de compras;'
      + '\n3 - Na próxima tela insira seu CPF ou E-mail e clique em fechar pedido;'
      + '\n4 - Insira ou confirme seus dados e o endereço para entrega;'
      + '\n5 - Selecione a opção Cartão presente no método de pagamento, insira o código e a senha e clique em Calcular;'
      + '\n6 - Caso o saldo do cartão seja menor que o valor da compra basta escolher uma outra forma de pagamento, e se o saldo for superior é só clicar em finalizar o pagamento;',
    id: 4,
  },
  {
    title: 'Posso parcelar a minha compra?',
    content:
      'Dependendo do valor da compra, é possível parcelar em até 12x sem juros. Basta selecionar a quantidade de parcelas quando estiver selecionando a forma de pagamento.',
    id: 5,
  },
  {
    title: 'Posso pagar com cartão internacional?',
    content:
      'Sim, a Reserva aceita pagamento com cartões emitidos no exterior. No entanto, alguns cartões internacionais não permitem parcelamento e o seu pedido pode ser cancelado.'
      + '\n\nCaso tenha um cartão internacional e queira parcelar, consulte antes a sua operadora de cartão de crédito.',
    id: 6,
  },
  {
    title: 'Quanto tempo para que o meu pagamento seja autorizado?',
    content:
      'O prazo de autorização do pagamento varia de acordo com a modalidade de pagamento utilizada na compra:\n'
      + '\nCartão de crédito'
      + '\nA aprovação do pagamento do cartão de crédito acontece logo após a finalização da compra. Em alguns casos, a instituição financeira pode levar até 2 dias úteis para confirmar a transação.'
      + '\n\nPIX'
      + '\nA aprovação do pagamento pelo PIX acontece logo após a finalização da compra',
    id: 7,
  },
  {
    title: 'Posso pagar com dois cartões de crédito?',
    content:
      'Sim, basta selecionar a opção cartão de crédito ao selecionar o método de pagamento, e escolher a opção pagar usando dois cartões.',
    id: 8,
  },
  {
    title: 'Posso alterar a forma de pagamento após fechar o pedido?',
    content:
      'Não é possível alterar a forma de pagamento após o fechamento do pedido.'
      + '\n\nÉ possível realizar o cancelamento e estorno do pagamento. Dessa forma pode ser feito um novo pedido com a forma de pagamento desejada.',
    id: 9,
  },
  {
    title: 'Quais são as formas de pagamento que o site da Reserva aceita?',
    content:
      'Cartão de crédito'
      + '\nAceitamos pagamentos de cartão de crédito nas bandeiras Mastercard, Visa, American Express e Diners Club International. Parcelamos em até 10x sem juros, com parcela mínima de R$ 60,00.'
      + '\nA aprovação do pagamento do cartão de crédito acontece logo após a finalização da compra. Em alguns casos, a instituição financeira pode levar até 2 dias úteis para confirmar a transação.'
      + '\n\nPIX'
      + '\nO pagamento através do pix é super simples. Basta escolher esta opção quando chegar no método de pagamento, e clicar em finalizar pedido. A próxima tela mostrará um código numérico, caso você esteja comprando com celular, ou QRCODE se a compra for feita pelo computador.'
      + '\nDaí é só copiar o código, ou escanear o QRCODE pelo aplicativo do seu banco e finalizar o pagamento. Este código tem validade de 30 minutos, e caso o pagamento não seja feito neste período o pedido é cancelado e será preciso realizar o processo de compra novamente.'
      + '\n\nPicPay'
      + '\nBasta escolher esta opção quando chegar no método de pagamento, e clicar em finalizar pedido. Ao finalizar a compra, um código será exibido. Para pagar, basta escanear o código com seu PicPay.'
      + '\n\nCartão Presente'
      + '\nSe você ganhou um cartão presente e deseja utilizar no nosso site, basta em opções de pagamento escolher a opção Cartão presente e informar o número e a senha.'
      + '\nSe o valor for insuficiente será necessário escolher outra forma de pagamento para o pagamento da diferença, se for menor, no seu cartão ainda haverá crédito para a próxima compra.'
      + '\n\nVale crédito/Cashback'
      + '\nCaso você já tenha feito alguma troca, ou participado de alguma campanha e tenha crédito ou cash back no site, basta escolher essa opção para abater o valor da compra.'
      + '\nCaso o valor seja menor será necessário escolher uma outra forma de pagamento para pagar a diferença, caso seja a mais ainda sobrará para a próxima compra, caso o valor seja exato, você bastará clicar em FINALIZAR PEDIDO e pronto seu pedido foi feito!',
    id: 10,
  },
];

export function Payment() {
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
              <Typography variant="tituloSessoes">Pagamento</Typography>
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
