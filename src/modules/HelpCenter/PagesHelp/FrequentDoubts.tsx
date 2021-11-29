import React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, ExpansePanel, Divider } from "reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const FrequentDoubts = () => {

    useEffect(() => { }, []);

    const data = [
        {
            title: "Não receber mais nossas comunicações?",
            content: `Para suspender os envios das nossas comunicações, basta clicar em descadastre-se localizado ao topo do e-mail que você recebeu e confirmar o cancelamento.
            \nCaso o contato tenha sido através de WhatsApp, basta responder à mensagem recebida pedindo para suspender os contatos através deste canal.
            `,
        },
        {
            title: "Esqueceu meu e-mail ou senha?",
            content: `Caso você tenha esquecido a sua senha, ou seu e-mail, basta clicar no link abaixo do campo de email ou senha localizado na tela de login.\nSeu e-mail aparecerá na tela depois que você informar seu CPF e a data de nascimento, e caso você tenha esquecido a senha, ela será enviada para seu e-mail de cadastro.
            `,
        },
        {
            title: "Trocar ou devolver?",
            content: `Você tem duas opções para trocar ou devolver um produto que foi comprado em nosso site.\nBasta comparecer com o produto etiquetado em uma das nossas lojas, ou se preferir trocar pelo nosso site, basta solicitar através deste link: https://usereserva.troquefacil.com.br/order
            \nLembrando que não trocamos peças personalizadas através do Faça Você, e também peças intimas.
            `,
        },
        {
            title: "Revender por atacado",
            content: `Para revender a marca ou comprar por atacado é necessário possuir CNPJ e loja física.
            \nCaso você esteja dentro dessas especificações, basta entrar em contato através do e-mail:\nnovosclientes.atacado@usereserva.com. O setor responsável responderá todas as dúvidas e passará todas as informações por esse canal.
            `,
        },
        {
            title: "Orientações pra comprar com crédito ou cashback",
            content: `Seu cash back, ou crédito para troca aparecerá sempre quando você estiver na tela de pagamento no nosso site.
            \n5 passos para usar seu crédito/Cashback:
            \n1- Escolha o produto de sua preferência e adicione ao carrinho.
            \n2- Clique em fechar pedido no seu carrinho de compras.
            \n3- Caso você não esteja logado no site insira seu CPF ou e-Mail de cadastro para seguir para a tela de pagamento.
            \n4- A tela de pagamento já aplica automaticamente o crédito/cashback disponivel, aparecerá na tela a mensagem: Crédito/Cashback Aplicado!
            \n5- Caso o valor do crédito seja superior ao  valor do pedido é só clicar em finalizar pedido. Se o valor do crédito for menor que o valor do pedido basta selecionar a segunda forma de pagamento para completar o valor da compra e clicar em finalizar pedido.
            `,
        },
        {
            title: "Orientações para comprar com cupom",
            content: `Aqui nosso passo a passo para utilizar um cupom no nosso site. É importante lembrar que nossos cupons não são cumulativos a nenhuma outra promoção, e que eles não se aplicam a peças que já estejam com desconto.
            \n1- Escolha o produto de sua preferência e adicione ao carrinho.
            \n2- Clique em fechar pedido no seu carrinho de compras.
            \n3- Insira na tela seguinte seu cupom e continue o processo de compra. Caso seja um cupom
            \nfornecido por um vendedor você deverá inserir no campo Código do vendedor, caso seja um
            \ncupom de desconto você deve inserir o mesmo no campo Cupom de desconto.
            `,
        },
        {
            title: "Agilizar a entrega do pedido",
            content: `Nossos prazos estão adequados ao nosso tempo de produção, separação, e tempo de entrega da transportadora, por isso, ele pode variar de acordo com a sua região e o produto comprado. Por conta disso não temos como agilizar uma entrega que esteja no prazo. Agradecemos a sua compreensão.
            `,
        },
        {
            title: "Como lavar a peça de roupa",
            content: `O processo de lavagem e conservação do produto pode variar de peça para peça, de acordo com o material utilizado na confecção. Você encontra as especificações de cada uma nas etiquetas internas. Basta verificar a imagem na etiqueta e verificar no quadro abaixo o significado de cada uma delas.
            `,
        },
        {
            title: "Qual o horário de entrega",
            content: `Nossas entregas acontecem dentro do horário comercial entre 9h e 18h de segunda a sábado, exceto feriados.
            `,
        },
        {
            title: "Cancelar um pedido",
            content: `De acordo com o CDC (Código de Defesa do Consumidor), a solicitação de cancelamento de compras virtuais deve ser feita em até 7 dias úteis/corridos após a data de recebimento.

            Entre em contato conosco que nós providenciaremos a devolução.  Você precisará informar o seu CPF, o número do pedido e o produto a ser devolvido.`,
        },
        {
            title: "Como funciona a retirada em loja",
            content: `Você pode optar por receber em uma de nossas lojas a sua compra realizada em nosso App, e para esta modalidade o frete é grátis. Basta selecionar a opção Retirar na loja quando você estiver escolhendo o endereço de entrega.
            `,
        },
        {
            title: "Entrega internacional",
            content: `A Reserva já está entregando em mais de 70 países. Para comprar basta adicionar seus produtos na sacola, inserir o seu e-mail, selecionar o país e o endereço completo. Na sequência o site mostrará o valor do frete e o prazo de entrega. Lembrando que para essas compras o frete é cobrado independente do valor.
            `,
        },
        {
            title: "Alterar algum dado no cadastro",
            content: `Caso você queira alterar algum dado no seu cadastro, basta clicar em Perfil canto inferior direito no app, fazer seu login e em clicar Meus dados.
            `,
        },

        {
            title: "Como realizo uma compra no site?",
            content: `1- Escolha o produto de sua preferência e adicione ao carrinho.

            2- Clique em fechar pedido no seu carrinho de compras.
            
            3- Na próxima tela insira seu CPF ou e-Mail e clique em fechar pedido.
            
            4- Insira seus dados, uma nova senha e o endereço para entrega
            
            5- Selecione e preencha os dados para pagamento, e clique em finalizar pagamento.
            
            Pronto, seu pedido será separado e enviado para o endereço que você escolheu!`,
        },
        {
            title: "Como realizo uma compra com cartão presente?",
            content: `Aqui o passo a passo para comprar no site utilizando um cartão presente

            1- Escolha o produto de sua preferência e adicione ao carrinho.
            
            2- Clique em fechar pedido no seu carrinho de compras.
            
            3- Na próxima tela insira seu CPF ou e-Mail e clique em fechar pedido.
            
            4- Insira ou confirme seus dados e o endereço para entrega.
            
            5- Selecione a opção Cartão presente no método de pagamento, insira o código e a senha e clique em Calcular.
            
            6- Caso o saldo do cartão seja menor que o valor da compra basta escolher uma outra forma de pagamento, e se o saldo for superior é só clicar em finalizar pagamento.`,
        },
        {
            title: "Falar com um setor interno da reserva",
            content: `Para falar com um de nossos setores internos é necessário entrar em contato com a nossa recepção através do telefone 21 2397-0100.
            `,
        },
        {
            title: "Elogios",
            content: `A experiência Reserva é feita para que todos se sintam em casa quando visitam as nossas lojas ou acessam nosso site ou App. Saber que você curtiu esse contato nos faz sorrir! Pode deixar que vamos passar seu carinho! Conta pra gente o que te fez brilhar os olhos?
            `,
        },
        {
            title: "Fazer uma parceria",
            content: `Caso você queira fazer algum tipo de parceria entre em contato com nossos time através do e-mail
            \nmkt@usereserva.com enviando sua proposta detalhada e o material.`,
        },
    ];

    return (
        <SafeAreaView
            flex={1}
            style={{ justifyContent: "space-between" }}
            backgroundColor="white"
        >
            <TopBarBackButton />

            <ScrollView>
                <Box flex={1} pt={"xs"} paddingX={"xxxs"}>
                    <Box mb={"nano"} alignSelf={"flex-start"}>
                        <Typography variant={"tituloSessoes"}>
                            Dúvidas frequentes
                        </Typography>
                    </Box>

                    {data.map((item, key) => {
                        return (
                            <Box key={key}>
                                <ExpansePanel information={{ ...item }} />
                                <Divider mt={"xxxs"} variant={"fullWidth"} />
                            </Box>
                        );
                    })}
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
};
