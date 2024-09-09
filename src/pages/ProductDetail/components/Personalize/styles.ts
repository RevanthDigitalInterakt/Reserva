import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 5,
  },
  externalText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  animatedView: {
    borderRadius: 10,
    borderWidth: 2.1,
    backgroundColor: 'white',
    shadowColor: '#b8b894',
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
