import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Animated, Dimensions, TouchableOpacity } from 'react-native';
import images from '../../../base/styles/icons';
import { ProductVerticalListCard, type ProductVerticalListCardProps } from '../../../components/ProductVerticalListCard';
import type { ProductQL } from '../../../graphql/products/productSearch';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import EventProvider from '../../../utils/EventProvider';
import { createNavigateToProductParams } from '../../../utils/createNavigateToProductParams';
import { getBrandByUrl } from '../../../utils/getBrandByURL';
import { getItemPrice } from '../../../utils/getItemPrice';
import { getPercent } from '../../../utils/getPercent';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';

interface ProductItemInterface extends ProductVerticalListCardProps {
  item: any,
  index: number,
  horizontal?: boolean,
  isPrime: boolean,
}

function ProductItem({
  item,
  index,
  horizontal,
  ...props
}: ProductItemInterface) {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      height={385}
      mr={horizontal && 'xxxs'}
    >
      {
      item?.items[0]?.images[0]?.imageUrl && (
        <ProductVerticalListCard
          {...props}
          imageSource={item?.items[0]?.images[0]?.imageUrl}
        />
      )
    }
    </Box>
  );
}

interface ListProductsProps {
  products: ProductQL[];
  horizontal?: boolean;
  listHeader?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  handleScrollToTheTop?: () => void;
}

const { width } = Dimensions.get('window');

export function ListHorizontalProducts({
  products,
  horizontal,
  listHeader,
  handleScrollToTheTop,
}: ListProductsProps) {
  const { getBoolean } = useRemoteConfig();
  const navigation = useNavigation();
  const [saleOffTag, setSaleOffTag] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const { profile } = useAuthStore(['profile']);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    const skuId = item.items[0].itemId;

    setLoadingFavorite([...loadingFavorite, skuId]);
    const { productId } = item;

    if (profile?.email) {
      if (favorite) {
        const handleFavorites = [...favorites, { productId, sku: skuId }];
        await AsyncStorage.setItem(
          '@WishData',
          JSON.stringify(handleFavorites),
        );
        setFavorites(handleFavorites);
      } else {
        const newWishIds = favorites.filter((x) => x.sku !== skuId);
        AsyncStorage.setItem('@WishData', JSON.stringify(newWishIds));
        setFavorites([...favorites.filter((x) => x.sku !== skuId)]);
      }
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' });
    }
    setLoadingFavorite([...loadingFavorite.filter((x) => x !== skuId)]);
  };

  const getVariant = (
    variants: any,
    getVariantId: string,
  ) => variants.filter(
    (v: any) => v.name === getVariantId,
  )[0].values[0];

  const populateWishlist = async () => {
    const wishData: any = await AsyncStorage.getItem('@WishData');

    if (wishData) {
      setFavorites([
        ...JSON.parse(wishData).map((x: any) => ({
          productId: x.productId,
          listId: x.id,
          sku: x.sku,
        })),
      ]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      populateWishlist();
    }, []),
  );

  useEffect(() => {
    setSaleOffTag(getBoolean('sale_off_tag'));
  }, [getBoolean]);

  const getSaleOff = (salOff: object) => {
    const idImage = salOff?.clusterHighlights?.find((x) => x?.id === '371');
    if (!saleOffTag) return null;
    if (idImage) return images.saleOff;
  };

  return (
    <>
      {products && products?.length === 0 && (
        <Box
          testID="com.usereserva:id/list_products_horizontal"
          position="absolute"
          flex={1}
          height="100%"
          width="100%"
          zIndex={5}
          justifyContent="center"
          bg="white"
          alignContent="center"
          pt={163}
        >
          <Typography
            textAlign="center"
            fontFamily="reservaSerifMedium"
            fontSize={20}
          >
            Ops...desculpe
          </Typography>
          <Box mx={39} mt="nano">
            <Typography
              textAlign="center"
              fontFamily="nunitoSemiBold"
              fontSize={13}
            >
              A página que você procura está temporariamente indisponível ou foi
              removida
            </Typography>
          </Box>
          <Button
            title="VOLTAR"
            onPress={() => {
              navigation.navigate('Home');
            }}
            variant="primarioEstreitoOutline"
            mx={22}
            mt={49}
            inline
          />
        </Box>
      )}

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={products && products.map((_, index) => index * (width - 10))}
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        horizontal={horizontal}
        data={products}
        keyExtractor={(item) => item.productId}
        numColumns={horizontal ? 1 : 2}
        ListEmptyComponent={() => (
          <Box height="100%">
            <Typography
              textAlign="center"
              fontFamily="nunitoRegular"
              fontSize={16}
            >
              Produtos não encontrados
            </Typography>
          </Box>
        )}
        ListHeaderComponent={listHeader}
        renderItem={({ item, index }) => {
          const {
            listPrice,
            sellingPrice,
            installmentsNumber,
            cashPaymentPrice,
            installmentPrice,
          } = getItemPrice(item.items[0]);

          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                EventProvider.logEvent('select_item', {
                  item_list_id: item?.productId,
                  item_list_name: item?.productName,
                  item_brand: getBrandByUrl(products),
                });

                navigation.navigate('ProductDetail', createNavigateToProductParams({
                  productId: item.productId,
                  colorSelected: getVariant(item.items[0]?.variations, 'ID_COR_ORIGINAL'),
                }));
                if (handleScrollToTheTop) {
                  handleScrollToTheTop();
                }
              }}
            >
              <ProductItem
                item={item}
                index={index}
                horizontal={horizontal}
                loadingFavorite={
                  !!loadingFavorite.find((x) => x === item?.items[0]?.itemId)
                }
                isFavorited={
                  !!favorites.find((x) => x.sku === item?.items[0]?.itemId)
                }
                onClickFavorite={(isFavorite) => {
                  handleOnFavorite(isFavorite, item);
                }}
                imageSource={item?.items[0]?.images[0]?.imageUrl}
                installmentsNumber={
                  installmentsNumber?.NumberOfInstallments || 1
                }
                installmentsPrice={
                  installmentPrice?.Value || cashPaymentPrice || 0
                }
                currency="R$"
                discountTag={getPercent(
                  sellingPrice,
                  listPrice,
                )}
                saleOff={getSaleOff(item)}
                priceWithDiscount={sellingPrice}
                price={listPrice || 0}
                productTitle={item.productName}
              />
            </TouchableOpacity>
          );
        }}
      />
      <Box
        flexDirection="row"
        alignSelf="center"
      >
        {['1', '2', '3'].map((key, index) => (
          index !== 0
            ? (
              <Box
                key={key}
                width={8}
                height={8}
                bg="divider"
                borderRadius="xxxs"
                ml="nano"
              />
            )
            : (
              <Box
                key={key}
                width={8}
                height={8}
                bg="divider"
                borderRadius="xxxs"
              />
            )
        ))}
        <Animated.View
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#111',
            borderRadius: 20,
            position: 'absolute',
            transform: [{
              translateX: Animated.divide(scrollX, width * 0.8).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 8 + 5],
              }),
            }],
          }}
        />
      </Box>
    </>
  );
}
