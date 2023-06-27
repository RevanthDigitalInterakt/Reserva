import React from 'react';
import { FlatList } from 'react-native';
import Banner from './Banner';
import testProps from '../../../utils/testProps';

function ManagerBanner({ data }) {
  return (
    <FlatList
      data={data}
      {...testProps('com.usereserva:id/home_banner_flat_list')}
      renderItem={({ item }) => (
        <Banner
          orderBy={item.orderBy}
          reference={item.reference}
          url={item.url}
          reservaMini={item.reservaMini}
        />
      )}
      keyExtractor={(item) => item.title}
    />
  );
}

export default ManagerBanner;
