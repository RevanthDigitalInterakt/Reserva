import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { OffersCarousels } from './Components/OffersCarousels/OffersCarousels';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import { HomeShowcase } from '../Home/components/HomeShowcase/HomeShowcase';
import CategoryComponent from './Components/CategoryComponent/CategoryComponent';

function OffersPage() {
  return (
    <View style={{ flex: 1 }}>
      <TopBarDefault showShadow />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <OffersCarousels />

          <View style={{ padding: 10 }}>
            <HomeShowcase />
          </View>
          <OffersCarousels />
          <CategoryComponent />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default OffersPage;
