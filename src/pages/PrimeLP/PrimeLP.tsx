import React, { useCallback, useMemo } from 'react';
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
import { usePrimeStore } from '../../zustand/usePrimeStore/usePrimeStore';
import { ModalWelcomePrime } from '../../components/ModalWelcomePrime';

function PrimeLP() {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { addItem } = useCart();
  const { goBack } = useNavigation();
  const {
    animationBag,
    loadingAddCartPrime,
    handleClickContinue,
    handleAddToCartPrime,
    isVisibleModalWelcome,
    changeStateAnimationBag,
  } = usePrimeStore([
    'animationBag',
    'loadingAddCartPrime',
    'handleClickContinue',
    'handleAddToCartPrime',
    'isVisibleModalWelcome',
    'changeStateAnimationBag',
  ]);

  const { data: rawData, loading } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const data = useMemo(() => rawData?.landingPagePrime, [rawData?.landingPagePrime]);

  const onAddPrimeToCart = useCallback(async () => {
    try {
      if (!data || loadingAddCartPrime) return;

      await handleAddToCartPrime({
        primeInformation: data,
        addItem,
      });
    } catch (e) {
      EventProvider.captureException(e);
    }
  }, [addItem, data, handleAddToCartPrime, loadingAddCartPrime]);

  const onCloseModalWelcomePrime = () => {
    handleClickContinue();
    goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <Box bg="white">
        <TopBarDefaultBackButton loading={loading || loadingAddCartPrime} navigateGoBack />

        <ModalBag
          isVisible={animationBag}
          onBackdropPress={() => changeStateAnimationBag(false)}
        />

        <ModalWelcomePrime isVisible={isVisibleModalWelcome} onClose={onCloseModalWelcomePrime} />

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
