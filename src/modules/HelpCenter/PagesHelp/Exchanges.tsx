import React from 'react';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, ExpansePanel, Divider } from '@danilomsou/reserva-ui';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export const Exchanges = () => {
  useEffect(() => {}, []);

  const data = [
    {
      title: 'Como realizar uma Troca ou Devolução?',
      content: `TROCA E DEVOLUÇÃO
      \n\nATENÇÃO 23/03/2020:\nEstamos de olho nos impactos que o momento atual trás, com isso o prazo de troca e devolução foi ampliado para 60 dias. Seguimos juntos!
      \n\nO prazo para a troca ser solicitada é de até 60 dias corridos após o recebimento do produto. Caso você prefira devolver o produto o prazo é de até 60 dias corridos após o recebimento. Nos casos de defeito o prazo é de 120 dias após o recebimento do produto.
      \n\nPara solicitar, basta clicar conforme a foto abaixo em Troca grátis, localizada no canto direito inferior do site e em seguida em Realizar troca, fazer login, e selecionar o produto a ser trocado ou devolvido. Você também conseguirá trocar indo direto em 'minha conta' e clicando na opção Trocas de devoluções ou em Meus pedidos.`,
    },
    {
      title: 'Como trocar produtos comprados em lojas Multimarcas?',
      content: `A orientação é que procurem as mesmas para a realização da troca
      \nObs: O prazo para iniciar uma solicitação de troca por qualidade é até 90 dias corridos após a compra da peça.`,
    },
    {
      title: 'Meu produto veio com defeito/avaria. Como proceder?',
      content: `Caso tenha ultrapassado os 7 dias úteis e o produto apresente algum vício ou defeito, entre em contato conosco, informando CPF, número do pedido, o produto a ser devolvido e o defeito. Assim que recebermos o e-mail enviaremos sua solicitação  ao nosso setor de qualidade para que seja verificado. Será necessária a autorização desse setor pra que uma possível troca seja feita. Análise realizada, retornaremos o contato com o parecer e se será necesssária a troca.
                  \nO prazo para a troca ser solicitada por este motivo é de 90 dias após o recebimento do produto.
                  \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".`,
    },
    {
      title: 'Como cancelar o pedido?',
      content: `De acordo com o CDC (Código de Defesa do Consumidor), a solicitação de cancelamento de compras virtuais deve ser feita em até 7 dias úteis/corridos após a data de recebimento.\nEntre em contato conosco pelo telefone: (21) 2108-4990, que nós providenciaremos a devolução.  Você precisará informar o seu CPF, o número do pedido e o produto a ser devolvido.
      \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".`,
    },
    {
      title: 'É possível alterar o pedido após finalizado?',
      content: `Para segurança dos nossos clientes após a compra finalizada não é possível nenhuma alteração.
      \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".`,
    },
    {
      title: 'Recebi um produto diferente do que eu comprei. Como proceder?',
      content: `Entre em contato com a nossa Central de Atendimento através do nosso WhatsApp: (21) 2108-4990, nos enviando o número do pedido, a descrição do produto que comprou e não foi enviado e algumas fotos do produto enviado para que possamos identificar o problema e iniciarmos o processo de troca da peça ou devolução do valor pago.
      \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".`,
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
        <Box flex={1} pt={'xs'} paddingX={'xxxs'}>
          <Box mb={'nano'} alignSelf={'flex-start'}>
            <Typography variant={'tituloSessoes'}>
              Trocas e devoluções
            </Typography>
          </Box>

          {data.map((item, key) => {
            return (
              <Box key={key}>
                <ExpansePanel information={{ ...item }} />
                <Divider mt={'xxxs'} variant={'fullWidth'} />
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
