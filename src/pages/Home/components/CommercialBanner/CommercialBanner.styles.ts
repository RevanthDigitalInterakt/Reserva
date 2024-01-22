import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../base/styles/fonts';
import { COLORS } from '../../../../base/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 6,
    padding: 8,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'white',
  },
  underlinedText: {
    marginHorizontal: 10,
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    textDecorationStyle: 'solid',
    fontWeight: 'bold',
    color: 'white',
  },
  icons: {
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 350,
    padding: 20,
    backgroundColor: 'white',
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
    color: 'white',
    textAlign: 'center',
  },
});

export { styles };
