import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Platform } from 'react-native';

import { type SearchNewsQuery, useSearchNewsQuery } from '../../../base/graphql/generated';
import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';
import { Typography } from '../../../components/Typography/Typography';
import { platformType } from '../../../utils/platformType';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';

export function News() {
  const navigation = useNavigation();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { data } = useSearchNewsQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('searchNews'),
  });

  const onNavigate = useCallback((item: SearchNewsQuery['searchNews'][0]) => {
    navigation.navigate('ProductCatalog', {
      facetInput: item.facets,
      referenceId: item.referenceId,
      orderBy: item.orderBy,
    });
  }, [navigation]);

  if (!data?.searchNews?.length) return null;

  return (
    <>
      <Box mt="sm" marginX="nano" mb="micro">
        <Typography
          fontFamily="nunitoBold"
          fontSize={13}
          color="neutroFrio2"
        >
          NOVIDADES
        </Typography>
      </Box>

      <Box height={170} pt="quarck">
        <FlatList
          horizontal
          data={data.searchNews}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.image}
          renderItem={({ item }) => (
            <Button
              onPress={() => onNavigate(item)}
              ml="nano"
              mr="nano"
              width={286}
              height={154}
              borderRadius="nano"
              style={{ elevation: Platform.OS === platformType.ANDROID ? 4 : 0 }}
              boxShadow={Platform.OS === platformType.ANDROID ? null : 'topBarShadow'}
            >
              <ImageComponent
                borderRadius={8}
                height={154}
                width={286}
                source={{ uri: item.image }}
              />
            </Button>
          )}
        />
      </Box>
    </>
  );
}
