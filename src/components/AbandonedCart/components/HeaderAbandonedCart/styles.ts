import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitle: {
    fontFamily: FONTS.ARIAL,
    fontSize: scale(18),
    fontWeight: '400',
    lineHeight: scale(20.7),
    color: COLORS.LIGHT_BLACK,
  },
  txtSeeBag: {
    fontFamily: FONTS.ARIAL,
    fontSize: scale(14),
    fontWeight: '400',
    lineHeight: scale(16.1),
    color: COLORS.GRAY62,
  },
  seeBagContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: scale(16),
    height: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
