import React, { useMemo } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, Text, View } from 'react-native';

import testProps from '../../utils/testProps';
import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';

import { Button } from '../Button';

import { styles, objectStyles } from './styles';
import type { IParamsComponent } from './types';

export function ModalWelcomePrime({ onClose, isVisible }: IParamsComponent) {
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
      onBackdropPress={onClose}
      animationInTiming={300}
      style={objectStyles.modal}
      {...testProps('com.usereserva:id/modal_welcome_prime')}
      testID="com.usereserva:id/modal_welcome_prime"
    >
      <View
        style={styles.containerModal}
        {...testProps('com.usereserva:id/modal_sign_in_container')}
      >

        <Text {...testProps('com.usereserva:id/title')} style={styles.textPrimeTitle}>Prime</Text>

        <View>
          <Text style={styles.body}>
            Agora você é um cliente
            {' '}
            <Text style={styles.textPrime}>
              Prime
            </Text>
            , para facilitar na sua compra
            já adicionamos ao seu carrinho a assinatura, ela será concluída
            junto ao seu pedido.
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Button
            inline
            mt="xxs"
            onPress={onClose}
            variant="primarioEstreito"
            title="CONTINUAR COMPRANDO"
            testID="com.usereserva:id/modal_welcome_prime_continue"
          />
        </ScrollView>
      </View>
    </Modal>
  );
}
