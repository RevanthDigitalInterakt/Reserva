import React, { useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { Box, Icon, Typography, Image, Button } from '@usereservaapp/reserva-ui';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { images } from '../../../assets';
import { RootStackParamList } from '../../../routes/StackNavigator';

const screenWidth = Dimensions.get('window').width;

export const WishListCategory: React.FC<{}> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [wishlist, setWishlist] = useState<any>([]);
  let categories: string[] = [];
  wishlist.forEach((val, idx, self) => {
    if (!categories.find((x) => x == val.category))
      categories.push(val.category);
  });
  return (
    <Box
      paddingX='xxxs'
      paddingY='xxs'
      bg='backgroundMenuOpened'
      width='100%'
      height='100%'
      flexDirection='column'
      marginTop='xxxs'
    >
      {categories.map((cat) => (
        <CategoryCard
          title={cat}
          onClick={() => {
            navigation.navigate('ShowListByCategory', {
              categoryName: cat,
              products: wishlist.filter((wish) => wish.category == cat),
            });
          }}
          urlsImages={wishlist
            .filter((wish) => wish.category == cat)
            .map((x) => x.imageUrl || '')}
        />
      ))}
    </Box>
  );
};

interface CategoryCardProd {
  title: string;
  onClick: () => void;
  urlsImages: string[];
}

const CategoryCard = ({ urlsImages, title, onClick }: CategoryCardProd) => {
  return (
    <Button
      onPress={onClick}
      mt='micro'
      boxShadow={Platform.OS == 'android' ? null : 'topBarShadow'}
      style={{ elevation: Platform.OS == 'android' ? 5 : null }}
      paddingX='xxxs'
      paddingY='xxxs'
      bg='white'
      flexDirection='row'
    >
      <Box flex={1}>
        <Box flexDirection='row' justifyContent='space-between'>
          <Typography fontFamily='reservaSerifRegular' fontSize={16}>
            {title}
          </Typography>
          <Icon color='preto' name='ArrowProcced' size={16} />
        </Box>
        <Box flexDirection='row'>
          <Typography fontFamily='nunitoRegular' fontSize={12}>
            itens({urlsImages.length})
          </Typography>
        </Box>
        <Box flexDirection='row' marginTop='xxxs'>
          {urlsImages.slice(0, 4).map((img) => (
            <Box marginRight='micro'>
              <Image source={img} height={97} width={(screenWidth - 116) / 4} />
            </Box>
          ))}
        </Box>
      </Box>
    </Button>
  );
};
