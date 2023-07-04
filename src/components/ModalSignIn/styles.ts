import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';
import { Box, Typography } from '@usereservaapp/reserva-ui';

const { width, height } = Dimensions.get('window');

export const objectStyles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ContainerModal = styled(Box).attrs(() => ({
  width: width - 24,
  height: height - 126,
}))``;

export const WrapperAboutPrime = styled(Box).attrs(() => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
}))`
  margin-top: 24;
  margin-bottom: 24;
`;

export const FooterDescription = styled(Typography)`
    margin-top: 12;
`;

export const FooterHighlight = styled(Typography)`
    text-decoration: underline;
`;
