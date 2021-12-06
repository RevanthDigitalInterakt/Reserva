import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList } from 'react-native';
import { Box, Button, Image } from 'reserva-ui';
import { Carrousel, CarrouselCard } from 'src/graphql/homePage/HomeQuery';

const cardWidth = Dimensions.get('window').width * 0.85;
const cardPadding = Dimensions.get('window').width * 0.15 * 0.5;
const DEVICE_WIDTH = Dimensions.get('window').width;
interface CardsCarrouselProps {
  carrousel: Carrousel;
}

export const CardsCarrousel: React.FC<CardsCarrouselProps> = ({
  carrousel,
}) => {
  console.log('carrousel', carrousel);
  const myCards = carrousel.itemsCollection.items;

  return (
    <Box
    // marginY={15}
    >
      <Box>
        {/* <Box paddingLeft={15}>
          <Typography fontFamily="nunitoBold" fontSize={16}>
            {carrousel.title}
          </Typography>
        </Box> */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCards}
          contentContainerStyle={{
            paddingLeft: cardPadding,
            paddingRight: cardPadding,
          }}
          snapToInterval={cardWidth}
          snapToAlignment="center"
          pagingEnabled
          // decelerationRate={0}
          bounces={false}
          disableIntervalMomentum
          renderItem={({ item, index }) => (
            <Box>
              <Card
                image={item.image}
                name={item.name}
                description={item.description}
                reference={item.reference}
                referenceLabel={item.referenceLabel}
                key={index}
              />
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

interface CardProps extends CarrouselCard {
  referenceLabel: string;
}

const Card: React.FC<CardProps> = ({
  image,
  referenceLabel,
  reference,
  description,
  name,
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    const facetInput = [];
    const [categoryType, categoryData] = reference.split(':');
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
      // facetInput,
      referenceId: reference,
    });
  };

  useEffect(() => {
    console.log('width', cardWidth);
  }, []);

  return (
    <Box>
      {/* <Box> */}
      <Button onPress={handleNavigation}>
        <Image autoHeight width={cardWidth} source={{ uri: image.url }} />
      </Button>
      {/* <Box
          style={{ maxWidth: width }}
          marginLeft={10}
          marginTop="quarck"
          marginBottom={5}
        >
          <Typography fontFamily="reservaSansBold" fontSize={16}>
            {name.toUpperCase()}
          </Typography>
          <Typography
            style={{
              marginLeft: 10,
              height: (12 + 4) * 3,
            }}
            numberOfLines={3}
            fontFamily="reservaSansRegular"
            fontSize={12}
            color="neutroFrio2"
          >
            {description}
          </Typography>
        </Box>
      </Box> */}
      {/* <TouchableOpacity
        onPress={handleNavigation}
        style={{ bottom: 0, marginLeft: 10 }}
      >
        <Typography fontSize={14} fontFamily="nunitoBold">
          {referenceLabel}
        </Typography>
      </TouchableOpacity> */}
    </Box>
  );
};
