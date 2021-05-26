import React, { useDebugValue, useEffect, useState } from 'react';
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
import { TopBarDefaultBackButton } from '../../Menu/components/TopBarDefaultBackButton';
import { WishListCategory } from './WishListCategory';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeWishlist,
  setWishlist,
} from '../../../store/ducks/wishlist/actions';
import { ApplicationState } from '../../../store';
import { FlatList } from 'react-native';
import ItemList from '../../Profile/Components/ItemList';
import { Product } from '../../../store/ducks/product/types';

export const WishList: React.FC<{}> = () => {
  const [showWishListCategory, setShowWishListCategory] = useState(true);
  const [sorterVisible, setSorterVisible] = React.useState(false);

  let dispatch = useDispatch();

  let wishlist: Product[] = useSelector(
    (state: ApplicationState) => state.wishlist.data
  );

  useEffect(() => {
    console.log(wishlist);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }} flex={1}>
      <TopBarBackButton loading={false} showShadow />
      <Box>
        <Picker
          onSelect={() => {
            setSorterVisible(false);
          }}
          isVisible={sorterVisible}
          items={[
            {
              text: '38',
            },
            {
              text: '40',
            },
            {
              text: '41',
            },
            {
              text: '42',
            },
            {
              text: '43',
            },
          ]}
          onConfirm={() => {
            setSorterVisible(false);
          }}
          onClose={() => {
            setSorterVisible(false);
          }}
          title='Tamanho'
        />

        <Box marginTop='md' paddingBottom='xxxs'>
          <Box paddingX='xxxs'>
            <Typography variant='tituloSessoes'>Favoritos</Typography>
          </Box>
          <Box paddingX='xxxs' marginTop='xxxs' flexDirection='row'>
            <Box width={1 / 2}>
              <Button
                onPress={() => {
                  setShowWishListCategory(false);
                }}
                title='Todos os itens'
                height={32}
                color={showWishListCategory ? 'preto' : 'white'}
                fontFamily='nunitoRegular'
                borderColor={showWishListCategory ? 'preto' : null}
                borderWidth={showWishListCategory ? 1 : null}
                fontSize={12}
                bg={!showWishListCategory ? 'neutroFrio2' : null}
                marginRight='nano'
                inline
              />
            </Box>
            <Box width={1 / 2}>
              <Button
                marginLeft='nano'
                color={showWishListCategory ? 'white' : 'preto'}
                height={32}
                onPress={() => {
                  setShowWishListCategory(true);
                }}
                borderColor={showWishListCategory ? null : 'preto'}
                borderWidth={showWishListCategory ? null : 1}
                fontSize={12}
                bg={showWishListCategory ? 'neutroFrio2' : null}
                fontFamily='nunitoRegular'
                title='Minhas categorias'
                inline
              />
            </Box>
          </Box>
          {!showWishListCategory ? (
            <Box paddingX='xxxs'>
              <FlatList
                data={wishlist}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Box marginTop='xxxs' height={147}>
                    <ProductHorizontalListCard
                      isFavorited
                      currency={item.currency}
                      itemColor={item.colorsHex && item.colorsHex[0]}
                      ItemSize={item.sizes && item.sizes[0]}
                      productTitle={`${item.title.slice(0, 30)}${
                        item.title.length > 30 ? '...' : ''
                      }`}
                      installmentsNumber={item.installmentNumber}
                      installmentsPrice={item.installmentPrice}
                      price={item.fullPrice}
                      onClickFavorite={() => {
                        dispatch(removeWishlist(item.id));
                      }}
                      onClickBagButton={() => {}}
                      imageSource={item.imageUrl || ''}
                    />
                  </Box>
                )}
              />
            </Box>
          ) : (
            <WishListCategory />
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
};
