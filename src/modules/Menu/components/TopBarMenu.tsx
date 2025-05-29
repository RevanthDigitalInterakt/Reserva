import { useNavigation } from '@react-navigation/native';
import React from 'react';
import testProps from '../../../utils/testProps';
import { TopBar } from '../../../components/TopBar';
import { useBagStore } from '../../../zustand/useBagStore/useBagStore';

export const TopBarMenu: React.FC<{ loading: Boolean }> = ({
  loading = false,
}) => {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

  return (
    <TopBar
      loading={loading}
      paddingX="quarck"
      {...testProps('com.usereserva:id/entrar_login_button')}
      bg="white"
      leftButton={{
        marginTop: 'nano',
        color: 'preto',
        name: 'Close',
        size: 14,
        onPress: () => navigation.goBack(),
      }}
      rightButton1={{
        testID: 'com.usereserva:id/top_bar_search_menu_button',
        name: 'Search',
        size: 24,
        onPress: () => navigation.navigate('SearchMenu'),
      }}
      rightButton2={{
        testID: 'com.usereserva:id/top_bar_button_handbag',
        name: 'Handbag',
        size: 24,
        onPress: () => navigation.navigate('BagScreen'),
        badgeCount: allItemsQuantity,
      }}
      height={50}
    />
  );
};
