import React, { useCallback, useMemo, useState } from 'react';

import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import EventProvider from '../../../../utils/EventProvider';
import testProps from '../../../../utils/testProps';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import ProductDescription from './ProductDescription';

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

  if (!productDetail || !data?.description) return null;

  return (
    <Box>
      <Button
        {...testProps('about_this_product_button')}
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
              {...testProps('details_product')}
            />
          )}

          {!!(data?.composition) && (
            <ProductDescription
              title="Composição"
              description={data.composition}
              {...testProps('composition')}
            />
          )}

          {!!ean && (
            <ProductDescription
              title="Código do Produto"
              description={`Ref: ${ean}`}
              {...testProps('code')}
            />
          )}
        </>
      )}

    </Box>
  );
}

export default ProductAbout;
