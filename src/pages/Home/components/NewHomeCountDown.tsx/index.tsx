import React from 'react';
import { View } from 'react-native';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { useHomeCountdownQuery } from '../../../../base/graphql/generated';
import styles from './styles';
import { NewCountDownBanner } from '../../../../components/NewCountDownBanner';

export function NewHomeCountDown() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { data, loading, error } = useHomeCountdownQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('homeCountdown'),
  });

  if (!data?.homeCountdown || loading || error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NewCountDownBanner data={data.homeCountdown} />
    </View>
  );
}
