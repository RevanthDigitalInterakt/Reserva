import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface CopiedCupomDescriptionProps {
  onPress: () => void;
}

export function CopiedCupomDescription({ onPress }: CopiedCupomDescriptionProps) {
  return (
    <>
      <Text style={styles.normalDescription}>
        Cupom copiado com sucesso,
        agora
        basta colar no campo
        <Text style={styles.boldDescription}>
          {' '}
          cupom de
          desconto
          {' '}
        </Text>
        na sacola de compras e
        aproveitar
        seu benefício!
        Mas se lembre, você só
        pode utilizar
        um cupom por conta e ele
        não é
        cumulativo com outras promoções ou
        produtos com desconto.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>CONTINUAR COMPRANDO</Text>
      </TouchableOpacity>
      <Text style={styles.disclaimer}>
        Este cupom é válido até o dia 26 de novembro!
      </Text>
    </>
  );
}
