import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles';
import { scale } from '../../../../utils/scale';
import configDeviceSizes from '../../../../utils/configDeviceSizes';

const styles = StyleSheet.create({
  mainCarousel: {
    height: 400,
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  categoryTitle: {
    width: 250,
    height: 30,
    marginTop: scale(20),
    borderRadius: 4,
    marginHorizontal: scale(12),
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  containerCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: scale(10),
    marginHorizontal: scale(14),
  },

  categoryCard: {
    width: configDeviceSizes.DEVICE_WIDTH * 0.20,
    height: configDeviceSizes.DEVICE_WIDTH * 0.20,
    borderRadius: 8,
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  shelfTitle: {
    width: 250,
    height: 25,
    borderRadius: 4,
    marginTop: scale(10),
    marginHorizontal: scale(14),
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  shelfSubtitle: {
    width: configDeviceSizes.DEVICE_WIDTH * 0.92,
    height: 20,
    borderRadius: 4,
    marginTop: scale(8),
    marginHorizontal: scale(14),
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  shelfBottomSubtitle: {
    width: configDeviceSizes.DEVICE_WIDTH * 0.92,
    height: 25,
    borderRadius: 4,
    marginTop: scale(25),
    marginHorizontal: scale(14),
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  containerProducts: {
    flexDirection: 'row',
    marginHorizontal: scale(14),
    gap: 8,
    marginTop: scale(8),
  },

  productCard: {
    borderRadius: 10,
    width: 165,
    height: 270,
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  productTitle: {
    width: 165,
    height: 12,
    borderRadius: 4,
    marginTop: scale(5),
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

  productPrice: {
    width: 165,
    height: 12,
    borderRadius: 4,
    marginTop: scale(5),
    backgroundColor: COLORS.SUBTITLE_GRAY,
  },

});

export default styles;
