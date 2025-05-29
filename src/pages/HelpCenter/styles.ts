import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    alignContent: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: scale(15),
  },
  titleContainer: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  txtTitle: {
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontSize: scale(22),
  },
  searchContainer: {
    marginBottom: 12,
    marginTop: 16,
  },
  sessionTitleContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 24,
  },
  txtSessionTitle: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: scale(12),
  },
});

export default styles;
