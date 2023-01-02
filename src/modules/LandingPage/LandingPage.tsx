import { Box } from '@usereservaapp/reserva-ui';
import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'routes/StackNavigator';
import { GET_LANDING_PAGE, LandingPageData } from './api/LandingPageQuery';
import { PrimeNewsLetterCard } from '../../shared/components/PrimeNewsLetterCard';
import { Banner } from '../../shared/components/Banner';
import { PrimeProductList } from '../../shared/components/PrimeProductList';
import { TopBarDefaultBackButton } from '../Menu/components/TopBarDefaultBackButton';

type Props = StackScreenProps<RootStackParamList, 'LandingPage'>;

export const LandingPage: React.FC<Props> = ({ route }) => {
  const [landingPage, setLandingPage] = useState<LandingPageData | null>(null);
  const [getLandingPage] = useLazyQuery(GET_LANDING_PAGE, {
    context: { clientName: 'contentful' },
    variables: {
      id: route.params.landingPageId,
    },
  });

  useEffect(() => {
    getLandingPage().then(({ data }) => {
      setLandingPage(data);
    });
  }, []);

  return (
    <Box flex={1} bg="white">
      <TopBarDefaultBackButton loading={false} />
      <ScrollView>
        {landingPage
          && landingPage.landingPage.itemsCollection.items.map((item, index) => {
            switch (item.__typename) {
              case 'LpLeads':
                return (
                  <PrimeNewsLetterCard
                    title={item.title}
                    buttonTitle={item.titleButton}
                    action={item.idCampanha}
                  />
                );
              case 'LpBanner':
                return <Banner bannerImage={item.image.url} />;
              case 'LpProductList':
                return <PrimeProductList referenceId={item.reference} />;
              case 'LpSpace':
                return <Box mt={`${item.size}px`} />;
            }
          })}
      </ScrollView>
    </Box>
  );
};
