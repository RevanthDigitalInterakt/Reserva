import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

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
    // height: scale(320),
    width: '100%',
  },

  imageBackground: {
    // flex: 1,
    height: 320,
  },

  linearGradientWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  bannerInfoWrapper: {
    alignItems: 'center',
    width: '100%',
    alignSelf: 'flex-end',
    marginTop: scale(66),
    marginBottom: scale(24),
  },

  bannerInfoText: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 32,
    color: COLORS.WHITE,
  },

  iosInfoText: {
    fontFamily: FONTS.NUNITO_REGULAR,
    marginTop: 16,
    fontSize: 16,
  },

  trackingAgreementText: {
    fontFamily: FONTS.RESERVA_SERIF_MEDIUM,
    marginTop: 24,
    fontSize: 20,
  },

  trackingDeniedText: {
    fontFamily: FONTS.NUNITO_REGULAR,
    marginTop: 16,
    fontSize: 16,
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
    paddingHorizontal: 106,
    position: 'absolute',
    bottom: 5,
    zIndex: 999,
  },

  infosWrapper: {
    width: '73%',
    marginTop: 16,
  },

  infosContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  infoIcon: {
    width: 42,
    height: 42,
    marginRight: 20,
  },

});
