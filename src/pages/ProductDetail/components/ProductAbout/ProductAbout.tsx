import React, { useCallback, useMemo, useState } from 'react';
import {
  Box, Button, Divider, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import { ProductDescription } from '../../../../modules/ProductDetail/components/ExpandProductDescription';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import EventProvider from '../../../../utils/EventProvider';

function ProductAbout() {
  const { productDetail, selectedSize } = useProductDetailStore(['productDetail', 'selectedSize']);
  const [showSection, setShowSection] = useState(false);

  const data = useMemo(() => productDetail?.properties, [productDetail]);
  const ean = useMemo(() => selectedSize?.ean, [selectedSize]);

  const onToggle = useCallback((show: boolean) => {
    setShowSection(show);

    EventProvider.logEvent('product_view_about', {
      show: show ? 1 : 0,
      product_id: productDetail?.productId || '',
    });
  }, [productDetail]);

  if (!productDetail || !data) return null;

  return (
    <Box>
      <Button
        testID="com.usereserva:id/about_this_product_button"
        variant="semBorda"
        onPress={() => onToggle(!showSection)}
        flexDirection="row"
      >
        <>
          {showSection
            ? (
              <Box alignSelf="center" paddingRight="quarck" paddingLeft="quarck">
                <Icon name="Subtraction" color="fullBlack" size={20} />
              </Box>
            ) : (
              <Box alignSelf="center" paddingRight="nano">
                <Icon name="Add" color="fullBlack" size={20} />
              </Box>
            )}

          <Box flex={1}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Sobre este produto
            </Typography>
          </Box>
        </>
      </Button>

      {showSection && (
        <>
          {!!(data?.description) && (
            <ProductDescription
              title="Detalhes do Produto"
              description={data.description}
              testID="com.usereserva:id/details_product"
            />
          )}

          {!!(data?.composition) && (
            <ProductDescription
              title="Composição"
              description={data.composition}
              testID="com.usereserva:id/composition"
            />
          )}

          {!!ean && (
            <ProductDescription
              title="Código do Produto"
              description={`Ref: ${ean}`}
              testID="com.usereserva:id/code"
            />
          )}
        </>
      )}

      <Divider variant="fullWidth" my="xs" />
    </Box>
  );
}

export default ProductAbout;
