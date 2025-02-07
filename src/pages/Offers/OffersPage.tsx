import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { OffersCarousels } from './Components/OffersCarousels/OffersCarousels';
import TopBarDefault from '../../modules/Menu/components/TopBarDefault';
import CategoryComponent from './Components/CategoryComponent/CategoryComponent';
import NewProductCatalog from '../ProductCatalog';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { useHomeStore } from '../../zustand/useHomeStore';
import { useShelfOffersStore } from '../../zustand/useShelfOffersStore/useShelfOffersStore';
import { SkeletonWrapper } from './Components/Skeleton';
import styles from './styles';
import { ShelfOffers } from './Components/ShelfOffers';
import { CardCarousel } from '../../components/CardCarousel';
import { useOffersStore } from '../../zustand/useOffersStore';
import { OfferFilterCarousel } from '../../components/OfferFilterCarousel';

type Props = StackScreenProps<RootStackParamList, 'ProductCatalog'>;

function OffersPage({ navigation, route }: Props) {
  const { loading: loadingHome } = useHomeStore(['loading']);
  const { loading: loadingOffers } = useShelfOffersStore(['loading']);
  const { bannerCarousel, onLoad, collectionFilters } = useOffersStore(['bannerCarousel', 'onLoad', 'collectionFilters']);

  const {
    skeletonBannerOffers,
    skeletonBannerCategoryOffers,
    skeletonShelfOffers,
  } = SkeletonWrapper();

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TopBarDefault showShadow />
      <SafeAreaView style={styles.containerSafeArea}>
        <ScrollView>
          {loadingHome ? skeletonBannerOffers({ loading: true }) : <OffersCarousels />}

          {loadingHome ? skeletonBannerCategoryOffers({ loading: true }) : <CategoryComponent />}

          <OfferFilterCarousel offers={collectionFilters.items} title={collectionFilters.title} />

          {loadingOffers ? skeletonShelfOffers({ loading: true }) : <ShelfOffers />}

          <CardCarousel bannerCarousel={bannerCarousel} />

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
