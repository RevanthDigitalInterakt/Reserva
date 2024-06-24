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
    title: 'Todas as compras recebem cashback?',
    content:
      'Sim. Todas as compras realizadas em lojas Reserva, Mini, Go e Reversa, além de site e app, receberão o % vigente de cashback.',
    id: 1,
  },
  {
    title: 'Qual é o valor do cashback?',
    content:
      'O valor de cashback aplicado está em 15% para todas as compras, podendo sofrer alterações para mais ou menos, mediante mudanças de políticas comerciais. O % estará sempre disponível para consulta.',
    id: 2,
  },
  {
    title:
      'O cashback é gerado com base no valor do pedido com ou sem desconto?',
    content:
      'Independente da forma de pagamento, o acúmulo de cashback é gerado conforme o valor pago pelo cliente.\n\nQuando houver utilização de vale para pagamento da compra, o valor do vale será deduzido ou seja: Cliente fez uma compra de R$100,00 e usou R$20 de vale, gift card ou cashback, o acúmulo de cashback incidirá nos R$80 restantes.',
    id: 3,
  },
  {
    title:
      'Os valores de cashback têm percentuais iguais ou diferentes entre os produtos?',
    content:
      'Eles podem variar caso haja alguma campanha específica em produtos, marcas ou linhas especiais.',
    id: 4,
  },
  {
    title: 'Quanto tempo o cashback demora pra ficar disponível?',
    content:
      'O cashback será liberado para uso em até 48h após aprovação da compra.',
    id: 5,
  },
  {
    title: 'O que é cashback pendente?',
    content:
      'É o status que ele consta dentro do período de até 48h que é considerado para entrada do benefício.',
    id: 6,
  },
  {
    title: 'Como fico sabendo que meu cashback está disponível?',
    content:
      'Você pode sempre consultar em sua carteira, dentro do seu perfil no site ou aplicativo Reserva, através do seguinte caminho:\n'
      + '\nSITE: Clicar no boneco no canto superior direito -> Minha carteira'
      + '\nAPP: Clicar em perfil -> Meus Cashbacks -> Ver minha carteira',
    id: 7,
  },
  {
    title:
      'Depois que o cashback ficar disponível, qual é o prazo de utilização?',
    content:
      'A validade do cashback, tanto adquirido em loja quanto no site e app, é de 30 dias corridos após o faturamento.',
    id: 8,
  },
  {
    title: 'O que acontece se eu devolver ou cancelar minha compra?',
    content:
      'O cashback voltará para a sua carteira dentro do prazo de até 48 horas.',
    id: 9,
  },
  {
    title:
      'Se eu tiver saldo suficiente, posso pagar o pedido integralmente com cashback?',
    content: 'Não, o teto de utilização é até 15% do valor total do pedido.',
    id: 10,
  },
  {
    title:
      'Existe algo que não pode ser comprado com cashback no site e app?',
    content:
      'Apenas a Assinatura Prime e Cartão Presente não podem ser pagos com o cashback.',
    id: 11,
  },
  {
    title: 'Posso usar o cashback para pagar o frete dos meus pedidos?',
    content: 'Não, o frete não é contabilizado para utilização do cashback.',
    id: 12,
  },
  {
    title: 'O cashback é válido com outras promoções e ações com cupom?',
    content:
      'Depende. Isso pode variar de acordo com a regra comercial de cada ação/campanha. O direcionamento é sempre ler o regulamento.',
    id: 13,
  },
  {
    title:
      'O saldo do cashback pode ser utilizado junto com o valor do vale compras?',
    content:
      'Sim, ambos entram na sua carteira e podem ser somados para que você utilize em outra compra.',
    id: 14,
  },
  {
    title: 'Posso transferir meu cashback para outra pessoa?',
    content:
      'Não, além de pessoal e intransferível, é importante ressaltar que o CPF é sua chave para vincular o cashback à sua conta.',
    id: 15,
  },
];

export function Cashback() {
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
