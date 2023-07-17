import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 8,
  },

  title: {
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 24,
  },

  titleBold: {
    fontSize: 20,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.GRAY,
    marginBottom: 32,
  },

  listWrapper: {
    paddingHorizontal: 20,
  },

  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  icon: {
    marginBottom: 32,
  },

  itemTitle: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
  },

  itemDescription: {
    color: COLORS.GRAY,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },

  itemDescriptionBold: {
    color: '#000000',
    fontSize: 16,
    lineHeight: 20,
  },
});
