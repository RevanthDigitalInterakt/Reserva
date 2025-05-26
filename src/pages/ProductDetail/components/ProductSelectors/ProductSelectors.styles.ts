import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';
import { FONTS } from '../../../../base/styles';

export const styles = StyleSheet.create({
  containerLoading: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: '50%',
    left: '50%',
    marginTop: 0,
    marginLeft: -8,
  },
  inputsWrapper: {
    width: '100%',
    height: scale(90),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scale(12),
  },
  infoText: {
    marginLeft: scale(4),
    textDecorationLine: 'underline',
    fontFamily: FONTS.RESERVA_SANS_MEDIUM,
  },
  fixedWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    display: 'flex',
  },
});
