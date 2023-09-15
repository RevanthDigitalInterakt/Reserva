import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  box: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
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
