import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button, Divider, Typography,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { useProductDeliveryTimeLazyQuery } from '../../../../base/graphql/generated';
import { removeNonNumbers } from '../../../../utils/removeNonNumbers';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import EventProvider from '../../../../utils/EventProvider';
import { OutlineInput } from '../../../../components/OutlineInput/OutlineInput';

function ProductSLA() {
  const { selectedSize, productDetail, initialCep } = useProductDetailStore([
    'selectedSize',
    'initialCep',
    'productDetail',
  ]);
  const navigation = useNavigation();
  const [cep, setCep] = useState(initialCep || '');
  const [validationError, setValidationError] = useState('');

  const [onVerifySLA, { data, error, loading }] = useProductDeliveryTimeLazyQuery({
    context: { clientName: 'gateway' },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const onLoad = useCallback(async () => {
    try {
      if (loading) return;

      const cepRaw = removeNonNumbers(cep);

      if (cepRaw.length !== 8) {
        setValidationError('CEP inválido');
        return;
      }

      await onVerifySLA({
        variables: {
          input: {
            seller: selectedSize?.seller || '',
            id: selectedSize?.itemId || '',
            postalCode: cepRaw,
          },
        },
      });

      EventProvider.logEvent('product_check_delivery_time', {
        product_id: productDetail?.productId || '',
        success: 1,
      });
    } catch (err) {
      Sentry.withScope((scope) => {
        scope.setExtra('selectedSize', selectedSize);
        Sentry.captureException(err);
      });

      EventProvider.logEvent('product_check_delivery_time', {
        product_id: productDetail?.productId || '',
        success: 0,
      });
    }
  }, [onVerifySLA, productDetail, cep, selectedSize, loading]);

  useEffect(() => {
    setValidationError('');
  }, [cep]);

  if (!selectedSize || !productDetail) {
    return null;
  }

  return (
    <>
      <Typography fontFamily="reservaSerifRegular" fontSize={16}>
        Consultar prazo e valor do frete
      </Typography>

      <Box flexDirection="row" mt="xxxs">
        <OutlineInput
          testID="com.usereserva:id/productdetail_input_cep"
          onChangeText={setCep}
          accessibilityLabel="productdetail_input_cep"
          value={cep}
          placeholder="Informe seu CEP"
          iconName="NewSearch"
          keyboardType="number-pad"
          loading={loading}
          keyboardAppearance="light"
          maskType="zip-code"
          onPressIcon={onLoad}
          onSubmitEditing={onLoad}
        />
      </Box>

      {!!validationError && (
        <Box mt="quarck">
          <Typography color="vermelhoAlerta" fontFamily="nunitoRegular" fontSize={13}>
            {validationError}
          </Typography>
        </Box>
      )}

      <Button
        marginBottom="nano"
        alignSelf="flex-start"
        marginTop="quarck"
        testID="com.usereserva:id/productdetail_button_cep"
        onPress={() => {
          EventProvider.logEvent('product_find_zipcode', { product_id: productDetail.productId });
          navigation.navigate('ChangeRegionalization', { isCepProductDetail: true });
        }}
      >
        <Typography fontFamily="nunitoRegular" fontSize={14}>Não sei meu CEP</Typography>
      </Button>

      {!!(data?.productDeliveryTime && !loading && !error) && (
        <>
          {data.productDeliveryTime.map((sla) => (
            <Box
              key={`pdp-sla-${selectedSize?.itemId}-${sla.name}-${sla.estimatedDay}`}
              flexDirection="row"
              justifyContent="space-between"
              marginTop="nano"
            >
              <Box width="50%" justifyContent="center" borderColor="divider">
                <Typography fontFamily="nunitoRegular" fontSize={14}>{sla.name}</Typography>
              </Box>

              <Box
                width="20%"
                alignItems="center"
                justifyContent="center"
                borderColor="divider"
              >
                <Typography fontFamily="nunitoRegular" fontSize={14}>{sla.estimatedDay}</Typography>
              </Box>

              <Box width="30%" alignItems="flex-end" justifyContent="center">
                <Typography fontFamily="nunitoRegular" fontSize={14} color="verdeSucesso">
                  {sla.price > 0 ? `R$ ${sla.price.toFixed(2)}` : 'GRÁTIS'}
                </Typography>
              </Box>
            </Box>
          ))}
        </>
      )}

      <Divider variant="fullWidth" my="xs" />
    </>
  );
}

export default ProductSLA;
