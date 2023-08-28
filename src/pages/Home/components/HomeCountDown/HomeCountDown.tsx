import React from 'react';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { useHomeCountdownQuery } from '../../../../base/graphql/generated';
import CountDownBanner from '../../../../components/CountDownBanner/CountDownBanner';

function HomeCountDown() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { data, loading, error } = useHomeCountdownQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('homeCountdown'),
  });

  if (!data?.homeCountdown || loading || error) {
    return null;
  }

  return <CountDownBanner data={data.homeCountdown} />;
}

export default HomeCountDown;
