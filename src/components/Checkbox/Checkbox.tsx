import React from 'react';
import { Text } from 'react-native';
import { Box, type BoxProps } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';
import type { theme } from '../../base/usereservappLegacy/theme';
import { checkboxStyles } from './Checkbox.styles';

export interface CheckboxProps extends BoxProps {
  optionName: string;
  checked?: boolean;
  color?: keyof typeof theme.colors;
  selectedColor?: keyof typeof theme.colors;
  onCheck?: () => void;
  fontSize?: number,
  fontFamily?: string,
  testID?: string;
  newPackageItem?: boolean;
}

export function Checkbox({
  checked,
  optionName,
  onCheck,
  fontSize = 12,
  fontFamily = 'nunitoRegular',
  color = 'dropDownBorderColor',
  selectedColor = 'preto',
  width = '50%',
  alignItems = 'center',
  testID,
  newPackageItem = false,
  ...props
}: CheckboxProps) {
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
        testID={testID}
      >
        <IconLegacy
          name={checked ? 'CheckboxChecked' : 'CheckboxUnchecked'}
          color={
            // eslint-disable-next-line no-nested-ternary
            color ? (selectedColor && checked ? selectedColor : color) : 'preto'
          }
          size={15}
        />
      </Button>
      <Box ml="nano">
        {newPackageItem ? (
          <Text style={checkboxStyles.text}>
            {optionName}
          </Text>
        ) : (

          <Typography
            fontSize={fontSize}
            fontFamily={fontFamily}
            variant="botaoFiltrarEOrdenarProdutos"
          >
            {optionName}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export interface CheckboxListProps {
  optionsList: string[];
  selectedList: string[];
  color?: keyof typeof theme.colors;
  selectedColor?: keyof typeof theme.colors;
  onCheckChange: (cheboxList: string[]) => void;
}

export function CheckboxList({
  optionsList,
  selectedList,
  onCheckChange,
  color,
  selectedColor,
}: CheckboxListProps) {
  const isChecked = (option: string) => selectedList.indexOf(option) >= 0;
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {optionsList.map((option) => (
        <Checkbox
          key={`option-${option}`}
          paddingY="nano"
          optionName={option}
          checked={isChecked(option)}
          color={color || 'preto'}
          selectedColor={selectedColor || 'preto'}
          onCheck={() => {
            if (isChecked(option)) onCheckChange(selectedList.filter((x) => x != option));
            else onCheckChange([...selectedList, option]);
          }}
        />
      ))}
    </Box>
  );
}
