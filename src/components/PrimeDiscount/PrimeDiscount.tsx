import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './PrimeDiscount.styles';
import IconDiamond from '../../../assets/icons/IconDiamond';
import { PriceCustom } from '../PriceCustom/PriceCustom';
import { Button } from '../Button';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';

interface PrimeDiscountProps {
  valor?: number
  setOpenModal?:(value:boolean)=>void
}

const PrimeDiscount = ({ valor, setOpenModal }: PrimeDiscountProps) => {
  const { onAddPrimeToCart, isPrime } = usePrimeInfo();
  

  const handleClick = () =>{
    onAddPrimeToCart()
    if (setOpenModal) {
      setOpenModal(true);
    }
  }
  
  return (
    <>
    {valor !== null &&
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconDiamond />
        </View>
        <Text style={styles.text}>
          {isPrime ? 'Desconto Prime' : 'Valor para assinantes '}
          {!isPrime && <Text style={styles.boldText}>Prime</Text>}
        </Text>
        <PriceCustom
          fontFamily="nunitoBold"
          color="#9E7E2F"
          sizeInteger={15}
          sizeDecimal={11}
          num={valor || 0}
        />
      </View>
      }
      {!isPrime &&
        <>
          <Button
            onPress={() => handleClick()}
            title="ASSINE AGORA POR 12x de R$25"
            variant="primarioEstreito"
            inline
            style={{backgroundColor:'#C5A967'}}
          />
          <Text style={styles.textInfo}>
            Com a Reserva Prime tenha um mundo de benefícios como
          </Text>
          <Text style={styles.textInfoBold}>
            descontos e frete grátis em todos os seus pedidos!*
          </Text>
        </>
      }
    </>
  );
};


export default PrimeDiscount;
