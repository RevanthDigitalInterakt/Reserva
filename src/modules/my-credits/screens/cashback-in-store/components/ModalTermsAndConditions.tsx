import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Box, Button, Icon, Typography } from 'reserva-ui';
import { loadingSpinner } from 'reserva-ui/src/assets/animations';


interface IModal {
  isVisible: boolean;
  loading: boolean;
  setIsVisible: () => void;
  setTermAndConditions: () => void;
  isAccepted: boolean;
}

export const ModalTermsAndConditions = ({
  isVisible,
  setIsVisible,
  setTermAndConditions,
  isAccepted,
  loading,
}: IModal) => (
  <Modal avoidKeyboard onBackdropPress={setIsVisible} isVisible={isVisible}>
    <Box bg="white" marginY="xxl" justifyContent="center" px="xxxs" py="xxxs">
      <Box position="absolute" top={16} right={20} zIndex={4}>
        <Button
          onPress={setIsVisible}
          variant="icone"
          icon={<Icon size={12} name="Close" />}
        />
      </Box>
      <Box mt="xxxs">
        <Typography fontFamily="reservaSerifRegular" fontSize={20}>
          Termos e condições
        </Typography>
      </Box>
      <ScrollView>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
            1) O Cartão-Presente pode ser adquirido tanto nas lojas (Reserva e Reserva Mini) quanto on-line (usereserva.com);
          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
            2) O Cartão-Presente poderá ser utilizado em lojas da marca Reserva (exceto franquias) e Reserva Mini (incluindo on-line). Nas lojas, o valor mínimo para aquisição do Cartão-Presente é de R$ 100,00 (cem reais) e o máximo de R$ 5.000,00 (cinco mil reais). On-line, o Cartão pode ser adquirido com saldo de R$ 150,00 (cento e cinquenta reais), R$ 200,00 (duzentos reais), R$ 300,00 (trezentos reais), ou qualquer outro valor entre R$ 400,00 (quatrocentos reais) e R$ 5.000,00 (cinco mil reais);
          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          3) É imprescindível a apresentação do Cartão-Presente nas lojas, no momento da utilização;
          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          4) Em caso de aquisição on-line, deverá ser apresentado/digitado o código e senha do Cartão-Presente para sua utilização;
          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          5) No ato da compra do Cartão-Presente, o cliente receberá um cupom não fiscal;
          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          6) As mercadorias retiradas com o Cartão-Presente estarão sujeitas à política de trocas vigente nas lojas;

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          7) Não há devolução de troco nas compras realizadas com o Cartão-Presente, ficando o saldo remanescente disponível no próprio cartão, dentro do prazo previsto no item “8”;

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          8) O Cartão-Presente não é recarregável e tem prazo de 12 (doze) meses, contados a partir do dia de sua compra. Após este prazo, o cartão não poderá ser utilizado, expirando o saldo eventualmente existente;

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          9) É de inteira responsabilidade do cliente a divulgação do código e senha do Cartão-Presente, bem como outras informações/materiais recebidos;

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          10) O Cartão-Presente não é uma garantia bancária e não pode ser convertido em dinheiro ou qualquer outro meio de pagamento, tampouco ter o seu saldo transferido para outro cartão (nem mesmo em caso de perda/furto/roubo do cartão);

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          11) O cliente poderá consultar o saldo do Cartão-Presente nas lojas Reserva, Reserva Mini ou através do site usereserva.com/cartaopresente;

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          12) O cliente deverá recusar/devolver o Cartão-Presente no momento da sua compra/recebimento, em caso de constatação de violação ou dano;

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          13) O possuidor do Cartão-Presente declara que está de acordo com os “Termos e Condições de Uso do Cartão-Presente”. Estes podem ser encontrados em todas as lojas e no site usereserva.com.

          </Typography>
        </Box>
        <Box mt="xxxs">
          <Typography fontFamily="nunitoRegular" fontSize={15}>
          14) Em caso de dúvidas ou consulta sobre prazo de validade do Cartão-Presente, entre em contato conosco através dos telefones (21) 2108-4990 (RJ) ou (11) 2388-8280 (outros estados). Se preferir, envie um e-mail para sac@usereserva.com.
          </Typography>
        </Box>
      </ScrollView>
      <Box width="100%" mt="micro">
        <Button
          bg="verdeSucesso"
          width="100%"
          height={50}
          disabled={isAccepted}
          onPress={setTermAndConditions}
        >
          {loading ? (
            <LottieView
              source={loadingSpinner}
              style={{
                width: 30,
              }}
              autoPlay
              loop
            />
          ) : (
            <Typography color="white" fontFamily="nunitoSemiBold" fontSize={13}>
              {isAccepted ? 'ACEITO' : 'ACEITAR'}
            </Typography>
          )}
        </Button>
      </Box>
    </Box>
  </Modal>
);
