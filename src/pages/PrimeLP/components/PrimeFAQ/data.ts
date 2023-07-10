interface IPrimeFAQData {
  body: string | React.ReactNode;
  title: string;
}

export const primeFAQData: IPrimeFAQData[] = [
  {
    title: 'Como faço para cancelar meu Prime?',
    body: `Entre em contato com a nossa Central de Atendimento ao Cliente através do Whatsapp 21 2108-4990. Informe ao atendente o número do seu CPF e o número do seu pedido que você realizou a compra do Prime. Essas informações são essenciais para que possamos localizar o seu pedido corretamente em nosso sistema. Explique ao atendente o motivo do cancelamento e solicite o estorno da compra.
    
Nossa equipe estará pronta para ajudá-lo e fornecer as informações necessárias sobre os próximos passos. É importante ressaltar que o cancelamento do pedido e o estorno da compra estão sujeitos às políticas e prazos estabelecidos pela nossa empresa. Nossa equipe de atendimento terá o prazer de informá-lo sobre esses detalhes durante seu contato.`,
  },
  {
    title: 'Como funciona o cashback do Prime?',
    body: `Ao assinar o nosso serviço Prime por 12x de R$39,00, você terá direito a receber um cashback no valor de R$39,00 no primeiro dia útil, todo mês. No entanto, é importante esclarecer que esse cashback não é acumulativo, ou seja, ele não se acumula de um mês para o outro.

O cashback é uma forma de recompensá-lo pelo uso contínuo do nosso serviço Prime. A cada mês que você estiver utilizando o Prime, seu cashback será renovado e você poderá utilizá-lo em compras no nosso site. Para utilizar o cashback, basta seguir os passos abaixo:

\u25CF Faça login no nosso site.\n
\u25CF Navegue pelo site e adicione os produtos desejados ao seu carrinho de compras.\n
\u25CF Durante o processo de finalização da compra, você terá a opção de usar o cashback disponível. Selecione essa opção e o valor do cashback será deduzido do total da sua compra.`,
  },
];
