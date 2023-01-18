import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Box,
  ProductHorizontalListCard,
  Typography,
} from '@usereservaapp/reserva-ui';
import { StackScreenProps } from '@react-navigation/stack';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { RootStackParamList } from '../../../routes/StackNavigator';
import EventProvider from '../../../utils/EventProvider';

type Props = StackScreenProps<RootStackParamList, 'ShowListByCategory'>;

export const ShowListByCategory: React.FC<Props> = ({ navigation, route }) => {
  // let { categoryName, products } = route.params
  // products = !products ? [] : products
  const [products, setProducts] = useState<any>([]);
  const [wishlist, setWishlist] = useState<any>([]);
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <TopBarBackButton loading={false} showShadow />
      <ScrollView>
        <Box marginTop="md" paddingBottom="xxxs">
          <Box paddingX="xxxs">
            <Typography variant="tituloSessoes">categoryName</Typography>
          </Box>
          <Box paddingX="xxxs">
            {wishlist
              .filter(
                (wish) => products.findIndex((x) => x.id != wish.id) != undefined,
              )
              .map((prod, index) => (
                <Box marginTop="xxxs" height={147} key={`product-${index}`}>
                  <ProductHorizontalListCard
                    isFavorited
                    currency={prod.currency}
                    discountTag={
                        prod.discountTag > 0 ? prod.discountTag : undefined
                      }
                    itemColor={prod.colorsHex && prod.colorsHex[0]}
                    ItemSize={prod.sizes && prod.sizes[0]}
                    productTitle={`${prod.title.slice(0, 30)}${prod.title.length > 30 ? '...' : ''
                    }`}
                    installmentsNumber={prod.installmentNumber}
                    installmentsPrice={prod.installmentPrice}
                    price={prod.fullPrice}
                    priceWithDiscount={prod.discountPrice}
                      // onClickFavorite={() => {

                      // }}
                    onClickBagButton={() => {
                      EventProvider.logEvent('select_item', {
                        item_list_id: prod.id ?? '',
                        item_list_name: prod.title ?? '',
                      });

                      navigation.navigate('ProductDetail', {
                        productId: prod.id ? prod.id : '',
                      });
                    }}
                    onClickPiker={() => { }}
                    imageSource={prod.imageUrl}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
