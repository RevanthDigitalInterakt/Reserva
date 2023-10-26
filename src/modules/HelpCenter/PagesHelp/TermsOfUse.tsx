import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Box } from '../../../components/Box/Box';
import { Divider } from '../../../components/Divider/Divider';
import { ExpansePanel } from '../../../components/ExpansePanel/ExpansePanel';
import { Typography } from '../../../components/Typography/Typography';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export function TermsOfUse() {
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

          {data.map((item) => (
            <Box key={item.title}>
              <ExpansePanel information={{ ...item }} />
              <Divider mt="xxxs" variant="fullWidth" />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
