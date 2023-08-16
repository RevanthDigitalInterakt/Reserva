import React from 'react';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import { Divider } from '../Divider/Divider';

interface StepperProps {
  steps: string[];
  actualStepIndex: number;
  color?: keyof typeof theme.colors;
}

export const Stepper = ({ steps, actualStepIndex, color }: StepperProps) => {
  const selectedColor = React.useMemo(() => (!color ? 'verdeSucesso' : color), [color]);

  return (
    <Box flexDirection="row" alignItems="center">
      {steps.map((step, idx) => (
        <>
          <Box key={`step-${idx}`} alignItems="center">
            <Box
              position="absolute"
              width={100}
              marginY="nano"
              top={idx === actualStepIndex ? -32 : -35}
            >
              <Typography
                variant="botaoFiltrarEOrdenarProdutos"
                textAlign="center"
              >
                {step}
              </Typography>
            </Box>
            {idx === actualStepIndex ? (
              <Box
                backgroundColor="transparente"
                borderRadius="infinity"
                width={26}
                height={26}
                borderWidth="stepper"
                borderColor={selectedColor}
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  borderRadius="infinity"
                  backgroundColor={selectedColor}
                  width={14.4}
                  height={14.4}
                />
              </Box>
            ) : (
              <Box
                backgroundColor={actualStepIndex >= idx ? selectedColor : 'divider'}
                borderRadius="infinity"
                width={18}
                height={18}
              />
            )}
          </Box>
          {idx < steps.length - 1 && (
            <Box flex={1}>
              <Divider
                variant="fullWidth"
                width="100%"
                height={3}
                backgroundColor={actualStepIndex > idx ? selectedColor : 'divider'}
              />
            </Box>
          )}
        </>
      ))}
    </Box>
  );
};
