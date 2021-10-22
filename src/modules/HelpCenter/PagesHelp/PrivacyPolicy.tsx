import React from "react";
import { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, ExpansePanel, Divider } from "reserva-ui";

import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

export const PrivacyPolicy = () => {

    useEffect(() => { }, []);

    const data = [
        {
            title: "Comprar pelo App é seguro?",
            content: `A Reserva assegura o compromisso com a privacidade e a segurança de seus clientes durante todo o processo de navegação e compra no site. Os dados cadastrais dos clientes não são vendidos, trocados ou divulgados pra terceiros, exceto quando essas informações são necessárias para o processo de entrega ou para cobrança. Seus dados pessoais são peça fundamental para que seu pedido chegue em segurança.\nOs dados de cartão de crédito são protegidos por tecnologia de segurança internacional e as informações são armazenadas e compartilhadas de forma criptografada.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar em Central de ajuda e ir na opção "Fale Conosco".
            `,
        },
        {
            title: "Termos de Uso",
            content: `Política de Privacidade
            \nAqui na Reserva, temos uma equipe de segurança dedicada 24hs a proteger nosso App de ataques e invasões, bem como os dados de privados de cada um de nossos clientes.
            \nTodos os nossos bancos de dados são protegidos e temos como compromisso com nossos clientes, não deixar vazar qualquer tipo de informações pessoais como: endereço, CPF, senhas etc. Os e-mails e dados cadastrados serão utilizados apenas pela Reserva para informar a você sobre as nossas promoções e novidades. E o mais importante: somente com a sua autorização.
            \nO compartilhamento de informações pessoais dos nossos clientes só pode acontecer, única e exclusivamente sob ordens judiciais a título de investigações, bem como a pedido do próprio cliente.
            \nAh! É sempre bom lembrar que, para preservar seus dados de invasões de terceiros, aconselhamos que nossos clientes alterem suas senhas com relativa freqüência e evitem utilizar combinações óbvias! Portanto, esqueça a sua data de aniversário, use a criatividade e invista numa senha segura.
            \nA Reserva utiliza Cookies durante sua navegação de forma que toda vez que você fizer seu login, suas informações de navegações anteriores fiquem gravadas e tornem sua usabilidade cada vez melhor. Os cookies são pequenos arquivos, não maliciosos, que são guardados no seu computador e nos ajudam a tornar sua navegação mais legal! Aconselhamos que, para ter melhores experiências com nosso eCommerce, ative a opção de armazenamento de Cookies no seu navegador.
            \nPolítica de Segurança
            \nToda a tecnologia do nosso eCommerce é focada, além da boa funcionalidade, na segurança dos dados dos usuários, incluindo informações pessoais e de pagamento.
            \nAqui, você pode inserir seus dados de cartão com a segurança de que eles não vão ser utilizados de forma indevida.
            \nTodas as informações de pagamento e cartões de crédito utilizam o formato SSL (Navegação Segura) onde seus dados são criptografados de uma forma única, fazendo assim com que só o sistema possa interpretar seus dados e protegendo-os da invasão de invasores mal intencionados.
            \nSe você ainda estiver com dúvidas, ou precisa falar com o nosso time de encantadores, basta clicar na cartinha localizada em contatos do lado esquerdo desta página.
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
                            Política de privacidade
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
