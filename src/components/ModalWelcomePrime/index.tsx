import React, { useMemo } from 'react';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import { Box, Typography } from '@usereservaapp/reserva-ui';

import testProps from '../../utils/testProps';
import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';

import { Button } from '../Button';

import * as Styles from './styles';
import type { IParamsComponent } from './types';

export const ModalWelcomePrime: React.FC<IParamsComponent> = ({
  onClose,
  isVisible,
}) => {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { data: dataPrime } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const data = useMemo(() => dataPrime?.landingPagePrime, [dataPrime?.landingPagePrime]);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="zoomOut"
      isVisible={isVisible}
      animationInTiming={300}
      style={Styles.objectStyles.modal}
      {...testProps('com.usereserva:id/modal_welcome_prime')}
      testID="com.usereserva:id/modal_welcome_prime"
    >
      <Styles.ContainerModal
        p="xxxs"
        backgroundColor="white"
        {...testProps('com.usereserva:id/modal_sign_in_container')}
      >
        <Typography variant="tituloSessoes">
          Bem vindo ao
          <Typography variant="descontoTag1">
            {' Prime'}
          </Typography>
        </Typography>

        <Box my="micro">
          <Typography variant="tituloSessao" color="fullBlack">
            Agora você é um cliente
            {' '}
            <Typography fontSize={14} fontFamily="reservaSerifBlack">
              Prime
            </Typography>
            , para facilitar na sua compra
            já adicionamos ao seu carrinho a assinatura, ela será concluída
            junto ao seu pedido, mas lembre-se, ela só será válida para compras
            acima de
            {' '}
            <Typography
              fontSize={14}
              color="fullBlack"
              fontFamily="reservaSansBold"
            >
              R$
              {' '}
              {data?.discountFrom}
            </Typography>
          </Typography>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Button
            inline
            mt="xs"
            mb="xxs"
            onPress={() => onClose()}
            variant="primarioEstreito"
            title="CONTINUAR COMPRANDO"
            testID="com.usereserva:id/modal_welcome_prime_continue"
          />
        </ScrollView>
      </Styles.ContainerModal>
    </Modal>
  );
};
