import React, { useEffect, useState } from 'react';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { Typography } from '../Typography/Typography';

interface RadioButtonsFilterProps {
  optionsList: any[];
  disbledOptions: string[];
  defaultSelectedItem: any;
  color?: keyof typeof theme.colors;
  onSelectedChange: (item: any) => void;
  size: number | string;
  fontSize: string | number;
}

function RadioButtonsFilter({
  optionsList,
  disbledOptions,
  defaultSelectedItem,
  color = 'preto',
  onSelectedChange,
  size = '34px',
  fontSize = '10px',
  ...props
}: RadioButtonsFilterProps) {
  const [selectedItems, setSelectedItem] = useState<any[]>(defaultSelectedItem);

  if (!optionsList || optionsList.length == 0) return null;

  const orderSizes = (sizes: string[]) => sizes.sort((itemA, itemB) => {
    if (parseInt(itemA, 10) > 0) return itemA > itemB ? -1 : 1;

    if (itemA.charAt(0) === itemB.charAt(0)) {
      if (itemA.length > itemB.length) return -1;
      if (itemA.length < itemB.length) return 1;
      return 0;
    }
    return itemA < itemB ? -1 : 1;
  });

  useEffect(() => {
    orderSizes(optionsList.map((x) => x.value));
  }, []);

  useEffect(() => {
    onSelectedChange(selectedItems);
  }, [selectedItems]);

  return (
    <Box alignItems="flex-start" flexWrap="wrap" flexDirection="row" {...props}>
      {optionsList.map(({ key, value }: any, index: number) => {
        const isSelected = selectedItems.includes(value);

        return (
          <Box
            key={`option-${value}`}
            height={size}
            width={size}
            alignSelf="flex-start"
            bg={isSelected ? color : 'white'}
            alignItems="center"
            marginRight={index < optionsList.length ? 'micro' : null}
            marginBottom={index < optionsList.length ? 'nano' : null}
            borderRadius="pico"
            borderWidth="hairline"
            borderColor="divider"
          >
            <Button
              disabled={disbledOptions?.includes(`${value}`)}
              height={size}
              onPress={() => {
                if (isSelected) {
                  setSelectedItem(orderSizes(selectedItems.filter((x) => x !== value)));
                } else {
                  setSelectedItem(orderSizes([...selectedItems, value]));
                }
              }}
            >
              <Typography
                color={isSelected ? 'white' : color}
                fontFamily="nunitoBold"
                fontSize={fontSize}
              >
                {value}
              </Typography>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

export default RadioButtonsFilter;
