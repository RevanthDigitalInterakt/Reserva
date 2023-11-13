import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState } from 'react';
import {
  Pressable, Text, TouchableOpacity, View,
} from 'react-native';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import styles from './styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { scale } from '../../../../utils/scale';
import { Modal } from '../../../../components/Modal';
import { CopiedCupomDescription } from '../../../../components/Modal/components/CopiedCupomDescription';
import EventProvider from '../../../../utils/EventProvider';

const HEADER_ICON_WIDTH = scale(16);
const HEADER_ICON_HEIGHT = scale(16);
const ICON_WIDTH = scale(12);
const ICON_HEIGHT = scale(12);

export function RouletCouponCard() {
  const { rouletCoupon } = useBagStore(['rouletCoupon']);
  const [cardIsOpen, setCardIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopyCode = () => {
    setIsVisible(true);
    Clipboard.setString(rouletCoupon.code! || 'teste');
    EventProvider.logEvent('click_cupom_roleta', {});
  };
  const handleCloseCard = () => setCardIsOpen(false);

  if (!rouletCoupon.code || !cardIsOpen) {
    return null;
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        handleClose={() => setIsVisible(false)}
        title="Cupom Copiado"
        description={(
          <CopiedCupomDescription
            onPress={() => setIsVisible(false)}
          />
        )}
      />
      <View style={styles.container}>
        <View style={styles.discountAlertTextWrapper}>
          <IconComponent width={HEADER_ICON_WIDTH} height={HEADER_ICON_HEIGHT} icon="discountFlag" />
          <Text style={styles.boldText}>
            Você ganhou
            {' '}
            <Text style={styles.normalText}>um</Text>
            {' '}
            cupom
            {' '}
            <Text style={styles.normalText}>ao girar a roleta!</Text>
          </Text>
        </View>
        <Pressable onPress={handleCloseCard} style={styles.closeWrapper}>
          <IconComponent width={HEADER_ICON_WIDTH} height={HEADER_ICON_HEIGHT} icon="close" />
        </Pressable>
        <View style={styles.clipboardWrapper}>
          <View style={styles.dottedBox}>
            <Text style={styles.couponText}>{rouletCoupon.code!}</Text>
          </View>
          <TouchableOpacity onPress={handleCopyCode} style={styles.copyBox} testID="com.usereserva:id/clipboard-button">
            <IconComponent width={ICON_WIDTH} height={ICON_HEIGHT} icon="copy" />
            <Text style={styles.copyText}>Copiar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
