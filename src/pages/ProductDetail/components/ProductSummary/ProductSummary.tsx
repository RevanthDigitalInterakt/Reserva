import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { onShare } from '../../../../utils/onShare';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { slugify } from '../../../../utils/slugify';
import { ModalZoomImage } from './ModalZoomImage';
import { useWishlistProductActions } from '../../../../hooks/useWishlistProductActions';
import images from '../../../../base/styles/icons';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import EventProvider from '../../../../utils/EventProvider';
import { ProductDetailCard } from '../../../../components/ProductDetailCard/ProductDetailCard';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import PricesSelectBoxes from '../../../../components/PricesSelectBoxes';
import { ProductDetailCardLegacy } from '../../../../components/ProductDetailCardLegacy/ProductDetailCardLegacy';

function ProductSummary() {
  const { getBoolean } = useRemoteConfig();
  const { primeActive } = usePrimeInfo();
  const { productDetail, selectedColor, selectedSize } = useProductDetailStore([
    'productDetail',
    'selectedSize',
    'selectedColor',
  ]);

  const { onToggleFavorite, loading: loadingWishlist, isFavorited } = useWishlistProductActions({
    productDetail,
    productId: productDetail?.productId || '',
    skuId: selectedSize?.itemId || '',
  });

  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const saleOff = useMemo(() => {
    if (!productDetail) return null;

    if (productDetail.saleOff && getBoolean('sale_off_tag')) {
      return images.saleOff;
    }

    return null;
  }, [getBoolean, productDetail]);

  const showPrimeBox = useMemo(() => (
    getBoolean('show_price_prime_pdp') && primeActive
  ), [getBoolean, primeActive]);

  const onClickShare = useCallback(() => {
    if (!productDetail) return;

    const { share } = productDetail;

    onShare(share.title, share.message, share.url);
    EventProvider.logEvent('product_share', { product_id: productDetail.productId });
  }, [productDetail]);

  const handleSetModalZoom = useCallback(() => {
    if (productDetail) {
      EventProvider.logEvent('product_zoom', {
        product_id: productDetail.productId,
        index: imageIndex,
      });

      setShowModal(true);
    }
  }, [imageIndex, productDetail]);

  useEffect(() => {
    EventProvider.logEvent('product_slide_images', {
      index: imageIndex,
      product_id: productDetail?.productId || '',
    });
  }, [imageIndex, productDetail]);

  const video = useMemo(() => {
    if (!productDetail?.videoThumbnail) return '';

    const isEqualSku = productDetail.videoThumbnail.includes(selectedSize?.ean || '');
    return isEqualSku ? productDetail.videoThumbnail : '';
  }, [productDetail?.videoThumbnail, selectedSize?.ean]);

  const showZoomButton = useMemo(() => (
    (!!video && imageIndex >= 0) || !video
  ), [imageIndex, video]);

  const ProductDetailCardComponent = useMemo(() => (
    showPrimeBox ? ProductDetailCard : ProductDetailCardLegacy
  ), [showPrimeBox]);

  if (!productDetail || !selectedColor) return null;

  return (
    <>
      <ModalZoomImage
        isVisible={showModal}
        image={selectedColor.images || []}
        setIsVisibleZoom={setShowModal}
        setIndexOpenImage={imageIndex}
      />

      <ProductDetailCardComponent
        testID={`com.usereserva:id/productdetail_card_${slugify(productDetail.productId)}`}
        loadingFavorite={loadingWishlist}
        isFavorited={isFavorited}
        onClickFavorite={onToggleFavorite}
        imagesHeight={3 * (configDeviceSizes.DEVICE_WIDTH / 2)}
        title={productDetail.productName}
        price={selectedSize?.listPrice || 0}
        priceWithDiscount={selectedSize?.currentPrice || 0}
        installmentsNumber={selectedSize?.installment?.number || 1}
        installmentsPrice={selectedSize?.installment?.value || 0}
        onClickShare={onClickShare}
        discountTag={selectedSize?.discountPercent || 0}
        saleOff={saleOff}
        avaibleUnits={selectedSize?.availableQuantity || undefined}
        setModalZoom={handleSetModalZoom}
        imagesWidth={configDeviceSizes.DEVICE_WIDTH}
        images={selectedColor.images || []}
        videoThumbnail={video}
        showZoomButton={showZoomButton}
        imageIndexActual={(newIndex) => {
          const handledIndex = video ? newIndex - 1 : newIndex;
          // To prevent some re-renders
          if (handledIndex === imageIndex) return handledIndex;

          setImageIndex(handledIndex);
          return handledIndex;
        }}
      />

      {!!showPrimeBox && <PricesSelectBoxes selectedSize={selectedSize} />}
    </>
  );
}

export default ProductSummary;
