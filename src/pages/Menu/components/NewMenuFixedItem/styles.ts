import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    height: scale(16),
    marginTop: scale(24),
  },
  icon: {
    width: scale(18),
  },
  titleWrapper: {
    marginHorizontal: 9,
  },
  title: {
    alignSelf: 'flex-end',
    color: COLORS.BLACK,
    fontSize: 15,
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
  },

});

export default styles;
