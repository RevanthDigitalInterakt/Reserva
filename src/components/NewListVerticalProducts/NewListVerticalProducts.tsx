import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import type { ProductListOutput } from '../../base/graphql/generated';
import { COLORS } from '../../base/styles/colors';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { useWishlistActions } from '../../hooks/useWishlistActions';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import { Box } from '../Box/Box';
import { ProductVerticalListCard } from '../ProductVerticalListCard';
import { Typography } from '../Typography/Typography';

interface ListProductsProps {
  data: ProductListOutput[];
  total: number;
  loading: boolean;
  marginBottom?: number;
  headerComponent?: React.ReactNode[]
  onFetchMore: () => void;
}

function NewListVerticalProducts({
  data,
  total,
  loading,
  marginBottom,
  headerComponent,
  onFetchMore,
}: ListProductsProps) {
  const navigation = useNavigation();
  const { getBoolean } = useRemoteConfig();
  const { primeActive } = usePrimeInfo();
  const { checkIsFavorite, onToggleFavorite, loadingSkuId } = useWishlistActions();

  const showThumbColors = useMemo(() => getBoolean('show_pdc_thumb_color'), [getBoolean]);

  const showPrimePrice = useMemo(() => (
    getBoolean('show_price_prime_pdc') && primeActive
  ), [getBoolean, primeActive]);

  const onRenderItem = useCallback((item: ProductListOutput) => (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      marginBottom="xs"
      height={showThumbColors ? 375 : 353}
    >
      <ProductVerticalListCard
        prime={(item.prime && showPrimePrice) ? {
          primePrice: item.prime.price,
          primeInstallments: {
            number: item.prime.installment.number || 0,
            value: item.prime.installment.value || 0,
          },
        } : null}
        productTitle={item.productName}
        priceWithDiscount={item.currentPrice}
        price={item.listPrice}
        installmentsEqualPrime={item.installmentEqualPrime}
        currency="R$"
        showThumbColors={showThumbColors}
        imageSource={item.image}
        installmentsNumber={item.installment.number}
        installmentsPrice={item.installment.value}
        loadingFavorite={loadingSkuId === item.skuId}
        onClickImage={() => {
          EventProvider.logEvent('page_view', { item_brand: defaultBrand.picapau });
          EventProvider.logEvent('select_item', {
            item_list_id: item.productId,
            item_list_name: item.productName,
            item_brand: item.brand,
          });

          // @ts-ignore
          navigation.navigate('ProductDetail', { skuId: item.skuId });
        }}
        colors={showThumbColors ? (item.colors || []) : []}
        isFavorited={checkIsFavorite(item.skuId)}
        onClickFavorite={() => {
          onToggleFavorite({
            productId: item.skuId,
            skuId: item.skuId,
            brand: item.brand,
            productName: item.productName,
            category: item.category,
            size: item.size,
            colorName: item.colorName,
            lowPrice: item.currentPrice,
            skuName: item.skuName,
          });
        }}
        discountTag={item.discountPercentage ? item.discountPercentage : undefined}
        testID={`com.usereserva:id/productcard_vertical_${item.skuId}`}
      />
    </Box>
  ), [
    checkIsFavorite,
    loadingSkuId,
    navigation,
    onToggleFavorite,
    showPrimePrice,
    showThumbColors,
  ]);

  const Footer = useMemo(() => {
    if (!loading) {
      return null;
    }

    return (
      <Box
        width="100%"
        height={30}
        color="verdeSucesso"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="small" color={COLORS.BLACK} />
      </Box>
    );
  }, [loading]);

  return (
    <FlatList
      style={{ marginBottom }}
      data={data}
      bounces={false}
      testID="com.usereserva:id/list_vertical_flat_list"
      keyExtractor={(item) => `${item.skuId}-${item.productName}`}
      numColumns={2}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={() => (
        <Box height="100%">
          <Typography textAlign="center" fontFamily="nunitoRegular" fontSize={16}>
            {'\n'}
            Produtos não encontrados
          </Typography>
        </Box>
      )}
      onEndReached={() => {
        if (data.length < total) onFetchMore();
      }}
      ListFooterComponent={Footer}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => onRenderItem(item)}
    />
  );
}

export default NewListVerticalProducts;
