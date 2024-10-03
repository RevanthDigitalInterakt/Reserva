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
import { ShelfOffers } from './Components/ShelfOffers';
import { useShelfOffersStore } from '../../zustand/useShelfOffersStore/useShelfOffersStore';
import { SkeletonWrapper } from './Components/Skeleton';
import { useHomeStore } from '../../zustand/useHomeStore';
import styles from './styles';

function OffersPage() {
  const { loading: loadingHome } = useHomeStore(['loading']);
  const { loading: loadingOffers } = useShelfOffersStore(['loading']);

  const {
    skeletonBannerOffers,
    skeletonBannerCategoryOffers,
    skeletonShelfOffers,
  } = SkeletonWrapper();
  return (
    <View style={styles.mainContainer}>
      <TopBarDefault showShadow />
      <SafeAreaView style={styles.containerSafeArea}>
        <ScrollView>
          <OffersCarousels />
          <CategoryComponent />
          {loadingHome ? skeletonBannerOffers({ loading: true }) : <OffersCarousels />}

          {loadingHome ? skeletonBannerCategoryOffers({ loading: true }) : <CategoryComponent />}

          {loadingOffers ? skeletonShelfOffers({ loading: true }) : <ShelfOffers />}

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
