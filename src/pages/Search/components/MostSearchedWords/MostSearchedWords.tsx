import React from 'react';

import { useMostSearchedWordsQuery } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Typography } from '../../../../components/Typography/Typography';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';

interface IMostSearchedWords {
  onSelectTerm: (term: string) => void;
}

function MostSearchedWords({ onSelectTerm }: IMostSearchedWords) {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { data } = useMostSearchedWordsQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('mostSearchedWords'),
  });

  if (!data?.mostSearchedWords?.length) return null;

  return (
    <Box marginX="nano" mt="micro">
      <Box>
        <Typography
          fontFamily="nunitoBold"
          fontSize={13}
          color="neutroFrio2"
        >
          OS MAIS PROCURADOS
        </Typography>
      </Box>

      <Box flexDirection="row" flexWrap="wrap">
        {data.mostSearchedWords.map((item) => (
          <Button key={`search-suggestion-${item}`} onPress={() => onSelectTerm(item)}>
            <Box
              bg="divider"
              justifyContent="center"
              px="micro"
              height={26}
              borderRadius="pico"
              marginTop="micro"
              mr="micro"
            >
              <Typography fontFamily="nunitoRegular" fontSize={13}>
                {item}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default MostSearchedWords;
