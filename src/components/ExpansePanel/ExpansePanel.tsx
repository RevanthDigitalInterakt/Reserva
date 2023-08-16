import React, { useState } from 'react';
import type { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';

interface ExpansePanelProps {
  showDescription?: boolean;
  style?: {
    fontFamily?: keyof typeof theme.fonts;
    fontSize?: number;
  }
  information: {
    title: string;
    contentTitle?: string;
    content: string;
  };
}

export const ExpansePanel = ({ information, style }: ExpansePanelProps) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      <Box>
        <Box alignItems="flex-start">
          <Button
            variant="semBorda"
            flexDirection="row"
            marginTop="xxxs"
            onPress={() => setShowDescription(!showDescription)}
          >
            <>
              {showDescription
                ? (
                  <Box alignSelf={style ? 'center' : 'flex-start'} paddingRight="quarck" paddingLeft="quarck">
                    <IconLegacy name="Subtraction" color="fullBlack" size={20} />
                  </Box>
                )
                : (
                  <Box alignSelf={style ? 'center' : 'flex-start'} paddingRight="nano">
                    <IconLegacy name="Add" color="fullBlack" size={20} />
                  </Box>
                )}
              <Box flex={1}>
                {style
                  ? (
                    <Typography fontFamily={style.fontFamily} fontSize={style.fontSize}>
                      {information.title}
                    </Typography>
                  )
                  : (
                    <Typography variant="precoPromocional2">
                      {information.title}
                    </Typography>
                  )}
              </Box>
            </>
          </Button>
        </Box>
        {showDescription && (
          <Box paddingX="quarck">
            <Box marginTop="xxxs" marginBottom="xxxs">
              {information.contentTitle && (
                <Typography variant="precoPromocional2">
                  {information.contentTitle}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography variant="precoAntigo3">
                {information.content}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
