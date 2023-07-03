import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Box } from '@usereservaapp/reserva-ui';
import { TopBarDefaultBackButton } from '../../modules/Menu/components/TopBarDefaultBackButton';
import PrimeHero from './components/PrimeHero';
import PrimeIntro from './components/PrimeIntro';
import PrimeBenefits from './components/PrimeBenefits';
import PrimeSubscribe from './components/PrimeSubscribe';
import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { useCart } from '../../context/CartContext';
import { ModalBag } from '../../components/ModalBag/ModalBag';
import EventProvider from '../../utils/EventProvider';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import testProps from '../../utils/testProps';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { ModalWelcomePrime } from '../../components/ModalWelcomePrime';

function PrimeLP() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { actions, hasPrimeSubscriptionInCart } = useBagStore(['actions', 'hasPrimeSubscriptionInCart']);
  const { addItem } = useCart();
  const navigation = useNavigation();

  const [animationBag, setAnimationBag] = useState(false);
  const [loadingPrime, setLoadingPrime] = useState(false);
  const [modalWelcome, setModalWelcome] = useState(false);

  const { data: rawData, loading } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const data = useMemo(() => rawData?.landingPagePrime, [rawData?.landingPagePrime]);

  const onAddPrimeToCart = useCallback(async () => {
    try {
      if (!data || loadingPrime) return;

      if (hasPrimeSubscriptionInCart) {
        navigation.navigate('Offers');
        return;
      }

      setLoadingPrime(true);

      await addItem({
        quantity: 1,
        itemId: `${data.skuId}`,
        seller: data.productSeller,
      });

      await actions.REFETCH_ORDER_FORM();

      EventProvider.logEvent('add_to_cart_prime', {
        item_quantity: 1,
        item_id: `${data.skuId}`,
        seller: data.productSeller,
      });

      setModalWelcome(true);
    } catch (e) {
      EventProvider.captureException(e);
    } finally {
      setLoadingPrime(false);
    }
  }, [data, loadingPrime, hasPrimeSubscriptionInCart, addItem, actions, navigation]);

  const onCloseModalWelcomePrime = useCallback(() => {
    setModalWelcome(false);
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <Box bg="white">
        <TopBarDefaultBackButton loading={loading || loadingPrime} navigateGoBack />

        <ModalBag
          isVisible={animationBag}
          onBackdropPress={() => setAnimationBag(false)}
        />

        <ModalWelcomePrime isVisible={modalWelcome} onClose={onCloseModalWelcomePrime} />

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
