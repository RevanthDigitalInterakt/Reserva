import { useNavigation } from '@react-navigation/native';
import { Box, Button, Image } from '@usereservaapp/reserva-ui';
import React from 'react';

interface ICardProps {
  index: number;
  image: {
    url?: string
  };
  reference: string;
  width: number;
}

const Card: React.FC<ICardProps> = ({
  index,
  image,
  reference,
  width,
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    // TODO refactor use helper facets in sprint 13
    if (reference) {
      const facetInput = [];
      const [categoryType, categoryData] = reference.split(':');

      if (categoryType === 'product') {
        navigation.navigate('ProductDetail', {
          productId: categoryData,
          itemId: categoryData,
          colorSelected: '#FFFFFF',
        });
      } else {
        if (categoryType === 'category') {
          categoryData.split('|').forEach((cat: string) => {
            facetInput.push({
              key: 'c',
              value: cat,
            });
          });
        } else {
          facetInput.push({
            key: 'productClusterIds',
            value: categoryData,
          });
        }
        navigation.navigate('ProductCatalog', {
          referenceId: reference,
        });
      }
    }
  };

  if (image?.url) {
    return null;
  }

  return (
    <Box
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: index === 0 ? 20 : 0,
      }}
    >
      <Button
        style={{ backgroundColor: '#f1f1f1', borderRadius: 108 / 2 }}
        onPress={handleNavigation}
      >
        <Image
          autoHeight
          width={width}
          source={{ uri: image?.url }}
        />
      </Button>
    </Box>
  );
};

export default Card;
