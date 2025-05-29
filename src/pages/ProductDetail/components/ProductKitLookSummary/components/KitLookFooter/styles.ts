import { Platform, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../../../base/styles';
import { scale } from '../../../../../../utils/scale';
import { platformType } from '../../../../../../utils/platformType';

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    height: '100%',
    paddingHorizontal: 12,
    elevation: Platform.OS === platformType.ANDROID ? 10 : 0,
    bottomBarShadow: Platform.OS === platformType.ANDROID ? null : '0px -3px 2px rgba(0,0,0,0.1)',
  },

  boxBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  btnTouchAddToBag: {
    backgroundColor: COLORS.ENABLED_GREEN,
    height: 50,
    alignItems: 'center',
    padding: 16,
  },

  btnTouchAddToBagDisabled: {
    backgroundColor: COLORS.DISABLED_GRAY,
    height: 50,
    alignItems: 'center',
    padding: 16,
  },

  btnTextAddToBag: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '500',
    lineHeight: 18.48,
    color: COLORS.WHITE,
    fontSize: scale(14),
    textTransform: 'uppercase',
  },

  textFinalValue: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.8,
  },

  textLabelInstallments: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16.8,
  },

  textInstallments: {
    color: COLORS.LIGHT_BLACK,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16.8,
  },

  containerLoading: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: '50%',
    left: '50%',
    marginTop: 0,
    marginLeft: -8,
  },
});

export default styles;
