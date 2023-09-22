import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box, Button, Divider, Typography,
} from '@usereservaapp/reserva-ui';
import { ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  SearchProviderEnum,
  useCheckSearchRedirectLazyQuery, useSearchAutocompleteSuggestionsLazyQuery,
} from '../../../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { COLORS } from '../../../../base/styles/colors';
import useSearchStore from '../../../../zustand/useSearchStore';
import DeepLinkPathModule from '../../../../NativeModules/DeepLinkPathModule';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';

function SearchSuggestionsPage() {
  const navigation = useNavigation();
  const { primeActive, primeLPSearchTerms } = usePrimeInfo();
  const { getBoolean } = useRemoteConfig();
  const { onSearch, parameters } = useSearchStore(['onSearch', 'parameters']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const showOnSmartint = useMemo(() => getBoolean('show_on_smart_hint'), [getBoolean]);

  const [getSuggestions, { data, loading }] = useSearchAutocompleteSuggestionsLazyQuery({
    context: { clientName: 'gateway' },
    notifyOnNetworkStatusChange: true,
    variables: {
      q: parameters.q,
      provider: {
        value: showOnSmartint
          ? SearchProviderEnum.Smarthint
          : SearchProviderEnum.Vtex,
      },
    },
    fetchPolicy: getFetchPolicyPerKey('searchAutocompleteSuggestions'),
  });

  const [getCheckSearchRedirect] = useCheckSearchRedirectLazyQuery({
    context: { clientName: 'gateway' },
  });

  const handleCheckSearchTerm = useCallback(async () => {
    if (!parameters.q) return;

    const term = (parameters.q || '').toLowerCase().trim();

    if (primeActive && primeLPSearchTerms.includes(term)) {
      Keyboard.dismiss();
      navigation.navigate('PrimeLP');
      return;
    }

    const { data: dataSearch } = await getCheckSearchRedirect({
      variables: { q: parameters.q },
      fetchPolicy: getFetchPolicyPerKey('checkSearchRedirect'),
    });

    if (dataSearch?.checkSearchRedirect) {
      await DeepLinkPathModule.openUrlInBrowser({
        closeCurrentAppInstance: true,
        url: dataSearch.checkSearchRedirect,
      });

      return;
    }

    getSuggestions();
  }, [
    parameters.q,
    primeActive,
    primeLPSearchTerms,
    getCheckSearchRedirect,
    getFetchPolicyPerKey,
    navigation,
  ]);

  useEffect(() => {
    handleCheckSearchTerm();
  }, [parameters.q]);

  if (!parameters.q) return null;

  if (loading) {
    return (
      <Box bg="white" marginY="nano" justifyContent="center">
        <ActivityIndicator size="small" color={COLORS.BLACK} />
      </Box>
    );
  }

  return data?.searchAutocompleteSuggestions?.length ? (
    <Box bg="white" marginX="nano" justifyContent="center">
      {data.searchAutocompleteSuggestions.map((suggestion) => (
        <React.Fragment key={`search-suggestion-${parameters.q}-${suggestion}`}>
          <Button
            width="100%"
            onPress={() => {
              onSearch({ q: suggestion, page: 1, facets: [] });
            }}
          >
            <Box
              width="100%"
              paddingX="micro"
              minHeight={40}
              justifyContent="center"
            >
              <Typography fontFamily="nunitoRegular" fontSize={12} color="searchBarTextColor">
                {suggestion}
              </Typography>
            </Box>
          </Button>

          <Divider variant="fullWidth" />
        </React.Fragment>
      ))}
    </Box>
  ) : null;
}

export default SearchSuggestionsPage;
