import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../../base/styles';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  carousel: {
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    position: 'relative',
    width: width * 0.90,
    height: 224,
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 6,
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    justifyContent: 'center',
  },
  childContainer: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    width: width * 0.90,
    height: 224,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
  },
  btnImageStyle: {
    width: 130,
    height: 181,
    alignItems: 'center',
    margin: 4,
  },
  image: {
    borderRadius: 6,
  },
  btnDescriptionStyle: {
    alignSelf: 'center',
  },
  descriptionContainer: {
    alignSelf: 'center',
    width: width * 0.49,
    height: width / 2.2,
    marginLeft: 6,
    justifyContent: 'space-around',
  },
  txtTitleItem: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 17.28,
    color: COLORS.LIGHT_BLACK,
  },
  pricesContainer: {
    marginTop: 14,
  },
  txtOldPriceContainer: {
    flexDirection: 'row',
  },
  txtOldPrice: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22.4,
    color: COLORS.LIGHT_BLACK,
  },
  txtOfferContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txtOffer: {
    fontFamily: FONTS.ARIAL,
    fontWeight: '400',
    lineHeight: 16.1,
    fontSize: 14,
    color: COLORS.GRAY62,
  },
  infoContainer: {
    marginTop: 14,
  },
  txtItemSizeContainer: {
    flexDirection: 'row',
  },
  txtBold: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    fontWeight: '700',
    color: COLORS.LIGHT_BLACK,
    fontSize: 14,
    lineHeight: 19.6,
  },
  txtGray: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '400',
    color: COLORS.TEXT_GRAY,
    fontSize: 14,
    lineHeight: 19.6,
  },
  txtItemColorContainer: {
    flexDirection: 'row',
  },
  iconHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  iconHeart: {
    width: 14,
    height: 13,
  },
  txtSaveForLater: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '400',
    color: COLORS.BLACK,
    fontSize: 13.86,
    lineHeight: 18.3,
    marginLeft: 6,
  },
  bulletsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    position: 'relative',
  },
});
