import type { StackScreenProps } from '@react-navigation/stack';
import React, {
  useCallback, useMemo, useState,
} from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { ModalBag } from '../../components/ModalBag/ModalBag';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';
import testProps from '../../utils/testProps';
import { ModalWelcomePrime } from '../../components/ModalWelcomePrime';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import { TopBarDefaultBackButton } from '../../modules/Menu/components/TopBarDefaultBackButton';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { usePrimeStore } from '../../zustand/usePrimeStore/usePrimeStore';
import PrimeBenefits from './components/PrimeBenefits';
import PrimeFAQ from './components/PrimeFAQ/PrimeFAQ';
import PrimeHero from './components/PrimeHero';
import PrimeIntro from './components/PrimeIntro';
import PrimeSubscribe from './components/PrimeSubscribe';
import { Box } from '../../components/Box/Box';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

type IPrimeLP = StackScreenProps<RootStackParamList, 'PrimeLP'>;

function PrimeLP({ navigation }: IPrimeLP) {
  const { onAddPrimeToCart, isPrime } = usePrimeInfo();
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
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
        navigation.popToTop();
        return;
      }

      setLoadingAddCartPrime(true);

      await onAddPrimeToCart(false);

      handleOnModalHideSignIn();
    } catch (e) {
      ExceptionProvider.captureException(e, "onAddToCart - PrimeLP.tsx", {data: (JSON.stringify(data) || "")});
    } finally {
      setLoadingAddCartPrime(false);
    }
  }, [data, handleOnModalHideSignIn, isPrime, loadingAddCartPrime, navigation, onAddPrimeToCart]);

  const onCloseModalWelcomePrime = useCallback(() => {
    handleClickContinue();

    setTimeout(() => {
      navigation.navigate('Home');
    }, 300);
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

            <PrimeFAQ data={data} />
          </ScrollView>
        )}
      </Box>
    </SafeAreaView>
  );
}

export default PrimeLP;
