import React, { useCallback, useMemo } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import { loadingSpinner } from '@usereservaapp/reserva-ui/src/assets/animations';

import testProps from '../../../utils/testProps';
import { useCart } from '../../../context/CartContext';
import EventProvider from '../../../utils/EventProvider';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { usePrimeStore } from '../../../zustand/usePrimeStore/usePrimeStore';
import { useLandingPagePrimeQuery } from '../../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../../zustand/useApolloFetchPolicyStore';

import * as Styles from '../styles';

interface PropsComponent {
  onClose: () => void;
}

export function FooterModalPrime({
  onClose,
}: PropsComponent) {
  const { addItem } = useCart();
  const { navigate } = useNavigation();
  const { profile } = useAuthStore(['profile']);
  const { handleAddToCartPrime, loadingAddCartPrime } = usePrimeStore(['handleAddToCartPrime', 'loadingAddCartPrime']);
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { getString } = useRemoteConfig();

  const { data } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const primeInformation = useMemo(
    () => data?.landingPagePrime,
    [data?.landingPagePrime],
  );

  const onAddPrimeToCart = useCallback(async () => {
    try {
      if (!primeInformation || loadingAddCartPrime) return;

      await handleAddToCartPrime({
        primeInformation,
        addItem,
      });

      onClose();
    } catch (e) {
      EventProvider.captureException(e);
    }
  }, [primeInformation, loadingAddCartPrime, handleAddToCartPrime, addItem, onClose]);

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
        <>
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
            têm acesso a vantagens como descontos exclusivos e frete grátis em
            compras acima de
            {' '}
            <Typography
              fontSize={14}
              color="fullBlack"
              fontFamily="reservaSansBold"
            >
              R$
              {' '}
              {primeInformation?.discountFrom}
            </Typography>
            , toque no botão abaixo e comece agora mesmo a comprar!
          </Typography>
        </>
      );
    }

    return (
      <>
        <Typography
          fontFamily="reservaSansRegular"
          style={{ marginTop: 24, marginBottom: 24 }}
        >
          Olá!
          {' '}
          <Typography fontFamily="reservaSansBold" fontSize={16}>{profile?.firstName}</Typography>
          {' '}
          você ainda não é cliente
          {' '}
          <Typography fontFamily="reservaDisplayRegular" fontSize={16}>Prime</Typography>
          , mas não se preocupe, basta tocar no botão abaixo
          e adicionar em sua sacola a assinatura pelo valor de
          {' '}
          <Typography fontFamily="reservaSansBold" fontSize={16}>
            {primeInformation?.installmentQty}
            x de R$
            {' '}
            {primeInformation?.installmentPrice}
          </Typography>
          .
          {'\n\n'}

          Ao aderir ao
          {' '}
          <Typography fontFamily="reservaDisplayRegular" fontSize={16}>Prime</Typography>
          {' '}
          você pode aproveitar todos os benefícios da sua assinatura em compras acima de
          {' '}
          <Typography fontFamily="reservaSansBold" fontSize={16}>
            {primeInformation && `R$${primeInformation?.discountFrom}`}
          </Typography>
          !
        </Typography>

      </>
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
        onPress={onAddPrimeToCart}
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
