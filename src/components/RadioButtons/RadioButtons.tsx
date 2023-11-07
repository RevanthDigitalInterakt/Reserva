import React from 'react';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { Typography } from '../Typography/Typography';

interface RadioButtonsProps {
  optionsList: string[] | number[];
  disbledOptions: string[];
  defaultSelectedItem: string | number;
  selectedItem?: string | number;
  color?: keyof typeof theme.colors;
  showMoreSizes?: boolean;
  onSelectedChange: (item: string | number) => void;
  size: number | string;
  fontSize: string | number;
  testID?: string;
}

export function RadioButtons({
  selectedItem,
  optionsList,
  disbledOptions,
  defaultSelectedItem,
  showMoreSizes = true,
  color = 'preto',
  onSelectedChange,
  size = '34px',
  fontSize = '14px',
  testID,
  ...props
}: RadioButtonsProps) {
  if (!optionsList || optionsList.length === 0) return null;
  return (
    <Box alignItems="flex-start" flexWrap="wrap" flexDirection="row" {...props}>
      {optionsList.map((item, index) => {
        const isSelected = selectedItem === item && !disbledOptions.includes(`${selectedItem}`);
        return (
          <Box
            key={`option-${item}`}
            hitSlop={{
              top: 15, bottom: 15, left: 15, right: 15,
            }}
            marginRight={index < optionsList.length ? 'micro' : null}
            marginBottom={index < optionsList.length && showMoreSizes ? 'nano' : null}
          >
            <Button
              hitSlop={{
                top: 15, bottom: 15, left: 15, right: 15,
              }}
              disabled={disbledOptions.includes(`${item}`)}
              height={size}
              onPress={() => {
                onSelectedChange(item);
              }}
              testID={testID}
              alignItems="center"
              justifyContent="center"
            >
              <Box
                height={size}
                width={size}
                alignSelf="flex-start"
                bg={isSelected ? color : 'white'}
                alignItems="center"
                justifyContent="center"
                borderRadius="pico"
                borderWidth="hairline"
                borderColor="divider"

              >

                <Typography
                  color={isSelected ? 'white' : color}
                  fontFamily="nunitoBold"
                  fontSize={fontSize}
                >
                  {item}
                </Typography>

              </Box>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
