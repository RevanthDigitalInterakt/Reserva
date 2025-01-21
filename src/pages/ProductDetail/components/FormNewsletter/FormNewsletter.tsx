import React, { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import * as Yup from 'yup';

import { useSubscribeNewsletterMutation } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { OutlineInput } from '../../../../components/OutlineInput/OutlineInput';
import { Typography } from '../../../../components/Typography/Typography';
import EventProvider from '../../../../utils/EventProvider';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import Tooltip from './Tooltip';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

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
      ExceptionProvider.captureException(err, "onSubmit - FormNewsletter", { email });

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
