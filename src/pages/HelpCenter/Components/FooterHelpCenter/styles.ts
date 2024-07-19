import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import { FONTS } from '../../../../base/styles';

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: scale(28),
    marginBottom: scale(24),
    alignSelf: 'flex-start',
    paddingHorizontal: scale(15),
  },
  container: {
    marginBottom: scale(10),
  },
  txtFooterTitle: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: scale(16),
  },
  textBody: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: scale(11),
  },
  txtLinkTitle: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: scale(12),
    textDecorationLine: 'underline',
    paddingVertical: 4,
    marginBottom: scale(8),
  },
});

export default styles;
