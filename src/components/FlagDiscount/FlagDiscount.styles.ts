import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  box: {
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
  },
  textPercentage: {
    fontFamily: FONTS.WORK_SANS_BOLD_ITALIC,
  },
  textOff: {
    marginTop: -6,
    fontFamily: FONTS.WORK_SANS_LIGHT_ITALIC,
  },
});
