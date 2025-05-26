import type { VariantArgs } from 'styled-system';

import type { ButtonStyleProps, VariantStyles } from './types';

export const buttonVariants: VariantArgs<
ButtonStyleProps,
VariantStyles,
'variant'
> = {
  variants: {
    none: {},
    icone: {},
    primarioEstreitoSmall: {
      fontSize: '13px',
      bg: 'preto',
      fontFamily: 'nunitoRegular',
      color: 'white',
      height: '32px',
    },
    primarioEstreito: {
      minWidth: '130px',
      py: 'xxxs',
      px: 'nano',
      fontSize: 13,
      fontFamily: 'nunitoBold',
      color: 'white',
      bg: 'preto',
    },
    primarioEstreitoOutline: {
      minWidth: '130px',
      py: 'xxxs',
      px: 'nano',
      fontSize: 13,
      fontFamily: 'nunitoBold',
      color: 'preto',
      borderWidth: 1,
      borderColor: 'borderButton',
    },
    primarioMaior: {
      width: 360,
      py: 'xxxs',
      fontSize: 13,
      fontFamily: 'nunitoBold',
      color: 'white',
      bg: 'preto',
    },
    primarioMaiorConfirmacao: {
      width: 360,
      py: 'xxxs',
      fontSize: 13,
      fontFamily: 'nunitoBold',
      color: 'white',
      bg: 'verdeSucesso',
    },
    semBorda: {
      color: 'preto',
      fontFamily: 'nunitoBold',
    },
    modal: {
      borderWidth: 1,
      borderColor: 'preto',
      borderRadius: 'pico',
      height: 32,
      width: 215,
    },
  },
};
