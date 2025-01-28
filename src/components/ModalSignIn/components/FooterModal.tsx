import { useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { loadingSpinner } from '../../../../assets/animations';
import { useLandingPagePrimeQuery } from '../../../base/graphql/generated';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { usePrimeInfo } from '../../../hooks/usePrimeInfo';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import EventProvider from '../../../utils/EventProvider';
import testProps from '../../../utils/testProps';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Box } from '../../Box/Box';
import { Button } from '../../Button';
import { Typography } from '../../Typography/Typography';
import * as Styles from '../styles';

interface PropsComponent {
  onClose: () => void;
}

export function FooterModalPrime({
  onClose,
}: PropsComponent) {
  const { onAddPrimeToCart } = usePrimeInfo();
  const { navigate } = useNavigation();
  const { profile } = useAuthStore(['profile']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { getString } = useRemoteConfig();
  const [loadingAddCartPrime, setLoadingAddCartPrime] = useState(false);

  const { data } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const primeInformation = useMemo(() => data?.landingPagePrime, [data?.landingPagePrime]);

  const onAddToCart = useCallback(async () => {
    try {
      if (!primeInformation || loadingAddCartPrime) return;

      setLoadingAddCartPrime(true);

      await onAddPrimeToCart(false);

      onClose();
    } catch (e) {
      ExceptionProvider.captureException(e, "onAddToCart - FooterModal.tsx");
    } finally {
      setLoadingAddCartPrime(false);
    }
  }, [primeInformation, loadingAddCartPrime, onAddPrimeToCart, onClose]);

  const onRedirectToPrime = useCallback(() => {
    EventProvider.logEvent('click_here', {
      click_name: 'redirect_to_lp_prime',
    });
    navigate('PrimeLP');
    onClose();
  }, [navigate]);

  const renderContentText = useCallback(() => {
    if (!profile) {
      return (
        <Typography
          fontFamily="reservaSansRegular"
          color="neutroFrio2"
          fontSize={14}
          style={{ marginBottom: 24 }}
        >
          Por apenas
          {' '}
          <Typography
            fontSize={14}
            color="fullBlack"
            fontFamily="reservaSansBold"
          >
            {primeInformation?.installmentQty}
            x R$
            {' '}
            {primeInformation?.installmentPrice}
          </Typography>
          , assinantes
          {' '}
          <Typography
            fontSize={14}
            fontFamily="reservaSerifBlack"
            color="fullBlack"
          >
            Prime
          </Typography>
          {' '}
          têm acesso a vantagens como descontos exclusivos e frete grátis,
          toque no botão abaixo e comece agora mesmo a comprar!
        </Typography>
      );
    }

    return (
      <Typography
        fontFamily="reservaSansRegular"
        style={Styles.objectStyles.modalText}
      >
        Olá!
        {' '}
        <View>

          <Typography fontFamily="reservaSansBold" style={Styles.objectStyles.highlightedText}>{profile?.firstName}</Typography>
        </View>
        {' '}
        você ainda não é cliente
        {' '}
        <View>
          <Typography fontFamily="reservaDisplayRegular" style={Styles.objectStyles.highlightedText}>Prime</Typography>
        </View>
        ,
        mas não se preocupe, basta tocar no botão

        abaixo
        e adicionar em sua sacola a assinatura

        pelo valor de
        {' '}
        <View>
          <Typography fontFamily="reservaSansBold" numberOfLines={1} style={Styles.objectStyles.highlightedText}>
            {primeInformation?.installmentQty}
            x de R$
            {' '}
            {primeInformation?.installmentPrice}
          </Typography>
        </View>
        .
        {'\n\n'}

        Ao aderir ao
        {' '}
        <View>
          <Typography fontFamily="reservaDisplayRegular" style={Styles.objectStyles.highlightedText}>Prime</Typography>
        </View>
        {' '}
        você pode aproveitar

        todos os benefícios da sua assinatura.
      </Typography>
    );
  }, [profile, primeInformation]);

  return (
    <Box>
      {renderContentText()}

      {profile && (
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          style={Styles.objectStyles.wrapperAboutPrime}
        >
          <Box
            flex={1}
            marginRight="md"
            borderColor="divider"
            borderWidth="hairline"
          />
          <Typography fontSize={14} textAlign="center">
            Ainda não é
            {' '}
            <Typography fontSize={14} fontFamily="reservaSerifBlack">
              Prime
            </Typography>
            ?
          </Typography>
          <Box
            flex={1}
            marginLeft="md"
            borderColor="divider"
            borderWidth="hairline"
          />
        </Box>
      )}

      <Button
        width="100%"
        onPress={onAddToCart}
        buttonBackgroundColor={getString('pdp_button_add_bag')}
        disabled={loadingAddCartPrime}
        inline
        {...testProps('com.usereserva:id/modal_sign_in_cta_add_prime')}
      >
        <Box
          height={48}
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {loadingAddCartPrime ? (
            <AnimatedLottieView
              source={loadingSpinner}
              autoPlay
              loop
              style={{ width: 16, height: 16 }}
            />
          ) : (
            <Typography
              color="white"
              fontSize={14}
              fontFamily="reservaSansMedium"
            >
              ADICIONAR PRIME AO CARRINHO
            </Typography>
          )}
        </Box>
      </Button>

      <Typography style={Styles.objectStyles.footerDescription} color="neutroFrio2" fontSize={12}>
        Para mais informações sobre o prime,
        {' '}

        <Typography
          fontSize={12}
          color="fullBlack"
          fontFamily="reservaSansBold"
          onPress={onRedirectToPrime}
          style={Styles.objectStyles.footerHighlight}
          {...testProps('com.usereserva:id/modal_sign_click_here')}
        >
          clique aqui
        </Typography>
        {' '}
        antes de concluir seu pedido.
      </Typography>
    </Box>
  );
}
