import { StyleSheet } from 'react-native';
import { FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  card: {
    height: 42,
    width: 179,
    backgroundColor: '#000',
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    color: '#F8CD78',
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
  },
  textsContainer: {
    marginRight: 10,
  },
  amount: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
  },
});
