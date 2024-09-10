import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../base/styles';
import { scale } from '../../utils/scale';

const styles = (
  discountTag: boolean = false,
  personalizeTag: boolean = false,
) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagWrapper: {
    position: 'absolute',
    top: personalizeTag ? 60 : 0,
    left: 0,
    zIndex: 1,
    elevation: 3,
  },
  saleOffWrapper: {
    position: 'absolute',
    top: discountTag ? personalizeTag ? 140 : 80 : personalizeTag ? 80 : 0,
    left: 0,
    elevation: 3,
    zIndex: 1,
  },
  saleOffIcon: {
    width: 80,
    height: 80,
  },
  cardCallToActionButtonsWrapper: {
    position: 'absolute',
    top: '2%',
    right: '4%',
  },
  cardCallToActionButtonsContentWrapper: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
  },
  loaderWrapper: {
    width: 20,
    height: 20,
  },
  lottieView: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
  shareButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    marginTop: 8,
  },
  shareIcon: {
    width: 16,
    height: 16,
  },
  personalizeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '2%',
    left: '4%',
    zIndex: 1,
    elevation: 3,
  },
  personalizeButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 37,
    maxWidth: 130,
  },
  personalizeIconBackground: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 18,
    padding: 2,
  },
  personalizeIcon: {
    width: 16,
    height: 16,
  },
  personalizeAnimateTextContainer: {
    overflow: 'hidden',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 0,
    maxWidth: 120,
  },
  personalizeAnimateTextStyle: {
    color: COLORS.BLACK,
    fontSize: 16,
  },
  zoomButtonWrapper: {
    position: 'absolute',
    bottom: '10%',
    right: '4%',
  },
  zoomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  zoomIcon: {
    width: 18,
    height: 18,
  },
  lastUnitsWrapper: {
    width: '100%',
    paddingVertical: 4,
    backgroundColor: COLORS.ALERT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastUnitsText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
  },
  productInfoWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  productInfoContentWrapper: {
    // flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productInfoTitle: {
    fontFamily: FONTS.RESERVA_DISPLAY_REGULAR,
    fontSize: scale(20),
    textAlign: 'left',
  },
  productInfoSubtitleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  productInfoSubtitle: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    color: COLORS.SUBTITLE_GRAY,
    fontSize: scale(14),
  },
  productInfoSubtitleIntegerAmount: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    color: COLORS.LIGHT_BLACK,
    fontSize: scale(14),
  },
  productInfoSubtitleFloatAmount: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    color: COLORS.LIGHT_BLACK,
    fontSize: scale(10),
  },
});

export default styles;
