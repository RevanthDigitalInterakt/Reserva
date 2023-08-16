import React, { useMemo } from 'react';
import { View } from 'react-native';
import DropdownItem from '../../../../components/DropdownItem/DropdownItem';
import { styles } from './PrimeFAQ.styles';
import { usePrimeFaqQuery } from '../../../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../../../zustand/useApolloFetchPolicyStore';
import { Typography } from '../../../../components/Typography/Typography';

function Divider() {
  return <View style={styles.divider} />;
}

function PrimeFAQ() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore([
    'getFetchPolicyPerKey',
  ]);

  const { data } = usePrimeFaqQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('primeFAQ'),
  });

  const primeFAQInformation = useMemo(() => data?.primeFaq, [data?.primeFaq]);

  return (
    <View style={styles.container}>
      <Typography
        fontFamily="reservaDisplayRegular"
        textAlign="center"
        style={styles.sectionTitle}
      >
        Perguntas Frequentes
      </Typography>

      {primeFAQInformation?.map((item, index) => (
        <>
          <DropdownItem
            body={item.body}
            title={item.title}
            key={item.id}
            justifyText
          />
          {index !== primeFAQInformation.length - 1 && <Divider key={item.title} />}
        </>
      ))}
    </View>
  );
}

export default PrimeFAQ;
