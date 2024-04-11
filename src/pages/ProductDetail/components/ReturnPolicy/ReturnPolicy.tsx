import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import testProps from '../../../../utils/testProps';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { useReturnPolicyConfigLazyQuery } from '../../../../base/graphql/generated';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import styles from './styles';

function ReturnPolicy() {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const [showSection, setShowSection] = useState(false);
  const [returnPolicy, setReturnPolicy] = useState(null); // Initialize returnPolicy state

  const [getReturnPolicy] = useReturnPolicyConfigLazyQuery({
    context: { clientName: 'gateway' },
  });

  const data = useMemo(() => productDetail?.properties, [productDetail]);

  const fetchReturnPolicy = useCallback(async () => {
    try {
      const policy = await getReturnPolicy();
      const returnPolicyText = policy?.data?.config?.returnPolicy;
      setReturnPolicy(returnPolicyText);
    } catch (e) {
      ExceptionProvider.captureException(e);
    }
  }, []);

  const onToggle = useCallback((show: boolean) => {
    setShowSection(show);
    fetchReturnPolicy();
  }, [productDetail]);

  if (!productDetail || !data?.description) return null;

  return (
    <Box>
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
