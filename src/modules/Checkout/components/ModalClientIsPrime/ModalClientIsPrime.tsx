import React from 'react';
import Modal from 'react-native-modal';
import { Typography } from '@usereservaapp/reserva-ui';
import { Text, View } from 'react-native';
import { Button } from '../../../../components/Button';
import { styles } from './ModalClienteIsPrime.Styles';
import IconLogoPrime from '../../icons/IconLogoPrime';
import testProps from '../../../../utils/testProps';

interface IProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  firstName: string | undefined;
}

export const ModalClientIsPrime = ({
  isVisible,
  onBackdropPress,
  firstName,
}: IProps) => (
  <Modal
    testID="com.usereserva:id/Modal_Client_Is_Prime"
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}
    animationInTiming={300}
    animationIn="fadeIn"
    animationOut="fadeOut"
  >
    <View style={styles.modalWrapper}>
      <IconLogoPrime />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Olá!
          {' '}
          <Text style={styles.textBold}>
            {firstName}
          </Text>
          {' '}
          detectamos que você já é um cliente
          {' '}
          <Typography
            variant="descontoTag2"
            color="fullBlack"
            style={styles.primeText}
          >
            Prime
          </Typography>
          , então não se preocupe, estamos removendo este produto do carrinho e
          mantendo apenas os demais produtos selecionados com o desconto da sua
          assinatura ativa.
        </Text>
      </View>

      <Button
        {...testProps('com.usereserva:id/Modal_Client_Is_Prime_Modal_Button')}
        accessible
        title="CONTINUAR"
        color="white"
        backgroundColor="fullBlack"
        onPress={onBackdropPress}
        width="100%"
        variant="primarioEstreito"
      />
    </View>
  </Modal>
);
