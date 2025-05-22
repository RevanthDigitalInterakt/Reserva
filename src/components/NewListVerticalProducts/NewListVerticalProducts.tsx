import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import {
  TrackEventNameEnum,
  TrackEventTypeEnum,
  type ProductListOutput,
} from '../../base/graphql/generated';
import { COLORS } from '../../base/styles/colors';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { useWishlistActions } from '../../hooks/useWishlistActions';
import EventProvider from '../../utils/EventProvider';
import { defaultBrand } from '../../utils/defaultWBrand';
import { Box } from '../Box/Box';
import { ProductVerticalListCard } from '../ProductVerticalListCard';
import { Typography } from '../Typography/Typography';
import { useTrackClickAlgoliaStore } from '../../zustand/useTrackAlgoliaStore/useTrackAlgoliaStore';
import useSearchStore from '../../zustand/useSearchStore';
import { ProductKitLookVerticalListCard } from '../ProductKitLookVerticalListCard';
import { ListVerticalProductsStyles } from './styles';

interface ListProductsProps {
  data: ProductListOutput[];
  total: number;
  loading: boolean;
  marginBottom?: number;
  headerComponent?: React.ReactElement;
  onFetchMore: () => void;
  cacheGoingBackRequest?: () => void;
  onScroll?: (scrollEvent: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

function NewListVerticalProducts({
  data,
  total,
  loading,
  marginBottom,
  headerComponent,
  onFetchMore,
  cacheGoingBackRequest,
  onScroll,
}: ListProductsProps) {
  const styles = ListVerticalProductsStyles();

  const navigation = useNavigation();
  const { getBoolean } = useRemoteConfig();
  const { primeActive } = usePrimeInfo();
  const { onTrack } = useTrackClickAlgoliaStore(['onTrack']);
  const { queryID } = useSearchStore(['queryID']);
  const { checkIsFavorite, onToggleFavorite, loadingSkuId } = useWishlistActions();

  const showThumbColors = useMemo(
    () => getBoolean('show_pdc_thumb_color'),
    [getBoolean],
  );

  const showPrimePrice = useMemo(
    () => getBoolean('show_price_prime_pdc') && primeActive,
    [getBoolean, primeActive],
  );

  const showPdcKitLook = useMemo(
    () => getBoolean('show_pdc_kit_look'),
    [getBoolean],
  );

  const getPosition = useCallback((item: ProductListOutput) => {
    const itemPosition = data.indexOf(item);

    if (itemPosition < 0) return [0];

    return [itemPosition + 1];
  }, [data]);

  const onClickProduct = useCallback((item: ProductListOutput) => {
    if (item?.isKitLook) {
      EventProvider.logEvent('pdc_click_kit_look_item', {
        item_id: item.productId,
        item_name: item.productName,
      });
    }

    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });

    EventProvider.logEvent('select_item', {
      item_list_id: item.productId,
      item_list_name: item.productName,
      item_brand: item.brand,
    });

    if (cacheGoingBackRequest) {
      cacheGoingBackRequest();
    }
    // @ts-ignore
    navigation.navigate('ProductDetail', { skuId: item.skuId });
    onTrack({
      typeEvent: TrackEventTypeEnum.Click,
      nameEvent: queryID
        ? TrackEventNameEnum.ClickedItemsSearch
        : TrackEventNameEnum.ClickedItems,
      sku: [item.ean],
      queryID,
      positions: getPosition(item),
    });
  }, [data]);

  const onRenderItem: ListRenderItem<ProductListOutput> = useCallback(
    ({ item }) => (
      <>
        {!item?.isKitLook && (
          <View
            pointerEvents={loading ? 'none' : 'auto'}
            style={styles.productDetails(showThumbColors)}

          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onClickProduct(item)}
            >
              <ProductVerticalListCard
                prime={
                  item.prime && showPrimePrice
                    ? {
                      primePrice: item.prime.price,
                      primeInstallments: {
                        number: item.prime.installment.number || 0,
                        value: item.prime.installment.value || 0,
                      },
                    }
                    : null
                }
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
                colors={showThumbColors ? item.colors || [] : []}
                isFavorited={checkIsFavorite(item.skuId)}
                onClickFavorite={() => {
                  onToggleFavorite({
                    productId: item.skuId,
                    ean: item.ean,
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
                discountTag={
                  item.discountPercentage ? item.discountPercentage : undefined
                }
                testID={`com.usereserva:id/productcard_vertical_${item.skuId}`}
              />
            </TouchableOpacity>
          </View>
        )}

        {item?.isKitLook && showPdcKitLook && (
          <View
            style={styles.mainContainer}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => onClickProduct(item)}
            >
              <ProductKitLookVerticalListCard
                productTitle={item.productName}
                imageSource={item.image}
                testID={`com.usereserva:id/productcard_vertical_${item.skuId}`}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    ),
    [
      checkIsFavorite,
      loadingSkuId,
      navigation,
      onToggleFavorite,
      showPrimePrice,
      showThumbColors,
      data,
      loading,
    ],
  );

  const Footer = useCallback(() => {
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
      onScroll={onScroll}
      testID="com.usereserva:id/list_vertical_flat_list"
      keyExtractor={(item) => `${item.skuId}-${item.productName}`}
      numColumns={2}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={(
        <Box height="100%">
          <Typography
            textAlign="center"
            fontFamily="nunitoRegular"
            fontSize={16}
          >
            {'\n'}
            Produtos não encontrados
          </Typography>
        </Box>
      )}
      onEndReached={() => {
        if (data.length < total) onFetchMore();
      }}
      onEndReachedThreshold={0.6}
      renderItem={onRenderItem}
      ListFooterComponent={Footer}
    />
  );
}

export default NewListVerticalProducts;
