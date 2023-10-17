import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles';

const styles = StyleSheet.create({

  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    flex: 1,
  },

  backdrop: {
    flex: 1,
    backgroundColor: COLORS.BACKDROP,
  },

  contentWrapper: {
    height: '50%',
    backgroundColor: COLORS.WHITE,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

});

export default styles;
