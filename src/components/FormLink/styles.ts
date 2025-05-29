import { StyleSheet } from 'react-native';
import { FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: 14,
  },
  button: {
    backgroundColor: 'black',
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: 16,
  },
});

export default styles;
