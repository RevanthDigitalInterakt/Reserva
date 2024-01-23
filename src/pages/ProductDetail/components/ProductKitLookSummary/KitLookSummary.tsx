import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { onShare } from '../../../../utils/onShare';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { slugify } from '../../../../utils/slugify';
import { ModalZoomImage } from '../ProductSummary/ModalZoomImage';
import EventProvider from '../../../../utils/EventProvider';
import { ProductResultActionEnum } from '../../../../base/graphql/generated';
import KitLookDetailCard from './components/KitLookDetailCard';
import { useWishlistActions } from '../../../../hooks/useWishlistActions';
import ItemsCardWrapper from './components/ItemsCardWrapper';
import KitLookFooter from './components/KitLookFooter';
import Description from './components/Description';

function KitLookSummary() {
  const {
    productDetail,
    selectedColor,
    selectedSize,
    selectedGiftCardSku,
  } = useProductDetailStore([
    'productDetail',
    'selectedSize',
    'selectedColor',
    'selectedGiftCardSku',
  ]);

  const [imageIndex, setImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const description = productDetail?.properties.description;

  const {
    loadingSkuId,
    checkIsFavorite,
    onToggleFavorite,
  } = useWishlistActions();

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

  const isGiftCard = productDetail?.action === ProductResultActionEnum.ShowGiftCard;

  const giftCardImage = isGiftCard ? productDetail?.giftCard?.options[0]?.images : [];
  const giftCardFirstPriceOption = isGiftCard ? productDetail?.giftCard?.options[0]?.name : '';

  const hasNotSelectedColor = !selectedColor && !isGiftCard;

  if (!productDetail || hasNotSelectedColor) return null;

  const favoriteProduct = isGiftCard ? {
    productName: productDetail?.productName,
    productId: productDetail?.productId,
    skuId: selectedGiftCardSku!,
  } : {
    productName: productDetail?.productName,
    productId: selectedSize?.itemId || '',
    size: selectedSize?.size,
    lowPrice: selectedSize?.currentPrice || 0,
    colorName: selectedColor?.colorName,
    skuId: selectedSize?.itemId || '',
    skuName: selectedSize?.skuName || '',
    category: '',
    brand: '',
  };

  const isLoadingFavorite = isGiftCard
    ? loadingSkuId === selectedGiftCardSku
    : loadingSkuId === selectedSize?.itemId;

  const isFavorite = checkIsFavorite(isGiftCard ? selectedGiftCardSku! : selectedSize?.itemId || '');

  return (
    <>
      <ModalZoomImage
        isVisible={showModal}
        image={isGiftCard ? giftCardImage! : selectedColor?.images || []}
        setIsVisibleZoom={setShowModal}
        setIndexOpenImage={imageIndex}
      />

      <KitLookDetailCard
        testID={`com.usereserva:id/kitlookdetail_card_${slugify(productDetail.productId)}`}
        loadingFavorite={isLoadingFavorite}
        isFavorited={isFavorite}
        onClickFavorite={() => onToggleFavorite(favoriteProduct)}
        imagesHeight={3 * (configDeviceSizes.DEVICE_WIDTH / 2)}
        title={productDetail.productName}
        price={selectedSize?.listPrice || 0}
        priceWithDiscount={selectedSize?.currentPrice || 0}
        installmentsNumber={selectedSize?.installment?.number || 1}
        installmentsPrice={selectedSize?.installment?.value || 0}
        onClickShare={onClickShare}
        setModalZoom={handleSetModalZoom}
        giftCardFirstPriceOption={giftCardFirstPriceOption}
        imagesWidth={configDeviceSizes.DEVICE_WIDTH}
        images={isGiftCard ? giftCardImage! : selectedColor?.images || []}
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

      <ItemsCardWrapper />

      <Description description={description} />

      <KitLookFooter />
    </>
  );
}

export default KitLookSummary;
