import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Typography,
  decimalPart,
  integerPart,
} from '@usereservaapp/reserva-ui';
import { styles } from './SelectBoxNormal.styles';
import testProps from '../../utils/testProps';

export interface SelectBoxNormalProps {
  onPress: (option: string) => void;
  isChecked: boolean;
  installmentsNumber: number;
  installmentsPrice: number;
  price?: number;
}

export function SelectBoxNormal({
  installmentsNumber,
  installmentsPrice,
  isChecked,
  onPress,
  price = 0,
}: SelectBoxNormalProps) {
  return (
    <TouchableOpacity
      style={styles.normalPrice}
      onPress={() => onPress('priceNormal')}
      disabled={isChecked}
      {...testProps('com.usereserva:id/select_box_price_normal')}
    >
      <View style={styles.checkBoxContainer}>
        <View style={styles.normalCheckBox}>
          {isChecked && (
            <View
              style={styles.normalCheckBoxFill}
              {...testProps('com.usereserva:id/select_box_price_normal_checked')}
            />
          )}
        </View>

        <View style={styles.priceDataWrapper}>
          <Typography
            fontFamily="reservaSansRegular"
            style={styles.normalTextGray}
          >
            Preço Normal
          </Typography>

          <View style={styles.priceContainer}>
            <Typography
              fontFamily="reservaSansRegular"
              style={styles.normalText}
            >
              {installmentsNumber}
              x
              {' '}
            </Typography>
            <Typography
              style={styles.integerPart}
              fontFamily="reservaSansRegular"
            >
              R$
              {' '}
              {`${integerPart(installmentsPrice)},`}
            </Typography>
            <Typography
              style={styles.decimalPart}
              fontFamily="reservaSansRegular"
            >
              {decimalPart(installmentsPrice)}
            </Typography>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.priceDataWrapper}>
          <View style={[styles.priceContainer, styles.marginText]}>
            <Typography
              style={[styles.integerPart, styles.normalTextBlack]}
              fontFamily="reservaSansRegular"
            >
              R$
              {' '}
              {`${integerPart(price)},`}
            </Typography>
            <Typography
              style={styles.normalTextBlack}
              fontWeight="bold"
              fontFamily="reservaSansRegular"
            >
              {decimalPart(price)}
            </Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
