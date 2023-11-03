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
    title: 'Forma de Pagamento',
    content:
      'Cartão de Crédito: Em média a aprovação acontece em alguns minutos após o pagamento. Em alguns casos a instituição financeira nos retorna a aprovação em 2 dias úteis.'
      + '\n\nPIX: Em média a aprovação acontece logo após o pagamento no seu banco.'
      + '\n\nCaso haja alguma divergência entre os dados enviados a compra pode ser cancelada, por isso, muita atenção na hora da compra, confira todos os dados antes de finalizar seu pedido.'
      + '\n\nCaso ela seja cancelada, não haverá cobrança e você poderá repetir o processo da compra.',
    id: 1,
  },
  {
    title: 'É possível alterar o pedido após finalizado?',
    content:
      'Para a segurança de nossos clientes, após a finalização da compra não é mais possível nenhum tipo de alteração.',
    id: 2,
  },
  {
    title: 'Porque o meu pedido foi cancelado/alterado?',
    content:
      'Existem alguns motivos para que seu pedido seja cancelado. Alguns deles estão listados abaixo:'
      + '\n\nProduto indisponível: Após a compra de um produto e no momento da separação, é identificado por nossa equipe que a peça está com algum problema ou está indisponível em nosso estoque. É feito o estorno do valor da peça + valor do frete no mesmo meio de pagamento em que o pedido foi feito. Verifique a sua caixa de e-mail, nosso time já pode ter feito contato com você.'
      + '\n\nFaça você: Caso a arte não esteja de acordo com as regras descritas no site, ao passar por moderação, ela poderá ser recusada, com isso, o pedido é cancelado. Nestes casos, é feito o estorno do valor e informamos por e-mail o motivo do cancelamento para que o pedido seja refeito, desta vez, dentro das regras. Verifique a sua caixa de e-mail, nosso time já pode ter feito contato com você.'
      + '\n\nDivergência de dados para pagamento: Ao informar os dados do cartão de crédito deve-se prestar muita atenção, pois se alguma informação estiver divergente o pedido pode ser cancelado por questão de segurança. Por isso, muito cuidado ao finalizar um pedido com cartão de crédito, confira todos os dados. Para essa modalidade de cancelamento a transação é cancelada junto à operadora do cartão, não gerando cobrança.',
    id: 3,
  },
  {
    title: 'Quero cancelar meu pedido',
    content:
      'De acordo com o CDC (Código de Defesa do Consumidor), a solicitação de cancelamento de compras virtuais deve ser feita em até 7 dias úteis após a data de recebimento.'
      + '\n\nEntre em contato conosco que nós providenciaremos a devolução/cancelamento. Você precisará informar alguns dados para os nossos Encantadores e eles irão seguir com a solicitação.',
    id: 4,
  },
];

export function Request() {
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
              <Typography variant="tituloSessoes">Pedido</Typography>
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
