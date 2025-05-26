import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../../../base/styles';
import { scale } from '../../../../../../utils/scale';

const styles = StyleSheet.create({
  containerFooterDoris: {
    marginTop: 16,
  },

  txtFooterDoris: {
    fontSize: scale(12),
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    textAlign: 'center',
  },

  txtFooterDorisBold: {
    fontSize: scale(12),
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '500',
  },
});

export default styles;
