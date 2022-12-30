import React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, ExpansePanel, Divider } from "@usereservaapp/reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const HelpPaymentMethods = () => {

    useEffect(() => { }, []);

    const data = [
        {
            title: "Quanto tempo para que o meu pagamento seja autorizado?",
            content: `Cartão de Crédito\nA aprovação do pagamento do cartão de crédito acontece logo após a finalização da compra. Em alguns casos, a instituição financeira pode levar até 2 dias úteis para confirmar a transação.
            \nBoleto Bancário\nEmitimos um boleto no valor da sua compra com prazo de pagamento em até 5 dias úteis. Após o pagamento, a aprovação ocorre normalmente em 3 dias úteis, podendo chegar à 5 dias úteis quando o pagamento ocorre em casas lotéricas.    
            \nDébito\nApós o pagamento, a aprovação ocorre normalmente em 2 dias úteis.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
        },
        {
            title: "Posso alterar a forma de pagamento após fechar o pedido?",
            content: `Não é possível alterar a forma de pagamento após o fechamento do pedido.
            \nMas podemos cancelá-lo, fazer o estorno do pagamento e emitir um novo pedido para você. Solicite esse procedimento indo na opção "Fale Conosco".
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
        },
        {
            title: "Quais são as formas de pagamento que o App da Reserva aceita?",
            content: `Cartão de Crédito\nAceitamos pagamentos de cartão de crédito nas bandeiras Mastercard, Visa, American Express e Diners Club International. Parcelamos em até 10x sem juros, com parcela mínima de R$ 60,00. A aprovação do pagamento do cartão de crédito acontece logo após a finalização da compra. Em alguns casos, a instituição financeira pode levar até 2 dias úteis para confirmar a transação. 
            \nPIX\nO pagamento através do pix é super simples. Basta escolher esta opção quando chegar no método de pagamento, e clicar em finalizar pedido. A próxima tela mostrará um código numérico, caso você esteja comprando com celular, ou QRCODE se a compra for feita pelo computador. Daí é só copiar o código, ou escanear o QRCODE pelo aplicativo do seu banco e finalizar o pagamento. Este código tem validade de 30 minutos, e caso o pagamento não seja feito neste período o pedido é cancelado e será preciso realizar o processo de compra novamente.    
            \nDébito Itaú\nAceitamos débito Itaú, basta confirmar sua compra que você será encaminhado para uma página do banco, onde deverá fazer o pagamento online. A instituição financeira pode levar até 2 dias úteis para confirmar a transação. 
            \nBoleto Bancário\nEmitimos um boleto no valor da sua compra com prazo de pagamento em até 5 dias úteis. Após o pagamento, a aprovação ocorre normalmente em 3 dias úteis, podendo chegar à 5 dias úteis quando o pagamento ocorre em casas lotéricas. 
            \nCartão Presente\nSe você ganhou um cartão presente e deseja utilizar no nosso site, basta em opções de pagamento escolher a opção Cartão presente e informar o número e a senha. Se o valor for insulficiente será necessário escolher outra forma de pagamento para o pagamento da diferença, se for menor, no seu cartão ainda haverá crédito para a próxima compra.
            \nVale crédito\nCaso você já tenha feito alguma troca ou participado de alguma campanhar e tenha crédito no site, basta escolher essa opção para abater o valor da compra, caso o valor seja menor será necessário escolher uma outra forma de pagamento para pagar a diferença, caso seja a mais ainda sobrará para a próxima compra, caso o valor seja exato, você bastará clica em FINALIZAR PEDIDO e pronto seu pedido foi feito!.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
        },
        {
            title: "Posso pagar com dois cartões?",
            content: `No momento não disponibilizamos a opção de realizar o pagamento com dois cartões de créditos em um mesmo pedido, mas em breve isso será possível!
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
        },
        {
            title: "Posso pagar com cartão internacional?",
            content: `Sim, a Reserva aceita pagamento com cartões emitidos no exterior. No entanto, alguns cartões internacionais não permitem parcelamento e o seu pedido pode ser cancelado. Caso tenha um cartão internacional e queira parcelar, consulte antes a sua operadora de cartão de crédito.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
        },
        {
            title: "Posso parcelar a minha compra?",
            content: `Pode sim! Parcelamos em até 6x sem juros, com parcela mínima de R$ 60,00.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".    
            `,
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
                            Formas de Pagamento
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
