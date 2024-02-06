import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../base/styles/fonts';
import { COLORS } from '../../../../base/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.BLACK,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 6,
    paddingVertical: 8,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 20,
    height: '175%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: COLORS.WHITE,
  },
  underlinedText: {
    marginHorizontal: 10,
    fontSize: 12,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.WHITE,
    textDecorationStyle: 'solid',
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  icons: {
    flex: 1,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MODAL_BACKGROUND_COLOR,
  },
  modalContent: {
    width: 300,
    height: 350,
    padding: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 26,
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    color: COLORS.LIGHT_BLACK,
  },
  modalDescription: {
    fontSize: 18,
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontWeight: '400',
    color: COLORS.LIGHT_BLACK,
  },
  modalButton: {
    backgroundColor: COLORS.MEDIUM_GRAY,
    padding: 10,
    marginTop: 10,
  },
  modalButtonText: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});

export { styles };
