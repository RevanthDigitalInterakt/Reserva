import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Box,
  Button,
  ProductHorizontalListCard,
  Typography,
  Picker,
} from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { images } from '../../../assets';
import { WishListCategory } from './WishListCategory';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { removeWishlist } from '../../../store/ducks/wishlist/actions';

type Props = StackScreenProps<RootStackParamList, 'ShowListByCategory'>;

export const ShowListByCategory: React.FC<Props> = ({ navigation, route }) => {
  let { categoryName, products } = route.params;
  products = !products ? [] : products;

  const dispatch = useDispatch();
  const wishlist = useSelector(
    (state: ApplicationState) => state.wishlist.data
  );

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <TopBarBackButton loading={false} showShadow />
      <ScrollView>
        <Box marginTop='md' paddingBottom='xxxs'>
          <Box paddingX='xxxs'>
            <Typography variant='tituloSessoes'>{categoryName}</Typography>
          </Box>
          <Box paddingX='xxxs'>
            {wishlist
              .filter(
                (wish) =>
                  products.findIndex((x) => x.id != wish.id) != undefined
              )
              .map((prod) => {
                return (
                  <Box marginTop='xxxs' height={147}>
                    <ProductHorizontalListCard
                      isFavorited
                      currency={prod.currency}
                      discountTag={
                        prod.discountTag > 0 ? prod.discountTag : undefined
                      }
                      itemColor='Branca'
                      ItemSize='41'
                      productTitle={`${prod.title.slice(0, 30)}${
                        prod.title.length > 30 ? '...' : ''
                      }`}
                      installmentsNumber={prod.installmentNumber}
                      installmentsPrice={prod.installmentPrice}
                      price={prod.fullPrice}
                      priceWithDiscount={prod.discountPrice}
                      onClickFavorite={() => {
                        dispatch(removeWishlist(prod.id));
                      }}
                      onClickBagButton={() => {
                        //navigation.navigate('Pro');
                      }}
                      onClickPiker={() => {}}
                      imageSource={prod.imageUrl}
                    />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};
