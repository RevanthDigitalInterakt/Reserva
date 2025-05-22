import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';

const styles = (isSelected: boolean) => StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: 196,
  },

  btnContainer: {
    borderColor: isSelected ? COLORS.BLACK : COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 5,
    width: 31,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },

  btnSelectColor: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isSelected ? COLORS.RED : '',
  },

  btnContent: {
    height: 25,
    width: 25,
    backgroundColor: isSelected ? COLORS.BLACK : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
  },

  btnText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16.8,
    color: isSelected ? COLORS.WHITE : COLORS.BLACK,
  },
});

export default styles;
