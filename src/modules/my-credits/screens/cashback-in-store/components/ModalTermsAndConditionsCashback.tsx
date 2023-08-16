import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Box } from '../../../../../components/Box/Box';
import { Button } from '../../../../../components/Button';
import { IconLegacy } from '../../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../../components/Typography/Typography';

interface IModal {
  isVisible: boolean;
  setIsVisible: () => void;
  setTermAndConditions: () => void;
}

export function ModalTermsAndConditionsCashback({
  isVisible,
  setIsVisible,
  setTermAndConditions,
}: IModal) {
  return (
    <Modal avoidKeyboard onBackdropPress={setIsVisible} isVisible={isVisible}>
      <Box bg="white" marginY="xxl" justifyContent="center" px="xxxs" py="xxxs">
        <Box position="absolute" top={16} right={20} zIndex={4}>
          <Button
            onPress={setIsVisible}
            variant="icone"
            icon={<IconLegacy size={12} name="Close" />}
          />
        </Box>
        <Box>
          <Typography
            fontFamily="reservaSerifBold"
            textAlign="center"
            fontSize={14}
          >
            AR&CO
          </Typography>
        </Box>
        <Box>
          <Typography
            fontFamily="reservaSerifRegular"
            textAlign="center"
            fontSize={20}
          >
            REGULAMENTO PARA ACÚMULO DE CASHBACK
          </Typography>
        </Box>
        <Box>
          <Typography
            fontFamily="reservaSerifBold"
            textAlign="center"
            fontSize={14}
          >
            12.09.2022
          </Typography>
        </Box>
        <ScrollView>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              1. O PROGRAMA
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              1.1 O Programa foi criado e administrado por AR&CO, trata-se de um
              sistema de recompensas que funciona na modalidade de acúmulo e
              resgate de créditos de Cashback, com o objetivo de recompensar e
              valorizar o relacionamento com os seus clientes conforme os termos,
              cláusulas e condições a seguir estipuladas.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              1.2 No Programa os membros possuem resgate de Cashback para produtos
              AR&CO (Reserva, Reserva Mini, Reserva Go e Reversa), adquiridos em
              loja física.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              1.3 Não há qualquer taxa de inscrição, ingresso ou permanência no
              Programa.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              1.4 O Programa está disponível para clientes de todo o território
              nacional (Brasil), maiores de 18 (dezoito) anos.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              1.5 Ao ingressar no Programa, o cliente declara ter conhecimento
              deste regulamento, e ao cadastrar- se, estará pontuando e aderindo
              às regras aqui descritas.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              2. DEFINIÇÕES
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              2.1 Programa: Refere-se ao "Programa de Acúmulo de Cashback" que
              visa conceder aos clientes membros recompensas em Cashback, dentro
              da plataforma.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              2.2 Membro(s): Cliente participante do Programa.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              2.3 Regulamento: O presente regulamento que rege o Programa.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              2.4 Cashback: Significa dinheiro de volta. Quando o membro realizar
              uma compra em loja física, parte do investimento retorna para ele
              como créditos de Cashback. A quantidade é calculada sobre uma
              porcentagem em cima do valor final pago pela compra.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              2.5 APP RESERVA: Aplicativo e plataforma digital onde é possível
              aderir ao Programa, disponível e acessível gratuitamente.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              3. COMO ADERIR AO PROGRAMA
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              3.1 Primeiro é necessário baixar o APP RESERVA, disponível para
              download nos sistemas operacionais Android e iOS.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              3.2 Criar uma conta única e intransferível com nome, sobrenome, e-
              mail, senha, gênero, número de CPF, data de nascimento, e número de
              telefone.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              3.3 Possuindo a conta no APP RESERVA, basta apresentar o QR Code de
              validação, gerado dentro do aplicativo, durante a finalização da
              compra no caixa da loja (Caso ainda não tenha informado CPF,
              telefone e e-mail, será solicitado no cadastro dentro do
              aplicativo).
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              4. COMO FUNCIONA
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              4.1 Toda vez que o cliente finalizar uma compra, em qualquer loja
              própria e franquias presencialmente, irá acumular cashback caso
              possua o APP RESERVA baixado, sendo que terá de fazer a validação da
              compra por QR CODE gerado no momento em que a compra for finalizada.
            </Typography>
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              O valor de acúmulo de cashback será informado pelo atendente no
              caixa. E constará no APP RESERVA em até 7 (sete) dias.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              I) Do acúmulo
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              a. O percentual de acúmulo pode variar conforme campanha, promoção,
              mês e etc., ele incide sobre o valor final das compras, em reais,
              excluindo produtos não inclusos no Programa e valores descontados
              antes do pagamento, em todos os pedidos realizados dentro do escopo
              de produtos das marcas elencadas no item 1.2 e das marcas de sellers
              (marcas externas que compõem o APP RESERVA, que podem ou não aderir
              ao programa de Cashback, o que será sinalizado no momento de
              consulta do produto).
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              b. Em caso de utilização de outros formatos de desconto vinculados a
              voucher/cupom e promoções, o acúmulo incidirá no valor final das
              compras.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              c. O acúmulo acontecerá exclusivamente dentro do APP RESERVA.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              II) Do resgate
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              a. Na hora de fazer o pagamento, você poderá utilizar o valor
              disponível de forma rápida e fácil. Os créditos em Cashback poderão
              ser de até 33% (trinta e três por cento) do valor total do pedido,
              e com um resgate que engloba somente as marcas AR&CO (Reserva,
              Reserva Mini, Reserva Go e Reversa).
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              b. Os créditos do Cashback serão creditados na ABA CASHBACK do seu
              APP RESERVA, 7 (sete) dias após a compra.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              c. Em caso de trocas, pelo mesmo produto, apenas alterando tamanho,
              não haverá movimentação no Cashback.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              d. Em caso de devolução ou cancelamento da compra, o valor utilizado
              de Cashback será estornado ao membro. Este prazo está sujeito aos
              termos de uso do APP RESERVA.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              III) Do créditos
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              a. Os créditos ficam consolidados na página “Ver minha carteira”, no
              tópico “Meu Cashback”, no seu Perfil do APP RESERVA, onde é possível
              consultar o extrato de acúmulos e resgates.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              b. Os créditos acumulados possuem validade de 30 (trinta) dias, caso
              não sejam utilizados dentro deste período, eles expiram e não podem
              ser resgatados.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              5. DO USO INDEVIDO
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              5.1 O uso fraudulento do Programa ou em desacordo com este
              regulamento, determinará o cancelamento do usuário no Programa e a
              perda dos créditos acumulados, independentemente da adoção das
              medidas legais cabíveis para o ressarcimento de todos e quaisquer
              danos sofridos.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              5.2 A AR&CO reserva o direito de descontinuar o Programa eliminando
              todo crédito de seu(s) cliente(s) se o(s) mesmo(s) ou em parte
              for(em) adquirido(s) por meio(s) fraudulentos, erro na entrada de
              dados, roubo ou qualquer outro meio que não o oficial do Programa.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              5.2 A AR&CO reserva o direito de descontinuar o Programa eliminando
              todo crédito de seu(s) cliente(s) se o(s) mesmo(s) ou em parte
              for(em) adquirido(s) por meio(s) fraudulentos, erro na entrada de
              dados, roubo ou qualquer outro meio que não o oficial do Programa.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              5.3 A AR&CO reserva-se o direito de debitar, sem a anuência de
              respectivo titular, todos e quaisquer pontos do Programa creditados
              indevidamente (em razão de duplicidade, erro, dolo etc.).
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              5.4 É expressamente proibido qualquer tipo de comercialização dos
              créditos de Cashback, sendo que qualquer transmissão feita
              indevidamente será considerada fraudulenta.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              6. VALIDADE DO PROGRAMA
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              6.1 O Programa terá validade por tempo indeterminado.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              7. DA ALTERAÇÃO DO REGULAMENTO
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              7.1 A AR&CO reserva-se o direito de alterar o Programa a qualquer
              momento a seu exclusivo critério.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              8. DO CANCELAMENTO DO PROGRAMA
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              8.1 O Programa poderá ser cancelado a qualquer momento a critério
              exclusivo da AR&CO. Neste caso, o cancelamento será informado nos
              canais públicos de comunicação como sites das marcas e plataforma
              digital RESERVA (https://www.usereserva.com/), com 30 (trinta) dias
              de antecedência, de forma que os membros do Programa tenham tempo
              hábil para uso de seus créditos de Cashback.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              8.2 Finalizado o período de 30 (trinta) dias mencionado no item
              anterior, os créditos não serão mais válidos. Nesta hipótese, dentre
              outras previstas no presente regulamento, a AR&CO estará isenta de
              quaisquer responsabilidades em decorrência da falta de uso de
              créditos pelos membros.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              8.3 O cancelamento do Programa, ainda que de forma imotivada, não
              gerará ao cliente qualquer tipo de indenização.
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoBold" fontSize={15}>
              9. PRIVACIDADE E NOTIFICAÇÕES POR E-MAIL
            </Typography>
          </Box>
          <Box mt="xxxs">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              9.1 A sua participação no Programa está sujeita à Política de
              Privacidade da AR&CO, e também no APP RESERVA. Antes de aderir no
              Programa, é recomendável que você analise a Política de Privacidade
              para que entenda como a AR&CO irá tratar os seus dados. Nesta
              Política listamos todos os direitos que você tem em relação aos seus
              dados e como pode exercê-los, inclusive caso queira deixar de
              receber nossas comunicações.
            </Typography>
          </Box>
        </ScrollView>
        <Box width="100%" mt="micro">
          <Button
            variant="primarioEstreitoOutline"
            width="100%"
            height={50}
            onPress={setTermAndConditions}
          >
            <Typography
              letterSpacing={1.6}
              color="preto"
              fontFamily="nunitoRegular"
              fontSize={13}
            >
              ACEITO
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
