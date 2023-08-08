import React from 'react';
import { Typography } from '../Typography';
import { Box } from '../Box/Box';

interface BadgeProps {
  count: number
}

export function Badge({ count }: BadgeProps) {
  return count >= 0 ? (
    <Box
      borderRadius="infinity"
      bg="vermelhoAlerta"
      minWidth={16}
      minHeight={16}
      paddingX={3}
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        fontFamily="reservaSerifBold"
        color="white"
        fontSize="12px"
        textAlign="center"
      >
        {count}
      </Typography>
    </Box>
  ) : null;
}
