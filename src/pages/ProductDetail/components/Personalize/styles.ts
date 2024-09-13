import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    elevation: 3,
    shadowColor: COLORS.BLACK,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5,
  },
  externalText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 0,
    paddingTop: 20,
  },
  animatedView: {
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.LIGHT_OLIVE_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 3.65,
    elevation: 8,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
