import React from 'react';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';
import type { BoxProps } from '../Box/types';

export interface CheckboxFilterProps extends BoxProps {
  optionName: string;
  checked?: boolean;
  color?: keyof typeof theme.colors;
  selectedColor?: keyof typeof theme.colors;
  onCheck?: () => void;
  fontSize?: number | string;
  fontFamily?: keyof typeof theme.fonts;
}

export function CheckboxFilter({
  checked,
  optionName,
  onCheck,
  fontSize = '12px',
  fontFamily = 'nunitoRegular',
  color = 'dropDownBorderColor',
  selectedColor = 'preto',
  width = '50%',
  alignItems = 'center',
  ...props
}: CheckboxFilterProps) {
  return (
    <Box flexDirection="row" width={width} alignItems={alignItems} {...props}>
      <Button
        hitSlop={{
          top: 10, left: 10, bottom: 10, right: 10,
        }}
        onPress={() => {
          if (onCheck) {
            onCheck();
          }
        }}
      >
        <IconLegacy
          name={checked ? 'CheckboxChecked' : 'CheckboxUnchecked'}
          color={
            color ? (selectedColor && checked ? selectedColor : color) : 'preto'
          }
          size={15}
        />
      </Button>
      <Box ml="nano">
        <Typography
          fontSize={fontSize}
          fontFamily={fontFamily}
          variant="botaoFiltrarEOrdenarProdutos"
        >
          {optionName}
        </Typography>
      </Box>
    </Box>
  );
}

export interface CheckboxListFilterProps {
  optionsList: any[];
  selectedList: any[];
  color?: keyof typeof theme.colors;
  selectedColor?: keyof typeof theme.colors;
  onCheckChange: (cheboxList: string[]) => void;
}

export function CheckboxListFilter({
  optionsList,
  selectedList,
  onCheckChange,
  color,
  selectedColor,
}: CheckboxListFilterProps) {
  const isChecked = (
    option: any,
  ) => selectedList.filter(({ value }) => value === option.value).length > 0;

  return (
    <Box flexDirection="row" flexWrap="wrap">
      {optionsList.map(({ key, value }: any, index) => (
        <CheckboxFilter
          key={`option-${key}-${value}`}
          paddingY="nano"
          optionName={value.charAt(0).toUpperCase() + value.slice(1)}
          checked={isChecked({ key, value: value.toLowerCase() })}
          color={color || 'preto'}
          selectedColor={selectedColor || 'preto'}
          onCheck={() => {
            if (isChecked({ key, value: value.toLowerCase() })) {
              onCheckChange(selectedList.filter(({ value: val }: any) => val !== value));
            } else onCheckChange([...selectedList, { key, value }]);
          }}
        />
      ))}
    </Box>
  );
}
