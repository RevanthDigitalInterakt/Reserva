import React from 'react';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { Typography } from '../Typography/Typography';

interface CounterProps {
  count: number
  disabledAdd?: boolean
  disabledSub?: boolean
  onClickAdd?: (count: number) => void
  onClickSub?: (count: number) => void
  testID?: string
}

export function Counter({
  count, disabledAdd, disabledSub, onClickAdd, onClickSub, testID,
}: CounterProps) {
  return (
    <Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="backgoundDivider"
        borderRadius="nano"
        height={30}
      >
        <Box flexGrow={1}>
          <Button
            testID={`${testID}_sub`}
            height="100%"
            hitSlop={{
              top: 30, left: 30, bottom: 30, right: 10,
            }}
            inline
            disabled={!!disabledAdd}
            onPress={() => {
              if (onClickSub) {
                onClickSub(count - 1);
              }
            }}
          >
            <Box alignItems="center" justifyContent="center" width="100%">
              <Typography
                fontSize={18}
                fontFamily="nunitoRegular"
                textAlign="center"
                color="preto"
              >
                -
              </Typography>
            </Box>
          </Button>
        </Box>

        <Box height={18} width="1px" backgroundColor="dividerCounter" />

        <Box flexGrow={1} alignItems="center">
          <Typography
            fontSize={14}
            fontFamily="nunitoRegular"
            color="neutroFrio2"
          >
            {count}
          </Typography>
        </Box>

        <Box height={18} width="1px" backgroundColor="dividerCounter" />

        <Box flexGrow={1}>
          <Button
            testID={`${testID}_add`}
            height="100%"
            hitSlop={{
              top: 30, left: 10, bottom: 30, right: 30,
            }}
            inline
            disabled={!!disabledSub}
            onPress={() => {
              if (onClickAdd) {
                onClickAdd(count + 1);
              }
            }}
          >
            <Box alignItems="center" justifyContent="center" width="100%">
              <Typography
                fontSize={14}
                fontFamily="nunitoRegular"
                textAlign="center"
                color="preto"
              >
                +
              </Typography>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
