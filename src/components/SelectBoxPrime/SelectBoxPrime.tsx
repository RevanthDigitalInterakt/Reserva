import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import {
  Typography,
  integerPart,
  decimalPart,
} from '@usereservaapp/reserva-ui';
import { styles } from './SelectBoxPrime.styles';
import testProps from '../../utils/testProps';

const redBadgeImage = require('./assets/redBadge.png');

interface SelectBoxPrimeProps {
  installmentsNumber: number;
  installmentsPrice: number;
  isChecked: boolean;
  onPress: (option: string) => void;
  price?: number;
  savedValue: number;
}

export function SelectBoxPrime({
  installmentsNumber,
  installmentsPrice,
  isChecked,
  onPress,
  price = 0,
  savedValue,
}: SelectBoxPrimeProps) {
  return (
    <TouchableOpacity
      style={styles.primePrice}
      onPress={() => onPress('pricePrime')}
      disabled={isChecked}
      {...testProps('com.usereserva:id/select_box_price_prime')}
    >
      <View style={styles.checkBoxContainer}>
        <View style={styles.primeCheckBox}>
          {isChecked && (
            <View
              style={styles.primeCheckBoxFill}
              {...testProps('com.usereserva:id/select_box_price_prime_checked')}
            />
          )}
        </View>

        <View style={styles.priceDataWrapper}>
          <Typography
            fontFamily="reservaSansRegular"
            style={styles.normalTextRed}
          >
            Clientes
            <Typography variant="descontoTag2" fontSize={20}>
              {' '}
              Prime
            </Typography>
          </Typography>

          <View style={styles.priceContainer}>
            <Typography
              fontFamily="reservaSansRegular"
              style={styles.normalTextRed}
            >
              {installmentsNumber}
              x
              {' '}
            </Typography>
            <Typography
              style={styles.integerPartPrime}
              fontFamily="reservaSansRegular"
            >
              R$
              {' '}
              {`${integerPart(installmentsPrice)},`}
            </Typography>
            <Typography
              color="vermelhoRSV"
              fontWeight="bold"
              fontFamily="reservaSansRegular"
            >
              {decimalPart(installmentsPrice)}
            </Typography>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.priceDataWrapper}>
          <ImageBackground
            source={redBadgeImage}
            resizeMode="cover"
            style={styles.imageBackgroundBadge}
          >
            <Typography
              fontFamily="reservaSansItalic"
              style={{ color: 'white' }}
            >
              Economize
              <Typography
                fontFamily="reservaSansRegular"
                style={{ fontWeight: 'bold' }}
              >
                {' '}
                R$
                {savedValue.toFixed(2)}
              </Typography>
            </Typography>
          </ImageBackground>

          <View style={[styles.priceContainer, styles.negativeMarginText]}>
            <Typography
              style={styles.integerPartPrime}
              fontFamily="reservaSansRegular"
            >
              R$
              {' '}
              {`${integerPart(price)},`}
            </Typography>
            <Typography
              color="vermelhoRSV"
              fontWeight="bold"
              fontFamily="reservaSansRegular"
            >
              {decimalPart(price)}
            </Typography>
          </View>
        </View>
      </View>

      <View style={styles.bePrimeBadge}>
        <Typography fontFamily="reservaSansRegular" style={styles.textWhite}>
          Seja
          <Typography variant="descontoTag2" fontSize={18}>
            {' '}
            Prime
          </Typography>
        </Typography>
      </View>
    </TouchableOpacity>
  );
}
