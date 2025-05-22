import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import configDeviceSizes from '../../utils/configDeviceSizes';
import { COLORS } from '../../base/styles/colors';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

export const objectStyles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const WrapperAboutPrime = styled(Box).attrs(() => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
}))`
  margin-top: 8;
  margin-bottom: 24;
`;

export const FooterDescription = styled(Typography)`
    margin-top: 12;
`;

export const FooterHighlight = styled(Typography)`
    text-decoration: underline;
`;

export const styles = StyleSheet.create({
  containerModal: {
    padding: 32,
    backgroundColor: COLORS.WHITE,
    width: configDeviceSizes.DEVICE_WIDTH - 24,
  },
  body: {
    color: COLORS.DARK_GRAY,
    fontFamily: 'ReservaSans-Regular',
    fontSize: 16,
    lineHeight: 20,
  },
  textPrimeTitle: {
    fontSize: 26,
    marginBottom: 24,
    fontFamily: 'ReservaDisplay-Regular',
    color: COLORS.BLACK,
  },
  textPrime: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'ReservaDisplay-Regular',
    color: COLORS.BLACK,
  },
  textPrice: {
    color: COLORS.BLACK,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'ReservaSans-Bold',
  },
});
