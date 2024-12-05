import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  mainContainer: {
    elevation: 6,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 15,
    shadowRadius: 4,
    marginBottom: 16,
    width: '100%',
    minHeight: 132,
  },

  bodyContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  numberOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textOrder: {
    fontSize: scale(12.3),
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    color: COLORS.BLACK,
  },

  textOrderValue: {
    fontSize: scale(14),
    fontFamily: FONTS.NUNITO_BOLD,
    color: COLORS.BLACK,
  },

  textOrderId: {
    fontSize: scale(15.4),
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    color: COLORS.RED_RSV,
  },

  orderDateContainer: {
    marginTop: 8,
  },

  textOrderDate: {
    fontSize: scale(10.8),
    fontFamily: FONTS.NUNITO_REGULAR,
    color: COLORS.BLACK,
  },

  statusDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textStatusDescription: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: scale(11),
    fontFamily: FONTS.NUNITO_BOLD,
  },

  iconContainer: {
    alignItems: 'center',
    paddingTop: 8,
  },

});

export default styles;
