import {
  Box, Button, ProductVerticalListCard, ProductVerticalListCardProps, Typography,
} from '@usereservaapp/reserva-ui';
import AsyncStorage from '@react-native-community/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';
import { useNavigation } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Animated, Dimensions } from 'react-native';
import { images } from '../../../assets';
import { useAuth } from '../../../context/AuthContext';
import {
  ProductQL,
} from '../../../graphql/products/productSearch';
import { ProductUtils } from '../../../shared/utils/productUtils';
import EventProvider from '../../../utils/EventProvider';
import { getItemPrice } from '../../../utils/getItemPrice';
import { getPercent } from '../../../utils/getPercent';

interface ListProductsProps {
  products: ProductQL[];
  horizontal?: boolean;
  listHeader?:
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  handleScrollToTheTop?: () => void;
}

const { width } = Dimensions.get('window');

export const ListHorizontalProducts = ({
  products,
  horizontal,
  listHeader,
  handleScrollToTheTop,
}: ListProductsProps) => {
  const navigation = useNavigation();
  const [skip, setSkip] = useState(false);
  const [saleOffTag, setSaleOffTag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFavorite, setLoadingFavorite] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const { email } = useAuth();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const populateListWithFavorite = async () => {
    setLoading(true);
    /*  if (email) {
      if (products && products.length <= 0) {
        await populateWishlist();
      }
    } */
    // Promise.all(products).then((res) => setProductList(res));
    setLoading(false);
  };

  const handleOnFavorite = async (favorite: boolean, item: any) => {
    const skuId = item.items[0].itemId;
    setLoadingFavorite([...loadingFavorite, skuId]);
    const { productId, listId } = item;

    if (email) {
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
      setLoading(false);
      await populateListWithFavorite();
    } else {
      navigation.navigate('Login', { comeFrom: 'Menu' });
    }
    setLoadingFavorite([...loadingFavorite.filter((x) => x != skuId)]);
  };

  const getVariant = (variants: any, getVariantId: string) => variants.filter((v: any) => v.name === getVariantId)[0].values[0];

  const populateWishlist = async () => {
    setSkip(true);

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

  useEffect(() => {
    populateListWithFavorite();
    populateWishlist();
  }, [products]);

  useFocusEffect(
    useCallback(() => {
      populateListWithFavorite();
      populateWishlist();
    }, []),
  );

  useEffect(() => {
    remoteConfig().fetchAndActivate();
    const value = remoteConfig().getValue('sale_off_tag');
    setSaleOffTag(value.asBoolean());
  }, []);

  const getSaleOff = (salOff) => {
    const idImage = salOff.clusterHighlights?.find((x) => x.id === '371');
    if (!saleOffTag) return null;
    if (idImage) return images.saleOff;
  };

  return (
    <>
      {products && products.length === 0 && (
        <Box
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

      <>
        <Animated.FlatList
          // viewabilityConfigCallbackPairs={[{ viewabilityConfig: { viewAreaCoveragePercentThreshold: 40 }, onViewableItemsChanged: onViewRef }]}
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
          keyExtractor={(item, index) => `${item.productId} ${index}`}
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
              installments,
              installmentsNumber,
              discountTag,
              cashPaymentPrice,
              installmentPrice,
            } = getItemPrice(item.items[0]);

            // item.priceRange?.listPrice?.lowPrice;
            const colors = new ProductUtils().getColorsArray(item);
            return (
              <ProductItem
                item={item}
                index={index}
                horizontal={horizontal}
                loadingFavorite={
                  !!loadingFavorite.find((x) => x == item.items[0].itemId)
                }
                isFavorited={
                  !!favorites.find((x) => x.sku == item.items[0].itemId)
                } // item.isFavorite}
                onClickFavorite={(isFavorite) => {
                  // setLoafingFavorite([...loadingFavorite, item.productId])
                  handleOnFavorite(isFavorite, item);
                  // setLoafingFavorite([...loadingFavorite.filter(x => x != item.productId)])
                }}
                // colors={null}
                imageSource={item.items[0].images[0].imageUrl}
                installmentsNumber={installmentsNumber?.NumberOfInstallments || 1}// numero de parcelas
                installmentsPrice={installmentPrice?.Value || cashPaymentPrice || 0} // valor das parcelas
                currency="R$"
                discountTag={getPercent(
                  sellingPrice,
                  listPrice,
                )}
                saleOff={getSaleOff(item)}
                priceWithDiscount={sellingPrice}
                price={listPrice || 0}
                productTitle={item.productName}
                onClickImage={() => {
                  EventProvider.logEvent('select_item', {
                    item_list_id: item.productId,
                    item_list_name: item.productName,
                  });

                  navigation.navigate('ProductDetail', {
                    productId: item.productId,
                    colorSelected: getVariant(
                      item.items[0].variations,
                      'ID_COR_ORIGINAL',
                    ),
                  });

                  if (handleScrollToTheTop) {
                    handleScrollToTheTop();
                  }
                }}
              />
            );
          }}
        />
      </>
      {/* ) : ( */}

      {/* )} */}
      <Box
        flexDirection="row"
        alignSelf="center"
      >
        {Array(3).fill(0).map((_, index) => (
          index != 0
            ? (
              <Box
                width={8}
                height={8}
                bg="divider"
                borderRadius="xxxs"
                ml="nano"
              />
            )
            : (
              <Box
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
};

interface ProductItemInterface extends ProductVerticalListCardProps {
  item: any,
  index: number,
  horizontal?: boolean,
}

const ProductItem: React.FC<ProductItemInterface> = ({
  item,
  index,
  horizontal,
  ...props
}) => {
  // const [imageUri, setImageUri] = useState<string>()
  // const { fetchImage } = useCacheImages()

  useEffect(() => {
    // fetchImage(item.items[0].images[0].imageUrl).then((uri: string) => {
    //   setImageUri(uri)
    // })
  }, []);

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      height={353}
      mr={horizontal && 'xxxs'}
    >
      {
        item.items[0].images[0].imageUrl && (
          <ProductVerticalListCard
            {...props}
            imageSource={item.items[0].images[0].imageUrl}
          />
        )
      }
    </Box>
  );
};
