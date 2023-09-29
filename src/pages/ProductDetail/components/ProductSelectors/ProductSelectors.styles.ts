import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/scale';

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
    height: scale(95),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
