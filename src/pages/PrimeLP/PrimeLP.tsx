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
import { ModalBag } from '../../components/ModalBag/ModalBag';
import EventProvider from '../../utils/EventProvider';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import testProps from '../../utils/testProps';
import { ModalWelcomePrime } from '../../components/ModalWelcomePrime';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import { usePrimeStore } from '../../zustand/usePrimeStore/usePrimeStore';
import PrimeFAQ from './components/PrimeFAQ/PrimeFAQ';

function PrimeLP() {
  const { onAddPrimeToCart, isPrime } = usePrimeInfo();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const navigation = useNavigation();

  const [loadingAddCartPrime, setLoadingAddCartPrime] = useState(false);

  const {
    animationBag,
    handleClickContinue,
    isVisibleModalWelcome,
    changeStateAnimationBag,
    changeStateIsVisibleModalWelcome,
  } = usePrimeStore([
    'animationBag',
    'handleClickContinue',
    'isVisibleModalWelcome',
    'changeStateAnimationBag',
    'changeStateIsVisibleModalWelcome',
  ]);

  const { data: rawData, loading } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const data = useMemo(() => rawData?.landingPagePrime, [rawData?.landingPagePrime]);

  const handleOnModalHideSignIn = useCallback(() => {
    changeStateAnimationBag(true);
  }, [changeStateAnimationBag]);

  const handleOnModalHide = useCallback(() => {
    if (isPrime) {
      setTimeout(() => {
        changeStateIsVisibleModalWelcome(true);
      }, 500);
    }
  }, [changeStateIsVisibleModalWelcome, isPrime]);

  const onAddToCart = useCallback(async () => {
    try {
      if (!data || loadingAddCartPrime) return;

      if (isPrime) {
        navigation.navigate('Offers');
        return;
      }

      setLoadingAddCartPrime(true);

      await onAddPrimeToCart();

      handleOnModalHideSignIn();
    } catch (e) {
      EventProvider.captureException(e);
    } finally {
      setLoadingAddCartPrime(false);
    }
  }, [data, handleOnModalHideSignIn, isPrime, loadingAddCartPrime, navigation, onAddPrimeToCart]);

  const onCloseModalWelcomePrime = useCallback(() => {
    handleClickContinue();
    navigation.goBack();
  }, [handleClickContinue, navigation]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <Box bg="white">
        <TopBarDefaultBackButton
          loading={loading || loadingAddCartPrime}
          navigateGoBack
        />

        <ModalBag
          isVisible={animationBag}
          onBackdropPress={() => changeStateAnimationBag(false)}
          onModalHide={handleOnModalHide}
        />

        <ModalWelcomePrime
          isVisible={isVisibleModalWelcome}
          onClose={onCloseModalWelcomePrime}
        />

        {!!(data && !loading) && (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            {...testProps('PrimeLP_page')}
          >
            <PrimeHero data={data} onAddToCart={onAddToCart} />

            <PrimeIntro data={data} />

            <PrimeBenefits data={data} />

            <PrimeSubscribe data={data} onAddToCart={onAddToCart} />

            <PrimeFAQ />
          </ScrollView>
        )}
      </Box>
    </SafeAreaView>
  );
}

export default PrimeLP;
