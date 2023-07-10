import React, { useMemo } from 'react';
import { Typography } from '@usereservaapp/reserva-ui';
import { View } from 'react-native';
import DropdownItem from '../../../../components/DropdownItem/DropdownItem';
import { styles } from './PrimeFAQ.styles';
import { usePrimeFaqQuery } from '../../../../base/graphql/generated';

const Divider = () => <View style={styles.divider} />;

function PrimeFAQ() {
  const { data } = usePrimeFaqQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'network-only',
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
          {index !== primeFAQInformation.length - 1 && <Divider />}
        </>
      ))}
    </View>
  );
}

export default PrimeFAQ;
