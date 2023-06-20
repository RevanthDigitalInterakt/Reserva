import React, { useCallback, useMemo } from 'react';
import Modal from 'react-native-modal';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Box,
  Icon,
  Typography,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';

import testProps from '../../utils/testProps';
import { useCart } from '../../context/CartContext';
import EventProvider from '../../utils/EventProvider';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';

import { Button } from '../Button';
import UnderlineInput from '../UnderlineInput';

import * as Styles from './styles';
import type { IParamsComponent } from './types';
import { isValidEmail, isValidPassword } from './utils';

export const ModalSignIn: React.FC<IParamsComponent> = ({
  onClose,
  isVisible,
  loadingAddCart,
  setAnimationBag,
  setLoadingAddCart,
}) => {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);

  const { addItem } = useCart();

  const {
    handleLogin, loginCredentials, setLoginCredentials, setEmailIsValid, setPasswordIsValid,
  } = useAuthentication({ closeModal: onClose });
  const { navigate } = useNavigation();

  const { data: rawData } = useLandingPagePrimeQuery({
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

      onClose();
      setLoadingAddCart(false);
      setAnimationBag(true);
    } catch (e) {
      EventProvider.captureException(e);
    }
  }, [addItem, data, loadingAddCart]);

  const onRedirectToPrime = () => {
    EventProvider.logEvent('click_here', {
      click_name: 'redirect_to_lp_prime',
    });
    navigate('PrimeLP');
  }

  return (
    <Modal
      animationIn="fadeIn"
      isVisible={isVisible}
      animationInTiming={300}
      style={Styles.objectStyles.modal}
      {...testProps('com.usereserva:id/modal_sign_in')}
      testID="com.usereserva:id/modal_sign_in"
    >
      <Styles.ContainerModal
        p="xxxs"
        backgroundColor="white"
        {...testProps('com.usereserva:id/modal_sign_in_container')}
      >
        <Box flexDirection="row-reverse">
          <TouchableOpacity onPress={onClose} {...testProps('com.usereserva:id/modal_sign_in_close')}>
            <Icon name="Close" size={14} />
          </TouchableOpacity>
        </Box>

        <Typography variant="descontoTag1" fontFamily="reservaSerifBlack">
          Prime
        </Typography>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box my="micro">
            <Typography fontSize={14} color="neutroFrio2">
              Olá! Já é cliente Prime? Então basta inserir
              seu e-mail abaixo para poder comprar:
            </Typography>
          </Box>

          <Box mt="xxs">
            <UnderlineInput
              isSecureText={false}
              keyboardType="email-address"
              placeholder="Digite seu e-mail"
              value={loginCredentials.username}
              errorMsg={loginCredentials.usernameError}
              testID="com.usereserva:id/modal_sign_in_input_email"
              showError={loginCredentials.showUsernameError}
              onChangeText={(text) => {
                try {
                  setLoginCredentials({ ...loginCredentials, username: text });
                  setEmailIsValid(isValidEmail(text));
                } catch (error) {
                  EventProvider.sentry.captureException(error, {
                    extra: {
                      writtenEmail: text,
                    },
                  });
                }
              }}
            />

            <Box mt="md" width="100%">
              <UnderlineInput
                isSecureText
                placeholder="Digite sua senha"
                value={loginCredentials.password}
                showError={loginCredentials.showPasswordError}
                testID="com.usereserva:id/modal_sign_in_input_password"
                onChangeText={(text) => {
                  setLoginCredentials({
                    ...loginCredentials,
                    password: text,
                  });
                  setPasswordIsValid(isValidPassword(text));
                }}
              />
              <Box mt="micro" mb="quarck">
                <TouchableOpacity
                  {...testProps('com.usereserva:id/modal_sign_in_cta_forgot_password')}
                  onPress={() => {
                    navigate('ForgotEmail', {});
                  }}
                >
                  <Typography fontSize={14} style={{ textDecorationLine: 'underline' }}>
                    Esqueci minha senha
                  </Typography>
                </TouchableOpacity>
              </Box>

              {loginCredentials.hasError && (
                <Typography
                  fontSize={13}
                  color="vermelhoAlerta"
                  fontFamily="nunitoRegular"
                >
                  {loginCredentials.showMessageError}
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            inline
            mt="xs"
            onPress={handleLogin}
            variant="primarioEstreito"
            title="CONTINUAR COMPRANDO"
            testID="com.usereserva:id/modal_sign_in-cta_enter"
          />

          <Styles.WrapperAboutPrime>
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
          </Styles.WrapperAboutPrime>

          <Typography fontFamily="reservaSansRegular" color="neutroFrio2" fontSize={14} style={{ marginBottom: 24 }}>
            Por apenas
            {' '}
            <Typography fontSize={14} color="fullBlack" fontFamily="reservaSansBold">12x R$ 25</Typography>
            , assinantes
            {' '}
            <Typography fontSize={14} fontFamily="reservaSerifBlack" color="fullBlack">
              Prime
            </Typography>
            {' '}
            têm acesso a vantagens
            como descontos exclusivos e frete grátis em compras acima de
            {' '}
            <Typography fontSize={14} color="fullBlack" fontFamily="reservaSansBold">R$ 499</Typography>
            ,
            toque no botão abaixo e comece agora mesmo a comprar!
          </Typography>

          <Button
            width="100%"
            onPress={onAddPrimeToCart}
            {...testProps('com.usereserva:id/modal_sign_in_cta_add_prime')}
          >
            <Box
              height={48}
              width="100%"
              bg="verdeSucesso"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="white"
                fontSize={14}
                fontFamily="reservaSansMedium"
              >
                ADICIONAR PRIME AO CARRINHO
              </Typography>
            </Box>
          </Button>

          <Styles.FooterDescription color="neutroFrio2" fontSize={12}>
            Para mais informações sobre o prime,
            {' '}

            <Styles.FooterHighlight
              fontSize={12}
              color="fullBlack"
              fontFamily="reservaSansBold"
              onPress={onRedirectToPrime}
              {...testProps('com.usereserva:id/modal_sign_click_here')}
            >
              clique aqui
            </Styles.FooterHighlight>
            {' '}
            antes de concluir seu pedido.
          </Styles.FooterDescription>

        </ScrollView>

      </Styles.ContainerModal>
    </Modal>
  );
};
