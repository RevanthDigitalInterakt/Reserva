import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../../../base/styles';
import { scale } from '../../../../../../utils/scale';

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
  },
  containerSessionTitle: {
    marginBottom: 8,
  },
  txtSessionTitle: {
    fontSize: scale(14),
    fontFamily: FONTS.NUNITO_BOLD,
  },
  containerBodyText: {
    marginBottom: 8,
  },
  txtBodyText: {
    fontSize: scale(11),
    fontFamily: FONTS.NUNITO_REGULAR,
  },
  containerImage: {
    marginBottom: 8,
  },
});

export default styles;
