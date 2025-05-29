import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: COLORS.BACKGROUND_GRAY,
    width: '100%',
    alignSelf: 'center',
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 31,
  },
  boldText: {
    color: '#333',
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontSize: 14,
    marginLeft: 4,
  },
  normalText: {
    color: '#333',
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
  },
  couponText: {
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    fontSize: 14,
    color: COLORS.ACTION_BUTTON_COLOR,
  },
  closeWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 12,
  },
  discountAlertTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  clipboardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
  },
  dottedBox: {
    minWidth: 92,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.MEDIUM_GRAY,
    borderStyle: 'dashed',
    marginRight: 8,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  copyBox: {
    minWidth: 126,
    backgroundColor: COLORS.ACTION_BUTTON_COLOR,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  copyText: {
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    fontSize: 14,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
});

export default styles;
