import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    marginVertical: 10,
  },

  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  labelMainAddress: {
    color: '#656565',
    fontWeight: '700',
  },

  actionButtonSubmit: {
    backgroundColor: '#333333',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textActionButtonSubmit: {
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  actionButtonCancel: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333333',
  },

  textActionButtonCancel: {
    color: '#333333',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default styles;
