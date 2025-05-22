import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import testProps from '../../../../utils/testProps';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { useReturnPolicyConfigLazyQuery } from '../../../../base/graphql/generated';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { Divider } from '../../../../components/Divider/Divider';
import styles from './styles';
import EventProvider from '../../../../utils/EventProvider';

function ReturnPolicy() {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const [showSection, setShowSection] = useState(false);
  const [returnPolicy, setReturnPolicy] = useState(null);

  const [getReturnPolicy] = useReturnPolicyConfigLazyQuery({
    context: { clientName: 'gateway' },
  });

  const fetchReturnPolicy = useCallback(async () => {
    try {
      const policy = await getReturnPolicy();
      const returnPolicyText = policy?.data?.config?.returnPolicy;
      setReturnPolicy(returnPolicyText);
    } catch (e) {
      ExceptionProvider.captureException(e, "fetchReturnPolicy - ReturnPolicy");
    }
  }, []);

  useEffect(() => {
    fetchReturnPolicy();
  }, [fetchReturnPolicy]);

  const onToggle = useCallback((show: boolean) => {
    EventProvider.logEvent('return_policy_click', {
      item_id: productDetail?.productId,
    });
    setShowSection(show);
  }, [productDetail]);

  if (!productDetail || !returnPolicy) return null;

  return (
    <Box>
      <Divider variant="fullWidth" my="xs" />
      <Button
        {...testProps('return_policy_button')}
        variant="semBorda"
        onPress={() => onToggle(!showSection)}
        flexDirection="row"
      >
        <>
          {showSection
            ? (
              <Box alignSelf="center" paddingRight="quarck" paddingLeft="quarck">
                <IconLegacy name="Subtraction" color="fullBlack" size={20} />
              </Box>
            ) : (
              <Box alignSelf="center" paddingRight="nano">
                <IconLegacy name="Add" color="fullBlack" size={20} />
              </Box>
            )}

          <Box flex={1}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Troca e Devolução
            </Typography>
          </Box>
        </>
      </Button>

      {showSection && (
      <View>
        <View style={styles.container}>
          <Text style={styles.description}>{returnPolicy}</Text>
        </View>
      </View>
      )}

    </Box>
  );
}

export default ReturnPolicy;
