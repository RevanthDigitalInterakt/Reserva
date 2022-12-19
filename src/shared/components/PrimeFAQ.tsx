import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Typography,
  Box,
  Button,
  Icon,
  Divider,
  theme,
} from '@usereservaapp/reserva-ui';

interface IPrimeFAQ {
  data: any;
}

export const PrimeFAQ = ({ data }: IPrimeFAQ) => {
  const dataMokado = [
    {
      title: 'Quais são as vantagens do Prime?',
      content: `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing indusut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.`,
    },
    {
      title: 'Quais são as vantagens do Prime?',
      content: `Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing indusut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui.`,
    },
  ];

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <ScrollView>
        <Box flex={1} pt={'xs'} paddingX={'xxxs'}>
          <Box mb={'nano'} alignSelf={'center'}>
            <Typography fontFamily="reservaSerifBold" fontSize={29}>
              Perguntas Frequentes
            </Typography>
          </Box>

          {dataMokado.map((item, key) => {
            return (
              <Box key={key}>
                <ExpansePanel information={{ ...item }} />
                <Divider mt={'xxxs'} variant={'fullWidth'} />
              </Box>
            );
          })}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

interface ExpansePanelProps {
  showDescription?: boolean;
  information: {
    title: string;
    content: string;
  };
}

export const ExpansePanel = ({ information }: ExpansePanelProps) => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <>
      <Box>
        <Box alignItems={'flex-start'}>
          <Button
            variant="semBorda"
            flexDirection="row"
            marginTop="xxxs"
            onPress={() => setShowDescription(!showDescription)}
          >
            <>
              <Box flex={1}>
                <Typography fontFamily="reservaSansMedium" fontSize={18}>
                  {information.title}
                </Typography>
              </Box>
              {showDescription ? (
                <Box
                  alignSelf={'flex-start'}
                  paddingRight="quarck"
                  paddingLeft="quarck"
                >
                  <Icon name="Subtraction" color="vermelhoRSV" size={20} />
                </Box>
              ) : (
                <Box alignSelf={'flex-start'} paddingRight="nano">
                  <Icon name="Add" color="neutroFrio2" size={20} />
                </Box>
              )}
            </>
          </Button>
        </Box>
        {showDescription && (
          <Box paddingX="quarck" marginBottom="xs">
            <Box marginTop="xxxs">
              <Typography fontFamily="reservaSansLight" fontSize={17}>
                {information.content}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
