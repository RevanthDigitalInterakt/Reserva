import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { Box, Image } from 'reserva-ui';
import { homeQuery, HomeQuery } from '../../../store/ducks/HomePage/types';
import { load } from '../../../store/ducks/nearbyStores/actions';
import { TopBarDefault } from '../../Menu/components/TopBarDefault';

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
      context: { clientName: 'contentful' },
      variables: { limit: 0 } // quantidade de itens que iram renderizar
    }
  );
  console.log(data)
  useEffect(() => {
    console.log('data', data)
    let arrayImages = data?.homePageCollection.items[0].mediasCollection.items.map((imageDescription: any) => {
      return {
        fileName: imageDescription.image.fileName,
        title: imageDescription.image.title,
        width: imageDescription.image.width,
        height: imageDescription.image.height,
        size: imageDescription.image.size,
        url: imageDescription.image.url,
        reference: imageDescription.reference,
      }
    })
    setImages(arrayImages)
  }, [data]);

  useEffect(() => {
    dispatch(load({ UF: 'RJ' }));
  }, []);

  return (
    <Box flex={1}>
      <TopBarDefault loading={loading} />
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Box alignItems="flex-start">
            <Box mb="quarck" width={1 / 1}>
              <TouchableHighlight
                onPress={() => {
                  let facetInput = []
                  const [categoryType, categoryData] = item.reference.split(':')
                  console.log(categoryType, categoryData)
                  if (categoryType === 'category') {

                    categoryData.split('|').forEach((cat: string) => {
                      facetInput.push({
                        key: 'c',
                        value: cat
                      })
                    })
                  } else {
                    facetInput.push({
                      key: 'productClusterIds',
                      value: categoryData
                    })
                  }
                  console.log(facetInput)
                  navigation.navigate('ProductCatalog', { facetInput, refecenceId: item.reference });
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
    </Box>
  );
};
