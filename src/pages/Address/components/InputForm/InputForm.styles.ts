import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333333',
  },

  inputText: {
    marginHorizontal: 10,
  },

  borderErrorActive: {
    borderColor: '#E4002B',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorIcon: {
    width: 13,
    height: 13,
  },
  errorMessage: {
    color: '#E4002B',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default styles;
