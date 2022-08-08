import React from 'react';

import { Dimensions, Platform, StyleSheet } from 'react-native';
import { theme } from '@danilomsou/reserva-ui';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  boxIndicatorMain: {
    height: height * 0.25,
    justifyContent: 'space-between',
    position: 'absolute',
    marginLeft: 32,
    top: 29,
  },
  boxIndicatorChild: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    marginHorizontal: 6,
    borderWidth: 1,
  },
  boxButtonClose: {
    position: 'absolute',
    right: 24,
    zIndex: 4,
    top: 29,
    width: 20,
    height: 20,
  },
  imageBackground: {
    height: height,
    width: width,
  },
  boxImageHeader: {
    marginTop: 66,
    marginLeft: 36,
    marginBottom: 20,
  },
  typographyTitle: {
    fontFamily: theme.fonts.reservaSerifBold,
    fontSize: 46,
    color: theme.colors.white,
    marginTop: 62,
    marginLeft: 34,
    marginRight: width * 0.2,
    marginBottom: 15,
    lineHeight: 47,
  },
  typographySubtitle: {
    fontFamily: theme.fonts.reservaSansRegular,
    fontSize: 16,
    color: theme.colors.white,
    marginLeft: 34,
    marginRight: 33,
    lineHeight: 21,
  },
  typographyDescription: {
    fontFamily: theme.fonts.reservaSansRegular,
    fontSize: 14,
    color: theme.colors.white,
    lineHeight: 19,
    marginLeft: 34,
    marginRight: 33,
    bottom: 20,
    position: 'absolute',
  },
  buttonTitle: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    paddingLeft: 10,
    alignContent: 'center',
    marginLeft: 36,
    marginRight: 36,
    height: 50,
    borderRadius: 8,
  },
  buttonTypographyTitle: {
    fontFamily: theme.fonts.nunitoRegular,
    fontSize: 13,
    color: 'rgba(18,18,18,1)',
    lineHeight: 24,
    letterSpacing: 1.6,
  },
  buttonNext: {
    alignContent: 'center',
    width: width,
    height: 27,
    marginBottom: 40,
    marginTop: 16,
    alignItems: 'center',

    alignSelf: 'flex-end',
  },
  buttonTypographyNext: {
    fontFamily: theme.fonts.nunitoBold,
    fontSize: 13,
    letterSpacing: 1.6,
    color: theme.colors.white,
    lineHeight: 24,
  },
});
