import styled from 'styled-components/native';
import {
  color,
  typography,
  variant,
  fontSize,
  type TypographyProps,
  type ColorProps,
  fontFamily,
} from 'styled-system';
import { Text } from 'react-native';
import type { theme } from '../../base/usereservappLegacy/theme';

type TextVariantsTypes =
  | 'descontoTag1'
  | 'descontoTag2'
  | 'descontoTag1AllCaps'
  | 'descontoTag2AllCaps'
  | 'descontoTag3AllCaps'
  | 'tituloSessoes'
  | 'subtituloSessoes'
  | 'precoProduto1'
  | 'precoTotal'
  | 'precoPromocional1'
  | 'tituloSessao'
  | 'precoPromocional2'
  | 'precoAntigo3'
  | 'botaoFiltrarEOrdenarProdutos'
  | 'descricaoCampoDePreenchimento'
  | 'parcelas2'
  | 'tituloProdutosQueCombinam'
  | 'searchComponent';

export interface TextProps
  extends // @ts-ignore
  TypographyProps<typeof theme>,
  // @ts-ignore
  ColorProps<typeof theme> {
  fontFamily?: keyof typeof theme.fonts;
  variant?: TextVariantsTypes;
  letterSpacing?: number;
  lineHeight?: number;
}

export const textVariants = variant<TextProps, TextVariantsTypes, 'variant'>({
  variants: {
    descontoTag1: {
      fontFamily: 'reservaSerifBold',
      fontSize: 27,

    },
    descontoTag2: {
      fontFamily: 'reservaSerifBold',
      fontSize: 15,

    },
    descontoTag1AllCaps: {
      fontFamily: 'reservaSerifBold',
      fontSize: 14,

    },
    descontoTag2AllCaps: {
      fontFamily: 'reservaSerifBold',
      fontSize: 8,

    },
    descontoTag3AllCaps: {
      fontFamily: 'reservaSerifBold',
      fontSize: 8,

    },
    tituloSessoes: {
      fontFamily: 'reservaSerifRegular',
      fontSize: 28,

    },
    subtituloSessoes: {
      fontFamily: 'reservaSerifRegular',
      fontSize: 20,

    },
    precoProduto1: {
      fontFamily: 'nunitoBold',
      fontSize: 22,

    },
    precoTotal: {
      fontFamily: 'nunitoBold',
      fontSize: 20,

    },
    precoPromocional1: {
      fontFamily: 'nunitoBold',
      fontSize: 18,

    },
    precoPromocional2: {
      fontFamily: 'nunitoBold',
      fontSize: 14,

    },
    tituloSessao: {
      fontFamily: 'nunitoRegular',
      fontSize: 15,

    },
    precoAntigo3: {
      fontFamily: 'nunitoRegular',
      fontSize: 13,

    },
    botaoFiltrarEOrdenarProdutos: {
      fontFamily: 'nunitoRegular',
      fontSize: 12,

    },
    descricaoCampoDePreenchimento: {
      fontFamily: 'nunitoRegular',
      fontSize: 11,

    },
    parcelas2: {
      fontFamily: 'nunitoRegular',
      fontSize: 10,

    },
    tituloProdutosQueCombinam: {
      fontFamily: 'nunitoRegular',
      fontSize: 8,

    },
    searchComponent: {
      fontFamily: 'reservaSansMedium',
      fontSize: 14,
    },
  },
});

export const Typography = styled(Text) <
TextProps >`
  ${color}
  ${typography}
  ${textVariants}
  ${fontSize}
`;
