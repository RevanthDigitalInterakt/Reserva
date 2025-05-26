import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    width: 228,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: COLORS.MEDIUM_GRAY,
    borderColor: COLORS.MEDIUM_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(20),
  },
  textFinishPurchase: {
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18.48,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
  },
});
