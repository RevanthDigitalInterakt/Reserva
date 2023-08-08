import React, { useEffect } from 'react';

import { SafeAreaView, ScrollView } from 'react-native';
import {
  Typography, Box, ExpansePanel, Divider,
} from '@usereservaapp/reserva-ui';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export function OrdersAndDeliveries() {
  useEffect(() => {}, []);

  const data = [
    {
      title: 'Como acompanhar a entrega do meu pedido?',
      content: `Para acompanhar a entrega do seu pedido, basta clicar no icone 'Perfil' no canto inferior direito, fazer login e clicar em 'Meus pedidos'.
            \nCaso seu pedido já esteja com a transportadora, você conseguirá acompanhar cada status da entrega, basta acessar este link e informar o número do seu pedido usando todas as letras (em Maiúsculo) e números.
            \nhttps://status.ondeestameupedido.com/tracking/11011/ `,
    },
    {
      title: 'Meu pedido está atrasado. Como proceder?',
      content: `Você pode conferir se o seu pedido realmente está fora do prazo de entrega através do e-mail de confirmação do seu pedido, lembrando que o prazo começa a contar a partir da aprovação do pagamento do pedido.
            \nCaso o seu pedido tenha sido feito pela opção Boleto Bancário o tempo entre o pagamento e a compensação bancária pode chegar a até 5 dias úteis.
            \nSe o prazo informado para entrega, após a confirmação do pagamento, estiver expirado, por favor nos informe. Nós devolveremos o valor pago no frete e agilizaremos o seu pedido da melhor forma.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'Qual o horário de entrega?',
      content: `A nossa entrega ocorre no horário comercial, entre 9h e 17h.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'A Reserva entrega nos fins de semana e feriados?',
      content: `Nossa logística não funciona nos domingos e feriados.  Caso sua encomenda já tenha saído do nosso Centro de Distribuição a entrega poderá ocorrer de segunda a sábado, exceto nos feriados.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: ' alterar o endereço de entrega?',
      content: `Ainda não fechei a compra no App: no processo de fechamento do pedido, você pode alterar o seu endereço clicando em “editar”, logo abaixo ao endereço já cadastrado.
            \nCaso a compra já tenha sido finalizada não é possível alterar o endereço.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'Posso comprar no site e retirar na loja?',
      content: `Sim. Essa opção está disponível em lojas Reserva selecionadas. Você pode verificar se essa opção está ativa para sua loja de preferência quando for escolher o endereço de entrega do pedido, basta flegar em RETIRADA EM LOJA.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'Porque o meu pedido foi cancelado?',
      content: `Há alguns motivos para que seu pedido seja cancelado, alguns deles estão listados abaixo:
            \nProduto indisponível: Quando é comprado um produto e no momento da separação é identificado pelo nosso estoque que a peça está com algum problema ou está indisponível em nosso estoque. É criado um vale no cadastro do cliente com o valor da peça + valor do frete pra que ele possa escolher um outro produto no site similar ou com o mesmo valor. Verifique a sua caixa de e-mail, nosso time já pode ter feito contato com você.
            \nFaça você: Caso a arte não esteja de acordo com as regras descritas no site, ao passar por moderação, ela poderá ser recusada, com isso, o pedido cancelado. Para esses casos, geramos um vale no cadastro do cliente e o informamos por email o motivo para que o pedido seja refeito, desta vez, dentro das regras. Verifique a sua caixa de e-mail, nosso time já pode ter feito contato com você.
            \nDivergência de dados para pagamento: ao informar os dados co cartão de crédito deve-se prestar muita atenção pois se algo estiver divergente o pedido pode ser cancelado por questão de segurança. Por isso, muito cuidado ao finalizar um pedido com cartão de crédito, confira todos os dados. Para essa modalidade de cancelamento não geramos o vale pois a transação é cancelada junto a operadora do cartão não gerando assim cobrança.
            \nEntre em contato com a nossa Central de Atendimento através do telefone: (21) 3609-2555, para que possamos identificar o problema e informar o ocorrido.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'Posso agendar a entrega?',
      content: `Não é possível agendar a data e/ou horário para entrega de pedidos.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
         `,
    },
    {
      title: 'A Reserva entrega em todo Brasil?',
      content: `Os produtos da Reserva são entregues em todo o Brasil. Você pode simular o valor do frete e o prazo de entrega no ato da compra de acordo com a transportadora escolhida.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'O que verificar no ato da entrega?',
      content: `Ao receber o pedido, confira se a embalagem não está violada e se os produtos correspondem ao que foi solicitado em nosso site.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
         `,
    },
    {
      title: 'Em caso de ausência no local de entrega, o que acontece?',
      content: `Caso ninguém possa receber o pedido no momento da entrega, uma nova tentativa é feita no dia seguinte. Caso essa nova tentativa seja negativa, a mercadoria retorna para o nosso Centro de Distribuição.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
    },
    {
      title: 'O que significa a mensagem "Problemas Fiscais"?',
      content: `O status "Problemas Fiscais" está relacionado ao Protocolo ICMS 021/2011, exige o recolhimento do ICMS na UF de destino dos diversos estados signatários a mesma encontra-se retida no SEFAZ e só será liberada após processos burocráticos, já conhecidos pela RESERVA.
            \nSolicitamos para continuar acompanhando o status da entrega, através da nossa ferramenta de rastreamento. Quando for liberado, solicitaremos prioridade na mesma. Desculpe-nos o transtorno causado.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
         `,
    },
    {
      title: 'Entrega internacional',
      content: `A Reserva já está entregando em mais de 70 países. Para comprar basta adicionar seus produtos na sacola, inserir o seu e-mail, selecionar o país e o endereço completo. Na sequência o site mostrará o valor do frete e o prazo de entrega. Lembrando que para essas compras o frete é cobrado independente do valor.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
         `,
    },
  ];

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
            <Typography variant="tituloSessoes">
              Pedidos e Entregas
            </Typography>
          </Box>

          {data.map((item, key) => (
            <Box key={key}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
