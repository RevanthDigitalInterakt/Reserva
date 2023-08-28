import React, { useMemo } from 'react';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import { Button } from '../Button';
import { styles } from './ModalClienteIsPrime.Styles';
import IconLogoPrime from '../../../assets/icons/IconLogoPrime';
import testProps from '../../utils/testProps';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { Typography } from '../Typography/Typography';

interface IProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export function ModalClientIsPrime({
  isVisible,
  onBackdropPress,
}: IProps) {
  const { profile } = useAuthStore(['profile']);

  const firstName = useMemo(() => (
    profile?.firstName || profile?.email
  ), [profile?.firstName, profile?.email]);

  return (
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
}
