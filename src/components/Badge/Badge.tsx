import React from 'react';
import styled from 'styled-components/native';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';

interface BadgeProps {
  count: number
}

interface BadgeRoundProps {
  text: string
}

const BadgeRoundComponent = styled.View`
  background-color: rgb(237, 27, 36);
  border-radius: 13px;
  padding: 2px 7px;
  margin-left: 10px;
  `;

const BadgeTextComponent = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

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

export function BadgeRound({ text }: BadgeRoundProps) {
  return text?.length ? (
    <BadgeRoundComponent>
      <BadgeTextComponent>{text}</BadgeTextComponent>
    </BadgeRoundComponent>
  ) : null;
}
