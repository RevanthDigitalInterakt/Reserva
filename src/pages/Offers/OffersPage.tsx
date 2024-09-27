import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { OffersCarousels } from './Components/OffersCarousels/OffersCarousels';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import CategoryComponent from './Components/CategoryComponent/CategoryComponent';
import NewProductCatalog from '../ProductCatalog';
import type { RootStackParamList } from '../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

function OffersPage({ navigation, route }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <TopBarDefault showShadow />
      <SafeAreaView>
        <ScrollView>
          <OffersCarousels />
          <CategoryComponent />
          <NewProductCatalog
            navigation={navigation}
            route={route}
            showTabBar={false}
            showWhatsappButton={false}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default OffersPage;
