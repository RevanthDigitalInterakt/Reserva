import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  mainContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: scale(15),
  },
  containerTitle: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  containerTxtTitle: {
    marginBottom: 8,
  },
  txtTitle: {
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(20),
  },
  containerBody: {
    alignSelf: 'flex-start',
    marginBottom: scale(20),
    marginTop: scale(20),
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
