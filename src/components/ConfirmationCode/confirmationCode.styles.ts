import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { COLORS, FONTS } from '../../base/styles';

export const confirmationCodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 24,
  },
  title: {
    marginTop: 24,
    fontSize: scale(24),
    color: COLORS.BLACK,
    fontFamily: FONTS.INTER_SEMI_BOLD,
  },
  subtitle: {
    marginBottom: 16,
    fontSize: scale(13),
    marginTop: 8,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.INTER_MEDIUM,
    lineHeight: 19.6,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  input: {
    width: 40,
    height: 70,
    textAlign: 'center',
    fontSize: scale(28),
  },
  bottomContainer: {
    marginTop: 24,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: scale(12),
    marginTop: 4,
    textAlign: 'center',
    color: COLORS.SLATE_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FONTS.INTER_REGULAR,
  },
  timerText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.INTER_BOLD,
  },
  resendLink: {
    fontSize: scale(12),
    color: COLORS.DARK_GREY_VARIANT_1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FONTS.INTER_SEMI_BOLD,
    textDecorationLine: 'underline',
  },
  errorDescription: {
    color: COLORS.ERROR_INPUT,
    marginTop: 3,
    marginLeft: 4,
    fontFamily: FONTS.INTER_MEDIUM,
  },
});
