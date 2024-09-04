import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { OffersCarousels } from './Components/OffersCarousels/OffersCarousels';
import { TopBarDefault } from '../../modules/Menu/components/TopBarDefault';
import { HomeShowcase } from '../Home/components/HomeShowcase/HomeShowcase';

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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default OffersPage;
