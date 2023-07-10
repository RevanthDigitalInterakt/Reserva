import React from 'react';
import { Typography } from '@usereservaapp/reserva-ui';
import { View } from 'react-native';
import DropdownItem from '../../../../components/DropdownItem/DropdownItem';
import { primeFAQData } from './data';
import { styles } from './PrimeFAQ.styles';

const Divider = () => <View style={styles.divider} />;

function PrimeFAQ() {
  return (
    <View style={styles.container}>
      <Typography
        fontFamily="reservaDisplayRegular"
        textAlign="center"
        style={styles.sectionTitle}
      >
        Perguntas Frequentes
      </Typography>

      {primeFAQData?.map((item, index) => (
        <>
          <DropdownItem
            body={item.body}
            title={item.title}
            key={item.title}
            justifyText
          />
          {index !== primeFAQData.length - 1 && <Divider />}
        </>
      ))}
    </View>
  );
}

export default PrimeFAQ;
