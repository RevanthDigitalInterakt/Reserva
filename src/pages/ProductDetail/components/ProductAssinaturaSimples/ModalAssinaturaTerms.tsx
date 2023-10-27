import React from 'react';
import { Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import testProps from '../../../../utils/testProps';
import { Box } from '../../../../components/Box/Box';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';

interface Props {
  isVisible: boolean;
  setIsVisible(isVisible: boolean): void;
}

const { width, height } = Dimensions.get('window');

export const ModalAssinaturaTerms: React.FC<Props> = ({
  isVisible,
  setIsVisible,
}) => (
  <Modal
    isVisible={isVisible}
    animationIn="fadeIn"
    animationInTiming={300}
    {...testProps('terms_and_conditions')}
    style={{ alignItems: 'center', justifyContent: 'center' }}
  >
    <Box
      backgroundColor="white"
      width={width - 24}
      height={height - 126}
      p="xxxs"
    >
      <Box flexDirection="row-reverse">
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <IconLegacy name="Close" size={14} />
        </TouchableOpacity>
      </Box>

      <Box mt="xxxs" alignItems="center">
        <Typography variant="precoPromocional1" fontWeight="bold">
          Termos e Condições
        </Typography>
      </Box>

      <ScrollView style={{ marginTop: 6, paddingRight: 4 }}>
        <Box mt="nano">
          <Typography variant="precoPromocional2" color="preto">
            1. O valor do plano de assinatura anual da camiseta Simples® é de
            R$ 299,88 (12x R$ 24,99). O valor da camiseta Simples® avulsa é de
            R$ 149,00.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            2. Não é possível realizar o pagamento do plano de assinatura da
            camiseta Simples® com vale, cashback ou créditos Reserva.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            3. O plano de assinatura da camiseta Simples® tem fidelidade de 12
            (doze) meses. Não existe reembolso parcial durante a primeira
            anuidade.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            4. O pagamento do plano de assinatura da camiseta Simples® deverá
            ser realizado através de cartão de crédito, débito, PIX ou
            dinheiro, sendo o pagamento à vista no valor total de R$ 299,88 ou
            parcelado em 12 (doze) vezes de R$ 24,99.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            5. O valor do frete dos envios das camisetas Simples® será
            calculado no momento da assinatura, parcelado em 12 (doze) vezes e
            acrescido às cobranças mensais. Caso o assinante opte pela
            modalidade de retirada da camiseta Simples® em loja não será
            cobrado frete.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            6. A renovação da assinatura após os 12 meses não é automática.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            7. O cashback mensal corresponderá a 100% (cem por cento) do valor
            da mensalidade, e cada crédito no valor de R$ 24,99 ficará
            disponível para o assinante em sua conta no site da Reserva em até
            7 (sete) dias após a cobrança da mensalidade.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            8. O cashback mensal terá validade de 30 (trinta) dias e expirará
            após este prazo, não sendo cumulativo com o cashback do mês
            subsequente.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            9. Quando de sua utilização, o cashback mensal não poderá
            ultrapassar 30% (trinta por cento) do valor total da compra em que
            será utilizado.[FR1]
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            10. O cashback mensal não poderá ser utilizado na aquisição de
            novas assinaturas ou em compras com valor total inferior a R$
            85,00.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            11. A cor, tamanho e gênero da segunda e terceira camiseta podem
            ser escolhidas pelo cliente. Até 30 dias antes do recebimento da
            segunda peça da assinatura o cliente receberá o contato da Reserva
            por email ou whatsapp ou ligação telefônica para escolha de sua
            próxima peça. Caso o cliente não responda em até 20 dias antes do
            envio a Reserva enviará uma peça do mesmo tamanho e modelo
            escolhidos nos envios anteriores, mas de cor a ser selecionada
            pela nossa equipe, conforme disponibilidade no estoque.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            12. Ao final do período de 12 (doze) meses do plano de assinatura
            da camiseta Simples®, o assinante terá 1 mês para devolver as 3
            camisetas Simples® recebidas ou optar por ficar com elas.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            13. Para devolução ele(a) deverá se dirigir uma loja Reserva e
            identificar-se com seus dados. Confirmada a assinatura e o prazo
            completo de 12 meses, sem exceder os 30 dias após o aniversário de
            12 meses da assinatura, o assinante receberá créditos no valor de
            R$ 25,00 para cada camiseta Simples® devolvida. Estes créditos que
            terão validade de 30 (trinta) dias e expirarão após este prazo. A
            utilização de tais créditos não poderá ultrapassar 30% (trinta por
            cento) do valor total da compra em que forem utilizados.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            14. Todo assinante ativo do programa de assinatura da camiseta
            Simples® receberá o benefício de um desconto de 20% (vinte por
            cento) em compras realizadas na Reserva com valor total acima de
            R$ 399,00..
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            15. O Assinante terá o prazo de 30 (trinta) dias contados a partir
            do recebimento para trocas da mercadoria por insatisfação, desde
            que a mercadoria esteja em perfeito estado, sem uso, com
            embalagem, tag fixado ao produto e nota fiscal.
          </Typography>
        </Box>

        <Box mt="xxxs">
          <Typography variant="precoPromocional2" color="preto">
            16. Estes Termos e Condições poderão ser alterados e/ou a promoção
            suspensa e/ou cancelada por motivo de força maior ou em virtude de
            qualquer outro fator ou motivo imprevisto, que esteja fora do
            controle da promotora e que comprometa a promoção.
          </Typography>
        </Box>
      </ScrollView>

      <Button
        {...testProps('button_understood_modal_terms_and_conditions')}
        mt="xxs"
        title="ENTENDI"
        variant="primarioEstreito"
        onPress={() => setIsVisible(false)}
        inline
      />
    </Box>
  </Modal>
);
