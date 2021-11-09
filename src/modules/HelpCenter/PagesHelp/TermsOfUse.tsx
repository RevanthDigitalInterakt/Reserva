import React, { useEffect } from 'react';

import { SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, ExpansePanel, Divider } from 'reserva-ui';

import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export const TermsOfUse = () => {
  useEffect(() => {}, []);

  const data = [
    {
      title: 'Termos de Uso',
      content: `TEXT HERE!
            \nTEXT.
            `,
    },
  ];

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <ScrollView>
        <Box flex={1} pt="xs" paddingX="xxxs">
          <Box mb="nano" alignSelf="flex-start">
            <Typography variant="tituloSessoes">Termos de Uso</Typography>
          </Box>

          {data.map((item, key) => (
            <Box key={key}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
