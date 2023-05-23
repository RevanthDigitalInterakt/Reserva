import React, { useCallback, useState } from 'react';
import { Box, OutlineInput, Typography } from '@usereservaapp/reserva-ui';
import * as Yup from 'yup';
import { Keyboard } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { Tooltip } from '../../../../modules/ProductDetail/components/Tooltip';
import { useSubscribeNewsletterMutation } from '../../../../base/graphql/generated';
import EventProvider from '../../../../utils/EventProvider';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';

function FormNewsletter() {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [onSubscribe, { loading }] = useSubscribeNewsletterMutation({
    context: { clientName: 'gateway' },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    optimisticResponse: () => ({
      __typename: 'Mutation',
      subscribeNewsletter: true,
    }),
  });

  const onSubmit = useCallback(async () => {
    try {
      Keyboard.dismiss();

      if (loading) return;

      setValidationError('');

      const isValidEmail = Yup.string().required().email().isValidSync(email);

      if (!isValidEmail) {
        throw new Error('E-mail invalido');
      }

      const { data, errors } = await onSubscribe({
        variables: { input: { email } },
      });

      if (errors?.length || !data?.subscribeNewsletter) {
        throw new Error('Ocorreu um erro ao realizar o seu cadastro');
      }

      EventProvider.logEvent('product_subscribe_newsletter', {
        product_id: productDetail?.productId || '',
        success: 1,
      });

      setSuccess(true);
      setEmail('');
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('email', email);
        Sentry.captureException(err);
      });

      setValidationError(err.message);

      EventProvider.logEvent('product_subscribe_newsletter', {
        product_id: productDetail?.productId || '',
        success: 0,
      });
    }
  }, [email, loading, productDetail, onSubscribe]);

  if (!productDetail) return null;

  return (
    <>
      <Box mb="xxxs">
        <Tooltip tooltipText="Email Cadastrado!" isVisible={success} setIsVisible={setSuccess} />

        <Typography fontFamily="reservaSerifRegular" fontSize={16}>
          Receba novidades e promoções
        </Typography>
      </Box>

      <OutlineInput
        testID="com.usereserva:id/productdetail_input_email_promotion"
        placeholder="Digite seu e-mail"
        value={email}
        loading={loading}
        onChangeText={setEmail}
        accessibilityLabel="productdetail_input_email"
        iconName="ChevronRight"
        autoCapitalize="none"
        keyboardType="email-address"
        onSubmitEditing={onSubmit}
        onPressIcon={onSubmit}
      />

      {!!validationError && (
        <Box mt="quarck">
          <Typography color="vermelhoAlerta" fontFamily="nunitoRegular" fontSize={13}>
            {validationError}
          </Typography>
        </Box>
      )}
    </>
  );
}

export default FormNewsletter;
