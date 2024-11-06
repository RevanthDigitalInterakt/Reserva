import React, { useCallback } from 'react';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { Typography } from '../Typography/Typography';

interface Option {
  value: string;
}

interface RadioButtonsFilterProps {
  optionsList: Option[];
  disabledOptions: string[];
  defaultSelectedItem: string[];
  color?: keyof typeof theme.colors;
  onSelectedChange: (item: string[]) => void;
  size?: number | string;
  fontSize?: string | number;
}

const orderSizes = (sizes: string[]) => sizes.sort((itemA, itemB) => {
  const numA = parseInt(itemA, 10);
  const numB = parseInt(itemB, 10);

  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }

  if (!isNaN(numA)) return -1;
  if (!isNaN(numB)) return 1;

  return itemA.localeCompare(itemB);
});

const RadioButtonsFilter: React.FC<RadioButtonsFilterProps> = React.memo(({
  optionsList,
  disabledOptions,
  defaultSelectedItem,
  color = 'preto',
  onSelectedChange,
  size = '34px',
  fontSize = '10px',
  ...props
}) => {
  defaultSelectedItem = defaultSelectedItem.map((item: string) => item.toUpperCase());

  if (!optionsList || optionsList.length === 0) return null;

  const changeSelectedItems = useCallback((isSelected: boolean, value: string) => {
    const updatedItems = isSelected
      ? defaultSelectedItem.filter((item: string) => item !== value.toUpperCase())
      : [...defaultSelectedItem, value.toUpperCase()];

    onSelectedChange(orderSizes(updatedItems));
  }, [defaultSelectedItem, onSelectedChange]);

  return (
    <Box alignItems="flex-start" flexWrap="wrap" flexDirection="row" {...props}>
      {optionsList.map(({ value }, index: number) => {
        const isSelected = defaultSelectedItem.includes(value.toUpperCase());

        return (
          <Box
            key={`option-${value}`}
            height={size}
            width={size}
            alignSelf="flex-start"
            bg={isSelected ? color : 'white'}
            alignItems="center"
            marginRight={index < optionsList.length - 1 ? 'micro' : undefined}
            marginBottom={index < optionsList.length - 1 ? 'nano' : undefined}
            borderRadius="pico"
            borderWidth="hairline"
            borderColor="divider"
          >
            <Button
              disabled={disabledOptions?.includes(value)}
              height={size}
              onPress={() => changeSelectedItems(isSelected, value)}
            >
              <Typography
                color={isSelected ? 'white' : color}
                fontFamily="nunitoBold"
                fontSize={fontSize}
              >
                {value.toUpperCase()}
              </Typography>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
});

export default RadioButtonsFilter;
