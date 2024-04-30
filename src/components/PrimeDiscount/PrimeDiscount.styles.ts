import { StyleSheet } from 'react-native';
import { FONTS } from '../../base/styles';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDEB',
    borderColor: '#C4A968',
    borderWidth: 1,
    padding: 10,
    justifyContent:'center'
  },
  iconContainer: {
    marginRight: 10,
    marginLeft:10
  },
  icon: {
    color: '#9E7E2F',
    fontSize: 20,
  },
  boldText: {
    fontWeight: 'bold'
  },
  text: {
    fontFamily: FONTS.RESERVA_SERIF_BOLD,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto',
    color: '#9E7E2F'
  },
  textInfo: {
    color: '#848484',
    textAlign:'center',
    marginTop:15,
  },
  textInfoBold: {
    color: '#848484',
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:15,
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9E7E2F'
  },
});
