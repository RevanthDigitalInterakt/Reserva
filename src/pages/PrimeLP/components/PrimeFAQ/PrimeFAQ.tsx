import React, { useMemo } from 'react';
import { View } from 'react-native';
import DropdownItem from '../../../../components/DropdownItem/DropdownItem';
import { styles } from './PrimeFAQ.styles';
import { type PrimeDetailOutput } from '../../../../base/graphql/generated';
import { Typography } from '../../../../components/Typography/Typography';

function Divider() {
  return <View style={styles.divider} />;
}

interface IPrimeFAQ {
  data: PrimeDetailOutput;
}
function PrimeFAQ({ data }: IPrimeFAQ) {
  const primeFAQ = useMemo(() => data?.primeFaq, [data?.primeFaq]);
  return (
    <View style={styles.container}>
      <Typography
        fontFamily="reservaDisplayRegular"
        textAlign="center"
        style={styles.sectionTitle}
      >
        Perguntas Frequentes
      </Typography>

      {primeFAQ?.map((item, index) => (
        <View
          key={`primeFaqItem-${item.title}`}
        >
          <DropdownItem
            title={item?.title ?? ''}
            body={item?.textBody}
            justifyText
          />
          {index !== primeFAQ.length - 1 && <Divider key={item.title} />}
        </View>
      ))}
    </View>
  );
}

export default PrimeFAQ;
