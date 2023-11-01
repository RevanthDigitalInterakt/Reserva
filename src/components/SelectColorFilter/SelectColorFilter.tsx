import React from 'react';
import { type ColorProps } from 'styled-system';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';

interface SelectColorFilterProps extends ColorProps<typeof theme> {
  listColors: any[];
  disabledColors: any[];
  selectedColors?: any[];
  onPress: (item: any) => void;
  size?: number;
}

export function SelectColorFilter({
  listColors,
  selectedColors,
  disabledColors,
  onPress,
  size = 25,
}: SelectColorFilterProps) {
  const renderOptions = () => {
    const listItems = listColors.map(({ value }) => (
      <Box key={`filter-options-${value}`}>
        <Button disabled={disabledColors?.includes(value)} onPress={() => onPress(value)}>
          <Box
            height={size + 5}
            width={size + 5}
            bg={
                selectedColors?.includes(value) || selectedColors === value
                  ? 'white'
                  : null
              }
            borderRadius="infinity"
            borderWidth={
                selectedColors?.includes(value) || selectedColors === value
                  ? 'hairline'
                  : null
              }
            borderColor={
                selectedColors?.includes(value) || selectedColors === value
                  ? 'neutroFrio2'
                  : null
              }
            justifyContent="center"
            alignItems="center"
            marginLeft="nano"
            marginRight="nano"
            marginTop="nano"
            marginBottom="nano"
          >
            <Box
              height={size}
              width={size}
              borderRadius="infinity"
              bg={value}
            />
          </Box>
        </Button>
      </Box>
    ));
    return listItems;
  };

  return (
    <Box flexWrap="wrap" flexDirection="row">
      {renderOptions()}
    </Box>
  );
}
