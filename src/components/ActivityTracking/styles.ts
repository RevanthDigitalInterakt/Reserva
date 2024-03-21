import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    zIndex: 999,
  },

  contentWrapper: {
    paddingBottom: 50,
  },

  bannerWrapper: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    width: '100%',
  },

  imageBackground: {
    height: 236,
  },

  linearGradientWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  bannerInfoWrapper: {
    marginLeft: 32,
    width: '100%',
    marginTop: 38,
    marginBottom: 32,
  },

  bannerInfoText: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 28,
    color: COLORS.WHITE,
    lineHeight: 30,
    letterSpacing: 0.2,
  },

  iosInfoText: {
    fontFamily: FONTS.NUNITO_REGULAR,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 20,
    width: '100%',
    color: COLORS.EXTRA_LIGHT_GRAY,
  },

  trackingAgreementText: {
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    marginTop: 18,
    fontSize: 20,
  },

  trackingDeniedText: {
    fontFamily: FONTS.NUNITO_REGULAR,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
  },

  trackingDoubtPressable: {
    marginTop: -2,
  },

  trackingDoubtText: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  darkButtonWrapper: {
    position: 'absolute',
    bottom: 24,
    zIndex: 999,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 80,
  },

  infosWrapper: {
    width: '82%',
    marginTop: 16,
  },

  infosContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },

  infoText: {
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
    fontSize: 13,
    marginLeft: 8,
  },

  infoIcon: {
    width: 42,
    height: 42,
    marginRight: 20,
  },

});
