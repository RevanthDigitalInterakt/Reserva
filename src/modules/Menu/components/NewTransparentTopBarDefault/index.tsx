import { useNavigation } from '@react-navigation/native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { TopBar } from '../../../../components/TopBar';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';
import styles from './styles';

interface NewTopBarDefaultProps {
  showShadow?: Boolean;
  loading?: Boolean;
}

export function NewTransparentTopBarDefault({ loading = false }: NewTopBarDefaultProps) {
  const navigation = useNavigation();
  const { allItemsQuantity } = useBagStore(['allItemsQuantity']);

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.5)', 'transparent']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <TopBar
        loading={loading}
        paddingX="quarck"
        leftButton={{
          name: 'SideMenu',
          testID: 'com.usereserva:id/header_button_menu',
          size: 24,
          color: 'white',
          onPress: () => navigation.navigate('Menu'),
        }}
        rightButton2={{
          name: 'Handbag',
          testID: 'com.usereserva:id/button_bag',
          size: 24,
          color: 'white',
          onPress: () => navigation.navigate('BagScreen'),
          badgeCount: allItemsQuantity,
        }}
        height={50}
      />
    </LinearGradient>
  );
}
