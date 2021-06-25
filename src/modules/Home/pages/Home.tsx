import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Button, Image, theme } from 'reserva-ui';
import { images } from '../../../assets';
import { ApplicationState } from '../../../store';
import { load } from '../../../store/ducks/nearbyStores/actions';

import { TopBarDefault } from '../../Menu/components/TopBarDefault';
import { clientContentFul } from "../../../services/apolloClient";
import { useQuery, useMutation } from '@apollo/client'
import { homeQuery, HomeQuery } from '../../../store/ducks/HomePage/types';

export const HomeScreen: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [images, setImages] = React.useState<HomeQuery[]>([])
  const deviceWidth = Dimensions.get('screen').width;
  const { loading, error, data, } = useQuery(
    homeQuery,
    {
      client: clientContentFul,
      variables: { limit: 5 } // quantidade de itens que iram renderizar
    }
  );

  useEffect(() => {
    console.log('homeData', data?.homePageCollection.items[0].mediasCollection.items)
    let arrayImages = data?.homePageCollection.items[0].mediasCollection.items.map((imageDescription) => (
      {
        fileName: imageDescription.image.fileName,
        title: imageDescription.image.title,
        width: imageDescription.image.width,
        height: imageDescription.image.height,
        size: imageDescription.image.size,
        url: imageDescription.image.url,
      }
    ))
    setImages(arrayImages)
  }, [data]);

  useEffect(() => {
    dispatch(load({ UF: 'RJ' }));
  }, []);

  return (
    <Box flex={1}>
      <TopBarDefault loading={loading} />
      {/* <ScrollView> */}
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Box alignItems="flex-start">
            <Box mb="quarck" width={1 / 1}>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('ProductCatalog');
                }}
              >
                <Image
                  autoHeight={true}
                  width={deviceWidth}
                  source={{ uri: item.url }}
                />
              </TouchableHighlight>
            </Box>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
      {/* <Box alignItems="flex-start"> */}
      {/* <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                // navigation.navigate('ProductCatalog');
              }}
            >
              <Image
                autoHeight={image && true}
                width={deviceWidth}
                source={{ uri: image?.image.url }}
              />
            </TouchableHighlight>
          </Box> */}

      {/* <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('ProductCatalog');
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.topBannerMock1}
              />
            </TouchableHighlight>
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('ProductCatalog');
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock2}
              />
            </TouchableHighlight>
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('ProductCatalog');
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock3}
              />
            </TouchableHighlight>
          </Box>
          <Box mb="quarck" width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('ProductCatalog');
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock1}
              />
            </TouchableHighlight>
          </Box>
          <Box width={1 / 1}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('ProductCatalog');
              }}
            >
              <Image
                autoHeight={true}
                width={deviceWidth}
                source={images.homeMock4}
              />
            </TouchableHighlight>
          </Box> */}
      {/* </Box> */}
      {/* </ScrollView> */}
    </Box>
  );
};
