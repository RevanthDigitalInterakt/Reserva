import React from 'react';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';
import { Button } from '../Button';
import { styles } from './ModalNowIsPrime.Styles';
import IconLogoPrime from '../../../assets/icons/IconLogoPrime';
import { IconLegacy } from '../IconLegacy/IconLegacy';

interface IProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export function ModalNowIsPrime({
  isVisible,
  onBackdropPress,
}: IProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      animationInTiming={300}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalWrapper}>
        <View style={styles.headerContainer}>
          <IconLogoPrime />
          <Button
            hitSlop={{
              top: 30, left: 30, bottom: 30, right: 30,
            }}
            onPress={() => onBackdropPress()}
            variant="icone"
            icon={<IconLegacy name="Close" size={16} />}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Agora você é um cliente
            {' '}
            <Text
              style={styles.primeText}
            >
              Prime
            </Text>
            , para facilitar na sua compra já adicionamos ao seu carrinho a assinatura,
            ela será concluída junto ao seu pedido.
          </Text>
        </View>

        <Button
          accessible
          title="VOLTAR PARA SACOLA"
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
