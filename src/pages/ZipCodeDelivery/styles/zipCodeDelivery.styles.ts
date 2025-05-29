import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../base/styles';

export const zipCodeStyles = StyleSheet.create({
  safeArea: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  titleCep: {
    fontFamily: FONTS.RESERVA_SERIF_REGULAR,
    fontWeight: '400',
    fontSize: 24,
  },
  cepLabelInformation: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  boxContainer: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    margin: 8,
  },
  containerPaddingX: {
    paddingHorizontal: 16,
  },
  containerMarginTop: {
    marginTop: 16,
  },
  descriptionText: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 14,
    fontWeight: '400',
  },
  descriptionTextCep: {
    fontWeight: '700',
  },
});
