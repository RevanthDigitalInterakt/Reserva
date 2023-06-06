import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@usereservaapp/reserva-ui';
import { TopBarDefaultBackButton } from '../../modules/Menu/components/TopBarDefaultBackButton';
import PrimeHero from './components/PrimeHero';
import PrimeIntro from './components/PrimeIntro';
import PrimeBenefits from './components/PrimeBenefits';
import PrimeSubscribe from './components/PrimeSubscribe';
import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { useCart } from '../../context/CartContext';
import { ModalBag } from '../../common/components/ModalBag/ModalBag';
import EventProvider from '../../utils/EventProvider';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import testProps from '../../utils/testProps';

function PrimeLP() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const [loadingAddCart, setLoadingAddCart] = useState(false);
  const [animationBag, setAnimationBag] = useState(false);

  const { addItem } = useCart();

  const { data: rawData, loading } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const data = useMemo(() => rawData?.landingPagePrime, [rawData?.landingPagePrime]);

  const onAddPrimeToCart = useCallback(async () => {
    try {
      if (!data || loadingAddCart) return;

      setLoadingAddCart(true);

      await addItem({
        quantity: 1,
        itemId: `${data.productId}`,
        seller: data.productSeller,
      });

      EventProvider.logEvent('add_to_cart_prime', {
        item_quantity: 1,
        item_id: `${data.productId}`,
        seller: data.productSeller,
      });

      setLoadingAddCart(false);
      setAnimationBag(true);
    } catch (e) {
      EventProvider.captureException(e);
    }
  }, [addItem, data, loadingAddCart]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <Box bg="white">
        <TopBarDefaultBackButton loading={loading || loadingAddCart} navigateGoBack />

        <ModalBag
          isVisible={animationBag}
          onBackdropPress={() => setAnimationBag(false)}
        />

        {!!(data && !loading) && (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            {...testProps('PrimeLP_page')}
          >
            <PrimeHero data={data} onAddToCart={onAddPrimeToCart} />

            <PrimeIntro data={data} />

            <PrimeBenefits data={data} />

            <PrimeSubscribe data={data} onAddToCart={onAddPrimeToCart} />
          </ScrollView>
        )}
      </Box>
    </SafeAreaView>
  );
}

export default PrimeLP;
