import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import type { CashbackInfoProps } from './types';
import styles from './styles';
import IconInfo from '../../../assets/icons/IconInfo';

const CashbackInfo = ({ value,days }: CashbackInfoProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  useEffect(() => {
    if (tooltipVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setTooltipVisible(false);
      }, 5000);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [tooltipVisible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTooltip}>
        <View style={styles.infoContainer}>
          <Text>{`Compre e ganhe até ${value}% de Cashback`}</Text>
          <IconInfo />
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.tooltipContainer, { opacity: fadeAnim }]}>
        <View style={styles.arrow} />
        <Text style={styles.tooltipTitle}>
          {`Até ${value}% de cashback`}
        </Text>
        <Text style={styles.textTooltip}>
        {`Para utilizar em sua próxima compra com validade de ${days} dias.`}
        </Text>
      </Animated.View>
    </View>
  );
};

export default CashbackInfo;
